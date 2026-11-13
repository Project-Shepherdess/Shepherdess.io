"""Headless checks of the static landing page; never sends mail or follows external links."""
import argparse, asyncio, hashlib, json, re, subprocess
from pathlib import Path
from html.parser import HTMLParser
from playwright.async_api import async_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASELINE = 'a63cc4b178e97e7c1b9d8589bf721de168d9e4a2'

class Copy(HTMLParser):
    def __init__(self): super().__init__(); self.depth=0; self.words=[]; self.rows=[]
    def handle_starttag(self, tag, attrs):
        if tag in ['h1','h2','h3','p'] and self.depth == 0:
            self.depth=1;self.words=[]
        elif self.depth:self.depth+=1
    def handle_endtag(self, tag):
        if self.depth:
            self.depth-=1
            if self.depth==0:self.rows.append(' '.join(''.join(self.words).split()))
    def handle_data(self, text):
        if self.depth:self.words.append(text)

def copy_check():
    before=Copy();before.feed(subprocess.check_output(['git','show',f'{BASELINE}:index.html'],cwd=ROOT,text=True))
    after=Copy();after.feed((ROOT/'index.html').read_text())
    assert before.rows==after.rows, 'Published headings or paragraphs changed'
    assert hashlib.sha256((ROOT/'images/aicoop-logo.png').read_bytes()).hexdigest()=='bf460591d9d0246a03d6db2b4c81bc3720b1d3e1de217c65169a777b499210df'
    return len(before.rows)

# Compute contrast for solid surfaces. Image captions are visually reviewed separately.
CONTRAST = r'''() => {
 const parse = s => {const n=s.match(/[\d.]+/g).map(Number); return {rgb:n.slice(0,3),a:n.length>3?n[3]:1}};
 const lum = rgb => rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
 const output=[];
 for(const el of document.querySelectorAll('p,h1,h1 em,h2,h3,.metric strong,.metric span,.coop-attribution,.footer-coop,.nav-links a,.button,.loop-step span,.loop-step strong,.ledger-row strong,.method-list span')) {
  if(!el.getClientRects().length) continue;
  const style=getComputedStyle(el), fg=parse(style.color);let bg=null, imageSurface=false;
  for(let p=el;p;p=p.parentElement){const c=parse(getComputedStyle(p).backgroundColor);if(c.a===1){bg=c.rgb;imageSurface=p.classList.contains('hero');break;}}
  if(!bg)bg=[255,255,255];
  // Conservative white-image backdrop through the minimum dark overlay below the hero text.
  if(imageSurface)bg=[6,29,20].map(v=>v*.66+255*.34);
  const color=fg.rgb.map((v,i)=>v*fg.a+bg[i]*(1-fg.a));
  const a=lum(color),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
  const large=parseFloat(style.fontSize)>=24 || (parseFloat(style.fontSize)>=18.66 && parseInt(style.fontWeight)>=700);
  if(ratio<(large?3:4.5))output.push({text:el.textContent.trim().slice(0,70),ratio,fg:style.color,bg});
 }
 return output;
}'''

