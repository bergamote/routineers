// ROUTINEERS functions

// Get a random number
function rdm(fork) {
  return Math.floor(Math.random()*(fork));
}
// Find ckick/touch coordinate
function findClickPos(event) {
  g.x = event.clientX;
  g.y = event.clientY;
  mesHypo();
  g.s.left = g.x;
  g.s.top = g.y;
  clearInterval(interID);
  timer();
}
// Work out distance, angle, gradient and yIntercept
function mesHypo() {
  triW = g.x - j.x;
  triH = g.y - j.y;
  line.gradient = ((g.y - j.y) / (g.x - j.x));
  line.yIntercept = g.y - line.gradient * g.x;
  /*
  if(Math.abs(line.gradient) === Infinity) {
    return 'x = ' + g.x;
  }
  */
  line.dist = Math.floor(Math.sqrt(
    (triW * triW) + (triH * triH)
  ));
  line.angle = Math.atan2(triH, triW) * 180 / Math.PI;
  j.s.transform = "rotate("+(line.angle-45)+"deg)";
  text = "distance: "+line.dist+" angle: "+line.angle;
  text += "<br> grad: "+line.gradient;
  text += "<br> y intercept: "+line.yIntercept;
  d.getElementById("text").innerHTML = text;
}
// Timer for moveIt
function timer() {
  interID = setInterval(moveIt, speed);
}
// Move functions
function moveIt() {
  let next = new Object();
  if (Math.abs(triW) > Math.abs(triH)) {
    if ( j.x < g.x ){
      next.x = j.x+1;
    } else {
      next.x = j.x-1;
    }
    next.y = moveLineX(next.x);
  } else {
    if ( j.y < g.y ){
      next.y = j.y+1;
    } else {
      next.y = j.y-1;
    }
    next.x = moveLineY(next.y);
  }
  // If clear, move
  if (!obsCheck(next.x,next.y)) {
    j.x = next.x;
    j.y = next.y;
    j.s.left = j.x;
    j.s.top = j.y;
    if ( (j.x == g.x) && (j.y == g.y) ) {
       clearInterval(interID);
       d.getElementById("text").innerHTML += '  -  ARRIVED';
    }
  } else {
    clearInterval(interID);
  }
}
// Line equations
function moveLineX(x) {
  return Math.round((line.gradient * x) + line.yIntercept);
}
function moveLineY(y) {
  return Math.round((y - line.yIntercept) / line.gradient);
}
// Check for obstacles
function obsCheck(x,y) {
  vision = d.elementFromPoint(x,y);
  if (vision.id == 'wall') {
    d.getElementById("text").innerHTML += '  -  HIT';
    return true;
  }
  return false;
}
