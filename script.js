import Environment from './scripts/Environment.js'
import Submarine from './scripts/Submarine.js'

function init() {
    // Environment setup
    let sky = document.getElementById("sky");
    let ocean = document.getElementById("ocean");
    let environment = new Environment(sky, ocean);
    environment.spawnClouds();

    // Submarine setup
    let submarine = new Submarine();
    window.submarine = submarine;
    submarine.spawnSubmarine(document.body);

    // Neural Network setup
    let inputs = [0.0, 0.0, 0.0] // min 3 inputs
    // let neuralNetwork = new NeuralNetwork;
    // neuralNetwork.createLayers(inputs.length);
    // console.log(neuralNetwork.layers);
    // neuralNetwork.fireNeurons(inputs);

    submarine.updateStatus(null, null);

    // Main loop
    let mainLoop = setInterval(() => {
        submarine.updateStatus(mainLoop, movementLoop);
        environment.updateTimer();
    }, 60 / 60 * 1000); // 60 FPS per 1s

    let movementLoop = setInterval(() => {
        environment.moveEnvironment(submarine.speed);
        environment.increaseDepth(submarine.depth);
        updateMeasurements(environment, submarine);
    }, 1000 / 60); // 60 FPS
}

function handleButton(button) {
    let colorOn = "#00ff00";
    let colorOff = "#414141";
    switch (button) {
        case "scrubber":
            let scrubberBtn = document.getElementById("co2ScrubberBtn");
            scrubberBtn.dataset.state = scrubberBtn.dataset.state === "off" ? "on" : "off";
            if (scrubberBtn.dataset.state === "on") {
                scrubberBtn.style.backgroundColor = colorOn;
                submarine.modulesEfficiency[0] = 1.0;
            } else {
                scrubberBtn.style.backgroundColor = colorOff;
                submarine.modulesEfficiency[0] = 0.0;
            }
            break;
        case "generator":
            let generatorBtn = document.getElementById("generatorBtn");
            generatorBtn.dataset.state = generatorBtn.dataset.state === "off" ? "on" : "off";
            if (generatorBtn.dataset.state === "on") {
                generatorBtn.style.backgroundColor = colorOn;
                submarine.modulesEfficiency[1] = 1.0;
            } else {
                generatorBtn.style.backgroundColor = colorOff;
                submarine.modulesEfficiency[1] = 0.0;
            }
            break;
        case "reactor":
            let reactorBtn = document.getElementById("reactorBtn");
            reactorBtn.dataset.state = reactorBtn.dataset.state === "off" ? "on" : "off";
            if (reactorBtn.dataset.state === "on") {
                reactorBtn.style.backgroundColor = colorOn;
                submarine.modulesEfficiency[2] = 1.0;
            } else {
                reactorBtn.style.backgroundColor = colorOff;
                submarine.modulesEfficiency[2] = 0.0;
            }
            break;
        case "control":
            let controlBtn = document.getElementById("controlSystemBtn");
            controlBtn.dataset.state = controlBtn.dataset.state === "off" ? "on" : "off";
            if (controlBtn.dataset.state === "on") {
                controlBtn.style.backgroundColor = colorOn;
                submarine.modulesEfficiency[3] = 1.0;
            } else {
                controlBtn.style.backgroundColor = colorOff;
                submarine.modulesEfficiency[3] = 0.0;
            }
            break;
        case "sensors":
            let sensorsBtn = document.getElementById("sensorsBtn");
            sensorsBtn.dataset.state = sensorsBtn.dataset.state === "off" ? "on" : "off";
            if (sensorsBtn.dataset.state === "on") {
                sensorsBtn.style.backgroundColor = colorOn;
                submarine.modulesEfficiency[4] = 1.0;
            } else {
                sensorsBtn.style.backgroundColor = colorOff;
                submarine.modulesEfficiency[4] = 0.0;
            }
            break;
    }
}

