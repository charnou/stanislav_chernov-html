type modelName = string | number;

const Car: any = function (make: string, model: modelName, color: string): void {
    this.make = make;
    this.model = model;
    this.color = color;
    this.speed = '0km/h';

    this.__proto__.go = function () {
        this.speed = '60km/h'
        console.log(this.speed)
    }

    this.__proto__.stop = function () {
        this.speed = '0km/h'
        console.log(this.speed)
    }
}

const Audi: any = function (make: string, model: modelName, color: string): void {
    Car.call(this, make, model, color)
}

const Bmw: any = function (make: string, model: modelName, color: string): void {
    Car.call(this, make, model, color)

    this.isBroken = false;
    this.broke = function () {
        this.isBroken = true;
        console.log(`${this.make} как всегда сломалась.`)
    }
    this.fix = function () {
        this.isBroken = false;
        console.log(`Вроде починил...`)
    }
}

let stas = new Audi('audi', 'a4', 'red');
let denis = new Bmw('bmw', 'e39', 'grey');