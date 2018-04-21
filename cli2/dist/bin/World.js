var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
define(["require", "exports", "./providers/StandardTemplateRoomProvider", "./providers/ClassicTileProvider", "./map/DunGen", "./map/WorldMap", "./actors/Player"], function (require, exports, StandardTemplateRoomProvider_1, ClassicTileProvider_1, DunGen_1, WorldMap_1, Player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var World = /** @class */ (function (_super) {
        __extends(World, _super);
        function World() {
            return _super.call(this) || this;
        }
        World.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dungeon, j, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, StandardTemplateRoomProvider_1.StandardTemplateRoomProvider.ready()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, ClassicTileProvider_1.ClassicTileProvider.ready()];
                        case 2:
                            _a.sent();
                            dungeon = DunGen_1.DunGen(StandardTemplateRoomProvider_1.StandardTemplateRoomProvider.templates, { width: 100, height: 100 });
                            this.map = new WorldMap_1.WorldMap(this, dungeon, ClassicTileProvider_1.ClassicTileProvider);
                            this.addChild(this.map);
                            this.player = new Player_1.Player(this);
                            this.addChild(this.player.sprite);
                            breakpoint: for (j = 0; j < this.map.dungeon.height; j++) {
                                for (i = 0; i < this.map.dungeon.width; i++) {
                                    if (this.map.dungeon.tiles.get(i, j) === DunGen_1.ETiles.EMPTY) {
                                        this.player.x = i * 32 + 2;
                                        this.player.y = j * 32 + 2;
                                        break breakpoint;
                                    }
                                }
                            }
                            this.player.syncVisuals();
                            return [2 /*return*/];
                    }
                });
            });
        };
        World.prototype.update = function () {
            this.player.update();
            this.player.syncVisuals();
            this.x += (-this.player.x + 1600 / 2 - this.x) / 12;
            this.y += (-this.player.y + 900 / 2 - this.y) / 12;
        };
        return World;
    }(PIXI.Container));
    exports.World = World;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ybGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvV29ybGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTUE7UUFBMkIseUJBQWM7UUFLckM7bUJBQ0ksaUJBQU87UUFDWCxDQUFDO1FBRVksb0JBQUksR0FBakI7Ozs7O2dDQUNJLHFCQUFNLDJEQUE0QixDQUFDLEtBQUssRUFBRSxFQUFBOzs0QkFBMUMsU0FBMEMsQ0FBQzs0QkFDM0MscUJBQU0seUNBQW1CLENBQUMsS0FBSyxFQUFFLEVBQUE7OzRCQUFqQyxTQUFpQyxDQUFDOzRCQUM5QixPQUFPLEdBQUcsZUFBTSxDQUFDLDJEQUE0QixDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFFLENBQUM7NEJBQzNGLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxtQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUseUNBQW1CLENBQUMsQ0FBQzs0QkFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBRXhCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFFbEMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRSxDQUFDO2dDQUM1RCxHQUFHLENBQUMsQ0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFHLEVBQUUsQ0FBQztvQ0FDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0NBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dDQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzt3Q0FDM0IsS0FBSyxDQUFDLFVBQVUsQ0FBQztvQ0FDckIsQ0FBQztnQ0FDTCxDQUFDOzRCQUNMLENBQUM7NEJBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7U0FDN0I7UUFFTSxzQkFBTSxHQUFiO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVyQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNwRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkQsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQUFDLEFBdkNELENBQTJCLElBQUksQ0FBQyxTQUFTLEdBdUN4QztJQXZDWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIgfSBmcm9tIFwiLi9wcm92aWRlcnMvU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlclwiO1xyXG5pbXBvcnQgeyBDbGFzc2ljVGlsZVByb3ZpZGVyIH0gZnJvbSBcIi4vcHJvdmlkZXJzL0NsYXNzaWNUaWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRHVuR2VuLCBFVGlsZXMgfSBmcm9tIFwiLi9tYXAvRHVuR2VuXCI7XHJcbmltcG9ydCB7IFdvcmxkTWFwIH0gZnJvbSBcIi4vbWFwL1dvcmxkTWFwXCI7XHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL2FjdG9ycy9QbGF5ZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JsZCBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuICAgIFxyXG4gICAgcHVibGljIG1hcDogV29ybGRNYXA7XHJcbiAgICBwdWJsaWMgcGxheWVyOiBQbGF5ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgaW5pdCgpIHtcclxuICAgICAgICBhd2FpdCBTdGFuZGFyZFRlbXBsYXRlUm9vbVByb3ZpZGVyLnJlYWR5KCk7XHJcbiAgICAgICAgYXdhaXQgQ2xhc3NpY1RpbGVQcm92aWRlci5yZWFkeSgpO1xyXG4gICAgICAgIGxldCBkdW5nZW9uID0gRHVuR2VuKFN0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIudGVtcGxhdGVzLCB7IHdpZHRoOiAxMDAsIGhlaWdodDogMTAwIH0gKTtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBXb3JsZE1hcCh0aGlzLCBkdW5nZW9uLCBDbGFzc2ljVGlsZVByb3ZpZGVyKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMubWFwKTtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5wbGF5ZXIuc3ByaXRlKTtcclxuXHJcbiAgICAgICAgYnJlYWtwb2ludDogZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm1hcC5kdW5nZW9uLmhlaWdodDsgaiArKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWFwLmR1bmdlb24ud2lkdGg7IGkgKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcC5kdW5nZW9uLnRpbGVzLmdldChpLCBqKSA9PT0gRVRpbGVzLkVNUFRZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIueCA9IGkgKiAzMiArIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIueSA9IGogKiAzMiArIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWsgYnJlYWtwb2ludDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3luY1Zpc3VhbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXllci5zeW5jVmlzdWFscygpO1xyXG4gICAgICAgIHRoaXMueCArPSAoLXRoaXMucGxheWVyLnggKyAxNjAwIC8gMiAtIHRoaXMueCkgLyAxMjtcclxuICAgICAgICB0aGlzLnkgKz0gKC10aGlzLnBsYXllci55ICsgOTAwIC8gMiAtIHRoaXMueSkgLyAxMjtcclxuICAgIH1cclxufSJdfQ==