export default class Modules {
    constructor(submarine) {
        this.submarine = submarine;
    }

    co2Scrubber(efficiency) {
        let background = document.getElementsByClassName("co2Scrubber")[0];
        if (efficiency !== 0) {
            background.style.backgroundImage = "url('./images/ScrubberOn.png')";
            this.submarine.energy -= 10 / efficiency;
            this.submarine.co2 -= 15 * efficiency;
            this.submarine.oxygen += 3 * efficiency;
            if (this.submarine.co2 < 0) {
                this.submarine.co2 = 0;
            }
            if (this.submarine.oxygen > 10000) {
                this.submarine.oxygen = 10000;
            }
        } else {
            background.style.backgroundImage = "url('./images/ScrubberOff.png')";
        }
    }

    generator(efficiency) {
        let background = document.getElementsByClassName("generator")[0];
        if (this.submarine.fuel > 0) {
            if (efficiency !== 0) {
                background.style.backgroundImage = "url('./images/GeneratorOn.png')";
                this.submarine.fuel -= 0.1 / efficiency;
                this.submarine.energy += 150 * efficiency;
            } else {
                background.style.backgroundImage = "url('./images/GeneratorOff.png')";
            }
            if (this.submarine.energy > 10000000) {
                this.submarine.energy = 10000000;
            }
        } else {
            this.submarine.fuel = 0;
        }
        
    }

    reactor(efficiency) {
        let background = document.getElementsByClassName("engine")[0];
        if (efficiency !== 0) {
            background.style.backgroundImage = "url('./images/ReactorOn.png')";
            this.submarine.energy -= 1 / efficiency;
        } else {
            background.style.backgroundImage = "url('./images/ReactorOff.png')";
        }
        this.submarine.maxSpeed = 10 * efficiency;
    }

    controlSystem(efficiency) {
        if (efficiency !== 0) {
            this.submarine.energy -= 4 / efficiency;
            if (this.submarine.speed < this.submarine.maxSpeed) {
                this.submarine.speed += 1 * efficiency;
            } else {
                this.submarine.speed = this.submarine.maxSpeed;
            }
        } else {
            if (this.submarine.speed > 0) {
                this.submarine.speed -= 0.5;
            } else {
                this.submarine.speed = 0;
            }
        }
    }

    sensors(efficiency) {
        let background = document.getElementsByClassName("controlRoom")[0];
        if (efficiency !== 0) {
            background.style.backgroundImage = "url('./images/ControlRoomRDROn.png')";
            this.submarine.energy -= 1 / efficiency;
            // Additional sensor functionality can be implemented here
        } else {
            background.style.backgroundImage = "url('./images/ControlRoomRDROff.png')";
        }
    }
}