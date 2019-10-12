// ROUTINEERS script

// Get screen size
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    screenWidth = w.innerWidth || e.clientWidth || g.clientWidth,
    screenHeight = w.innerHeight|| e.clientHeight|| g.clientHeight,
// Setup too many global variables
    g = {},
    j = {},
    w = {},
    line = {},
    jeeper = byId('jeeper'),
    goal = byId('goal'),
    wall = byId('wall'),
    triW = 0,
    triH = 0,
    interID,
// ticks, in ms
    speed = 10;
// Shortcuts
j.s = jeeper.style;
g.s = goal.style;
w.s = wall.style;
// Random locations
j.x = rdm(screenWidth -12)+6 ;
j.y = rdm(screenHeight -12)+6;
g.x = rdm(screenWidth -12)+6;
g.y =  rdm(screenHeight -12)+6;
j.s.left = j.x;
j.s.top = j.y;
g.s.left = g.x;
g.s.top = g.y;
w.s.left = (rdm(screenWidth)/3)*2;
w.s.top =  (rdm(screenHeight)/3)*2;
w.s.transform = "rotate("+rdm(180)+"deg) translate(0px, -100px)";

mesHypo();
timer();
document.addEventListener("click", findClickPos);
