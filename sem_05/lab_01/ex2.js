"use strict";

class Student {
    constructor(id, group, rating_list) {
        this.id = id;
        this.group = group;
        this.rating_list = rating_list;
    }
}

class studentsStorage {
    constructor() {
        this.storage = [];
    }

    read(id) {
        return this.storage.find(student => student.id === id);
    }

    create(id, group, rating_list) {
        if (this.read(id)) {
            throw "Student exists."
        }

        this.storage.push(new Student(id, group, rating_list));
    }

    update(id, new_id, new_group, new_rating_list) {
        let student = this.read(id);
        if (!student) {
            throw "Student doesn't exists."
        }

        if (this.read(new_id)) {
            return false;
        }

        student.id = new_id;
        student.group = new_group;
        student.rating_list = new_rating_list;
    }

    delete(id) {
        if (!this.read(id)) {
            throw "Student doesn't exists."
        }

        this.storage = this.storage.filter(student => student.id != id);
    }

    avg_rating(id) {
        const student = this.storage.find(student => student.id === id);
        if (!student) {
            throw "This student doesn't exists."
        }

        if (!student.rating_list.length) {
            throw "This student has no rating."
        }

        return student.rating_list.reduce((acc, mark) => acc + mark, 0) / student.rating_list.length;
    }

    group_info(group) {
        return this.storage.filter(student => student.group === group);
    }

    max_marks() {
        if (!this.storage.length) {
            throw "Storage is empty."
        }

        return this.storage.reduce((acc, student) => student.rating_list.length >
            acc.rating_list.length ? student : acc, this.storage[0])
    }

    no_rating() {
        return this.storage.filter(student => !student.rating_list.length);
    }
}

function main() {
    let p = new Student(1, "IU7-33B", [1, 3, 3, 7]);
    let storage = new studentsStorage();

    storage.create(1, "IU7-33B", [1, 4, 8, 8]);
    storage.update(1, 1, "IU7-33B", [2, 3, 4]);
    storage.create(2, "IU7-33B", [2, 2, 8]);
    storage.create(5, "IU7-53B", [2, 2, 8]);
    storage.create(9, "IU7-53B", [6, 6, 6, 6]);
    storage.create(17, "IU7-53B", []);

    console.log(storage);
    console.log(storage.read(1));
    console.log(storage.avg_rating(1));
    console.log(storage.group_info("IU7-33B"));
    console.log(storage.max_marks());
    console.log(storage.no_rating());
}

main();
