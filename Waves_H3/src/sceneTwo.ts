import { Model, SceneState } from './model'
import { Scene } from './scene'

export class SceneTwo extends Scene {

    constructor(model: Model) {
        super(model)
    }

    update(): void {
        super.update()

        let tempColor = this.model.colorData.secondColor.slice(0)
        tempColor = '0x' + tempColor;

    }
}