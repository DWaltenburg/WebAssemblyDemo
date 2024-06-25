// console.log('Hello, World!');


WebAssembly.instantiateStreaming(fetch('addition.wasm'), {}).then(obj => {
    console.log("wasm add function test call result: " + obj.instance.exports.add(1, 2));
});

WebAssembly.instantiateStreaming(fetch('fib.wasm'), {}).then(obj => {
    console.log("wasm fib function test call result: "+obj.instance.exports.fib(10));
});

async function runFibBench (iterations = 30, n = 40) {
    let res;
    let wasmFileLoadStart = performance.now();
    await WebAssembly.instantiateStreaming(fetch('fib.wasm'), {}).then(obj => {
    res = obj;
    }
    );
    let wasmFileLoadEnd = performance.now() - wasmFileLoadStart;
    console.log(`WASM file load time: ${wasmFileLoadEnd} ms`);

  const { fib } = res.instance.exports

  bench('WASM', fib, iterations, n)
  bench('JS', fibonacci, iterations, n)
}
/**
 * Function to benchmark the performance of a function
 * @param {string} label Text to identify the benchmark
 * @param {function} fn Function to benchmark
 * @param {int} iterations Times to run the benchmarked function
 * @param {int} n input to the function. In this case, the number of iterations to run the fibonacci function
 */
function bench (label, fn, iterations = 30, n = 40) {
    if (n > 40) n = 40; // to avoid too long execution time
  let observations = [];
  for (let i = 0; i <= iterations; ++i) {
    let start = performance.now()
    fn(n)
    var duration = performance.now() - start
    console.log(`[${label}] current run: ${i} | i'th fibonacci: ${n} | this run duration: ${duration} ms`)
    observations.push(duration)
  }

  const total = observations.reduce((acc, curr) => acc + curr) / 1000;
  const avg = total / iterations;
  const totalFx = Number.parseFloat(total).toFixed(2)
  const avgFx = Number.parseFloat(avg).toFixed(2)
  console.log(`%c [${label}] times run: ${iterations} | i'th fibonacci: ${n} | total: ${totalFx} s | average: ${avgFx} s`, "background: red; color: #fff; font-size: 16px; font-weight: bold; padding: 5px; border-radius: 5px;")
}

function fibonacci (num) {
  if (num <= 1) return 1

  return fibonacci(num - 1) + fibonacci(num - 2)
}

console.log("Start bechmark of fibonacci function by calling runFibBench() function.")
console.log("Example: runFibBench(30, 40)")