function handleCrew(type, amount) {
    switch (type) {
        case "scrubber":
            let scrubberCrewAmount = document.getElementById("scrubberCrewAmount");
            if (submarine.crew - amount <= -1 || submarine.crew - amount > submarine.maxCrew) return;
            if (submarine.modulesCrew[0] + amount > -1 && submarine.modulesCrew[0] + amount < 4) {
                submarine.modulesCrew[0] += amount;
                submarine.crew -= amount;
                scrubberCrewAmount.innerText = submarine.modulesCrew[0].toString() + "/3";
            }
            break;
        case "generator":
            let generatorCrewAmount = document.getElementById("generatorCrewAmount");
            if (submarine.crew - amount <= -1 || submarine.crew - amount > submarine.maxCrew) return;
            if (submarine.modulesCrew[1] + amount > -1 && submarine.modulesCrew[1] + amount < 4) {
                submarine.modulesCrew[1] += amount;
                submarine.crew -= amount;
                generatorCrewAmount.innerText = submarine.modulesCrew[1].toString() + "/3";
            }
            break;
        case "reactor":
            let reactorCrewAmount = document.getElementById("reactorCrewAmount");
            if (submarine.crew - amount <= -1 || submarine.crew - amount > submarine.maxCrew) return;
            if (submarine.modulesCrew[2] + amount > -1 && submarine.modulesCrew[2] + amount < 4) {
                submarine.modulesCrew[2] += amount;
                submarine.crew -= amount;
                reactorCrewAmount.innerText = submarine.modulesCrew[2].toString() + "/3";
            }
            break;
        case "control":
            let controlCrewAmount = document.getElementById("controlCrewAmount");
            if (submarine.crew - amount <= -1 || submarine.crew - amount > submarine.maxCrew) return;
            if (submarine.modulesCrew[3] + amount > -1 && submarine.modulesCrew[3] + amount < 4) {
                submarine.modulesCrew[3] += amount;
                submarine.crew -= amount;
                controlCrewAmount.innerText = submarine.modulesCrew[3].toString() + "/3";
            }
            break;
        case "sensors":
            let sensorsCrewAmount = document.getElementById("sensorsCrewAmount");
            if (submarine.crew - amount <= -1 || submarine.crew - amount > submarine.maxCrew) return;
            if (submarine.modulesCrew[4] + amount > -1 && submarine.modulesCrew[4] + amount < 4) {
                submarine.modulesCrew[4] += amount;
                submarine.crew -= amount;
                sensorsCrewAmount.innerText = submarine.modulesCrew[4].toString() + "/3";
            }
            break;
    }
}

function updateMeasurements(env, sub) {
    let speed = document.getElementById("speed");
    let maxSpeed = document.getElementById("maxSpeed");
    let timer = document.getElementById("time");
    let days = document.getElementById("days");
    let depth = document.getElementById("depth");
    let bank1Fill = document.getElementById("bank1Fill");
    let bank2Fill = document.getElementById("bank2Fill");
    let bank1FillBar = document.getElementById("bank1FillBar");
    let bank2FillBar = document.getElementById("bank2FillBar");

    speed.innerText = `${sub.speed.toFixed(1)} knots`;
    maxSpeed.innerText = `${sub.maxSpeed.toFixed(1)} knots`;

    let hours = Math.floor(env.timer / 60);
    let minutes = env.timer % 60;
    timer.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    days.innerText = `Days: ${env.days}`;

    depth.innerText = `${sub.depth / 10} AMSL`;

    bank1Fill.innerText = `${sub.bank1.toFixed(0)}%`;
    bank2Fill.innerText = `${sub.bank2.toFixed(0)}%`;
    bank1FillBar.value = sub.bank1.toFixed(0);
    bank2FillBar.value = sub.bank2.toFixed(0);

    let bank1Class = document.getElementsByClassName("bank1")[0];
    let bank2Class = document.getElementsByClassName("bank2")[0];
    bank1Class.value = sub.bank1.toFixed(0);
    bank2Class.value = sub.bank2.toFixed(0);

    let submarineBox = document.getElementsByClassName("submarine")[0];
    submarineBox.style.transform = `translate(-50%, -50%) scale(25%) rotate(${-0.09 * (sub.bank1 - 50) + 0.09 * (sub.bank2 - 50)}deg)`;

    if (sub.depth > 0) {
        sub.depth = 0;
    } else {
        sub.depth += sub.buoyancy * 1.5;
    }

}

window.init = init;
window.handleButton = handleButton;
window.handleCrew = handleCrew;