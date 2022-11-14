import { Behaviour, GameObject, Renderer, serializeable, WebXR } from "@needle-tools/engine";
import { WebXREvent } from "@needle-tools/engine/engine-components/WebXR";
import { ICollider } from "@needle-tools/engine/engine/engine_types";
import { Color, XRSession } from "three";

export class ChopSensor extends Behaviour {
    @serializeable(WebXR)
    webXR?: WebXR;

    private rendererChop: Renderer | null = null;
    private chopColor: Color | null = null;

    start() {
        this.rendererChop = GameObject.getComponent(this.gameObject, Renderer);
        WebXR.addEventListener(WebXREvent.XRStarted, this.onXRSessionStart.bind(this));
    }

    onTriggerEnter(col: ICollider) {
        this.chopColor = this.rendererChop?.sharedMaterial["color"];

        var renderer = GameObject.getComponent(col.gameObject, Renderer);
        if (!renderer) return;

        // check for matching colors
        if (renderer.sharedMaterial["color"].equals(this.chopColor)) {
            console.log("MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
        } else {
            console.log("NO MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
        }
    }

    private onXRSessionStart(_evt: { session: XRSession }) {
        var parentObject = this.gameObject.parent;
        if (!parentObject) return;

        // assign sabers to controllers
        const rightController = this.webXR?.RightController;
        console.log("RIGHT CONTROLLER", rightController);
        if (!rightController) return;

        rightController.showRaycastLine = false;
        parentObject.position.set(0, 0, 0);
        rightController.controller.add(parentObject);
    }
}
