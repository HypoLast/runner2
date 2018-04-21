var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./map/DunGen", "./root", "./World"], function (require, exports, DunGen_1, root_1, World_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function DungeonToString(dungeon) {
        var repr = "\n";
        for (var j = 0; j < dungeon.height; j++) {
            for (var i = 0; i < dungeon.width; i++) {
                switch (dungeon.tiles.get(i, j)) {
                    case DunGen_1.ETiles.SOLID:
                        repr += "██";
                        break;
                    case DunGen_1.ETiles.EMPTY:
                        repr += "  ";
                        break;
                    case DunGen_1.ETiles.WALL:
                        repr += "██";
                        break;
                    case DunGen_1.ETiles.TOP_DOOR:
                        repr += "^^";
                        break;
                    case DunGen_1.ETiles.BOTTOM_DOOR:
                        repr += "vv";
                        break;
                    case DunGen_1.ETiles.LEFT_DOOR:
                        repr += "<<";
                        break;
                    case DunGen_1.ETiles.RIGHT_DOOR:
                        repr += ">>";
                        break;
                    case DunGen_1.ETiles.LADDER:
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
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var app, world, fps, lastTick, fpsDisplay;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app = new PIXI.Application({
                            width: 1600,
                            height: 900,
                            backgroundColor: 0x161616,
                        });
                        document.body.appendChild(app.view);
                        root_1.root.setApp(app);
                        world = window.world = new World_1.World();
                        app.stage.addChild(world);
                        return [4 /*yield*/, world.init()];
                    case 1:
                        _a.sent();
                        fps = 60;
                        lastTick = 0;
                        fpsDisplay = new PIXI.Text("0", { align: "right", fontFamily: "Courier New", fontSize: 17, stroke: 0xFFFFFF, strokeThickness: 0.5 });
                        fpsDisplay.anchor.set(1);
                        fpsDisplay.x = app.view.width;
                        fpsDisplay.y = app.view.height;
                        app.stage.addChild(fpsDisplay);
                        root_1.juggler.add(function () {
                            world.update();
                            if (lastTick > 0) {
                                var tick = Date.now();
                                if (!isFinite(fps)) {
                                    fps = 1000 / (tick - lastTick);
                                }
                                else {
                                    fps = fps * 0.99 + (1000 / (tick - lastTick)) * 0.01;
                                }
                                lastTick = tick;
                            }
                            else {
                                lastTick = Date.now();
                            }
                            fpsDisplay.text = fps.toFixed(1);
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
    window.onload = main;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSUEseUJBQXlCLE9BQWdCO1FBQ3JDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUUsQ0FBQztZQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFHLEVBQUUsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxlQUFNLENBQUMsS0FBSzt3QkFBRSxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLEtBQUssQ0FBQztvQkFDdkMsS0FBSyxlQUFNLENBQUMsS0FBSzt3QkFBRSxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLEtBQUssQ0FBQztvQkFDdkMsS0FBSyxlQUFNLENBQUMsSUFBSTt3QkFBRSxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLEtBQUssQ0FBQztvQkFDdEMsS0FBSyxlQUFNLENBQUMsUUFBUTt3QkFBRSxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLEtBQUssQ0FBQztvQkFDMUMsS0FBSyxlQUFNLENBQUMsV0FBVzt3QkFBRSxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLEtBQUssQ0FBQztvQkFDN0MsS0FBSyxlQUFNLENBQUMsU0FBUzt3QkFBRSxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLEtBQUssQ0FBQztvQkFDM0MsS0FBSyxlQUFNLENB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RHVuZ2VvbiwgRVRpbGVzIH0gZnJvbSBcIi4vbWFwL0R1bkdlblwiO1xyXG5pbXBvcnQgeyByb290LCBqdWdnbGVyIH0gZnJvbSBcIi4vcm9vdFwiO1xyXG5pbXBvcnQgeyBXb3JsZCB9IGZyb20gXCIuL1dvcmxkXCI7XHJcblxyXG5mdW5jdGlvbiBEdW5nZW9uVG9TdHJpbmcoZHVuZ2VvbjogRHVuZ2Vvbik6IHN0cmluZyB7XHJcbiAgICBsZXQgcmVwciA9IFwiXFxuXCI7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGR1bmdlb24uaGVpZ2h0OyBqICsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkdW5nZW9uLndpZHRoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZHVuZ2Vvbi50aWxlcy5nZXQoaSwgaikpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRVRpbGVzLlNPTElEOiByZXByICs9IFwi4paI4paIXCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFVGlsZXMuRU1QVFk6IHJlcHIgKz0gXCIgIFwiOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRVRpbGVzLldBTEw6IHJlcHIgKz0gXCLilojilohcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVUaWxlcy5UT1BfRE9PUjogcmVwciArPSBcIl5eXCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFVGlsZXMuQk9UVE9NX0RPT1I6IHJlcHIgKz0gXCJ2dlwiOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRVRpbGVzLkxFRlRfRE9PUjogcmVwciArPSBcIjw8XCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFVGlsZXMuUklHSFRfRE9PUjogcmVwciArPSBcIj4+XCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFVGlsZXMuTEFEREVSOiByZXByICs9IFwiVFRcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXByICs9IFwiPz9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXByICs9IFwiXFxuXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVwcjtcclxufVxyXG4od2luZG93IGFzIGFueSkuRHVuZ2VvblRvU3RyaW5nID0gRHVuZ2VvblRvU3RyaW5nO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcclxuICAgIGxldCBhcHAgPSBuZXcgUElYSS5BcHBsaWNhdGlvbigge1xyXG4gICAgICAgIHdpZHRoOiAxNjAwLFxyXG4gICAgICAgIGhlaWdodDogOTAwLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogMHgxNjE2MTYsXHJcbiAgICB9ICk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcclxuICAgIHJvb3Quc2V0QXBwKGFwcCk7XHJcbiAgICBsZXQgd29ybGQgPSAod2luZG93IGFzIGFueSkud29ybGQgPSBuZXcgV29ybGQoKTtcclxuICAgIGFwcC5zdGFnZS5hZGRDaGlsZCh3b3JsZCk7XHJcbiAgICBhd2FpdCB3b3JsZC5pbml0KCk7XHJcblxyXG4gICAgbGV0IGZwcyA9IDYwO1xyXG4gICAgbGV0IGxhc3RUaWNrID0gMDtcclxuXHJcbiAgICBsZXQgZnBzRGlzcGxheSA9IG5ldyBQSVhJLlRleHQoXCIwXCIsIHsgYWxpZ246IFwicmlnaHRcIiwgZm9udEZhbWlseTogXCJDb3VyaWVyIE5ld1wiLCBmb250U2l6ZTogMTcsIHN0cm9rZTogMHhGRkZGRkYsIHN0cm9rZVRoaWNrbmVzczogMC41IH0gKTtcclxuICAgIGZwc0Rpc3BsYXkuYW5jaG9yLnNldCgxKTtcclxuICAgIGZwc0Rpc3BsYXkueCA9IGFwcC52aWV3LndpZHRoO1xyXG4gICAgZnBzRGlzcGxheS55ID0gYXBwLnZpZXcuaGVpZ2h0O1xyXG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKGZwc0Rpc3BsYXkpO1xyXG5cclxuICAgIGp1Z2dsZXIuYWRkKCAoKSA9PiB7XHJcbiAgICAgICAgd29ybGQudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChsYXN0VGljayA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHRpY2sgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICBpZiAoIWlzRmluaXRlKGZwcykpIHtcclxuICAgICAgICAgICAgICAgIGZwcyA9IDEwMDAgLyAodGljayAtIGxhc3RUaWNrKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZwcyA9IGZwcyAqIDAuOTkgKyAoMTAwMCAvICh0aWNrIC0gbGFzdFRpY2spKSAqIDAuMDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFzdFRpY2sgPSB0aWNrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxhc3RUaWNrID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZwc0Rpc3BsYXkudGV4dCA9IGZwcy50b0ZpeGVkKDEpO1xyXG4gICAgfSApO1xyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gbWFpbjsiXX0=