"use strict";

class Triangle {
    constructor(a, b, c) {
        this.set(a, b, c);
    }

    set(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    is_exists() {
        return this.a < this.b + this.c && this.b < this.a + this.c && this.c < this.b + this.a;
    }

    perimiter() {
        if (!this.is_exists()) {
            throw "Triangle doesn't exists."
        }

        return this.a + this.b + this.c;
    }

    area() {
        if (!this.is_exists()) {
            throw "Triangle doesn't exists."
        }

        const p = this.perimiter() / 2;
        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }

    is_rectangular() {
        if (!this.is_exists()) {
            throw "Triangle doesn't exists."
        }

        const sides = [this.a, this.b, this.c].sort();
        return Math.abs(sides[2] * sides[2] - (sides[1] * sides[1] + sides[0] * sides[0])) < 1e-5;
    }
}

function main()
{
    let t = new Triangle(3, 4, 5);
    console.log(t.perimiter());
    console.log(t.is_exists());
    console.log(t.area());
    console.log(t.is_rectangular());
}

main();
