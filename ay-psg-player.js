class AyPsgPlayer {
    constructor(ctx) {
        this.ctx = ctx;
        this.ready = this._init();
        this.closed = false;
    }

    async _init() {
        await this.ctx.audioWorklet.addModule('./psg-player.js');
        this.worklet = new AudioWorkletNode(this.ctx, 'psg-player');

        return this.worklet;
    }

    passData(data) {
        if (this.closed) return;

        this.ready.then(() => this.worklet?.port.postMessage({ data }, [data.buffer]));
    }

    destroy() {
        if (this.closed) return;

        this.closed = true;

        this.ready.then(() => {
            this.worklet?.port.postMessage({ action: 'close' });
        });
    }

    play() {
        if (this.closed) return;

        this.ready.then(() => this.worklet?.port.postMessage({ action: 'play' }));
    }

    stop() {
        if (this.closed) return;

        this.ready.then(() => this.worklet?.port.postMessage({action: 'stop'}));
    }
}

export default AyPsgPlayer;