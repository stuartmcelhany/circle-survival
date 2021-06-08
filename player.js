class Player {
    constructor() {
        this.position = createVector(mouseX, mouseY);
        this.size = 15;
    }

    update() {
        this.position.x = mouseX;
        this.position.y = mouseY;
    }

    show() {
        strokeWeight(1);
        stroke(255);
        fill(255);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
}