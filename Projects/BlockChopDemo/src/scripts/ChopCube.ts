import { AudioSource, Behaviour, GameObject, InstantiateOptions, Renderer, Rigidbody, serializeable } from "@needle-tools/engine";
import { ICollider } from "@needle-tools/engine/engine/engine_types";
import { Color, Object3D, Vector3 } from "three";

export class ChopCube extends Behaviour {
    @serializeable(Object3D)
    scatteredPrefab?: Object3D;
    @serializeable(AudioSource)
    cubeSlashAudio?: AudioSource;

    private rendererChop: Renderer | null = null;
    private chopColor: Color | null = null;

    onEnable(): void {
        const rigidbody = GameObject.getComponent(this.gameObject, Rigidbody);
        if (!rigidbody) return;

        this.rendererChop = GameObject.getComponent(this.gameObject, Renderer);
        if (!this.rendererChop) return;

        // get that cube moving
        rigidbody.resetForcesAndTorques();
        rigidbody.resetVelocities();
        rigidbody?.applyImpulse(new Vector3(0, 0, -10));
    }

    update(): void {
        if (this.gameObject.position.z <= -10) {
            GameObject.setActive(this.gameObject, false);
        }
    }

    onTriggerEnter(col: ICollider) {
        if (!this.rendererChop) return;
        this.chopColor = this.rendererChop.sharedMaterial["color"];

        var renderer = GameObject.getComponent(col.gameObject, Renderer);
        if (!renderer) return;

        // check for matching colors
        if (renderer.sharedMaterial["color"].equals(this.chopColor)) {
            // console.log("CUBE MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
            if (this.scatteredPrefab) {
                const opts = new InstantiateOptions();
                const scatteredCubeInstance = GameObject.instantiate(this.scatteredPrefab, opts);
                if (scatteredCubeInstance) {
                    scatteredCubeInstance.position.set(this.gameObject.position.x, this.gameObject.position.y, this.gameObject.position.z);
                    GameObject.setActive(scatteredCubeInstance, true);
                }
            }

            if (this.cubeSlashAudio?.isPlaying) {
                this.cubeSlashAudio.stop();
            }
            this.cubeSlashAudio?.play();
        } else {
            // console.log("CUBE NO MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
        }
        // return hitted cube to pool
        GameObject.setActive(this.gameObject, false);
    }
}
