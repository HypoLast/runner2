import {MersenneTwister} from "./MersenneTwister";

export interface IDunGenConfig {
    width: number;
    height: number;
    roomAttempts?: number;
    roomSize?: number;
    turnRate?: number;
    roomSizeRange?: number;
    extraConnectionRate?: number;
    maxSectionConnections?: number;
    seed?: number;
}

const adjacencies = [[-1, 0], [1, 0], [0, -1], [0, 1]];

export class Map2d<V> {
    
    public changeLog: [number, number, V][] = [];
    public data: V[] = [];
    constructor(public width: number, public height: number, initializer: V | ((x: number, y: number) => V)) {
        for (let i = 0; i < width * height; i ++) {
            if (typeof initializer === "function") {
                this.data[i] = initializer(i % width, Math.floor(i / width));
            } else {
                this.data[i] = initializer;
            }
        }
    }

    public get(x: number, y: number) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) throw new Error("Index out of bounds");
        return this.data[x + y * this.width];
    }

    public set(x: number, y: number, val: V) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) throw new Error("Index out of bounds");
        this.changeLog.push([x, y, val]);
        return this.data[x + y * this.width] = val;
    }

    public toString(strfn?: (d: V) => string) {
        if (!strfn) strfn = (d) => d.toString();
        return this.data.map(strfn).map( (str, i) => (i + 1) % this.width === 0 ? (str + "\n") : (str + " ") ).join("");
    }

}

