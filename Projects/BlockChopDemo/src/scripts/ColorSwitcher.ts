import { Behaviour, GameObject, Renderer, serializeable, Text } from "@needle-tools/engine";
import { Color } from "three";

export class ColorSwitcher extends Behaviour {
    @serializeable(Text)
    rendererChop: Renderer | null = null;

    private chopColor: Color[] = [];
    private chopColorIndex: number = 0;

    start() {
        if (!this.rendererChop) {
            this.rendererChop = GameObject.getComponentInChildren(this.gameObject, Renderer);
        }
        this.chopColor.push(new Color("lime"));
        this.chopColor.push(new Color("red"));
        this.chopColor.push(new Color("blue"));
    }

    switchChopColor() {
        if (!this.rendererChop) return;
        const newColor = this.chopColor[this.chopColorIndex++ % this.chopColor.length];
        console.log("saber color", newColor);
        this.rendererChop.sharedMaterial["color"] = newColor;
    }
}
