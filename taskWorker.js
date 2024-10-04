const { parentPort } = require('worker_threads');
const math = require('mathjs');

// Function to perform a large matrix multiplication until it takes ~10 seconds
function performLargeMatrixMultiplication() {
  const startTime = Date.now();

 const matrixA = math.random([5000, 5000], -1000, 1000);
    const matrixB = math.random([5000, 5000], -1000, 1000);
    math.multiply(matrixA, matrixB); // Perform matrix multiplication
    const endTime = Date.now();
    parentPort.postMessage(`Task took ${endTime - startTime}`);
}

performLargeMatrixMultiplication();

// Notify the main thread that the task is done
parentPort.postMessage('Task completed');
