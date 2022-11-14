import { Behaviour, GameObject, Renderer, Rigidbody } from "@needle-tools/engine";
import { ICollider } from "@needle-tools/engine/engine/engine_types";
import { Color, Vector3 } from "three";

export class ChopCube extends Behaviour {
    private rendererChop: Renderer | null = null;
    private chopColor: Color | null = null;

    start(): void {
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
            GameObject.destroy(this.gameObject);
        }
    }

    onTriggerEnter(col: ICollider) {
        if (!this.rendererChop) return;
        this.chopColor = this.rendererChop.sharedMaterial["color"];
        
        var renderer = GameObject.getComponent(col.gameObject, Renderer);
        if (!renderer) return;

        // check for matching colors
        if (renderer.sharedMaterial["color"].equals(this.chopColor)) {
            console.log("CUBE MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
        } else {
            console.log("CUBE NO MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
        }
        // destroy hitted cube
        GameObject.destroy(this.gameObject);
    }
}