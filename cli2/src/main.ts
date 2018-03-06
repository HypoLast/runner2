import { TemplateRoom } from "./TemplateRoom";
import { DunGen, Dungeon } from "./DunGen";

function DungeonToString(dungeon: Dungeon): string {
    let repr = "\n";
    for (let j = 0; j < dungeon.height; j ++) {
        for (let i = 0; i < dungeon.width; i ++) {
            switch (dungeon.tiles.get(i, j)) {
                case -1: repr += "██"; break;
                case 0: repr += "  "; break;
                case 1: repr += "██"; break;
                case 2: repr += "^^"; break;
                case 3: repr += "vv"; break;
                case 4: repr += "<<"; break;
                case 5: repr += ">>"; break;
                case 6: repr += "TT"; break;
                default: repr += "??";
            }
        }
        repr += "\n";
    }
    return repr;
}
(window as any).DungeonToString = DungeonToString;

let req = new XMLHttpRequest();
req.open("GET", "/templates.json");
req.addEventListener("load", function(e) {
    let templates: TemplateRoom[] = JSON.parse(this.responseText).map( (d: number[][]) => new TemplateRoom(d) );
    // templates.forEach( (t) => console.log(t.toString()) );
    (window as any).dungeon = DunGen(templates, { height: 100, width: 100 });
} );
req.send();