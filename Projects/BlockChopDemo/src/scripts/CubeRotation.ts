import { Behaviour, getComponent, Rigidbody, serializeable } from "@needle-tools/engine";
import { Vector3 } from "three";

export class CubeRotation extends Behaviour {
    @serializeable()
    speed: number = 10;

    private rigidbody: Rigidbody | null = null;
    private eulerAngleVelocity: Vector3 = new Vector3(0, 1, 0);

    start() {
        this.rigidbody = this.gameObject.getComponent(Rigidbody);
        if (this.rigidbody) {
            this.rigidbody.detectCollisions = true;
            this.rigidbody.useGravity = true;
            this.rigidbody.resetVelocities();
            this.rigidbody.setVelocity(0, 1, 0);
            this.rigidbody.applyForce(this.eulerAngleVelocity);
        }
    }
}
