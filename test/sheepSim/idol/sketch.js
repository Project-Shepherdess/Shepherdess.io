var mother
var heightMod = 1.23

const caloracles = ['䷾','䷤','䷕','䷰','䷌','䷝','䷐','䷘','䷔','䷄','䷈','䷙','䷪','䷀','䷍','䷹','䷉','䷥','䷯','䷸','䷑','䷛','䷫','䷱','䷮','䷅','䷿']
const Numerals   = ['-13','-12','-11','-10','-09','-08','-07','-06','-05','-04','-03','-02','-01','000','+01','+02','+03','+04','+05','+06','+07','+08','+09','+10','+11','+12','+13']
const value      = ['-13   ','-','-','-','-','-','-','-','-','-','-','-','-','   0   ','+','+','+','+','+','+','+','+','+','+','+','+','   13+']
const dayName = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21th', '22th', '23th', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st']
const zerohour   = Date.UTC(2012, 11, 14, 10, 11, 48) //parigee 12 hours after the ecolyps


var diff = Date.now() - zerohour;

var seconds = Math.floor(diff / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365);

seconds %= 60;
minutes %= 60;
hours %= 24;
days %= 30;
months %= 12;

//siderial month	27.321662	with respect to the distant stars (13.36874634 passes per solar orbit)
//Synodic month	29.530589	with respect to the Sun (phases of the Moon, 12.36874634 passes per solar orbit)
//Tropical month	27.321582	with respect to the vernal point (precesses in ~26,000 years)
//Anomalistic month	27.554550	with respect to the perigee (precesses in 3232.6054 days = 8.850578 years)
//Draconic month	27.212221	with respect to the ascending node (precesses in 6793.4765 days = 18.5996 years)

const lunarOrbitalPeriodInDays       = 27.554550    
const msPerDay                       = 86400000
const lunarOrbitalPeriod             = lunarOrbitalPeriodInDays*msPerDay              // lunar orbital period in milli seconds 
const calanderGreatCycle             = lunarOrbitalPeriod*27**2      // 54.5684701361 Earth Years   (Great Cycle)
const calanderCycle                  = lunarOrbitalPeriod*27      // 2.02105444949 Earth Years   (cycle)                                             // 27.321662002315 Earth days  (month)
const calanderDay                    = Math.round(lunarOrbitalPeriod/27)      // 24.2859217798 Earth hours   (Day)
const calanderHour                   = Math.round(lunarOrbitalPeriod/27**2)    // 53.9687150663 Earth Minutes (Hour)
const calenderMinute                 = Math.round(lunarOrbitalPeriod/27**3)   // 1.99884129875 Earth Minutes (Minute)
const calanderMoment                 = Math.round(lunarOrbitalPeriod/27**4) // 4.44186955278 Earth Seconds (Moment)
const calanderBlink                  = Math.round(lunarOrbitalPeriod/27**5) // 0.16451368714 Earth Seconds (Measure)
const calanderMeasure                = Math.round(lunarOrbitalPeriod/27**6) // 0.00609309952 Earth Seconds (submeasure)


function preload() {
  mother = loadImage('images/0.png');
}

function setup() {
  mother.width = windowHeight * .5
  mother.height = mother.width
  createCanvas(mother.width,mother.height*heightMod);
  textFont('courier')
  // fill(0)
}

function draw() {
  clear()
  mother.width = windowHeight * .5
  mother.height = mother.width
  fill(0)
  background(0,50);
  displayCalander()
  translate(0,mother.width*.1)
  image(mother, 0, 0);
  vale()
  oracleRound()

}

function windowResized() {
  mother.width = windowHeight * .5
  mother.height = mother.width
  resizeCanvas(mother.width,mother.height*heightMod);
}

function oracleRound (){
  let r = mother.width * .38
  let theta = 0
  let oracles = ['䷾','䷤','䷕','䷰','䷌','䷝','䷐','䷘','䷔','䷄','䷈','䷙','䷪','䷀','䷍','䷹','䷉','䷥','䷯','䷸','䷑','䷛','䷫','䷱','䷮','䷅','䷿']
  textAlign(CENTER);
  fill(0)
  textSize(mother.width*.1);
  // print(oracles)

  translate(mother.width / 2, mother.height / 2)
  let x = r * cos(theta);
  let y = r * sin(theta);
  
    for (let i = 0; i < oracles.length; i++) {
      rotate(Math.PI / 14);
      push();
      translate(r * sin(theta), r * cos(theta));
      rotate(PI); // rotation for individual letter
      text(oracles[i], 0, 0);
      pop();

  }
}

function vale() {
  rotate(0)
  let s = mother.width * .023
  textSize(s)
  let oracles = ['䷾','䷤','䷕','䷰','䷌','䷝','䷐','䷘','䷔','䷄','䷈','䷙','䷪','䷀','䷍','䷹','䷉','䷥','䷯','䷸','䷑','䷛','䷫','䷱','䷮','䷅','䷿']
  for (let l = 0; l < oracles.length; l++){
    for (let i = 0; i < oracles.length; i++){
    fill(random(255))
    text(oracles[Math.floor(Math.random() * 26)], ((mother.width/2)-(s*(oracles.length)/2))+i*s+(mother.width * .0123), ((mother.height/2)-(s*(oracles.length)/2))+l*s+(mother.width * .0905))
  }
}
}

function randOracle(){
  let oracles = ['䷾','䷤','䷕','䷰','䷌','䷝','䷐','䷘','䷔','䷄','䷈','䷙','䷪','䷀','䷍','䷹','䷉','䷥','䷯','䷸','䷑','䷛','䷫','䷱','䷮','䷅','䷿']
  return oracles[Math.floor(Math.random() * 26)]; 
}

