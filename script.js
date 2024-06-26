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

  const fib = res.instance.exports.fib;
  const fib_optimized = n > 40 ? res.instance.exports.fib_o_i64 : res.instance.exports.fib_o_i32;
  // n = n > 92 ? 92 : n;
  // bench('WASM', fib, iterations, n)
  bench('WASM optimized', fib_optimized, iterations, n>40?BigInt(n):n)
  // bench('JS Recursive', fibonacci_recursive, iterations, n)
  bench('JS Matrix', fibonacci_matrix_method, iterations, n)
  bench('JS Iteratice', fibonacci_iterative, iterations, n)
}
/**
 * Function to benchmark the performance of a function
 * @param {string} label Text to identify the benchmark
 * @param {function} fn Function to benchmark
 * @param {int} iterations Times to run the benchmarked function
 * @param {int} n input to the function. In this case, the number of iterations to run the fibonacci function
 */
function bench (label, fn, iterations = 30, n = 40) {
    // if (n > 40) n = 40; // to avoid too long execution time
  let observations = [];
  for (let i = 0; i <= iterations; ++i) {
    let start = performance.now()
    let res = fn(n)
    var duration = performance.now() - start
    console.log(`[${label}] current run: ${i} | i'th fibonacci: ${n} | result: ${res} | this run duration: ${duration} ms`)
    observations.push(duration)
  }

  const total = observations.reduce((acc, curr) => acc + curr);
  const avg = total / iterations;
  const totalFx = Number.parseFloat(total).toFixed(2)
  const avgFx = Number.parseFloat(avg).toFixed(2)
  console.log(`%c [${label}] times run: ${iterations} | i'th fibonacci: ${n} | total: ${totalFx} ms | average: ${avgFx} ms`, "background: red; color: #fff; font-size: 16px; font-weight: bold; padding: 5px; border-radius: 5px;")
}

function fibonacci_recursive (num) {
  if (num <= 1) return num

  return fibonacci_recursive(num - 1) + fibonacci_recursive(num - 2)
}

function matrixMultiply(a, b) {
  const c = [
      [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
      [(a[1]!==undefined?a[1][0]:0) * b[0][0] + (a[1]!==undefined?a[1][1]:0) * b[1][0], (a[1]!==undefined?a[1][0]:0) * b[0][1] + (a[1]!==undefined?a[1][1]:0) * b[1][1]]
  ];
  return c;
}

function fibonacci_matrix_method(n) {
  let baseMatrix = [[1, 1], [1, 0]];
  let resultMatrix = [[1, 0]];
  while (n > 0) {
      if (n % 2 === 1) {
          resultMatrix = matrixMultiply(resultMatrix, baseMatrix);
      }
      baseMatrix = matrixMultiply(baseMatrix, baseMatrix);
      n = Math.floor(n / 2);
  }
  return resultMatrix[0][1];
}


function fibonacci_iterative(n) {
  if (n < 2) {
      return n;
  }
  let n1 = 0, n2 = 1;
  for (let i = 2; i <= n; i++) {
      const nextTerm = n1 + n2;
      n1 = n2;
      n2 = nextTerm;
  }
  return n2;
}

console.log("Start bechmark of fibonacci function by calling runFibBench() function.")
console.log("Example: runFibBench(30, 40)")