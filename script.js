console.log('Hello, World!');


WebAssembly.instantiateStreaming(fetch('addition.wasm'), {}).then(obj => {
    console.log(obj.instance.exports.add(1, 2));
});