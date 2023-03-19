import Rectangle    from './Rectangle.js'
import Mouse        from './Mouse.js';

let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#282a36";
let context = canvas.getContext('2d');

let rectangles;
let mouse;

let colors = [
    '#51BBFE',
    '#E64452'
]

window.onresize = () => {
    // Update the canvas width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Call the main function
    main();
}

window.addEventListener('mousemove', (e) => {mouse.onMove(e)});
window.addEventListener('mousedown', (e) => {mouse.onDown(e)});
window.addEventListener('mouseup', (e) => {mouse.onUp(e)});

let animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    rectangles.forEach(r => { r.update(mouse, rectangles) })
}

let main = () => {
    rectangles = []

    // Generate all rectangles
    for (let i = 0; i < 2; i++) {
        let r = new Rectangle({id: i, width: 150, height: 150, color: colors[i]}, context)
        r.generatePosition(rectangles);
        rectangles.push(r)
    }
    // Create the mouse object
    mouse = new Mouse(canvas, rectangles);
}

main();
animate();