// ROUTINEERS functions

// Find ckick/touch coordinate
function findClickPos(event) {
  g.x = event.clientX;
  g.y = event.clientY;
  line = mesHypo(j,g);
  g.s.left = g.x;
  g.s.top = g.y;
  clearInterval(interID);
  timer();
}
// Work out distance, angle, gradient and yIntercept
function mesHypo(a,b) {
  let l = {};
  l.triW = b.x - a.x;
  l.triH = b.y - a.y;
  l.gradient = ((b.y - a.y) / (b.x - a.x));
  l.yIntercept = b.y - l.gradient * b.x;
  /* // Needs implementing
  if(Math.abs(l.gradient) === Infinity) {
    return 'x = ' + b.x;
  }*/
  l.dist = Math.round(Math.hypot(l.triW, l.triH));
  l.angle = Math.atan2(l.triH, l.triW) * 180 / Math.PI;
  text = "distance: "+l.dist+" angle: "+l.angle;
  text += "<br> grad: "+l.gradient;
  text += "<br> y intercept: "+l.yIntercept;
  byId("text").innerHTML = text;
  return l;
}
// Timer for moveIt
function timer() {
  interID = setInterval(moveIt, speed);
}
// Move functions
function moveIt() {
  j.s.transform = "rotate("+(line.angle+135)+"deg)";
  let next = {};
  if (Math.abs(line.triW) > Math.abs(line.triH)) {
    if ( j.x < g.x ){
      next.x = j.x+1;
    } else {
      next.x = j.x-1;
    }
    next.y = moveLineX(next.x, line);
  } else {
    if ( j.y < g.y ){
      next.y = j.y+1;
    } else {
      next.y = j.y-1;
    }
    next.x = moveLineY(next.y, line);
  }
  // If clear, move
  if ( !colCheck("eye") ) {
    j.x = next.x;
    j.y = next.y;
    j.s.left = j.x;
    j.s.top = j.y;
    if ( (j.x == g.x) && (j.y == g.y) ) {
       clearInterval(interID);
       byId("text").innerHTML += '  -  ARRIVED';
    }
  } else {
    clearInterval(interID);
    avoidObs();
  }
}
// Line equations
function moveLineX(x,l) {
  return Math.round((l.gradient * x) + l.yIntercept);
}
function moveLineY(y,l) {
  return Math.round((y - l.yIntercept) / l.gradient);
}
// Check for obstacles
function colCheck(x) {
  let eyePos = byId(x).getBoundingClientRect();
  let vision = d.elementFromPoint(eyePos.left , eyePos.top);
  if (vision.id == 'wall') {
    byId("text").innerHTML += '  -  HIT';
    return true;
  } else if (vision.id == 'apple') {
    byId('apple').s.top = rdm(screenHeight -12)+6 ;
    byId('apple').s.left = rdm(screenWidth -12)+6 ;
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
// Get element by ID but quicker
function byId(elem){
  x = document.getElementById(elem);
  x.s = x.style;
  return x;
}
