class Animal {
    constructor(name, color, sound) {
        this.name = name;
        this.color = color;
        this.sound = sound;
        this.isRunning = false;
    }
    run() {
        this.isRunning = true;
        console.log(`${this.name} побежал!`)
    }
    stopRun() {
        this.isRunning = false;
        console.log(`${this.name} остановился!`)
    }
    whatColor() {
        console.log(`У зверька "${this.name}" цвет меха - ${this.color}`)
    }
    isRun() {
        if (this.isRunning) {
            console.log(`${this.name} бежит, и его ${this.color} мех развевается!`)
        } else {
            console.log(`${this.name} стоит.`)
        }
    }
    voice() {
        console.log(`${this.name} сказал ${this.sound}`)
    }
}

class Racoon extends Animal {
    constructor(name, color, sound) {
        super(name, color, sound)
        this.isWashing = false;
    }
    goWash() {
        this.isWashing = true;
        console.log(`${this.name} начал мыть всё что ему попадёться!!!`)
    }

    stopWash() {
        this.isWashing = false;
        console.log(`${this.name} вроде успокоился...`)
    }
    isWash() {
        if (this.isWashing) {
            console.log(`${this.name} моет что-то, и его ${this.color} мех очень мокрый!`)
        } else {
            console.log(`${this.name} ничего, к счастью, не моет...`)
        }
    }
}

class Beaver extends Animal {
    constructor(name, color, sound) {
        super(name, color, sound)
        this.isBuilding = false;
    }
    goBuild() {
        this.isBuilding = true;
        console.log(`Трудолюбивый ${this.name} начал строить плотину!`)
    }
    stopBuild() {
        this.isBuilding = false;
        console.log(`${this.name} пошёл отдыхать.`)
    }
    isBuild() {
        if (this.isBuilding) {
            console.log(`${this.name} сооружает плотину, и его ${this.color} мех тут совершенно не причём!`)
        } else {
            console.log(`${this.name} сейчас отдыхает.`)
        }
    }
}

let bob = new Racoon('Боб', 'серый', '"фррр"');
let tod = new Beaver('Тод', 'коричневый', '"тррр"');