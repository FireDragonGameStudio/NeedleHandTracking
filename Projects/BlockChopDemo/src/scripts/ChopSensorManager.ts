import { Behaviour, GameObject, Renderer, serializeable, WebXR } from "@needle-tools/engine";
import { WebXREvent } from "@needle-tools/engine/engine-components/WebXR";
import { ICollider } from "@needle-tools/engine/engine/engine_types";
import { Color, XRSession } from "three";
import { ControllerFollower } from "./ControllerFollower";

export class ChopSensorManager extends Behaviour {
    @serializeable(WebXR)
    webXR?: WebXR;

    @serializeable(GameObject)
    rightChopper: GameObject | null = null;

    @serializeable(GameObject)
    leftChopper: GameObject | null = null;

    // private rendererChop: Renderer | null = null;
    // private chopColor: Color | null = null;

    start() {
        // this.rendererChop = GameObject.getComponent(this.gameObject, Renderer);
        WebXR.addEventListener(WebXREvent.XRStarted, this.onXRSessionStart.bind(this));
    }

    // onTriggerEnter(col: ICollider) {
        // this.chopColor = this.rendererChop?.sharedMaterial["color"];

        // var renderer = GameObject.getComponent(col.gameObject, Renderer);
        // if (!renderer) return;

        // // check for matching colors
        // if (renderer.sharedMaterial["color"].equals(this.chopColor)) {
        //     console.log("MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
        // } else {
        //     console.log("NO MATCH block & chop", renderer.sharedMaterial["color"], this.chopColor);
        // }
    // }

    private onXRSessionStart(_evt: { session: XRSession }) {

        if (!this.rightChopper || !this.leftChopper) return;

        // assign sabers to controllers
        const rightController = this.webXR?.Controllers[1];
        console.log("RIGHT CONTROLLER", rightController);
        if (!rightController) return;

        rightController.showRaycastLine = false;
        const rightFollow = GameObject.getComponent(this.rightChopper, ControllerFollower);
        rightFollow?.setFollowTarget(rightController.controller);

        const leftController = this.webXR?.Controllers[0];
        console.log("LEFT CONTROLLER", leftController);
        if (!leftController) return;

        leftController.showRaycastLine = false;
        const leftFollow = GameObject.getComponent(this.leftChopper, ControllerFollower);
        leftFollow?.setFollowTarget(leftController.controller);
    }
}
