import { Dungeon, ETiles } from "./map/DunGen";
import { root, juggler } from "./root";
import { World } from "./World";

function DungeonToString(dungeon: Dungeon): string {
    let repr = "\n";
    for (let j = 0; j < dungeon.height; j ++) {
        for (let i = 0; i < dungeon.width; i ++) {
            switch (dungeon.tiles.get(i, j)) {
                case ETiles.SOLID: repr += "██"; break;
                case ETiles.EMPTY: repr += "  "; break;
                case ETiles.WALL: repr += "██"; break;
                case ETiles.TOP_DOOR: repr += "^^"; break;
                case ETiles.BOTTOM_DOOR: repr += "vv"; break;
                case ETiles.LEFT_DOOR: repr += "<<"; break;
                case ETiles.RIGHT_DOOR: repr += ">>"; break;
                case ETiles.LADDER: repr += "TT"; break;
                default: repr += "??";
            }
        }
        repr += "\n";
    }
    return repr;
}
(window as any).DungeonToString = DungeonToString;

async function main() {
    let app = new PIXI.Application( {
        width: 1600,
        height: 900,
        backgroundColor: 0x161616,
    } );
    document.body.appendChild(app.view);
    root.setApp(app);
    let world = (window as any).world = new World();
    app.stage.addChild(world);
    await world.init();

    let fps = 60;
    let lastTick = 0;

    let fpsDisplay = new PIXI.Text("0", { align: "right", fontFamily: "Courier New", fontSize: 17, stroke: 0xFFFFFF, strokeThickness: 0.5 } );
    fpsDisplay.anchor.set(1);
    fpsDisplay.x = app.view.width;
    fpsDisplay.y = app.view.height;
    app.stage.addChild(fpsDisplay);

    juggler.add( () => {
        world.update();

        if (lastTick > 0) {
            let tick = Date.now();
            if (!isFinite(fps)) {
                fps = 1000 / (tick - lastTick);
            } else {
                fps = fps * 0.99 + (1000 / (tick - lastTick)) * 0.01;
            }
            lastTick = tick;
        } else {
            lastTick = Date.now();
        }

        fpsDisplay.text = fps.toFixed(1);
    } );
}

window.addEventListener("load", main);