import {opts} from "./common/dungeonOpts";
import {DunGen} from "./common/DunGen";
import {networkManager, mouse} from "./root";
import {World} from "./World";

let world = new World();
world.renderer.setSize(1920, 1080);
world.renderer.domElement.style.width = "100vw";
world.renderer.domElement.style.height = "100vh";
document.body.appendChild(world.renderer.domElement);
mouse.setTarget(world.renderer.domElement);

let fps = 0;
let now = Date.now();
function render() {
    fps ++;
    let ticktime = Date.now();
    if (ticktime - now > 1000) {
        console.log(fps);
        fps = 0;
        now = ticktime;
    }
    world.update();
    world.render();
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

networkManager.init();
networkManager.socket.once("init", (m: any) => {
    let dungeon = DunGen(opts, m.map);
    world.buildDungeon(dungeon);
} );
