import { Submarine } from './Submarine.tsx';

export class Modules {
    submarine: Submarine;

    constructor(submarine: Submarine) {
        this.submarine = submarine;
    }

    co2Scrubber(efficiency: number) {
        let background: HTMLDivElement | null = document.querySelector('.co2Scrubber');
        if (!background) return;
        if (efficiency !== 0) {
            background.style.backgroundImage = "url('./img/ScrubberOn.png')";
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
            background.style.backgroundImage = "url('./img/ScrubberOff.png')";
        }
    }

    generator(efficiency: number) {
        let background: HTMLDivElement | null = document.querySelector('.generator');
        if (!background) return;
        if (this.submarine.fuel > 0) {
            if (efficiency !== 0) {
                background.style.backgroundImage = "url('./img/GeneratorOn.png')";
                this.submarine.fuel -= 0.1 / efficiency;
                this.submarine.energy += 150 * efficiency;
            } else {
                background.style.backgroundImage = "url('./img/GeneratorOff.png')";
            }
            if (this.submarine.energy > 10000000) {
                this.submarine.energy = 10000000;
            }
        } else {
            this.submarine.fuel = 0;
        }
    }

    reactor(efficiency: number) {
        let background: HTMLDivElement | null = document.querySelector('.engine');
        if (!background) return;
        if (efficiency !== 0) {
            background.style.backgroundImage = "url('./img/ReactorOn.png')";
            this.submarine.energy -= 1 / efficiency;
        } else {
            background.style.backgroundImage = "url('./img/ReactorOff.png')";
        }
        this.submarine.maxSpeed = 10 * efficiency ** 2;
    }

    controlSystem(efficiency: number) {
        if (efficiency !== 0) {
            this.submarine.energy -= 4 / efficiency;
            if (this.submarine.speed < this.submarine.maxSpeed) {
                this.submarine.speed += efficiency;
            } else {
                this.submarine.speed = this.submarine.maxSpeed;
            }
        } else {
            if (this.submarine.speed - 0.05 > 0) {
                this.submarine.speed -= 0.05;
            } else {
                this.submarine.speed = 0;
            }
        }
    }

    sensors(efficiency: number) {
        let background: HTMLDivElement | null = document.querySelector('.controlRoom');
        if (!background) return;
        if (efficiency !== 0) {
            background.style.backgroundImage = "url('./img/ControlRoomRDROn.png')";
            this.submarine.energy -= 1 / efficiency;
            // Additional sensor functionality will be implemented here
        } else {
            background.style.backgroundImage = "url('./img/ControlRoomRDROff.png')";
        }
    }
}
