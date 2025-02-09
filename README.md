# Web AY-3-8912 PSG player

[Demo of the player](https://jsmith01.github.io/web-ay/)

It is a simple web player for AY-3-8912 PSG music files. To convert music files from tracker format to PSG,
[Vortex Tracker](https://github.com/ivanpirog/vortextracker) can be used.

It is based on the code of two fascinating projects by Matt Westcott:
    * [aychip](https://github.com/reverietracker/aychip)
    * [psgformat](https://github.com/reverietracker/psgformat)

I also peeked into [zxtracker2wav](https://github.com/reverietracker/zxtracker2wav)
to get some ideas on how to properly use aforementioned libraries.

Unfortunately, due to Web Audio worklet limitations the simplest way to include libraries was copying their code.
Additionally, I had to modify `psgformat` (from that I only took reader part) to work within browser environment.


## Usage

It requires node.js or some other http server to run. Just open `index.html` in your browser.

To start included web server, run `npm start` and open [http://localhost:3000/](http://localhost:3000/) in your browser.


## Technical details

`AyPsgPlayer` class is responsible for playing music. It is a thin wrapper around worklet node, that receives PSG data
and plays it. `AyPsgPlayer` needs an instance of `AudioContext` to work, and its `ready` property contains a promise,
that resolves with the `AudioWorkletNode` instance, that later is connected to the context's destination.

This is intentional to allow custom output.

PSG files might be quite big for chip-tune music, so additional one-liner `unpackGzip` allows to use files like `music.psg.gz`.


## License

MIT
