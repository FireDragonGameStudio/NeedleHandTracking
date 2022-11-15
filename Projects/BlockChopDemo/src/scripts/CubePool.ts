import { Behaviour, GameObject, InstantiateOptions, serializeable } from "@needle-tools/engine";
import { Object3D } from "three";

export class CubePool extends Behaviour {
    @serializeable(Object3D)
    prefab?: Object3D;

    @serializeable()
    poolSize: number = 10;

    private instances: GameObject[] = [];
    private index: number = 0;

    getFromPool(): GameObject | null {
        if (!this.prefab) return null;

        // create a new instance from the prefab if we dont have enough yet
        // we cache previously created prefabs so we dont spawn infinite objects
        if (this.instances.length < this.poolSize) {
            const opts = new InstantiateOptions();
            const prefabInstance = GameObject.instantiate(this.prefab, opts);
            if (!prefabInstance) return null;
            this.instances.push(prefabInstance);
        }
        // get the next instance from the cache
        const instance = this.instances[this.index++ % this.instances.length];

        // make sure the object is active
        GameObject.setActive(instance, true);

        return instance;
    }
}
