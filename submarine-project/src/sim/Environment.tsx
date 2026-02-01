export class Environment {
    sky: HTMLElement | null = null;
    ocean: HTMLElement | null = null;
    cloudsClose: HTMLDivElement[] = [];
    cloudsFar: HTMLDivElement[] = [];
    cloudsFarAway: HTMLDivElement[] = [];
    timer = 400;
    days = 0;

    constructor(sky: HTMLElement | null, ocean: HTMLElement | null) {
        this.sky = sky;
        this.ocean = ocean;

        this.spawnClouds();
    }

    spawnClouds() {
        if (!this.sky) return;

        const cloudLayers = [
            { count: 10, spread: 450, scale: 1, opacity: 0.6, blur: 2, z: 3, array: this.cloudsClose },
            { count: 5, spread: 600, scale: 1.5, opacity: 0.3, blur: 3, z: 2, array: this.cloudsFar },
            { count: 3, spread: 900, scale: 2, opacity: 0.2, blur: 5, z: 1, array: this.cloudsFarAway },
        ];

        for (const layer of cloudLayers) {
            for (let i = 0; i < layer.count; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'cloud';
                cloud.innerHTML = `<img src="../img/cloud.png" alt="cloud">`;
                cloud.style.top = `${Math.random() * 100 + (layer.count === 3 ? 50 : layer.count === 5 ? 25 : 0)}px`;
                cloud.style.left = `${i * (layer.spread / 2) + Math.random() * layer.spread}px`;
                cloud.style.zIndex = layer.z.toString();
                cloud.style.opacity = layer.opacity.toString();
                cloud.style.filter = `blur(${layer.blur}px)`;
                cloud.style.transform = `scale(${layer.scale})`;
                this.sky.appendChild(cloud);
                layer.array.push(cloud);
            }
        }
    }

    updateTimer() {
        if (this.timer >= 1440) {
            this.timer = 0;
            this.days++;
        } else {
            this.timer++;
        }
    }

    moveEnvironment(offset: number) {
        const layers = [
            { clouds: this.cloudsClose, speed: 0.04, reset: 600 },
            { clouds: this.cloudsFar, speed: 0.02, reset: 1000 },
            { clouds: this.cloudsFarAway, speed: 0.01, reset: 1500 },
        ];

        for (const layer of layers) {
            for (const el of layer.clouds) {
                let left = parseFloat(getComputedStyle(el).left);
                left -= offset * layer.speed;

                if (left < -layer.reset) {
                    left = layer.reset * 3;
                }

                el.style.left = `${left}px`;
            }
        }
    }

    increaseDepth(amount: number) {
        if (!this.ocean) return;

        this.ocean.style.transform = `translateY(${amount}px)`;
    }
}