async def run(base):
    paragraphs=copy_check();results=[]
    async with async_playwright() as pw:
        for engine in ['chromium','firefox','webkit']:
            browser=await getattr(pw,engine).launch()
            for width in [1440,1024,768,390,320]:
                errors=[];requests=[]
                context=await browser.new_context(viewport={'width':width,'height':1000},reduced_motion='reduce')
                async def local_only(route):
                    requests.append(route.request.url)
                    if not route.request.url.startswith(base+'/'):await route.abort()
                    else:await route.continue_()
                await context.route('**/*',local_only)
                page=await context.new_page()
                page.on('pageerror',lambda e:errors.append(str(e)))
                page.on('response',lambda r:errors.append(f'HTTP {r.status}: {r.url}') if r.status>=400 else None)
                response=await page.goto(base+'/',wait_until='networkidle');assert response.status==200
                assert await page.locator('h1').count()==1
                assert await page.locator('main').count()==1
                assert await page.locator('.coop-attribution').is_visible()
                assert 'An AI Coop initiative' in await page.locator('.coop-attribution').inner_text()
                assert await page.locator('.coop-attribution').get_attribute('href')=='https://aicoop.co/'
                assert await page.locator('.footer-coop').get_attribute('href')=='https://aicoop.co/'
                for img in await page.locator('img').all():
                    assert await img.evaluate('(e)=>e.complete && e.naturalWidth>0')
                assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (engine,width,'overflow')
                assert await page.locator('.nav-links').is_visible(), (engine,width,'navigation missing')
                for a in await page.locator('a[href^="#"]').all():
                    target=await a.get_attribute('href')
                    assert await page.locator(target).count()==1,(engine,width,target)
                failures=await page.evaluate(CONTRAST);assert not failures,(engine,width,failures)
                # Skip link and native anchor navigation work without menu JavaScript.
                await page.keyboard.press('Alt+Tab' if engine=='webkit' else 'Tab')
                assert await page.locator('.skip-link').evaluate('(e)=>e===document.activeElement')
                await page.keyboard.press('Enter')
                await expect(page).to_have_url(base+'/#main')
                for target in ['intelligence','system','mrv','markets','pilot']:
                    link=page.locator('.nav-links a[href="#'+target+'"]')
                    await link.focus();await page.keyboard.press('Enter')
                    await expect(page).to_have_url(base+'/#'+target)
                    top=await page.locator('#'+target).evaluate('(e)=>e.getBoundingClientRect().top')
                    header=await page.locator('.site-header').evaluate('(e)=>e.getBoundingClientRect().bottom')
                    assert top>=header-1,(engine,width,target,'anchor hidden',top,header)
                assert (await page.locator('#pilot .button').get_attribute('href')).startswith('mailto:hello@aicoop.co?subject=')
                assert await page.locator('.contact-address').get_attribute('href') == 'mailto:hello@aicoop.co'
                assert await page.locator('a[href*="info@shepherdess.io"]').count() == 0
                assert await page.locator('form,iframe').count()==0
                assert await page.evaluate('getComputedStyle(document.documentElement).scrollBehavior')=='auto'
                assert not errors,(engine,width,errors)
                assert all(u.startswith(base+'/') for u in requests),(engine,width,'remote request')
                if engine=='chromium' and width in [1440,390]:
                    await page.goto(base+'/',wait_until='networkidle')
                    await page.screenshot(path=str(ROOT/'_qa'/f'after-{width}.png'))
                    await page.locator('#intelligence').screenshot(path=str(ROOT/'_qa'/f'intelligence-{width}.png'))
                    await page.locator('footer').screenshot(path=str(ROOT/'_qa'/f'footer-{width}.png'))
                results.append({'engine':engine,'width':width,'checks':'attribution, assets, links, contrast, keyboard, anchor offset, overflow, reduced motion, no external requests','status':'pass'})
                await context.close()
            # No script is needed for mobile navigation or contact.
            context=await browser.new_context(java_script_enabled=False,viewport={'width':390,'height':900})
            page=await context.new_page();await page.goto(base+'/');await page.locator('.nav-links a[href="#pilot"]').click()
            await expect(page).to_have_url(base+'/#pilot');assert await page.locator('#pilot .button').is_visible()
            await context.close();await browser.close()
    receipt={'scope':'Local headless browser review; no live contact, field validation or production acceptance','baseline':BASELINE,'preserved_headings_paragraphs':paragraphs,'results':results,'no_js_mobile_engines':3,'source_sha256':{p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in ['index.html','stylesheets/landing.css','images/aicoop-logo.png']}}
    (ROOT/'_qa'/'checks.json').write_text(json.dumps(receipt,indent=2)+'\n')
    print(json.dumps({'combinations':len(results),'preserved_headings_paragraphs':paragraphs,'status':'pass'}))

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--base',default='http://127.0.0.1:8689');args=parser.parse_args();asyncio.run(run(args.base))
