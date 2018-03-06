define(["require", "exports", "./TemplateRoom", "./DunGen"], function (require, exports, TemplateRoom_1, DunGen_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function DungeonToString(dungeon) {
        var repr = "\n";
        for (var j = 0; j < dungeon.height; j++) {
            for (var i = 0; i < dungeon.width; i++) {
                switch (dungeon.tiles.get(i, j)) {
                    case -1:
                        repr += "██";
                        break;
                    case 0:
                        repr += "  ";
                        break;
                    case 1:
                        repr += "██";
                        break;
                    case 2:
                        repr += "^^";
                        break;
                    case 3:
                        repr += "vv";
                        break;
                    case 4:
                        repr += "<<";
                        break;
                    case 5:
                        repr += ">>";
                        break;
                    case 6:
                        repr += "TT";
                        break;
                    default: repr += "??";
                }
            }
            repr += "\n";
        }
        return repr;
    }
    window.DungeonToString = DungeonToString;
    var req = new XMLHttpRequest();
    req.open("GET", "/templates.json");
    req.addEventListener("load", function (e) {
        var templates = JSON.parse(this.responseText).map(function (d) { return new TemplateRoom_1.TemplateRoom(d); });
        // templates.forEach( (t) => console.log(t.toString()) );
        window.dungeon = DunGen_1.DunGen(templates, { height: 100, width: 100 });
    });
    req.send();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBLHlCQUF5QixPQUFnQjtRQUNyQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFFLENBQUM7WUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRyxFQUFFLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEtBQUssQ0FBQyxDQUFDO3dCQUFFLElBQUksSUFBSSxJQUFJLENBQUM7d0JBQUMsS0FBSyxDQUFDO29CQUM3QixLQUFLLENBQUM7d0JBQUUsSUFBSSxJQUFJLElBQUksQ0FBQzt3QkFBQyxLQUFLLENBQUM7b0JBQzVCLEtBQUssQ0FBQzt3QkFBRSxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLEtBQUssQ0FBQztvQkFDNUIsS0FBSyxDQUFDO3dCQUFFLElBQUksSUFBSSxJQUFJLENBQUM7d0JBQUMsS0FBSyxDQUFDO29CQUM1QixLQUFLLENBQUM7d0JBQUUsSUFBSSxJQUFJLElBQUksQ0FBQzt3QkFBQyxLQUFLLENBQUM7b0JBQzVCLEtBQUssQ0FBQzt3QkFBRSxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLEtBQUssQ0FBQztvQkFDNUIsS0FBSyxDQUFDO3dCQUFFLElBQUksSUFBSSxJQUFJLENBQUM7d0JBQUMsS0FBSyxDQUFDO29CQUM1QixLQUFLLENBQUM7d0JBQUUsSUFBSSxJQUFJLElBQUksQ0FBQzt3QkFBQyxLQUFLLENBQUM7b0JBQzVCLFNBQVMsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFDMUIsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLElBQUksSUFBSSxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDQSxNQUFjLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUVsRCxJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0lBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDbkMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFTLENBQUM7UUFDbkMsSUFBSSxTQUFTLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBRSxVQUFDLENBQWEsSUFBSyxPQUFBLElBQUksMkJBQVksQ0FBQyxDQUFDLENBQUMsRUFBbkIsQ0FBbUIsQ0FBRSxDQUFDO1FBQzVHLHlEQUF5RDtRQUN4RCxNQUFjLENBQUMsT0FBTyxHQUFHLGVBQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUMsQ0FBRSxDQUFDO0lBQ0osR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVSb29tIH0gZnJvbSBcIi4vVGVtcGxhdGVSb29tXCI7XHJcbmltcG9ydCB7IER1bkdlbiwgRHVuZ2VvbiB9IGZyb20gXCIuL0R1bkdlblwiO1xyXG5cclxuZnVuY3Rpb24gRHVuZ2VvblRvU3RyaW5nKGR1bmdlb246IER1bmdlb24pOiBzdHJpbmcge1xyXG4gICAgbGV0IHJlcHIgPSBcIlxcblwiO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBkdW5nZW9uLmhlaWdodDsgaiArKykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHVuZ2Vvbi53aWR0aDsgaSArKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGR1bmdlb24udGlsZXMuZ2V0KGksIGopKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIC0xOiByZXByICs9IFwi4paI4paIXCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXByICs9IFwiICBcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJlcHIgKz0gXCLilojilohcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6IHJlcHIgKz0gXCJeXlwiOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzogcmVwciArPSBcInZ2XCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXByICs9IFwiPDxcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJlcHIgKz0gXCI+PlwiOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjogcmVwciArPSBcIlRUXCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmVwciArPSBcIj8/XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVwciArPSBcIlxcblwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcHI7XHJcbn1cclxuKHdpbmRvdyBhcyBhbnkpLkR1bmdlb25Ub1N0cmluZyA9IER1bmdlb25Ub1N0cmluZztcclxuXHJcbmxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxucmVxLm9wZW4oXCJHRVRcIiwgXCIvdGVtcGxhdGVzLmpzb25cIik7XHJcbnJlcS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBsZXQgdGVtcGxhdGVzOiBUZW1wbGF0ZVJvb21bXSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpLm1hcCggKGQ6IG51bWJlcltdW10pID0+IG5ldyBUZW1wbGF0ZVJvb20oZCkgKTtcclxuICAgIC8vIHRlbXBsYXRlcy5mb3JFYWNoKCAodCkgPT4gY29uc29sZS5sb2codC50b1N0cmluZygpKSApO1xyXG4gICAgKHdpbmRvdyBhcyBhbnkpLmR1bmdlb24gPSBEdW5HZW4odGVtcGxhdGVzLCB7IGhlaWdodDogMTAwLCB3aWR0aDogMTAwIH0pO1xyXG59ICk7XHJcbnJlcS5zZW5kKCk7Il19