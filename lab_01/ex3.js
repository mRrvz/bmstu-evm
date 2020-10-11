"use strict";

class Point {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
}

class pointStorage {
    constructor() {
        this.storage = [];
    }

    read(name) {
        return this.storage.find(point => point.name === name);
    }

    create(name, x, y) {
        if (this.read(name)) {
            throw "Point exists."
        }

        this.storage.push(new Point(name, x, y));
    }

    update(name, new_name, x, y) {
        let point = this.read(name);
        if (!point) {
            throw "Point doesn't exists."
        }

        point.name = name;
        point.x = x;
        point.y = y;
    }

    delete(name) {
        if (!this.read(name)) {
            throw "Point doesn't exists."
        }

        this.storage = this.storage.filter(point => point.surname != name);
    }

    get_dist(p1, p2) {
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    max_distance() {
        return this.storage.reduce((acc1, p1, i) => this.storage.slice(i + 1).reduce((acc2, p2) =>
            this.get_dist(p1, p2) > acc2.dist ?
                { points: { p1, p2 }, dist: this.get_dist(p1, p2) } : acc2, acc1), {
            points: { p1: this.storage[0], p2: this.storage[1] }, dist: this.get_dist(this.storage[0], this.storage[1])
        })
    }

    at_interval(point, len) {
        return this.storage.filter(pt => this.get_dist(point, pt) <= len);
    }

    in_zone(is_x, is_more) {
        return this.storage.filter(is_x ? pt => pt.x >= 0 !== is_more : pt => pt.y >= 0 !== is_more);
    }

    in_rectangle(x_min, y_min, x_max, y_max) {
        return this.storage.filter(pt => pt.x >= x_min && pt.x <= x_max && pt.y >= y_min && pt.y <= y_max);
    }
}

function main() {
    let p = new Point("fl", 5, 10);
    let storage = new pointStorage();

    storage.create("center", 0, 0);
    storage.create("p1", 10, 10);
    storage.create("p2", -10, 10);
    storage.create("p3", 10, -10);
    storage.create("p4", -10, -10);
    storage.create("p5", 5, 5);
    storage.create("p6", 7, 5);
    storage.create("p8", 2, 3);
    storage.create("p9", 1000, 3);

    console.log(storage);
    console.log(storage.max_distance());
    console.log(storage.at_interval(p, 23));
    console.log(storage);
    console.log(storage.in_zone(true, true))
    console.log(storage.in_rectangle(-5, -5, 10, 10));
}

main();
