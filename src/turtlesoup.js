"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawSquare = drawSquare;
exports.chordLength = chordLength;
exports.drawApproximateCircle = drawApproximateCircle;
exports.distance = distance;
exports.findPath = findPath;
exports.drawPersonalArt = drawPersonalArt;
exports.main = main;
var turtle_1 = require("./turtle");
var fs = require("fs");
var child_process_1 = require("child_process");
/**
 * Draws a square of the given side length using the turtle.
 * @param turtle The turtle to use for drawing.
 * @param sideLength The length of each side of the square in pixels.
 */
function drawSquare(turtle, sideLength) {
    // TODO: Implement drawSquare
    // Example (incorrect square, just to show usage):
    turtle.forward(sideLength);
    turtle.turn(90);
    turtle.forward(sideLength);
    turtle.turn(90);
    turtle.forward(sideLength);
    turtle.turn(90);
    turtle.forward(sideLength);
    turtle.turn(90);
}
/**
 * Calculates the length of a chord of a circle.
 * Read the specification comment above it carefully in the problem set description.
 * @param radius Radius of the circle.
 * @param angleInDegrees Angle subtended by the chord at the center of the circle (in degrees).
 * @returns The length of the chord.
 */
function chordLength(radius, angleInDegrees) {
    // TODO: Implement chordLength
    var sameAngleInRdians = (angleInDegrees * Math.PI) / 180;
    return 2 * radius * Math.sin(sameAngleInRdians / 2); // Placeholder - replace with your implementation
}
/**
 * Draws an approximate circle using the turtle.
 * Use your implementation of chordLength.
 * @param turtle The turtle to use.
 * @param radius The radius of the circle.
 * @param numSides The number of sides to approximate the circle with (e.g., 360 for a close approximation).
 */
function drawApproximateCircle(turtle, radius, numSides) {
    var angle = 360 / numSides;
    for (var i = 0; i < numSides; i++) {
        var chord = chordLength(radius, angle);
        turtle.forward(chord);
        turtle.turn(angle);
    }
}
/**
 * Calculates the distance between two points.
 * @param p1 The first point.
 * @param p2 The second point.
 * @returns The distance between p1 and p2.
 */
function distance(p1, p2) {
    // TODO: Implement distance
    var dst = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    return dst; // Placeholder
}
/**
 * Finds a path (sequence of turns and moves) for the turtle to visit a list of points in order.
 * You should use your distance method as appropriate.
 * @param turtle The turtle to move.
 * @param points An array of points to visit in order.
 * @returns An array of instructions (e.g., strings like "forward 10", "turn 90") representing the path.
 *          This is simplified for Problem Set 0 and we won't actually use these instructions to drive the turtle directly in this starter code.
 *          The function primarily needs to *calculate* the path conceptually.
 */
function findPath(turtle, points) {
    // TODO: Implement findPath (conceptually, you don't need to *execute* the path here)
    if (points.length < 2)
        return [];
    var pathGuide = [];
    var curDirection = 0;
    for (var i = 1; i < points.length; i++) {
        var p1 = points[i - 1];
        var p2 = points[i];
        var dist = distance(p1, p2);
        var newDirection = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
        var turnAngle = newDirection - curDirection;
        if (turnAngle > 180) {
            turnAngle -= 360;
        }
        else if (turnAngle < -180) {
            turnAngle += 360;
        }
        if (turnAngle !== 0) {
            pathGuide.push("turn ".concat(turnAngle.toFixed(2)));
        }
        pathGuide.push("forward ".concat(dist.toFixed(2)));
        curDirection = newDirection;
    }
    return pathGuide;
}
/**
 * Draws your personal art using the turtle.
 * Be creative and implement something interesting!
 * Use at least 20 lines of non-repetitive code.
 * You may use helper methods, loops, etc., and the `color` method of the Turtle.
 * @param turtle The turtle to use.
 */
