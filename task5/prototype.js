const Car = function (make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
    this.speed = '0km/h';
}

Car.prototype.go = function () {
    this.speed = '60km/h'
    console.log(this.speed)
}
Car.prototype.stop = function () {
    this.speed = '0km/h'
    console.log(this.speed)
}

const Audi = function(make, model, color) {
    Car.call(this, make, model, color)
}

const Bmw = function(make, model, color) {
    Car.call(this, make, model, color)

    this.isBroken = false;
    this.broke = function() {
        this.isBroken = true;
        console.log(`${this.make} как всегда сломалась.`)
    }
    this.fix = function() {
        this.isBroken = false;
        console.log(`Вроде починил...`)
    }
}

let stas = new Audi('audi', 'a4', 'red');
let denis = new Bmw('bmw', 'e39', 'grey');