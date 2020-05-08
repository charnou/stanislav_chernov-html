type modelName = string | number;

interface ICar {
    constructor(make: string, model: modelName, color: string): void;
    go(): void;
    stop(): void;
}

const Car: ICar = {
    constructor: function (make: string, model: modelName, color: string): void {
        this.make = make;
        this.model = model;
        this.color = color;
        this.speed = '0km/h';
        return this;
    },

    go: function (): void {
        this.speed = '60km/h';
        console.log('Поехали. Скорость: ' + this.speed);
    },

    stop: function (): void {
        this.speed = '0km/h';
        console.log('Остановились. Скорость: ' + this.speed);
    }
}

interface ICarMake {
    constructor(make: string, model: modelName, color: string): void;
}

const Audi: ICarMake = Object.create(Car);
Audi.constructor = function (make: string, model: modelName, color: string): void {
    Car.constructor.call(this, make, model, color);

    return this;
}

const Bmw: ICarMake = Object.create(Car);
Bmw.constructor = function (make: string, model: modelName, color: string): void {
    Car.constructor.call(this, make, model, color);

    this.isBroken = false;

    this.broke = function (): void {
        this.isBroken = true;
        console.log(`${this.make} как всегда сломалась.`);
    };
    this.fix = function (): void {
        this.isBroken = false;
        console.log(`Вроде починил...`);
    };

    return this;
}

interface ICarInstanse {
    make: string;
    model: modelName;
    color: string;
}

let stas: ICarInstanse = Object.create(Audi).constructor('audi', 'a4', 'red');
let denis: ICarInstanse = Object.create(Bmw).constructor('bmw', 'e39', 'grey');