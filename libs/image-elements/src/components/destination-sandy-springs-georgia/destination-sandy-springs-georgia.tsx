import { Component, h } from '@stencil/core';
import * as BABYLON from 'babylonjs';

@Component({
  tag: 'drp-destination-sandy-springs-georgia',
  styleUrl: 'destination-sandy-springs-georgia.scss',
  shadow: true,
})
export class DestinationSandySpringsGeorgia {
  private canvasElement!: HTMLCanvasElement;
  private engine!: BABYLON.Engine;
  private camera!: BABYLON.ArcRotateCamera;

  createScene(): BABYLON.Scene {
    let scene = new BABYLON.Scene(this.engine);
    this.camera = new BABYLON.ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2.5,
      3,
      new BABYLON.Vector3(0, 5, -10),
      scene
    );
    this.camera.attachControl(this.canvasElement, true);
    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    BABYLON.MeshBuilder.CreateBox('box', {}, scene);

    // Create a built-in "ground" shape.
    /*BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: 6, height: 6, subdivisions: 2 },
      scene
    );*/
    return scene;
  }

  componentDidLoad() {
    if (this.canvasElement) {
      this.engine = new BABYLON.Engine(this.canvasElement, true);
      const scene = this.createScene();

      this.engine.runRenderLoop(() => {
        scene.render();
      });
    }
  }

  render() {
    return (
      <div class="drp-destination-sandy-springs-georgia">
        <canvas
          id="renderCanvas"
          ref={(el) => (this.canvasElement = el as HTMLCanvasElement)}
        ></canvas>
      </div>
    );
  }
}
