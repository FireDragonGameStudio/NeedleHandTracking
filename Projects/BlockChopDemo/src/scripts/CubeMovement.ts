import { Behaviour, GameObject, Rigidbody } from "@needle-tools/engine";
import { Vector3 } from "three";

export class CubeMovement extends Behaviour {
    start(): void {
        const rigidbody = GameObject.getComponent(this.gameObject, Rigidbody);
        if (!rigidbody) return;

        // get that cube moving
        rigidbody.resetForcesAndTorques();
        rigidbody.resetVelocities();
        rigidbody?.applyImpulse(new Vector3(0, 0, -10));
    }
}
