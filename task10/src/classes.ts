abstract class Animal {

    constructor(
        protected readonly name: string,
        protected readonly color: string,
        protected readonly sound: string,
        protected isRunning: boolean = false) {
    }

    public run(): void {
        this.isRunning = true;
        console.log(`${this.name} побежал!`);
    }

    public stopRun(): void {
        this.isRunning = false;
        console.log(`${this.name} остановился!`);
    }

    public whatColor(): void {
        console.log(`У зверька "${this.name}" цвет меха - ${this.color}`);
    }

    @logMethod
    public isRun(): void {
        if (this.isRunning) {
            console.log(`${this.name} бежит, и его ${this.color} мех развевается!`);
        } else {
            console.log(`${this.name} стоит.`);
        }
    }

    public voice(): void {
        console.log(`${this.name} сказал ${this.sound}`);
    }
}

interface IRacoon {
    goWash: () => void,
    stopWash: () => void,
    isWash: () => void
}

class Racoon extends Animal implements IRacoon {

    constructor(
        protected readonly name: string,
        protected readonly color: string,
        protected readonly sound: string,
        protected isWashing: boolean = false) {
        super(name, color, sound);
    }

    public goWash(): void {
        this.isWashing = true;
        console.log(`${this.name} начал мыть всё что ему попадёться!!!`);
    }

    public stopWash(): void {
        this.isWashing = false;
        console.log(`${this.name} вроде успокоился...`);
    }

    public isWash(): void {
        if (this.isWashing) {
            console.log(`${this.name} моет что-то, и его ${this.color} мех очень мокрый!`);
        } else {
            console.log(`${this.name} ничего, к счастью, не моет...`);
        }
    }
}

interface IBeaver {
    goBuild: () => void,
    stopBuild: () => void,
    isBuild: () => void,
}

class Beaver extends Animal implements IBeaver {

    constructor(
        protected readonly name: string,
        protected readonly color: string,
        protected readonly sound: string,
        protected isBuilding: boolean = false) {
        super(name, color, sound);
    }

    public goBuild(): void {
        this.isBuilding = true;
        console.log(`Трудолюбивый ${this.name} начал строить плотину!`);
    }

    public stopBuild(): void {
        this.isBuilding = false;
        console.log(`${this.name} пошёл отдыхать.`);
    }

    @logMethod
    public isBuild(): void {
        if (this.isBuilding) {
            console.log(`${this.name} сооружает плотину, и его ${this.color} мех тут совершенно не причём!`);
        } else {
            console.log(`${this.name} сейчас отдыхает.`);
        }
    }
}

const bob: Racoon = new Racoon('Боб', 'серый', '"фррр"');
const tod: Beaver = new Beaver('Тод', 'коричневый', '"тррр"');