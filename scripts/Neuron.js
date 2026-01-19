export default class Neuron {
    constructor() {
        this.weights = [];
        this.bias = 0.01;
        this.output = 0;
    }

    activation(input) {
        return Math.tanh(input);
    }

    feedForward(inputs) {
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        sum += this.bias;
        this.output = this.activation(sum);
    }

}