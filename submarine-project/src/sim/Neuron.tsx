export class Neuron {
    weights: number[] = [];
    bias: number = 0.01;
    output: number = 0;

    activation(input: number) {
        return Math.tanh(input);
    }

    feedForward(inputs: number[]) {
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        sum += this.bias;
        this.output = this.activation(sum);
    }
}
