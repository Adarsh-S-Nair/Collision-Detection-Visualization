export default class Rectangle {
    constructor (properties, context) {
        this.id = properties.id;
        this.width = properties.width;
        this.height = properties.height;
        this.color = properties.color;
        this.context = context;
        this.canvas = { width: context.canvas.width, height: context.canvas.height };
        this.velocity = { x: 0, y: 0};
        this.mass = this.width * this.height;

        this.FRICTION_COEFFICIENT = 0.025;
    }

    draw () {
        // Color and draw the rectangle
        this.context.fillStyle = this.color;
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update (mouse, rectangles) {
        let width = this.context.canvas.width;
        let height = this.context.canvas.height;

        if (this.right > width || this.left < 0) this.velocity.x *= -1;
        if (this.bottom > height || this.top < 0) this.velocity.y *= -1;

        // Check if rectangle is being hovered
        if (this.beingHovered(mouse)) mouse.onHover(this.id);
        // Check if rectangle is colliding with another rectangle
        rectangles.forEach(r => {
            // If this rectangle is the current one, go next
            if (this.id == r.id) return;
            // If this rectangle collides with the current one, ...
            if (this.collidesWith(r)) {
                this.resolveCollisionWith(r)
            }
        })

        this.friction();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.updateSides();

        this.draw();
    }

    friction() {
        if (this.velocity.x != 0) 
            this.velocity.x -= this.FRICTION_COEFFICIENT * this.velocity.x
        
        if (this.velocity.y != 0) 
            this.velocity.y -= this.FRICTION_COEFFICIENT * this.velocity.y
    }

    beingHovered (mouse) {
        let x = mouse.position.x;
        let y = mouse.position.y;
        if (x > this.left && x < this.right && 
            y > this.top && y < this.bottom) 
            return true;
        return false;
    }

    drag (mouse, position, lastPosition) {
        this.velocity.x = 0;
        this.velocity.y = 0;
        
        // Get the change in position
        let dx = position.x - lastPosition.x;
        let dy = position.y - lastPosition.y;

        // Update the positions of the rectangle
        this.position.x += dx;
        this.position.y += dy;
        this.updateSides(); 

        // Increase the velocity of the rectangle
        this.velocity.x += 0.5 * dx
        this.velocity.y += 0.5 * dy
    }

    generatePosition (rectangles) {
        // Get the largest X and Y coordinates
        let largestX = (this.canvas.width - this.width);
        let largestY = (this.canvas.height - this.height);

        // Generate random coordinates
        this.generateRandomCoordinates(largestX, largestY);

        // Loop through all other rectangles
        rectangles.forEach(r => {
            // If this rectangle is the same as the current one, go next
            if (this.id == r.id) return;
            // If this rectangle collides with the current one, ...
            while (this.collidesWith(r)) 
                // Generate new coordinates
                this.generateRandomCoordinates(largestX, largestY);
        })
    }

    generateRandomCoordinates (largestX, largestY) {
        // Get a random X and Y coordinate
        let x = Math.floor(Math.random() * largestX);
        let y = Math.floor(Math.random() * largestY);

        // Set the position of this object to these coordinates
        this.position = { x: x, y: y }
        this.updateSides();
    }

    updatePositions (canvas) {
        this.position.x = (this.position.x / this.canvas.width) * canvas.width;
        this.position.y = (this.position.y / this.canvas.height) * canvas.height;
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
    }

    updateSides () {
        this.left = this.position.x;
        this.right = this.position.x + this.width;
        this.top = this.position.y
        this.bottom = this.position.y + this.height;
    }

    collidesWith (other) {
        if (this.right > other.left && this.left < other.right &&
            this.top < other.bottom && this.bottom > other.top)
            return true;
        return false;
    }

    resolveCollisionWith (other) {
        console.log('resolving collision...');
        const xDiff = this.velocity.x - other.velocity.x;
        const yDiff = this.velocity.y - other.velocity.y;


    }
}