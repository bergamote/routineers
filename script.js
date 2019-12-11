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
setDot(j);
setDot(g);


w.s.left = (rdm(scrn.x)/3)*2;
w.s.top =  (rdm(scrn.y)/3)*2;
w.s.transform = "translate(0px, -100px)";

placeAtRandom(scrn, 'apple', 24);

line = setLine(j,g);
rotateToAngle(j,line);
timer(j,g,line);
document.addEventListener("click", findClickPos);

var test = {};
test.hello = "world";
test.goal = setGoal('goal');
test.line = findLineEquation( j, test.goal );
test.tri = makeTriangle( j, test.goal );
console.log(test);
