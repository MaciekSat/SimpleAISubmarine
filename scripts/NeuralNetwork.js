import Neuron from './Neuron.js';

export default class NeuralNetwork {
    constructor() {
        this.sensorsCount = 0; // initial value depends on inputs
        this.outputsCount = 4; // forward, left, right, backward or other actions
        this.hiddenLayers = 4;
        this.layers = [];
    }

    // find a way to tell AI to avoid using specific paths that lead to failure
    // also try to encourage it to try to build consciousness based on well established paths
    // try to work like Noyron RP from https://leap71.com/rp/

    // disable specific actions based of knowledge of failure
    // safety layer

    // nn pipeline
    // 1. input from sensors and data
    // 2. nn proposes 10 or more actions
    // 3a. world model applies the hard coded laws and predict outcome
    // 3b. world model evaluates predicted outcomes and score the actions
    // 3c. the action with best score is passed to the next step
    // 4. safety layer evaluates the proposed actions and eliminate the dangerous ones
    // 5. execution of the safest action

    // independent modules
    // 1. input from mandatory sensors specified to this module
    // module propose summaries like
    // -----------------------------
    // sonars[distance to nearest obstacle, velocity toward obstacle]
    // energy[available energy, consumption rate, predicted depletion time], etc.

    // nn arbiter
    // 1. proposed input from independent modules
    // 2. checks for safety if not safe then reject or override and do safe action instead
    // 3. resolve conflicts between modules by applying math.min so you will never go beyond lowest proposal
    // 4. apply priorities if needed
    // 5. execute action

    // possible soft arbiter
    // it weights proposed input actions and clamps between min max and calculated one

    // world model
    // the law of physics setup
    // 1. set specific actions and their added amount to other parameter
    // 2. setup certain thresholds that if crossed will lead to failure
    // 3. predict outcome
    // for depth control [more depth -> more pressure, some pressure threshold -> implosion -> negative reward]
    // not like this [at certain depth -> implosion] because it will learn to stay above that depth

    createLayers(inputsCount) {
        this.sensorsCount = inputsCount;
        // create empty layers
        for (let i = 0; i < this.hiddenLayers + 2; i++) {
            let layer = [];
            this.layers.push(layer);
        }
        
        // populate first layer
        let lastLayerCount = 0;
        for (let i = 0; i < this.sensorsCount; i++) {
            let neuron = new Neuron;
            neuron.weights.push(1); // always activated
            this.layers[0].push(neuron);
            lastLayerCount = i + 1;
        }
        // populate hidden layers
        // numbers of columns
        let hiddenLayerSize = lastLayerCount * 2;
        for (let i = 0; i < this.hiddenLayers; i++) {
            // numbers of neurons in each column
            for (let j = 0; j < hiddenLayerSize; j++) {
                let neuron = new Neuron;
                // populate neuron weights
                for (let k = 0; k < lastLayerCount; k++) {
                    let rand = Math.round((Math.random() * 2 - 1) * 100) / 100;
                    neuron.weights.push(rand);
                }
                this.layers[i + 1].push(neuron);
            }
            lastLayerCount = hiddenLayerSize;
        }
        // populate output layer
        for (let i = 0; i < this.outputsCount; i++) {
            let neuron = new Neuron;
            // populate neuron weights
            for (let j = 0; j < lastLayerCount; j++) {
                let rand = Math.round((Math.random() * 2 - 1) * 100) / 100;
                neuron.weights.push(rand);
            }
            this.layers[this.hiddenLayers + 1].push(neuron);
        }
    }

    fireNeurons(inputs) {
        // error checking
        if (inputs.length !== this.sensorsCount) {
            console.error(`Expected ${this.sensorsCount} inputs, but got ${inputs.length}`);
            return;
        }
        
        // layers
        let previousOutputs = [];
        console.log(`Layer 0 has ${this.layers[0].length} neurons`);
        for (let i = 0; i < this.layers[0].length; i++) {
            this.layers[0][i].feedForward([inputs[i]]);
            previousOutputs.push(this.layers[0][i].output);
        }
        
        // hidden layers + output layer
        let currentOutputs = [];
        for (let i = 1; i < this.layers.length; i++) {
            console.log(`Layer ${i} has ${this.layers[i].length} neurons`);
            // each neuron in layer
            for (let j = 0; j < this.layers[i].length; j++) {
                this.layers[i][j].feedForward([previousOutputs[i]]);
                currentOutputs.push(this.layers[i][j].output);
            }
            previousOutputs = currentOutputs;
            currentOutputs = [];
        }
        console.log(this.layers[this.layers.length - 1][0].output);
        console.log(this.layers[this.layers.length - 1][1].output);
        console.log(this.layers[this.layers.length - 1][2].output);
        console.log(this.layers[this.layers.length - 1][3].output);
    }
}