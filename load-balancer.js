const axios = require('axios');

// List of GPU nodes (simulated)
const NODES = [
  { name: 'Node-1', url: 'http://localhost:3001' },
  { name: 'Node-2', url: 'http://localhost:3002' },
  { name: 'Node-3', url: 'http://localhost:3003' },
  { name: 'Node-4', url: 'http://localhost:3004' }
];

// Function to get the load from each node
async function getNodeLoad(node) {
  try {
    const response = await axios.get(`${node.url}/load`);
    return { node, load: response.data.cpu }; // Use the actual CPU load
  } catch (error) {
    console.error(`Error fetching load from ${node.name}:`, error.message);
    return { node, load: Infinity }; // Treat any node with errors as fully loaded
  }
}

// Function to assign a task to the least loaded node
async function assignTask(task) {
  try {
    // Fetch the load from all nodes
    const loadPromises = NODES.map(getNodeLoad);
    const nodesWithLoad = await Promise.all(loadPromises);

    // Find the node with the least load
    const leastLoadedNode = nodesWithLoad.reduce((prev, curr) => {
      return curr.load < prev.load ? curr : prev;
    });

    // Assign the task to the least loaded node
    console.log(`Assigning task to ${leastLoadedNode.node.name} with CPU load ${leastLoadedNode.load}%`);

    // Send the task to the chosen node
    await axios.post(`${leastLoadedNode.node.url}/task`, task);
    console.log(`Task successfully assigned to ${leastLoadedNode.node.name}`);
  } catch (error) {
    console.error('Error assigning task:', error.message);
  }
}

// Task scheduler to distribute tasks
function startTaskScheduler() {
  setInterval(async () => {
    const task = { type: 'MathProblem', data: 'find-primes' }; // Example task
    await assignTask(task);
  }, 10000); // Assign a task every 10 seconds
}

// Start the load balancer's task scheduler
startTaskScheduler();
