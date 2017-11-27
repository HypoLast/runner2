import {DungeonGeometry} from "./objects/DungeonGeometry";
import {DunGenPack} from "./common/DunGen";
import * as Key from "./Key";
import {keyboard, mouse} from "./root";
import {Player} from "./objects/Player";

const groundPlane = new THREE.Plane(v3(0, 1, 0), 0);
const speed = 0.4;

export class World {
    public camera = new THREE.PerspectiveCamera(75, 16/9, 0.1, 1000);
    public scene = new THREE.Scene();
    public player: Player;
    public renderer: THREE.WebGLRenderer;
    private overhead: THREE.DirectionalLight;
    
    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        let ambience = new THREE.AmbientLight(0xFFFFFF, 0.4);
        this.scene.add(ambience);

        let overhead = this.overhead = new THREE.DirectionalLight(0xFFFFFF, 0.4);
        overhead.position.set(-24, 30, 12);
        this.scene.add(overhead);

        this.player = new Player();
        this.scene.add(this.player);
    }

    public update() {
        this.player.update();
        this.camera.position.set(this.player.position.x, this.player.position.y + 70, this.player.position.z + 35);
        this.camera.lookAt(this.player.position);
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }

    public buildDungeon(dungeon: DunGenPack) {
        let geom = new DungeonGeometry(dungeon);
        geom.position.x = 50;
        geom.position.z = 50;
        this.scene.add(geom);
        let startingRoom = dungeon.rooms[0];
        this.player.position.x = startingRoom.x * 30 + startingRoom.width * 30 / 2;
        this.player.position.z = startingRoom.y * 30 + startingRoom.height * 30 / 2;
    }
}