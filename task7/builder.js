console.log(`%cHouseBuilder:
setHeight(num) - set height of the building;
setWidth(num) - set width of the building;
addRoof('Wood', 'Metal' and 'Asphalt') - choose a type of the roof;
addWindows(num) - add a certain amount of windows into the building;
addDoors(num) - add a certain amount of doors into the building (will only builded on the first floor);
build() - build the house. Final step.

Director:
drawHouse(Object) - creating a blue print from an object made by 'HouseBuilder'.

Examples:
`, 'background: #04001f; color: #e8c720 ; font-size: 16px;')

class HouseBuilder {
    constructor() {
        this.height = 1;
        this.width = 2;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    setWidth(width) {
        this.width = width;
        return this;
    }

    addRoof(type) {
        const roofTypes = {
            WOOD: '░',
            METAL: '▒',
            ASPHALT: '▓',
        }
        Object.freeze(roofTypes);

        type = type.toUpperCase()
        this.roofType = roofTypes[type];
        if (this.roofType === undefined) {
            console.error(`Invalid '${type}' ROOF TYPE. Will be changed into default 'Metal'.`)
            this.roofType = roofTypes.METAL;
        }
        return this;
    }

    addWindows(windows) {
        this.windows = windows;
        return this;
    }

    addDoors(doors) {
        this.doors = doors;
        return this;
    }

    validateHeight() {
        if (this.height < 2) {
            console.error('Invalid HEIGHT. Will be changed into 2.')
            this.height = 2;
        } else if (this.height > 2 && this.height % 1 != 0) {
            this.height = Math.floor(this.height);
            console.error(`Invalid HEIGHT. Will be changed into ${this.height}.`)
        }
    }

    validateWidth() {
        if (this.width < 2) {
            console.error('Invalid WIDTH. Will be changed into 2.')
            this.width = 2;
        } else if (this.width > 2 && this.width % 1 != 0) {
            this.width = Math.floor(this.width);
            console.error(`Invalid WIDTH. Will be changed into ${this.width}.`)
        }
    }

    validateWindows() {
        if (this.windows < 0) {
            console.error('Invalid WINDOWS NUMBER. Will be changed into 1.')
            this.windows = 1;
        } else if (this.windows > 0 && this.windows % 1 != 0) {
            this.windows = Math.floor(this.windows);
            console.error(`Invalid WINDOWS NUMBER. Will be changed into ${this.windows}.`)
        }
    }

    validateDoors() {
        if (this.doors < 0) {
            console.error('Invalid DOORS NUMBER. Will be changed into 1.')
            this.doors = 1;
        } else if (this.doors > 0 && this.doors % 1 != 0) {
            this.doors = Math.floor(this.doors);
            console.error(`Invalid DOORS NUMBER. Will be changed into ${this.doors}.`)
        }
    }

    build() {
        this.validateHeight();
        this.validateWidth();
        this.validateWindows();
        this.validateDoors();

        return this;
    }
}

class Director {

