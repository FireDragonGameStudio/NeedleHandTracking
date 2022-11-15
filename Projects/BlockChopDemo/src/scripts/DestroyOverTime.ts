import { Behaviour, GameObject, serializeable } from "@needle-tools/engine";

export class DestroyOverTime extends Behaviour {
    @serializeable()
    timeInterval: number = 3;

    private timestep: number = 0;

    update() {
        if (this.timestep < this.timeInterval) {
            this.timestep += this.context.time.deltaTime;
            return;
        }
        GameObject.destroy(this.gameObject);
    }
}
