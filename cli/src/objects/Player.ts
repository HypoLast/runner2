import * as Key from "../Key";
import {keyboard, mouse} from "../root";

export class Player extends THREE.Group {
    
    private mesh: THREE.Mesh;
    private velocity = v2(0, 0);

    constructor() {
        super();
        
        new THREE.JSONLoader().load("/models/stick.json", (geom) => {
            this.mesh = new THREE.Mesh(geom, new THREE.MeshLambertMaterial({ color: 0x666666 }));
            this.mesh.castShadow = true;
            this.add(this.mesh);
        } );
        this.castShadow = true;
    }

    public update() {
        if (keyboard.isKeyDown(Key.W) && !keyboard.isKeyDown(Key.S)) {
            this.position.z --;
        } else if (keyboard.isKeyDown(Key.S) && !keyboard.isKeyDown(Key.W)) {
            this.position.z ++;
        }
        
        if (keyboard.isKeyDown(Key.A) && !keyboard.isKeyDown(Key.D)) {
            this.position.x --;
        } else if (keyboard.isKeyDown(Key.D) && !keyboard.isKeyDown(Key.A)) {
            this.position.x ++;
        }
    }
}