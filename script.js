// ROUTINEERS script

var scrn = getScreenSize();

// Setup too many global variables
var line = {},
    j = byId('jeeper'),
    g = byId('goal'),
    w = byId('wall'),
    interID,
// ticks, in ms
    speed = 10;

// Random locations
var point = rdmScreenPoint(scrn, 24) ;
j.x = point.x;
j.y = point.y;
point = rdmScreenPoint(scrn, 24) ;
g.x = point.x;
g.y =  point.y;

j.s.left = j.x;
j.s.top = j.y;
g.s.left = g.x;
g.s.top = g.y;

w.s.left = (rdm(scrn.x)/3)*2;
w.s.top =  (rdm(scrn.y)/3)*2;
w.s.transform = "rotate("+rdm(180)+"deg) translate(0px, -100px)";

placeAtRandom(scrn, 'apple', 24);
line = setLine(j,g);
timer();
document.addEventListener("click", findClickPos);
