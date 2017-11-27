import * as _THREE from "three";

declare global {
    function v2(x: number, y: number): THREE.Vector2;

    function v3(x: number, y: number, z: number): THREE.Vector3;
    function v3(xy: { x: number, y: number }, z: number): THREE.Vector3;
    const THREE: typeof _THREE;

    class VolumetricFire {
        public static texturePath: string;

        public mesh: THREE.Mesh;
        constructor(width: number, height: number, depth: number, sliceSpacing: number, renderCamera: THREE.Camera);
        public update(totalElapsed: number): void; 
    }
}
