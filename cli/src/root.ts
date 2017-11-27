// tslint:disable max-classes-per-file
import * as Key from "./Key";

class Juggler {
    private enterFrameFunctions: [(() => void), any][] = [];
    private schedule: number;
    private interFrameTime: number;

    constructor(private fps: number) {
        this.interFrameTime = 1000 / fps;
        this.schedule = Date.now() + this.interFrameTime;
        let tick = () => {
            this.enterFrameFunctions.forEach( ([fn, ctx]) => fn.call(ctx) );
            this.schedule += this.interFrameTime;

            let timeout = this.schedule - Date.now();
            if (timeout < 2) {
                timeout = 2;
                this.schedule = Date.now() + this.interFrameTime;
            }
            setTimeout(tick, timeout);
        };

        setTimeout(tick, this.interFrameTime);
    }

    public add(fn: () => void, context?: any) {
        if (this.has(fn, context) < 0) {
            this.enterFrameFunctions.push([fn, context]);
        }
    }

    public remove(fn: () => void, context?: any) {
        let idx = this.has(fn, context);
        if (idx >= 0) {
            this.enterFrameFunctions.splice(idx, 1);
        }
    }

    public has(fn: () => void, context?: any) {
        for (let [i, oef] of enumerate(this.enterFrameFunctions)) {
            if (oef[0] === fn && oef[1] === context) return i;
        }
        return -1;
    }

    public afterFrames(numFrames: number, fn: () => void, context?: any) {
        let wrapper = () => {
            numFrames --;
            if (numFrames <= 0) {
                fn.call(context);
                this.remove(wrapper);
            }
        };
        this.add(wrapper);
    }
}

// export let juggler = new Juggler(60);

class Keyboard {

    private keys: boolean[] = [];

    constructor() {
        window.addEventListener("keydown", (e) => this.keys[e.keyCode] = true );
        window.addEventListener("keyup", (e) => this.keys[e.keyCode] = false );
    }

    public isKeyDown(keycode: number) {
        return this.keys[keycode] || false;
    }

}

export let keyboard = new Keyboard();

class SoundManager {
    public static GLOBAL_VOLUME = 0.4;
    private music: { [songName: string]: { song: HTMLAudioElement, fade: number } } = {};
    private tags: { [tag: string]: boolean } = {};

    constructor() {
        // juggler.add(() => this.tags = {});
    }

    public playSound(name: string, volume = 1, tag?: string) {
        if (tag) {
            if (!this.tags[tag]) {
                this.tags[tag] = true;
            } else {
                return;
            }
        }
        let audio = new Audio(name);
        audio.volume = volume * SoundManager.GLOBAL_VOLUME;
        audio.play();
        audio.onended = () => audio.remove();
    }

    public playMusic(name: string, volume = 1) {
        if (this.music.hasOwnProperty(name)) {
            if (!isNaN(this.music[name].fade)) window.clearInterval(this.music[name].fade);
            this.music[name].song.volume = volume * SoundManager.GLOBAL_VOLUME;
            return;
        }
        let audio = new Audio(name);
        audio.volume = volume * SoundManager.GLOBAL_VOLUME;
        audio.loop = true;
        audio.play();
        this.music[name] = {
            song: audio,
            fade: NaN,
        };
    }

    public fadeMusicOut(name: string) {
        if (!this.music.hasOwnProperty(name) || !isNaN(this.music[name].fade)) return;
        let fadeStart = this.music[name].song.volume;
        let fadeTime = 30;
        this.music[name].fade = window.setInterval(() => {
            fadeTime --;
            if (fadeTime <= 0) {
                this.music[name].song.pause();
                this.music[name].song.remove();
                window.clearInterval(this.music[name].fade);
                delete this.music[name];
            } else {
                this.music[name].song.volume = fadeTime / 30 * fadeStart;
            }
        }, 16);
    }

    public setMusicVolume(name: string, volume: number) {
        if (!this.music.hasOwnProperty(name)) return;
        this.music[name].song.volume = volume * SoundManager.GLOBAL_VOLUME;
    }
}

export let soundManager = new SoundManager();

class NetworkManager {
    public socket: SocketIOClient.Socket;

    public init() {
        this.socket = io();
    }
}

export let networkManager = new NetworkManager();

class Mouse {

    private target: HTMLElement = document.body;
    private mousePosition = { x: 0, y: 0 };
    private mouseDown = false;

    constructor() {
        window.addEventListener("mousemove", (e) => {
            let rect = this.target.getBoundingClientRect();
            let relX = e.clientX - rect.left;
            let relY = e.clientY - rect.top;
            this.mousePosition = { x: (relX / rect.width - 0.5) * 2, y: -(relY / rect.height - 0.5) * 2 };
        } );

        window.addEventListener("mousedown", () => this.mouseDown = true );
        window.addEventListener("mouseup", () => this.mouseDown = false );
    }

    public position() {
        return this.mousePosition;
    }

    public setTarget(target: HTMLElement) {
        this.target = target;
    }

    public isMouseDown() {
        return this.mouseDown;
    }

}

export let mouse = new Mouse();