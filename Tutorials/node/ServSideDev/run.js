var rect = require("./rectangule");

function solveRect(l,b) {
    rect(l,b,(err, rectangle) => {
        console.log("Solving for rectangle with l = "+l+" and b = "+b);
        if (err) {
            console.log("Error: " + err.message);
        } else {
            console.log("Results: Area=" + rectangle.area() + " Perimeter=" + rectangle.perimeter());
        }
    });
    console.log("This statement if after calling rect(...)");
}

solveRect(2,4);
solveRect(3,5);
solveRect(1,0);
solveRect(-3,2);
solveRect(2,-3);