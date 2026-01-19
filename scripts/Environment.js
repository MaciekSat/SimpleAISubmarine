// noinspection HtmlUnknownTarget

export default class Environment {
    constructor(sky, ocean) {
        this.sky = sky;
        this.ocean = ocean;
        this.cloudsClose = [];
        this.cloudsFar = [];
        this.cloudsFarAway = [];
        this.timer = 400;
        this.days = 0;
    }

    spawnClouds() {
        for (let i = 0; i < 20; i++) {
            let cloud = document.createElement("div");
            cloud.className = "cloud";
            cloud.innerHTML = `<img src="./images/cloud.png" alt="cloud">`;
            cloud.style.position = "absolute";
            cloud.style.top = Math.random() * 100 + "px";
            cloud.style.left = i * (450 / 2) + Math.random() * 450 + "px";
            cloud.style.zIndex = "0.5";
            cloud.style.opacity = "0.6";
            cloud.style.filter = "blur(2px)";
            cloud.style.transform = "scale(1)";
            this.sky.appendChild(cloud);
            this.cloudsClose.push(cloud);
        }
        for (let i = 0; i < 10; i++) {
            let cloud = document.createElement("div");
            cloud.className = "cloud";
            cloud.innerHTML = `<img src="./images/cloud.png" alt="cloud">`;
            cloud.style.position = "absolute";
            cloud.style.top = Math.random() * 100 + 25 + "px";
            cloud.style.left = i * (600 / 2) + Math.random() * 600 + "px";
            cloud.style.zIndex = "0.5";
            cloud.style.opacity = "0.3";
            cloud.style.filter = "blur(3px)";
            cloud.style.transform = "scale(1.5)";
            this.sky.appendChild(cloud);
            this.cloudsFar.push(cloud);
        }
        for (let i = 0; i < 5; i++) {
            let cloud = document.createElement("div");
            cloud.className = "cloud";
            cloud.innerHTML = `<img src="./images/cloud.png" alt="cloud">`;
            cloud.style.position = "absolute";
            cloud.style.top = Math.random() * 100 + 50 + "px";
            cloud.style.left = i * (900 / 2) + Math.random() * 900 + "px";
            cloud.style.zIndex = "0.5";
            cloud.style.opacity = "0.2";
            cloud.style.filter = "blur(5px)";
            cloud.style.transform = "scale(2)";
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

        let midFast = Math.max(0, 1 - Math.abs(this.timer - 720) / 720);
        let mid = Math.max(0, 1 - Math.abs(this.timer - 720) / 600); // 10 bright hours
        let edge = 1 - mid;

        // max at 720
        let grayscale = 0.3 * mid;
        let sepia = 5.0 * mid;

        // max at 0 and 1440
        let invert = 1 - midFast;
        let hueRotation = 180 * edge;
        let brightness = 1.0 - 0.8 * edge;

        this.sky.style.filter = `sepia(${sepia}%) grayscale(${grayscale}%) hue-rotate(${hueRotation}deg) invert(${invert}) brightness(${brightness})`;
        this.ocean.style.filter = `brightness(${brightness})`;
    }

    moveEnvironment(offset) {
        for (let i = 0; i < this.cloudsClose.length; i++) {
            if (this.cloudsClose[i].style.left < "-450px") {
                this.cloudsClose[i].style.left = "3000px";
            }
            this.cloudsClose[i].style.left = this.cloudsClose[i].style.left.replace("px", "") - offset * 0.1 + "px";
        }
        for (let i = 0; i < this.cloudsFar.length; i++) {
            this.cloudsFar[i].style.left = this.cloudsFar[i].style.left.replace("px", "") - offset * 0.07 + "px";
        }
        for (let i = 0; i < this.cloudsFarAway.length; i++) {
            this.cloudsFarAway[i].style.left = this.cloudsFarAway[i].style.left.replace("px", "") - offset * 0.04 + "px";
        }
    }

    increaseDepth(amount) {
        this.ocean.style.transform = `translateY(${amount}px)`;
    }
}