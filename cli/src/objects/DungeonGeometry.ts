import {DunGenPack} from "../common/DunGen";

let tex = new THREE.TextureLoader().load("/textures/stone_texture.jpg");
tex.wrapS = THREE.RepeatWrapping;
tex.wrapT = THREE.RepeatWrapping;
let mat1 = new THREE.MeshLambertMaterial( { map: tex, side: THREE.FrontSide } );
let mat2 = new THREE.MeshLambertMaterial( { color: 0xFF0000, side: THREE.FrontSide } );

export class DungeonGeometry extends THREE.Group {

    constructor(dungeon: DunGenPack) {
        super();
        this.receiveShadow = true;
        for (let i = 0; i < dungeon.map.width; i ++) {
            for (let j = 0; j < dungeon.map.height; j ++) {
                if (dungeon.map.get(i, j) === 0) {
                    let wall = new THREE.Mesh(new THREE.CubeGeometry(30, 20, 30), mat1);
                    wall.receiveShadow = true;
                    wall.castShadow = true;
                    wall.position.x = i * 30;
                    wall.position.y = 10;
                    wall.position.z = j * 30;
                    this.add(wall);
                } else {
                    let floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30, 3, 3), mat2);
                    floor.rotateX(-Math.PI / 2);
                    floor.receiveShadow = true;
                    floor.position.x = i * 30;
                    floor.position.z = j * 30;
                    this.add(floor);
                }
            }
        }
    }
}