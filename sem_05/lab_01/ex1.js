"use strict";

const VOWELS = [ 'A', 'E', 'I', 'O', 'U', 'Y' ];

class Child {
    constructor(surname, age) {
        this.surname = surname;
        this.age = age;
    }
}

class childrenStorage {
    constructor() {
        this.storage = [];
    }

    read(surname) {
        return this.storage.find(child => child.surname === surname);
    }

    create(surname, age) {
        if (this.read(surname)) {
            throw "Child exists."
        }

        this.storage.push(new Child(surname, age));
    }

    update(surname, new_surname, new_age) {
        let child = this.read(surname);
        if (!child) {
            throw "Child doesn't exists."
        }

        if (this.read(new_surname)) {
            throw "Child with this surname exists."
        }

        child.surname = new_surname;
        child.age = new_age;
    }

    delete(surname) {
        if (!this.read(surname)) {
            throw "Child doesn't exists."
        }

        this.storage = this.storage.filter(child => child.surname != surname);
    }

    avg_age() {
        if (!this.storage.length) {
            throw "Storage is empty."
        }

        return this.storage.reduce((acc, child) => child.age + acc, 0) / this.storage.length;
    }

    oldest() {
        return this.storage.reduce((acc, child) => child.age > acc.age ? child : acc, this.storage[0])
    }

    at_interval(left, right) {
        return this.storage.filter(child => child.age >= left && child.age <= right);
    }

    fst_symbol(symbol) {
        return this.storage.filter(child => child.surname[0] === symbol);
    }

    surname_longer_than(size) {
        return this.storage.filter(child => child.surname.length > size)
    }

    vowel_fst() {
        return this.storage.filter(child => VOWELS.find(symb => symb === child.surname[0]))
    }
}

function main() {
    let p = new Child("Perestoronin", 20);
    let storage = new childrenStorage();

    storage.create("Perestoronin", 20);
    storage.update("Perestoronin", "Peperonin", 20)
    storage.create("Perestoronin", 15);
    storage.create("Perestoronin111", 25);
    storage.create("XPerestoronin111", 25);

    console.log(storage.avg_age());
    console.log(storage.oldest());
    console.log(storage.at_interval(15, 23));
    console.log(storage.fst_symbol("P"));
    console.log(storage.surname_longer_than(11));
    console.log(storage.vowel_fst());
}

main()
