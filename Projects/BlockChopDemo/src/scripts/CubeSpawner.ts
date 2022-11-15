import { Behaviour, GameObject, serializeable } from "@needle-tools/engine";
import { CubePool } from "./CubePool";

export class CubeSpawner extends Behaviour {
    @serializeable(CubePool)
    blueCubePool?: CubePool;

    @serializeable(CubePool)
    redCubePool?: CubePool;

    @serializeable(CubePool)
    greenCubePool?: CubePool;

    private timestep: number = 0;
    private spawnInterval: number = 1;

    update() {
        if (this.timestep < this.spawnInterval) {
            this.timestep += this.context.time.deltaTime;
            return;
        }
        this.timestep = 0;

        var cubeElement = this.getRedOrBlue();
        if (!cubeElement) return;

        // spawn the cubes at a certain distance
        var positionX = this.getRandomNumber(3, -1);
        var positionY = this.getRandomNumber(2, 1);
        var positionZ = 25;

        cubeElement.position.set(positionX, positionY, positionZ);
    }

    // random num generator
    private getRandomNumber(value, offset): number {
        return Math.floor(Math.random() * value + offset);
    }

    // get either red or blue cube
    private getRedOrBlue(): GameObject | null | undefined {
        const randomNumber = this.getRandomNumber(10, 0);
        // blue
        if (randomNumber > 6.66) {
            return this.blueCubePool?.getFromPool();
        }
        // red
        if (randomNumber > 3.33) {
            return this.redCubePool?.getFromPool();
        }
        return this.greenCubePool?.getFromPool();
    }
}
