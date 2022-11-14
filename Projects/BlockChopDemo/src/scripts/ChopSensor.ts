import { Behaviour, GameObject, Renderer, serializeable, Text } from "@needle-tools/engine";
import { WebXREvent } from "@needle-tools/engine/engine-components/WebXR";
import { ICollider } from "@needle-tools/engine/engine/engine_types";
import { Color, XRSession } from "three";

export class ChopSensor extends Behaviour {
    @serializeable(Text)
    scoreText: Text | null = null;

    private rendererChop: Renderer | null = null;
    private chopColor: Color | null = null;
    private currentScoreCount: number = 0;

    start() {
        this.rendererChop = GameObject.getComponent(this.gameObject, Renderer);
    }

    onTriggerEnter(col: ICollider) {
        if (!this.rendererChop) return;
        if (!this.scoreText) return;

        this.currentScoreCount = Number(this.scoreText.text);
        this.chopColor = this.rendererChop.sharedMaterial["color"];

        var renderer = GameObject.getComponent(col.gameObject, Renderer);
        if (!renderer) return;

        // check for matching colors
        if (renderer.sharedMaterial["color"].equals(this.chopColor)) {
            console.log("SENSOR MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
            this.currentScoreCount++;
        } else {
            console.log("SENSOR NO MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
        }
        
        this.scoreText.text = this.currentScoreCount.toString();
    }
}
