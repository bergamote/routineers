// JEEPER functions

// Get a random number
function rdm(fork) {
  return Math.floor(Math.random()*(fork));
}
// Timer for moveIt
function timer() {
  setTimeout(moveIt, 10);
}
// Find ckick/touch coordinate
function findClickPos(event) {
  g.x = event.clientX;
  g.y = event.clientY;
  mesHypo();
  g.s.left = g.x;
  g.s.top = g.y;
  if (moving == false) {
    timer();
  }
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
// Move functions
function moveIt() {
  moving = true;
if (Math.abs(triW) > Math.abs(triH)) {
  if ( j.x < g.x ){
    j.x++;
  } else if ( j.x > g.x ) {
    j.x--;
  }
  j.y = moveLineX();
} else {
  if ( j.y < g.y ){
    j.y++;
  } else if ( j.y > g.y ) {
    j.y--;
  }
  j.x = moveLineY();
}
  j.s.left = j.x;
  j.s.top = j.y;
  // keep moving unless goal or wall reached
  if (obsCheck()) {
    if ( (j.x != g.x) || (j.y != g.y) ) {
      timer();
    } else {
      moving = false;
    }
  } else {
    moving = false;
  }
}
function moveLineX() {
  return Math.round((line.gradient * j.x) + line.yIntercept);
}
function moveLineY() {
  return Math.round((j.y - line.yIntercept) / line.gradient);
}
// Check for obstacles
function obsCheck() {
  vision = d.elementFromPoint(j.x,j.y);
//  let backCol = window.getComputedStyle(vision).getPropertyValue('background-color');

  if (vision.id == 'wall') {
    d.getElementById("text").innerHTML += '  -  HIT';
    return false;
  }
  return true;

}