export function DunGen(config: IDunGenConfig, seed?: number) {
    let width = config.width;
    let height = config.height;
    let roomAttempts = config.roomAttempts || 50;
    let roomSize = config.roomSize || Math.min(width, height) / 5;
    let turnRate = config.turnRate || 0.15;
    let roomSizeRange = config.roomSizeRange || 0.25;
    let extraConnectionRate = config.extraConnectionRate !== undefined ? config.extraConnectionRate : 0.1;
    let maxSectionConnections = config.maxSectionConnections || 3;
    let sectionLabel = 1;
    let rooms: { x: number, y: number, width: number, height: number }[] = [];
    if (seed === undefined) seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    let mt = new MersenneTwister(seed);

    let maxRoomId = 0;

    let dungeon = new Map2d(width, height, 0);
    roomLoop: for (let i = 0; i < roomAttempts; i ++) {
        let roomWidth = Math.max(5, Math.abs(Math.round(roomSize + (mt.random() - 0.5) * 2 * roomSize * roomSizeRange)));
        if (roomWidth % 2 === 0) roomWidth ++;
        let roomHeight = Math.max(5, Math.abs(Math.round(roomSize + (mt.random() - 0.5) * 2 * roomSize * roomSizeRange)));
        if (roomHeight % 2 === 0) roomHeight ++;
        let x = Math.floor(mt.random() * (width - roomWidth) / 2) * 2 + 1;
        let y = Math.floor(mt.random() * (height - roomHeight) / 2) * 2 + 1;
        for (let u = x; u < x + roomWidth; u ++) {
            for (let v = y; v < y + roomHeight; v ++) {
                if (dungeon.get(u, v) !== 0) {
                    continue roomLoop;
                }
            }
        }
        for (let u = x; u < x + roomWidth; u ++) {
            for (let v = y; v < y + roomHeight; v ++) {
                dungeon.set(u, v, sectionLabel);
            }
        }
        rooms.push({ x, y, width: roomWidth, height: roomHeight });
        maxRoomId = sectionLabel;
        sectionLabel ++;
    }

    function depthFirstMaze(x: number, y: number, direction: 0 | 1 | 2 | 3) {
        dungeon.set(x, y, sectionLabel);
        let tryDirection = direction;
        if (direction === 0 && mt.random() < turnRate) {
            tryDirection = mt.random() < 0.5 ? 1 : 3;
        } else if (direction === 1 && mt.random() < turnRate) {
            tryDirection = mt.random() < 0.5 ? 0 : 2;
        } else if (direction === 2 && mt.random() < turnRate) {
            tryDirection = mt.random() < 0.5 ? 1 : 3;
        } else if (direction === 3 && mt.random() < turnRate) {
            tryDirection = mt.random() < 0.5 ? 0 : 2;
        }
        let flipflop = Math.floor(mt.random() * 2) * 2;
        let attemps = <(0 | 1 | 2 | 3)[]>[tryDirection, (tryDirection + 2) % 4,
                                         (tryDirection + 1 + flipflop) % 4, (tryDirection + 3 + flipflop) % 4];
        for (let dir of attemps) {
            if (dir === (direction + 2) % 4) continue;
            let px = x;
            let py = y;
            let hx = x;
            let hy = y;
            switch(dir) {
                case 0: hx ++; px += 2; break;
                case 1: hy ++; py += 2; break;
                case 2: hx --; px -= 2; break;
                case 3: hy --; py -= 2; break;
            }
            if (px < 0 || px >= dungeon.width || py < 0 || py >= dungeon.height || dungeon.get(px, py) !== 0) continue;
            dungeon.set(hx, hy, sectionLabel);
            depthFirstMaze(px, py, dir);
        }
    }

    let offx = Math.floor(mt.random() * dungeon.width);
    let offy = Math.floor(mt.random() * dungeon.height);
    for (let i = 1; i < dungeon.width; i += 2) {
        for (let j = 1; j < dungeon.height; j += 2) {
            let x = (i + offx) % (dungeon.width - 1);
            let y = (j + offy) % (dungeon.height - 1);
            if (x % 2 === 0) x ++;
            if (y % 2 === 0) y ++;
            if (dungeon.get(x, y) === 0) {
                depthFirstMaze(x, y, mt.random() < 0.5 ? 0 : 1);
                sectionLabel ++;
            }
        }
    }

    let buckets: { [idxMatch: string]: [number, number][] } = {};
    
    for (let i = 1; i < dungeon.width - 1; i ++) {
        for (let j = (i % 2 === 0) ? 1 : 2; j < dungeon.height - 1; j += 2) {
            let a = dungeon.get(i - 1, j) || dungeon.get(i, j - 1);
            let b = dungeon.get(i + 1, j) || dungeon.get(i, j + 1);
            if (a !== 0 && b !== 0 && a !== b) {
                let label = Math.min(a, b) + "," + Math.max(a, b);
                buckets[label] = buckets[label] || [];
                buckets[label].push([i, j]);
            }
        }
    }

    for (let label in buckets) {
        let hallway = parseInt(label.split(",")[1]) > maxRoomId;
        let entrances: number;
        if (hallway) {
            entrances = Math.floor(Math.pow(mt.random(), 2) * maxSectionConnections) + 1;
        } else {
            entrances = Math.round(mt.random());
        }
        for (let i = 0; i < entrances; i ++) {
            let e = buckets[label][Math.floor(mt.random() * buckets[label].length)];
            dungeon.set(e[0], e[1], sectionLabel);
        }
        sectionLabel ++;
    }

    function cullDeadEnd(x: number, y: number, recurse = true) {
        let paths = 0;
        if (dungeon.get(x - 1, y) !== 0) paths ++;
        if (dungeon.get(x + 1, y) !== 0) paths += 2;
        if (dungeon.get(x, y - 1) !== 0) paths += 4;
        if (dungeon.get(x, y + 1) !== 0) paths += 8;
        if (paths === 1 || paths === 2 || paths === 4 || paths === 8) dungeon.set(x, y, 0);
        if (!recurse) return;
        switch(paths) {
            case 1: {
                dungeon.set(x - 1, y, 0);
                cullDeadEnd(x - 2, y);
                break;
            }
            case 2: {
                dungeon.set(x + 1, y, 0);
                cullDeadEnd(x + 2, y);
                break;
            }
            case 4: {
                dungeon.set(x, y - 1, 0);
                cullDeadEnd(x, y - 2);
                break;
            }
            case 8: {
                dungeon.set(x, y + 1, 0);
                cullDeadEnd(x, y + 2);
                break;
            }
        }
    }

    for (let i = 1; i < dungeon.width; i += 2) {
        for (let j = 1; j < dungeon.height; j += 2) {
            if (dungeon.get(i, j) !== 0) cullDeadEnd(i, j);
        }
    }

    for (let i = 1; i < dungeon.width - 1; i ++) {
        for (let j = (i % 2 === 0) ? 1 : 2; j < dungeon.height - 1; j += 2) {
            if (dungeon.get(i, j) !== 0) continue;
            let a = dungeon.get(i - 1, j) || dungeon.get(i, j - 1);
            let b = dungeon.get(i + 1, j) || dungeon.get(i, j + 1);
            if (a !== 0 && b !== 0 && a === b && mt.random() < extraConnectionRate) {
                dungeon.set(i, j, a);
            }
        }
    }
    
    for (let i = 1; i < dungeon.width - 1; i ++) {
        for (let j = 1; j < dungeon.height - 1; j ++) {
            if (dungeon.get(i, j) === 0) dungeon.set(i, j, -1);
        }
    }
    
    function seedSectionCull(x: number, y: number, boundingSquares: [number, number][], sectionBounds = 0): number {
        if (x === 1 || x === dungeon.width - 2 || y === 1 || y === dungeon.height - 2) sectionBounds = -1;
        dungeon.set(x, y, 0);
        for (let off of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]]) {
            let tile = dungeon.get(x + off[0], y + off[1]);
            if (tile === -1) {
                let bounds = seedSectionCull(x + off[0], y + off[1], boundingSquares, sectionBounds);
                if (bounds < 0 || sectionBounds < 0 || (sectionBounds && bounds !== sectionBounds)) sectionBounds = -1;
                else sectionBounds = bounds;
            } else if (tile > 0) {
                if ((sectionBounds && sectionBounds !== tile) || sectionBounds < 0) sectionBounds = -1;
                else {
                    sectionBounds = tile;
                    boundingSquares.push([x + off[0], y + off[1]]);
                }
            }
        }
        return sectionBounds!;
    }
    
    let overall: [number, number][] = [];
    for (let i = 0; i < dungeon.width; i ++) {
        for (let j = 0; j < dungeon.height; j ++) {
            if (dungeon.get(i, j) === -1) {
                let outline: [number, number][] = [];
                if (seedSectionCull(i, j, outline) > 0) {
                    overall = overall.concat(outline);
                }
            }
        }
    }
    for (let point of overall) {
        dungeon.set(point[0], point[1], -2);
    }

    function adjacentToCarved(x: number, y: number) {
        if (dungeon.get(x - 1, y) > 0) return true;
        if (dungeon.get(x + 1, y) > 0) return true;
        if (dungeon.get(x, y - 1) > 0) return true;
        if (dungeon.get(x, y + 1) > 0) return true;
        return false;
    }

    function connectsSelf(x: number, y: number, ownId: number) {
        let selfConnections = 0;
        if (Math.abs(dungeon.get(x - 1, y)) === Math.abs(ownId)) selfConnections ++;
        if (Math.abs(dungeon.get(x + 1, y)) === Math.abs(ownId)) selfConnections ++;
        if (Math.abs(dungeon.get(x, y - 1)) === Math.abs(ownId)) selfConnections ++;
        if (Math.abs(dungeon.get(x, y + 1)) === Math.abs(ownId)) selfConnections ++;
        return selfConnections > 1;
    }
    
    let openList: [number, number, number][] = [];
    let openLabel = -sectionLabel;
    for (let point of overall) {
        if (dungeon.get(point[0], point[1]) < -2) continue;
        if (adjacentToCarved(point[0], point[1])) {
            openList.push([point[0], point[1], openLabel]);
            dungeon.set(point[0], point[1], openLabel);
            openLabel --;
        }
    }

    function paintBack(x: number, y: number, newId: number) {
        let oldId = dungeon.get(x, y);
        if (oldId === newId) return;
        dungeon.set(x, y, newId);
        if (dungeon.get(x - 1, y) === oldId) paintBack(x - 1, y, newId);
        if (dungeon.get(x + 1, y) === oldId) paintBack(x + 1, y, newId);
        if (dungeon.get(x, y - 1) === oldId) paintBack(x, y - 1, newId);
        if (dungeon.get(x, y + 1) === oldId) paintBack(x, y + 1, newId);
    }

    while (openList.length > 0) {
        let cell = openList.shift()!;
        let tile = dungeon.get(cell[0], cell[1]);
        if (tile === cell[2]) {
            if (connectsSelf(cell[0], cell[1], cell[2])) {
                dungeon.set(cell[0], cell[1], 0);
            } else {
                dungeon.set(cell[0], cell[1], -cell[2]);
                for (let off of adjacencies) {
                    if (dungeon.get(cell[0] + off[0], cell[1] + off[1]) < -1) {
                        dungeon.set(cell[0] + off[0], cell[1] + off[1], cell[2]);
                        openList.push([cell[0] + off[0], cell[1] + off[1], cell[2]]);
                    }
                }
            }
        } else if (tile < -2) {
            dungeon.set(cell[0], cell[1], -tile);
            paintBack(cell[0], cell[1], -cell[2]);
            for (let openCell of openList) {
                if (openCell[2] === tile) {
                    if (dungeon.get(openCell[0], openCell[1]) === openCell[2]) {
                        dungeon.set(openCell[0], openCell[1], cell[2]);
                    }
                    openCell[2] = cell[2];
                }
            }
            for (let off of adjacencies) {
                if (dungeon.get(cell[0] + off[0], cell[1] + off[1]) < -1) {
                    dungeon.set(cell[0] + off[0], cell[1] + off[1], cell[2]);
                    openList.push([cell[0] + off[0], cell[1] + off[1], cell[2]]);
                }
            }
        }
    }

    for (let i = 1; i < dungeon.width - 1; i ++) {
        for (let j = 1; j < dungeon.height - 1; j ++) {
            if (dungeon.get(i, j) < 0) dungeon.set(i, j, 0);
            else if ((i % 2 === 0 || j % 2 === 0) && dungeon.get(i, j) !== 0) cullDeadEnd(i, j, false);
        }
    }

    for (let i = 1; i < dungeon.width; i += 2) {
        for (let j = 1; j < dungeon.height; j += 2) {
            if (dungeon.get(i, j) !== 0) cullDeadEnd(i, j);
        }
    }
    return { map: dungeon, rooms, seed };
}

let _dummmy = null! && DunGen({} as any);
export type DunGenPack = typeof _dummmy;