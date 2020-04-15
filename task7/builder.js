console.log(`%csetHeight(num) - set height of the building;
setWidth(num) - set width of the building;
setRoofType(1, 2, 3) - choose a type of the roof;
addWindows(num) - add a certain amount of windows into the building;
addDoors(num) - add a certain amount of doors into the building (will only builded on the first floor);
build() - build the house. Final step.

Try to add more objects than it can fit.
Use "new House()" to create an object.

Example:
let houseExample = new House().setHeight(2).setWidth(5).addWindows(7).addDoors(3).setRoofType(3).build();
console.log(houseExample);
`, 'background: #04001f; color: #e8c720 ; font-size: 16px;')

class HouseBuilder {
    constructor() {
        this.height = 1;
        this.width = 2;
    }

    setHeight(height) {
        if (height < 1 || height % 1 != 0) {
            console.log('Invalid house height. Will be changed into 1.')
            this.height = 1;
        } else {
            this.height = height;
        }
        return this;
    }

    setWidth(width) {
        if (width < 2 || width % 1 != 0) {
            console.log('Invalid house width. Will be changed into 2.')
            this.width = 2;
        } else {
            this.width = width;
        }
        return this;
    }

    setRoofType(type) {
        if (type < 1 || type > 3 || type % 1 != 0) {
            console.log('Invalid roof type number. Will be changed into defaul.')
            this.roofType = '▓';
        } else if (type == 1) {
            this.roofType = '▓';
        } else if (type == 2) {
            this.roofType = '▒';
        } else if (type == 3) {
            this.roofType = '░';
        }
        return this;
    }

    addWindows(windows) {
        if (windows < 1 || windows % 1 != 0) {
            console.log('Invalid windows number. Will be changed into 1.')
            this.windows = 1;
        } else {
            this.windows = windows;
        }
        return this;
    }

    addDoors(doors) {
        if (doors < 1 || doors % 1 != 0) {
            console.log('Invalid doors number. Will be changed into 1.')
            this.doors = 1;
        } else {
            this.doors = doors;
        }
        return this;
    }

    build() {
        let roof = '';
        let cascade = '';
        let result = [];
        let heightInSymbols = this.height * 5;
        let widthInSymbols = this.width * 9;
        let roofHeight = Math.floor(this.width * 2.5);
        if (roofHeight > 6) {roofHeight = 6;}
        let windowsTotal = this.windows;
        let windowsNum1 = 0;
        let windowsNum2 = 0;
        let doorsNum1 = this.doors;
        let doorsNum2 = this.doors;
        let doorsNum3 = this.doors;
        let doorsNum4 = this.doors;

        for (let i = 0; i < roofHeight; i++) {
            if (i == 0) {
                for (let j = 0; j < widthInSymbols; j++) {
                    if (j + 1 == widthInSymbols) {
                        roof += `${this.roofType}\n`;
                    } else {
                        roof += `${this.roofType}`;
                    }
                }
            } else {
                for (let j = 0; j < widthInSymbols; j++) {
                    if (j + 1 == widthInSymbols) {
                        roof += ` ${'\n'}`;
                    } else if (j < widthInSymbols - i * 2 && j > i * 2 - 1) {
                        roof += `${this.roofType}`;
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
                    } else if (this.windows == undefined || windowsTotal == 0) {
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
                    } else if (this.windows == undefined || windowsNum1 == 0) {
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
                    } else if (this.windows == undefined || windowsNum2 == 0) {
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
                    if (this.windows == undefined || windowsTotal == 0) {
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
                    if (this.windows == undefined || windowsNum1 == 0) {
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
                    if (this.windows == undefined || windowsNum2 == 0) {
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
        if (doorsNum1 > 0) {
            console.error(doorsNum1 + ' door(s) wasnt added into the building.')
        }
        if (windowsTotal > 0) {
            console.error(windowsTotal + ' window(s) wasnt added into the building.')
        }
        return this.house = roof + result;
    }
}

class House extends HouseBuilder {
    constructor() {
        super();
    }
}