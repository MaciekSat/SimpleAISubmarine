import Modules  from "./Modules.js";

// import implementations od modules here and feed them with inputs here

export default class Submarine {
    constructor() {
        this.oxygen = 10000; // initial oxygen level
        this.co2 = 0; // initial co2 level
        this.energy = 10000000; // initial energy level
        this.maxCrew = 10; // number of crew members [5 - 20]
        this.crew = this.maxCrew; // number of current crew members
        this.fuel = 5000; // initial fuel level
        this.food = 20000; // initial food level
        this.balastTanks = 0; // current balast tanks level [0 - 300]
        this.speed = 0; // current speed in knots
        this.maxSpeed = 0; // maximum speed in knots
        
        this.bank1 = 30; // initial bank1 fill
        this.bank2 = 30; // initial bank2 fill

        this.offset = 0;
        this.depth = 0;
        this.buoyancy = 0;

        this.modules = new Modules(this);
        this.modulesEfficiency = [0.0, 0.0, 0.0, 0.0, 0.0]; // co2 scrubber, generator, reactor, control system, sensors
        this.modulesCrew = [0, 0, 0, 0, 0]; // crew assigned to each module
    }

    spawnSubmarine(body) {
        let submarine = document.createElement("div");
        submarine.className = "submarine";
        submarine.style.top = "65vh";
        submarine.style.left = "30%";
        body.appendChild(submarine);
        
        let engine = document.createElement("div");
        engine.className = "engine";
        submarine.appendChild(engine);

        let chambers = document.createElement("div");
        chambers.className = "chambers";
        submarine.appendChild(chambers);
        
        let bank1 = document.createElement("progress");
        bank1.className = "bank1";
        bank1.max = 100;
        bank1.value = this.bank1;
        submarine.appendChild(bank1);

        let bank2 = document.createElement("progress");
        bank2.className = "bank2";
        bank2.max = 100;
        bank2.value = this.bank2;
        submarine.appendChild(bank2);

        let crewQuarters = document.createElement("div");
        crewQuarters.className = "crewQuarters";
        submarine.appendChild(crewQuarters);

        let generator = document.createElement("div");
        generator.className = "generator";
        submarine.appendChild(generator);

        let co2Scrubber = document.createElement("div");
        co2Scrubber.className = "co2Scrubber";
        submarine.appendChild(co2Scrubber);

        let kitchen = document.createElement("div");
        kitchen.className = "kitchen";
        submarine.appendChild(kitchen);

        let controlRoom = document.createElement("div");
        controlRoom.className = "controlRoom";
        submarine.appendChild(controlRoom);

        this.updateLabels()
    }
    
    updateStatus(mainLoop, movementLoop) {
        if (this.oxygen <= 0 || this.food <= 0 || this.energy <= 0) {
            console.log("Mission failed: crew perished.");
            clearInterval(mainLoop);
            clearInterval(movementLoop);
            this.endMission();
            return;
        }
        
        if (this.co2 >= 2000) {
            console.log("Mission failed: crew suffocated.");
            clearInterval(mainLoop);
            clearInterval(movementLoop);
            this.endMission();
            return;
        }

        // Modules activation
        this.modules.co2Scrubber(this.modulesEfficiency[0] * this.efficiencyClamp(this.modulesCrew[0]));
        this.modules.generator(this.modulesEfficiency[1] * this.efficiencyClamp(this.modulesCrew[1]));
        this.modules.reactor(this.modulesEfficiency[2] * this.efficiencyClamp(this.modulesCrew[2]));
        this.modules.controlSystem(this.modulesEfficiency[3] * this.efficiencyClamp(this.modulesCrew[3]));
        this.modules.sensors(this.modulesEfficiency[4] * this.efficiencyClamp(this.modulesCrew[4]));

        // update buoyancy
        this.buoyancy = -(Math.max(Math.min(this.bank1 + this.bank2, 160), 40) - 100) / 60; // normalize between -1
        // and 1
        
        // update oxygen level
        this.oxygen -= this.maxCrew * 0.1; // crew consumes oxygen
        this.co2 += this.maxCrew * 0.1; // crew produces co2
        
        // update food level
        this.food -= this.maxCrew * 0.001; // crew consumes food

        this.updateLabels()
    }
    
    efficiencyClamp(efficiency) {
        return Math.min(efficiency, 2.5);
    }
    
    updateLabels() {
        document.getElementById("oxygenLabel").innerText = `Oxygen: ${this.oxygen.toFixed(2)} l`;
        document.getElementById("co2Label").innerText = `CO2: ${this.co2.toFixed(2)} l`;
        document.getElementById("energyLabel").innerText = `E: ${this.energy.toFixed(2)} W`;
        document.getElementById("fuelLabel").innerText = `Fuel: ${this.fuel.toFixed(2)} l`;
        document.getElementById("foodLabel").innerText = `Food: ${this.food.toFixed(2)} kg`;
        document.getElementById("crewLabel").innerText = `Crew: ${this.crew}`;
    }
    
    endMission() {

    }

    // co2 scrubber (co2 + energy -> oxygen)
    // generator (fuel -> energy)
    // crew (oxygen + food -> co2 + boost)
    // boosts = more crew members more efficiency
    // control systems (energy -> movement)
    // sensors (energy -> data {obstacles visible})
    // reactor (energy -> movement)
}