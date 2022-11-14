import { Behaviour } from "@needle-tools/engine";
import { Group } from "three";

export class ControllerFollower extends Behaviour {
    private followTarget: Group | null = null;
    private isFollowing: boolean = false;

    update(): void {
        if (this.isFollowing && this.followTarget) {
            this.gameObject.position.setFromMatrixPosition(this.followTarget.matrixWorld);
            this.gameObject.rotation.setFromRotationMatrix(this.followTarget.matrixWorld);
        }
    }

    setFollowTarget(followThis: Group) {
        this.followTarget = followThis;
        this.isFollowing = true;
    }
}