import { AudioSource, Behaviour, GameObject, serializeable } from "@needle-tools/engine";

export class AmbientSound extends Behaviour {
    @serializeable(AudioSource)
    ambientAudio?: AudioSource;

    update() {
        if (this.ambientAudio?.isPlaying) {
            return;
        }
        this.ambientAudio?.play();
    }
}
