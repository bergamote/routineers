// ROUTINEERS functions

// Setup generic dot
function setDot(name) {
  var point = rdmScreenPoint(scrn, 24) ;
  name.x = point.x;
  name.y = point.y;
  name.s.left = name.x;
  name.s.top = name.y;
}
// Find ckick/touch coordinate
function findClickPos(event) {
  g.x = event.clientX;
  g.y = event.clientY;
  line = setLine(j,g);
  g.s.left = g.x;
  g.s.top = g.y;
  clearInterval(interID);
  rotateToAngle(j, line);
  timer(j,g,line);
}
function setGoal(id) {
  let goal = {};
  goal.x = byId(id).x;
  goal.y = byId(id).y;
  return goal;
}
// Work out distance, angle, gradient and yIntercept
function setLine( point1, point2 ) {
  let line = makeTriangle(point1,point2);
  line.gradient = findLineGradient( point1, point2 );
  line.yIntercept = findYIntercept( line.gradient, point2);
  line.dist = measureHypot( point1, point2 );
  line.angle = findLineAngle( point1, point2 )

  text = "distance: "+line.dist+" angle: "+line.angle;
  text += "<br> grad: "+line.gradient;
  text += "<br> y intercept: "+line.yIntercept;
  byId("text").innerHTML = text;
  return line;
}
function makeTriangle( point1, point2 ){
  let triangle = {};
  triangle.width = point2.x - point1.x;
  triangle.height = point2.y - point1.y;
  triangle.hypot = Math.round(
    Math.hypot(
      triangle.width, triangle.height
    )
  );
  return triangle;
}
function measureHypot( point1, point2 ) {
  let triangle = makeTriangle(point1,point2);
  triangle.hypot = Math.round(
    Math.hypot(
      triangle.width, triangle.height
    )
  );
  return triangle.hypot;
}
function findLineGradient( point1, point2 ) {
  return (
    (point2.y - point1.y) / (point2.x - point1.x)
    /* // Needs implementing
    if(Math.abs(result) === Infinity) {
      return 'x = ' + b.x;
    }*/
  );
}
function findYIntercept( gradient, point ) {
  return ( point.y - gradient * point.x );
}
function findLineEquation( point1, point2 ) {
  let lineEquation = {};
  lineEquation.gradient =
    (point2.y - point1.y) / (point2.x - point1.x);
  lineEquation.yIntercept =
    ( point.y - lineEquation.gradient * point.x );
  return lineEquation;
}

function findLineAngle(point1, point2){
  let triangle = makeTriangle(point1,point2);
  return ( Math.atan2(
    triangle.height, triangle.width
  ) * 180 / Math.PI );
}
function rotateToAngle(actor, line) {
  actor.s.transform = "rotate("+(line.angle+135)+"deg)";
}
// Timer for moveIt
function timer(actor, goal, line) {
  interID = setInterval(moveIt, speed, actor, goal, line);
}
// Move functions
function moveIt(actor, goal, line) {
  let next = {};
  if (Math.abs(line.width) > Math.abs(line.height)) {
    if ( actor.x < goal.x ){
      next.x = actor.x+1;
    } else {
      next.x = actor.x-1;
    }
    next.y = moveLineX(next.x, line);
  } else {
    if ( actor.y < goal.y ){
      next.y = actor.y+1;
    } else {
      next.y = actor.y-1;
    }
    next.x = moveLineY(next.y, line);
  }
  // If clear, move
  if ( !colisionCheck("eye") ) {
    actor.x = next.x;
    actor.y = next.y;
    actor.s.left = actor.x;
    actor.s.top = actor.y;
    if ( (actor.x == goal.x) && (actor.y == goal.y) ) {
      clearInterval(interID);
      byId("text").innerHTML += '  -  ARRIVED';
    }
  } else {
    clearInterval(interID);
    // avoid obstacle here -> avoidObs()
  }
}
// Line equations
function moveLineX(x,l) {
  return Math.round((l.gradient * x) + l.yIntercept);
}
function moveLineY(y,l) {
  return Math.round((y - l.yIntercept) / l.gradient);
}
// Check for obstacles (from eye id)
function colisionCheck(x) {
  let eyePos = byId(x).getBoundingClientRect();
  let vision = document.elementFromPoint(
    eyePos.left , eyePos.top
  );
  if (vision.id == 'wall') {
    byId("text").innerHTML += '  -  HIT';
    console.log(vision.getBoundingClientRect());
    console.log(eyePos.left+' '+eyePos.top);
    return true;
  } else if (vision.id == 'apple') {
    byId("text").innerHTML += '  -  MUNCH';
    placeAtRandom(scrn, 'apple', 24);
  }
  return false;
}
function avoidObs(deg=1) {
  j.s.transform = "rotate("+(line.angle+135+deg)+"deg)";
  if (colCheck("eye")) {
    avoidObs(deg+1);
  }
}
// Get a random number
function rdm(fork) {
  return Math.floor(Math.random()*(fork));
}
function rdmWithOffset(fork, offset = 0){
  return ( (rdm(fork - offset)) + (offset/2) );
};
// Get a random point on the screen
function rdmScreenPoint(screenSize, offset = 0) {
  let pointCoord = {};
  pointCoord.x = rdmWithOffset(screenSize.x, offset);
  pointCoord.y = rdmWithOffset(screenSize.y, offset);
  return pointCoord;
}
function placeAtRandom(screenSize, id, offset=0){
  point = rdmScreenPoint(screenSize, offset);
  byId(id).s.top = point.y;
  byId(id).s.left = point.x;
}
// getElementById but quicker
function byId(elem){
  x = document.getElementById(elem);
  x.s = x.style;
  return x;
}
// Get screen size
function getScreenSize(){
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    ourScreen = {};
  ourScreen.x = w.innerWidth || e.clientWidth || g.clientWidth,
  ourScreen.y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  return ourScreen;
}
