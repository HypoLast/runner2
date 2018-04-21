import { StandardTemplateRoomProvider } from "./providers/StandardTemplateRoomProvider";
import { ClassicTileProvider } from "./providers/ClassicTileProvider";
import { DunGen, ETiles } from "./map/DunGen";
import { WorldMap } from "./map/WorldMap";
import { Player } from "./actors/Player";

export class World extends PIXI.Container {
    
    public map: WorldMap;
    public player: Player;

    constructor() {
        super();
    }

    public async init() {
        await StandardTemplateRoomProvider.ready();
        await ClassicTileProvider.ready();
        let dungeon = DunGen(StandardTemplateRoomProvider.templates, { width: 100, height: 100 } );
        this.map = new WorldMap(this, dungeon, ClassicTileProvider);
        this.addChild(this.map);

        this.player = new Player(this);
        this.addChild(this.player.sprite);

        breakpoint: for (let j = 0; j < this.map.dungeon.height; j ++) {
            for (let i = 0; i < this.map.dungeon.width; i ++) {
                if (this.map.dungeon.tiles.get(i, j) === ETiles.EMPTY) {
                    this.player.x = i * 32 + 2;
                    this.player.y = j * 32 + 2;
                    break breakpoint;
                }
            }
        }

        this.player.syncVisuals();
    }

    public update() {
        this.player.update();

        this.player.syncVisuals();
        this.x += (-this.player.x + 1600 / 2 - this.x) / 12;
        this.y += (-this.player.y + 900 / 2 - this.y) / 12;
    }
}