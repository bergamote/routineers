// ROUTINEERS script

// Get screen size
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    screenWidth = w.innerWidth || e.clientWidth || g.clientWidth,
    screenHeight = w.innerHeight|| e.clientHeight|| g.clientHeight,

    g = new Object(),
    j = new Object(),
    w = new Object(),
    line = new Object(),
    jeeper = byId('jeeper'),
    goal = byId('goal'),
    wall = byId('wall'),
    triW,
    triH,
    moving = true,
    vision,
    interID,
// ticks, in ms
    speed = 10;



j.s = jeeper.style;
g.s = goal.style;
w.s = wall.style;

j.s.backgroundColor = "#ddd";
g.s.backgroundColor = "#d53";

j.x = rdm(screenWidth -10) ;
j.y = rdm(screenHeight -10);
g.x = rdm(screenWidth -10);
g.y =  rdm(screenHeight -10);

w.s.left = rdm(screenWidth);
w.s.top =  rdm(screenHeight);
w.s.transform = "rotate("+rdm(180)+"deg) translate(0px, -100px)";

j.s.left = j.x;
j.s.top = j.y;
g.s.left = g.x;
g.s.top = g.y;


mesHypo();
timer();
document.addEventListener("click", findClickPos);
