"use strict";

class Child {
    constructor(surname, age) {
        this.surname = surname;
        this.age = age;
    }
}

class Storage {
    constructor() {
        this.storage = [];
    }

    is_exists(surname) {
        return this.storage.reduce((acc, child) =>
            acc + (child.surname == surname), 0)
    }

    create(surname, age) {
        if (this.is_exists(surname)) {
            throw "Child already exists."
        }

        let temp = new Child(surname, age);
        this.storage.push(temp);
    }

    read(surname) {
        return this.storage;
    }

    update(surname, new_surname, new_age) {
        if (!this.is_exists(surname)) {
            throw "Child doesn't exists."
        }


        console.log(123);
        //this.storage.forEach(child => { if child.surname == surname { child.surname = new_surname, child.age = new_age } } );
        this.storage.forEach((child) => {
            if (child.surname == surname) {
                child.surname = new_surname;
                child.age = new_age;
            }
        });
    }

    delete(surname) {
        this.storage = this.storage.filter(child => { child.surname != surname });

    }

    avg_age() {

    }

    oldest() {

    }

    at_interval(left, right) {

    }

    fst_symbol(symbol) {

    }

    longer_than(age) {

    }

    vowel_fst() {

    }

}

function main() {
    let p = new Child("Perestoronin", 20);
    let storage = new Storage();
    storage.create("Perestoronin", 20);
    storage.create("Perestoronin", 20);
    storage.create("Perestoronin", 20);
    storage.update("Perestoronin", "Peperonin", 20)
    //storage.update("Peper", "sdasd", 23)
    console.log(storage);
}

main()
