class Obstacle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = random(25, 100);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    show() {
        strokeWeight(1);
        stroke(0);
        noFill();
        ellipse(this.x, this.y, this.size, this.size);
    }
}