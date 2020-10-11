"use strict";

class Point {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    print() {
        console.log(`Point (x: ${this.x}, y: ${this.y})`)
    }
}

class Line {
    constructor(p1, p2) {
        this.set(p1, p2);
    }

    set(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    len() {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    print() {
        console.log(`Line: (`)
        
        process.stdout.write('\t')
        this.p1.print()
        process.stdout.write('\t')
        this.p2.print()

        console.log(')')
    }
}

function main() {
    let p1 = new Point(1, 5)
    p1.print();

    let p2 = new Point(1, 5)

    let s = new Line(p1, p2);
    s.print();
}

main()
