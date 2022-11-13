import { AssetReference, Behaviour, Collision, GameObject, serializeable } from "@needle-tools/engine";

export class ScatterOnCollision extends Behaviour {
    @serializeable(GameObject)
    cubeScattered05: GameObject | null = null;

    @serializeable(GameObject)
    cubeScattered025: GameObject | null = null;

    @serializeable(AssetReference)
    myPrefab?: AssetReference;

    async onCollisionEnter(_col: Collision) {
        if (this.cubeScattered05) {
            this.cubeScattered05.visible = true;
        }
        const myInstance = await this.myPrefab?.instantiate();
        this.gameObject.visible = false;
    }
}