function displayNumeral(x){
  if (x <= 13)
      return Numerals[x+13]
  if (x >= 14)
      return Numerals[x-14]
}

function displayOracle(x){
  if (x <= 13)
      return caloracles[x+13]
  if (x >= 14)
      return caloracles[x-14]
}

function displayCalander() {
  var diff = Date.now() - zerohour;

  var seconds = Math.floor(diff / 1000),
      minutes = Math.floor(seconds / 60),
      hours = Math.floor(minutes / 60),
      days = Math.floor(hours / 24),
      months = Math.floor(days / 30),
      years = Math.floor(days / 365);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30;
  months %= 12;

  var day    = new Date();
  var n    = day.getTime(); // milliseconds since midnight January 1, 1970
  var time = n - zerohour // adjustment for miliseconds since zero hour
  
  var greatcycle    = Math.floor(time/calanderGreatCycle)
  var remainingTime  = time-(greatcycle*calanderGreatCycle)
  var cycle    = Math.floor(time/calanderCycle)
  remainingTime     -= cycle*calanderCycle
  var month  = Math.floor(remainingTime/lunarOrbitalPeriod)
  remainingTime     -= month*lunarOrbitalPeriod
  var day    = Math.floor(remainingTime/calanderDay)
  remainingTime     -= day*calanderDay
  var hour    = Math.floor(remainingTime/calanderHour
  )
  remainingTime     -= hour*calanderHour

  var minute  = Math.floor(remainingTime/calenderMinute)
  remainingTime     -= minute*calenderMinute
  var moment   = Math.floor(remainingTime/calanderMoment)
  remainingTime     -= moment*calanderMoment
  var blink   = Math.floor(remainingTime/calanderBlink)
  remainingTime     -= blink*calanderBlink
  var measure   = Math.floor(remainingTime/calanderMeasure)
  remainingTime     -= measure*calanderMeasure

  // var YMDN = "Great Cycle " + displayNumeral(greatcycle) + " : Cycle " + displayNumeral(cycle) + " : Year " + displayNumeral(month)
//     var HMMN = "Month " + displayNumeral(day) + " : Day " + displayNumeral(hour) + " : Hour " + displayNumeral(minute)            
  // var mesN = "Moment " + displayNumeral(moment) + " : Blink " + displayNumeral(blink) + " : Measure " + displayNumeral(measure)
  
//     var head = cal.join("")
//     var subhead = value.join("")
  // var YMD = displayOracle(greatcycle) + displayOracle(cycle) + displayOracle(month);
  // var HMM = displayOracle(day) + displayOracle(hour) + displayOracle(minute);             
  // var mes = displayOracle(moment) + displayOracle(blink) + displayOracle(measure)// + dis(mms);
  
//     var unitsa = "Great Cycle " + calanderGreatCycle + " : Cycle " + calanderCycle + " : Year " + lunarOrbitalPeriod 
//     var unitsb = "Month " + calanderDay + " : Day " + calanderHour
//  + " : Hour " + calenderMinute 
//     var unitsc = "Moment " + calanderMoment + " : Blink " + calanderBlink + " : Measure " + calanderMeasure    
  
  // document.getElementById("head").innerHTML      = head;
  // document.getElementById("subhead").innerHTML   = subhead;
  // document.getElementById("YMDN").innerHTML      = YMDN;
  // document.getElementById("HMMN").innerHTML      = HMMN;
  // document.getElementById("mesN").innerHTML      = mesN;
  // document.getElementById("YMD").innerHTML       = YMD;
  // document.getElementById("HMM").innerHTML       = HMM;
  // document.getElementById("mes").innerHTML       = mes;
  // document.getElementById("unitsa").innerHTML    = unitsa;
  // document.getElementById("unitsb").innerHTML    = unitsb;
  // document.getElementById("unitsc").innerHTML    = unitsc;
  // document.getElementById('calendarLabel').innerText = "Great-Cycle" + " : " + "Cycle" + " : " + "Month" + " : " + "Day" + " : " + "Hour" + " : " + "Minute" + " : " + "Moment" + " : " + "Blink" + " : " + "Measure"
  textAlign(CENTER)

  textSize(mother.width*.1)
  text(displayOracle(greatcycle) + displayOracle(cycle) + displayOracle(month) + displayOracle(day) + displayOracle(hour) + displayOracle(minute) + displayOracle(moment) + displayOracle(blink),mother.width/2,mother.width*.1) //+ displayOracle(measure)
  
  textSize(mother.width*.023)
  let offSet = 1.136
  let tSpace = mother.width * .13
  text("||TEMPLE CALENDAR||",mother.width/2,mother.width * offSet)
  text("Began 13 NOV 2012CE 22:11:48.2 UTC ",mother.width/2,(mother.width * offSet) +tSpace)
  text("Lunar: "+displayNumeral(greatcycle) + ":" + displayNumeral(cycle) + ":" + displayNumeral(month) + ":" + displayNumeral(day) + ":" + displayNumeral(hour) + ":" + displayNumeral(minute) + ":" + displayNumeral(moment) + ":" + displayNumeral(blink),mother.width/2,(mother.width * offSet) +tSpace*2) //+ " : " + displayNumeral(measure)
  
  // document.getElementById('calendarGreg').innerText = dayName[days + 1] + " day of the " + dayName[months + 1] + " Month of year " + years +"  "+ hours + ":" +  minutes +":"+ seconds
  text("Solar: "+ days + "-" + months + "-000" +years + " " + hours + ":" + minutes + ":" + seconds,mother.width/2,(mother.width * offSet) +tSpace*3)

  // text(tempCal, width, height)
}
