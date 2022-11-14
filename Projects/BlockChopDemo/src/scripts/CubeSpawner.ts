import { AssetReference, Behaviour, GameObject, Renderer, serializeable } from "@needle-tools/engine";
import { IGameObject } from "@needle-tools/engine/engine/engine_types";

export class CubeSpawner extends Behaviour {
    @serializeable(AssetReference)
    blueCubePrefab?: AssetReference;

    @serializeable(AssetReference)
    redCubePrefab?: AssetReference;

    private timestep: number = 0;
    private spawnInterval: number = 2;

    async update() {
        if (this.timestep < this.spawnInterval) {
            this.timestep += this.context.time.deltaTime;
            return;
        }
        this.timestep = 0;

        var cubeElement = await this.getRedOrBlue();
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
    private async getRedOrBlue(): Promise<IGameObject | null | undefined> {
        // blue
        if (this.getRandomNumber(10, 0) > 5) {
            return await this.blueCubePrefab?.instantiate();
        }
        // red
        return await this.redCubePrefab?.instantiate();
    }
}
