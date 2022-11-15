import { Behaviour, GameObject, Renderer, serializeable, WebXR } from "@needle-tools/engine";
import { WebXREvent } from "@needle-tools/engine/engine-components/WebXR";
import { XRSession } from "three";
import { ControllerFollower } from "./ControllerFollower";
import { XRHandModelFactory } from "three/examples/jsm/webxr/XRHandModelFactory";
import { ColorSwitcher } from "./ColorSwitcher";

export class ChopSensorManager extends Behaviour {
    @serializeable(WebXR)
    webXR?: WebXR;

    @serializeable(GameObject)
    rightChopper: GameObject | null = null;

    @serializeable(GameObject)
    leftChopper: GameObject | null = null;

    start() {
        // this.rendererChop = GameObject.getComponent(this.gameObject, Renderer);
        WebXR.addEventListener(WebXREvent.XRStarted, this.onXRSessionStart.bind(this));

        const handModelFactory = new XRHandModelFactory();
        const leftHand = this.context.renderer.xr.getHand(0);
        const rightHand = this.context.renderer.xr.getHand(1);

        // add left hand model
        if (leftHand) {
            //const leftHandModel = new OculusHandModel(leftHand);
            const leftHandModel = handModelFactory.createHandModel(leftHand, "mesh");
            leftHand.add(leftHandModel);

            this.context.scene.add(leftHand);
        }
        // add right hand model
        if (rightHand) {
            //const leftHandModel = new OculusHandModel(leftHand);
            const rightHandModel = handModelFactory.createHandModel(rightHand, "mesh");
            rightHand.add(rightHandModel);
            this.context.scene.add(rightHand);
        }
    }

    private onXRSessionStart(_evt: { session: XRSession }) {
        if (!this.rightChopper || !this.leftChopper) return;

        // assign sabers to controllers
        const leftController = this.webXR?.Controllers[0];
        console.log("LEFT CONTROLLER", leftController);
        if (!leftController) return;

        leftController.showRaycastLine = false;
        const leftFollow = GameObject.getComponent(this.leftChopper, ControllerFollower);
        leftFollow?.setFollowTarget(leftController.controller);

        const colorSwitcherLeft = GameObject.getComponent(this.leftChopper, ColorSwitcher);
        leftController.controller.addEventListener("selectend", () => {
            colorSwitcherLeft?.switchChopColor();
        });

        const rightController = this.webXR?.Controllers[1];
        console.log("RIGHT CONTROLLER", rightController);
        if (!rightController) return;

        rightController.showRaycastLine = false;
        const rightFollow = GameObject.getComponent(this.rightChopper, ControllerFollower);
        rightFollow?.setFollowTarget(rightController.controller);

        const colorSwitcherRight = GameObject.getComponent(this.rightChopper, ColorSwitcher);
        rightController.controller.addEventListener("selectend", () => {
            colorSwitcherRight?.switchChopColor();
        });
    }
}
