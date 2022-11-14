import { Behaviour, GameObject } from "@needle-tools/engine";

export class CubeDestroyer extends Behaviour {
    update(): void {
        if (this.gameObject.position.z <= -10) {
            GameObject.destroy(this.gameObject);
        }
    }
}
