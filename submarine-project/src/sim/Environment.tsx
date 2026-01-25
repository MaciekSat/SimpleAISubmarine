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

        for (let i = 0; i < 20; i++) {
            let cloud: HTMLDivElement = document.createElement('div');
            cloud.className = 'cloud';
            cloud.innerHTML = `<img src="../img/cloud.png" alt="cloud">`;
            cloud.style.position = 'absolute';
            cloud.style.top = Math.random() * 100 + 'px';
            cloud.style.left = i * (450 / 2) + Math.random() * 450 + 'px';
            cloud.style.zIndex = '0.5';
            cloud.style.opacity = '0.6';
            cloud.style.filter = 'blur(2px)';
            cloud.style.transform = 'scale(1)';
            this.sky.appendChild(cloud);
            this.cloudsClose.push(cloud);
        }
        for (let i = 0; i < 10; i++) {
            let cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.innerHTML = `<img src="../img/cloud.png" alt="cloud">`;
            cloud.style.position = 'absolute';
            cloud.style.top = Math.random() * 100 + 25 + 'px';
            cloud.style.left = i * (600 / 2) + Math.random() * 600 + 'px';
            cloud.style.zIndex = '0.5';
            cloud.style.opacity = '0.3';
            cloud.style.filter = 'blur(3px)';
            cloud.style.transform = 'scale(1.5)';
            this.sky.appendChild(cloud);
            this.cloudsFar.push(cloud);
        }
        for (let i = 0; i < 5; i++) {
            let cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.innerHTML = `<img src="../img/cloud.png" alt="cloud">`;
            cloud.style.position = 'absolute';
            cloud.style.top = Math.random() * 100 + 50 + 'px';
            cloud.style.left = i * (900 / 2) + Math.random() * 900 + 'px';
            cloud.style.zIndex = '0.5';
            cloud.style.opacity = '0.2';
            cloud.style.filter = 'blur(5px)';
            cloud.style.transform = 'scale(2)';
            this.sky.appendChild(cloud);
            this.cloudsFarAway.push(cloud);
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
        for (let i = 0; i < this.cloudsClose.length; i++) {
            const el = this.cloudsClose[i];
            let left = parseFloat(el.style.left || '0');

            if (left < -450) {
                left = 3000;
            }

            el.style.left = `${left - offset * 0.1}px`;
        }

        for (let i = 0; i < this.cloudsFar.length; i++) {
            const el = this.cloudsFar[i];
            const left = parseFloat(el.style.left || '0');

            el.style.left = `${left - offset * 0.07}px`;
        }

        for (let i = 0; i < this.cloudsFarAway.length; i++) {
            const el = this.cloudsFarAway[i];
            const left = parseFloat(el.style.left || '0');

            el.style.left = `${left - offset * 0.04}px`;
        }
    }

    increaseDepth(amount: number) {
        if (!this.ocean) return;

        this.ocean.style.transform = `translateY(${-amount}px)`;
    }
}