    drawHouse(house) {
        let roof = '';
        let cascade = '';
        let result = [];
        let heightInSymbols = house.height * 5;
        let widthInSymbols = house.width * 9;
        let roofHeight = Math.floor(house.width * 2.5);
        if (roofHeight > 6) {
            roofHeight = 6;
        }
        let windowsTotal = house.windows;
        let windowsNum1 = 0;
        let windowsNum2 = 0;
        let doorsNum1 = house.doors;
        let doorsNum2 = house.doors;
        let doorsNum3 = house.doors;
        let doorsNum4 = house.doors;

        if (house.roofType != undefined) {
            for (let i = 0; i < roofHeight; i++) {
                if (i == 0) {
                    for (let j = 0; j < widthInSymbols; j++) {
                        if (j + 1 == widthInSymbols) {
                            roof += `${house.roofType}\n`;
                        } else {
                            roof += `${house.roofType}`;
                        }
                    }
                } else {
                    for (let j = 0; j < widthInSymbols; j++) {
                        if (j + 1 == widthInSymbols) {
                            roof += ` ${'\n'}`;
                        } else if (j < widthInSymbols - i * 2 && j > i * 2 - 1) {
                            roof += `${house.roofType}`;
                        } else {
                            roof += ` `;
                        }
                    }
                }
            }
            roof = roof.split('')
            roof = roof.reverse();
            roof.push('\n')
            roof = roof.join('')
        }

        for (let i = 0; i < heightInSymbols; i++) {
            if (i == 0) {
                cascade += `└─`;
                for (let j = 2; j < widthInSymbols - 2;) {
                    if (doorsNum1 > 0 && j == 2) {
                        cascade += '┴───┴──';
                        doorsNum1 -= 1;
                        j += 7;
                    } else if (doorsNum1 > 0 && j == widthInSymbols - 9) {
                        cascade += '──┴───┴';
                        doorsNum1 -= 1;
                        j += 7;
                    } else if (doorsNum1 > 0) {
                        cascade += '──┴───┴──';
                        doorsNum1 -= 1;
                        j += 9;
                    } else {
                        cascade += '─';
                        j++;
                    }
                }
                cascade += '─┘';
                result[i] = cascade;
                cascade = '';
            } else if (i == 1) {
                cascade += `│ `;
                for (let j = 2; j < widthInSymbols - 2;) {
                    if (doorsNum2 > 0 && j == 2) {
                        cascade += '│°  │  ';
                        doorsNum2 -= 1;
                        j += 7;
                    } else if (doorsNum2 > 0 && j == widthInSymbols - 9) {
                        cascade += '  │°  │';
                        doorsNum2 -= 1;
                        j += 7;
                    } else if (doorsNum2 > 0) {
                        cascade += '  │°  │  ';
                        doorsNum2 -= 1;
                        j += 9;
                    } else if (house.windows == undefined || windowsTotal == 0) {
                        cascade += ' ';
                        j++;
                    } else if (windowsTotal > 0) {
                        if (j == 2) {
                            cascade += '╚═╩═╝  ';
                            windowsTotal -= 1;
                            windowsNum1 += 1;
                            j += 7;
                        } else if (j == widthInSymbols - 9) {
                            cascade += '  ╚═╩═╝';
                            windowsTotal -= 1;
                            windowsNum1 += 1;
                            j += 7;
                        } else {
                            cascade += '  ╚═╩═╝  ';
                            windowsTotal -= 1;
                            windowsNum1 += 1;
                            j += 9;
                        }
                    }
                }
                cascade += ' │\n';
                result.unshift(cascade);
                cascade = '';
            } else if (i == 2) {
                cascade += `│ `;
                for (let j = 2; j < widthInSymbols - 2;) {
                    if (doorsNum3 > 0 && j == 2) {
                        cascade += '│   │  ';
                        doorsNum3 -= 1;
                        j += 7;
                    } else if (doorsNum3 > 0 && j == widthInSymbols - 9) {
                        cascade += '  │   │';
                        doorsNum3 -= 1;
                        j += 7;
                    } else if (doorsNum3 > 0) {
                        cascade += '  │   │  ';
                        doorsNum3 -= 1;
                        j += 9;
                    } else if (house.windows == undefined || windowsNum1 == 0) {
                        cascade += ' ';
                        j++;
                    } else if (windowsNum1 > 0) {
                        if (j == 2) {
                            cascade += '║ ╠═╣  ';
                            windowsNum1 -= 1;
                            windowsNum2 += 1;
                            j += 7;
                        } else if (j == widthInSymbols - 9) {
                            cascade += '  ║ ╠═╣';
                            windowsNum1 -= 1;
                            windowsNum2 += 1;
                            j += 7;
                        } else {
                            cascade += '  ║ ╠═╣  ';
                            windowsNum1 -= 1;
                            windowsNum2 += 1;
                            j += 9;
                        }
                    }
                }
                cascade += ' │\n';
                result.unshift(cascade);
                cascade = '';
            } else if (i == 3) {
                cascade += `│ `;
                for (let j = 2; j < widthInSymbols - 2;) {
                    if (doorsNum4 > 0 && j == 2) {
                        cascade += '┌───┐  ';
                        doorsNum4 -= 1;
                        j += 7;
                    } else if (doorsNum4 > 0 && j == widthInSymbols - 9) {
                        cascade += '  ┌───┐';
                        doorsNum4 -= 1;
                        j += 7;
                    } else if (doorsNum4 > 0) {
                        cascade += '  ┌───┐  ';
                        doorsNum4 -= 1;
                        j += 9;
                    } else if (house.windows == undefined || windowsNum2 == 0) {
                        cascade += ' ';
                        j++;
                    } else if (windowsNum2 > 0) {
                        if (j == 2) {
                            cascade += '╔═╦═╗  ';
                            windowsNum2 -= 1;
                            j += 7;
                        } else if (j == widthInSymbols - 9) {
                            cascade += '  ╔═╦═╗';
                            windowsNum2 -= 1;
                            j += 7;
                        } else {
                            cascade += '  ╔═╦═╗  ';
                            windowsNum2 -= 1;
                            j += 9;
                        }
                    }
                }
                cascade += ' │\n';
                result.unshift(cascade);
                cascade = '';
            } else if (i % 5 === 0 + 1) {
                cascade += `│ `;
                for (let j = 2; j < widthInSymbols - 2;) {
                    if (house.windows == undefined || windowsTotal == 0) {
                        cascade += ' ';
                        j++;
                    } else if (windowsTotal > 0) {
                        if (j == 2) {
                            cascade += '╚═╩═╝  ';
                            windowsTotal -= 1;
                            windowsNum1 += 1;
                            j += 7;
                        } else if (j == widthInSymbols - 9) {
                            cascade += '  ╚═╩═╝';
                            windowsTotal -= 1;
                            windowsNum1 += 1;
                            j += 7;
                        } else {
                            cascade += '  ╚═╩═╝  ';
                            windowsTotal -= 1;
                            windowsNum1 += 1;
                            j += 9;
                        }
                    }
                }
                cascade += ' │\n';
                result.unshift(cascade);
                cascade = '';
            } else if (i % 5 === 0 + 2) {
                cascade += `│ `;
                for (let j = 2; j < widthInSymbols - 2;) {
                    if (house.windows == undefined || windowsNum1 == 0) {
                        cascade += ' ';
                        j++;
                    } else if (windowsNum1 > 0) {
                        if (j == 2) {
                            cascade += '║ ╠═╣  ';
                            windowsNum1 -= 1;
                            windowsNum2 += 1;
                            j += 7;
                        } else if (j == widthInSymbols - 9) {
                            cascade += '  ║ ╠═╣';
                            windowsNum1 -= 1;
                            windowsNum2 += 1;
                            j += 7;
                        } else {
                            cascade += '  ║ ╠═╣  ';
                            windowsNum1 -= 1;
                            windowsNum2 += 1;
                            j += 9;
                        }
                    }
                }
                cascade += ' │\n';
                result.unshift(cascade);
                cascade = '';
            } else if (i % 5 === 0 + 3) {
                cascade += `│ `;
                for (let j = 2; j < widthInSymbols - 2;) {
                    if (house.windows == undefined || windowsNum2 == 0) {
                        cascade += ' ';
                        j++;
                    } else if (windowsNum2 > 0) {
                        if (j == 2) {
                            cascade += '╔═╦═╗  ';
                            windowsNum2 -= 1;
                            j += 7;
                        } else if (j == widthInSymbols - 9) {
                            cascade += '  ╔═╦═╗';
                            windowsNum2 -= 1;
                            j += 7;
                        } else {
                            cascade += '  ╔═╦═╗  ';
                            windowsNum2 -= 1;
                            j += 9;
                        }
                    }
                }
                cascade += ' │\n';
                result.unshift(cascade);
                cascade = '';
            } else if (i + 1 == heightInSymbols) {
                cascade += `┌─`;
                for (let j = 2; j < widthInSymbols - 2; j++) {
                    cascade += `─`;
                }
                cascade += '─┐\n';
                result.unshift(cascade);
                cascade = '';
            } else if (i % 5 === 0 || i % 5 === 0 - 1) {
                cascade += `│ `;
                for (let j = 2; j < widthInSymbols - 2; j++) {
                    cascade += ` `;
                }
                cascade += ' │\n';
                result.unshift(cascade);
                cascade = '';
            }
        }
        result = result.join('');

        (function unaddedObjects() {
            if (doorsNum1 > 0) {
                console.error(doorsNum1 + ' door(s) wasnt added into the building. Check the sizes!')
            }
            if (windowsTotal > 0) {
                console.error(windowsTotal + ' window(s) wasnt added into the building. Check the sizes!')
            }
        })();

        return roof + result;
    }

}

//EXAMPLES
const villageHouse = new HouseBuilder()
    .setHeight(2)
    .setWidth(3)
    .addRoof('wood')
    .addDoors(2)
    .addWindows(4)
    .build();

const urbanHouse = new HouseBuilder()
    .setHeight(5)
    .setWidth(5)
    .addDoors(3)
    .addWindows(22)
    .build();

const skyScraper = new HouseBuilder()
    .setHeight(20)
    .setWidth(5)
    .addRoof('asphalt')
    .addDoors(5)
    .addWindows(95)
    .build();

console.log('Village House \n' + new Director().drawHouse(villageHouse));
console.log('Urban House \n' + new Director().drawHouse(urbanHouse));
console.log('SkyScrapper House \n' + new Director().drawHouse(skyScraper));
// ./EXAMPLES