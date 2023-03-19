export default class Mouse {
    constructor (canvas, rectangles) {
        this.canvas = canvas;
        this.rectangles = rectangles;
        this.position = { x: null, y: null };
        this.lastPosition = { x: null, y: null };
        
        this.isHovering = false;
        this.hoveringIndex = null;
        
        this.isDragging = false;
        this.draggingIndex =  null;
    }

    onMove (event) {
        this.position.x = event.clientX;
        this.position.y = event.clientY;

        // If the mouse is hovering but the hovered rectangle is not being hovered
        if (this.isHovering && !this.isDragging &&
            !this.rectangles[this.hoveringIndex].beingHovered(this)) {
                this.changeCursorTo('auto');
                this.hoveringIndex = null;
                this.isHovering = false;
        }

        if (this.isDragging) {
            let rectangle = this.getDraggingRectangle();
            rectangle.drag(this, this.position, this.lastPosition);
            this.updateLastPosition();
        }
    }

    onDown (event) {
        if (!this.isHovering) return;

        this.updateLastPosition();

        this.draggingIndex = this.hoveringIndex;
        this.isDragging = true;
    }

    onUp (event) {
        this.isDragging = false;
    }

    onHover (id) {
        this.changeCursorTo('pointer');
        this.hoveringIndex = id;
        this.isHovering = true;
    }

    getDraggingRectangle () {
        return this.rectangles[this.draggingIndex];
    }

    changeCursorTo (cursor) {
        this.canvas.style.cursor = cursor;
    }

    updateLastPosition () {
        this.lastPosition.x = this.position.x;
        this.lastPosition.y = this.position.y;
    }
}