function drawPersonalArt(turtle) {
    var centerLoops = 4;
    var petalCount = 10;
    var baseRadius = 50;
    var colorVariations = [
        'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'green'
    ];
    for (var loop = 1; loop <= centerLoops; loop++) {
        turtle.color(colorVariations[loop % colorVariations.length]);
        var currentRadius = baseRadius * (1 - loop * 0.2);
        for (var i = 0; i < petalCount; i++) {
            turtle.forward(currentRadius);
            turtle.turn(360 / petalCount);
            turtle.forward(currentRadius * 0.6);
            turtle.turn(180);
            turtle.forward(currentRadius * 0.6);
            turtle.turn(360 / petalCount);
            turtle.forward(currentRadius);
            turtle.turn(360 / petalCount + 10);
        }
    }
    turtle.color('purple');
    var outerPetalCount = 8;
    var outerRadius = baseRadius * 1.5;
    for (var i = 0; i < outerPetalCount; i++) {
        turtle.forward(outerRadius);
        turtle.turn(45);
        turtle.forward(outerRadius * 0.3);
        turtle.turn(135);
        turtle.forward(outerRadius * 0.3);
        turtle.turn(45);
        turtle.forward(outerRadius);
        turtle.turn(360 / outerPetalCount);
    }
}
function generateHTML(pathData) {
    var canvasWidth = 500;
    var canvasHeight = 500;
    var scale = 1; // Adjust scale as needed
    var offsetX = canvasWidth / 2; // Center the origin
    var offsetY = canvasHeight / 2; // Center the origin
    var pathStrings = "";
    for (var _i = 0, pathData_1 = pathData; _i < pathData_1.length; _i++) {
        var segment = pathData_1[_i];
        var x1 = segment.start.x * scale + offsetX;
        var y1 = segment.start.y * scale + offsetY;
        var x2 = segment.end.x * scale + offsetX;
        var y2 = segment.end.y * scale + offsetY;
        pathStrings += "<line x1=\"".concat(x1, "\" y1=\"").concat(y1, "\" x2=\"").concat(x2, "\" y2=\"").concat(y2, "\" stroke=\"").concat(segment.color, "\" stroke-width=\"2\"/>");
    }
    return "<!DOCTYPE html>\n<html>\n<head>\n    <title>Turtle Graphics Output</title>\n    <style>\n        body { margin: 0; }\n        canvas { display: block; }\n    </style>\n</head>\n<body>\n    <svg width=\"".concat(canvasWidth, "\" height=\"").concat(canvasHeight, "\" style=\"background-color:#f0f0f0;\">\n        ").concat(pathStrings, "\n    </svg>\n</body>\n</html>");
}
function saveHTMLToFile(htmlContent, filename) {
    if (filename === void 0) { filename = "output.html"; }
    fs.writeFileSync(filename, htmlContent);
    console.log("Drawing saved to ".concat(filename));
}
function openHTML(filename) {
    if (filename === void 0) { filename = "output.html"; }
    try {
        // For macOS
        (0, child_process_1.execSync)("open ".concat(filename));
    }
    catch (_a) {
        try {
            // For Windows
            (0, child_process_1.execSync)("start ".concat(filename));
        }
        catch (_b) {
            try {
                // For Linux
                (0, child_process_1.execSync)("xdg-open ".concat(filename));
            }
            catch (_c) {
                console.log("Could not open the file automatically");
            }
        }
    }
}
function main() {
    var turtle = new turtle_1.SimpleTurtle();
    // Example Usage - Uncomment functions as you implement them
    // Draw a square
    // drawSquare(turtle, 100);
    // Example chordLength calculation (for testing in console)
    // console.log("Chord length for radius 5, angle 60 degrees:", chordLength(5, 60));
    // Draw an approximate circle
    // drawApproximateCircle(turtle, 50, 360);
    // Example distance calculation (for testing in console)
    // const p1: Point = {x: 1, y: 2};
    // const p2: Point = {x: 4, y: 6};
    // console.log("Distance between p1 and p2:", distance(p1, p2));
    // Example findPath (conceptual - prints path to console)
    // const pointsToVisit: Point[] = [{x: 20, y: 20}, {x: 80, y: 20}, {x: 80, y: 80}];
    // const pathInstructions = findPath(turtle, pointsToVisit);
    // console.log("Path instructions:", pathInstructions);
    // Draw personal art
    drawPersonalArt(turtle);
    var htmlContent = generateHTML(turtle.getPath()); // Cast to access getPath
    saveHTMLToFile(htmlContent);
    openHTML();
}
// Run main function if this file is executed directly
if (require.main === module) {
    main();
}
