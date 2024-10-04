const cors = require('cors'); // Import CORS middleware
const express = require('express');
const pidusage = require('pidusage');
const { Worker } = require('worker_threads');
const app = express();

app.use(cors()); // Enable CORS for all routes

let activeTasks = 0;

// Function to create a worker for long-running tasks
function createTaskWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./taskWorker.js'); // Separate worker file for heavy computation
    worker.on('message', (message) => {
      resolve(message); // Task completed
    });
    worker.on('error', (error) => {
      reject(error);
    });
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

// Endpoint to get CPU and memory load
app.get('/load', (req, res) => {
  pidusage(process.pid, (err, stats) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to get system load' });
    }

    res.json({
      cpu: stats.cpu, // CPU usage as a percentage
      memory: stats.memory / (1024 * 1024), // Memory usage in MB
      tasks: activeTasks, // Number of active tasks
    });
  });
});

// Endpoint to simulate task submission
app.post('/task', async (req, res) => {
  console.log('Received task');
  activeTasks += 1;

  try {
    await createTaskWorker(); // Offload the task to a worker
    activeTasks -= 1;
    res.json({ status: 'Task completed' });
  } catch (error) {
    activeTasks -= 1;
    res.status(500).json({ error: 'Task failed' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('GPU node simulation running on port 3000');
});
