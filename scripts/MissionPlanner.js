export default class MissionPlanner {
    constructor() {

    }
}

// min velocity 10 knots
// max velocity 25 knots
// knot = 1 nautical mile / hour
// the shortest distance 140 nmi
// the longest distance 10660 nmi

class Mission {
    constructor() {
        this.distance = 0;
        this.duration = 0;
        this.obstaclesIntensity = 0; // [0 - 5] // obstacles forms from -10m to -500m depth with max depth of 2000m
    }
}