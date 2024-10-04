import React, { useState, useEffect } from "react"
import "./App.css"

const NODES = [
  { name: "Node-1", url: "http://localhost:3001/load" },
  { name: "Node-2", url: "http://localhost:3002/load" },
  { name: "Node-3", url: "http://localhost:3003/load" },
  { name: "Node-4", url: "http://localhost:3004/load" },
]

const intervalMS = 300;

function App() {
  const [loadOne, setLoadOne] = useState({ cpu: 0, memory: 0, tasks: 0 })
  const [loadTwo, setLoadTwo] = useState({ cpu: 0, memory: 0, tasks: 0 })
  const [loadThree, setLoadThree] = useState({ cpu: 0, memory: 0, tasks: 0 })
  const [loadFour, setLoadFour] = useState({ cpu: 0, memory: 0, tasks: 0 })

  // Fetch the load from each node concurrently
  const fetchLoad = async (n) => {
    try {
      const response = await fetch(`http://localhost:300${n}/load`)
      const data = await response.json()
      if (n === 1) {
        setLoadOne({ cpu: data.cpu, memory: data.memory, tasks: data.tasks })
      }

      if (n === 2) {
        setLoadTwo({ cpu: data.cpu, memory: data.memory, tasks: data.tasks })
      }

      if (n === 3) {
        setLoadThree({ cpu: data.cpu, memory: data.memory, tasks: data.tasks })
      }

      if (n === 4) {
        setLoadFour({ cpu: data.cpu, memory: data.memory, tasks: data.tasks })
      }
    } catch (error) {
      console.error(`Error fetching load from ${n}:`, error)
       if (n === 1) {
        setLoadOne({ cpu: 'DEAD', memory: 'DEAD', tasks: 'DEAD' })
      }

      if (n === 2) {
        setLoadTwo({ cpu: 'DEAD', memory: 'DEAD', tasks: 'DEAD' })
      }

      if (n === 3) {
        setLoadThree({ cpu: 'DEAD', memory: 'DEAD', tasks: 'DEAD' })
      }

      if (n === 4) {
        setLoadFour({ cpu: 'DEAD', memory: 'DEAD', tasks: 'DEAD' })
      }
    }
  }


  useEffect(() => {

    const interval = setInterval(() => fetchLoad(1), intervalMS);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {

    const interval = setInterval(() => fetchLoad(2), intervalMS);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => fetchLoad(3), intervalMS);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => fetchLoad(4), intervalMS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
        <div className="node-container">
          <div className="node">
            <h2>N1</h2>
            <p>CPU: {loadOne.cpu}%</p>
            <p>Memory: {loadOne.memory} MB</p>
            <p>Requests: {loadOne.tasks}</p>
</div>
             <div className="node"><h2>N2</h2>
            <p>CPU: {loadTwo.cpu}%</p>
            <p>Memory: {loadTwo.memory} MB</p>
            <p>Requests: {loadTwo.tasks}</p></div>

             <div className="node"><h2>N3</h2>
            <p>CPU: {loadThree.cpu}%</p>
            <p>Memory: {loadThree.memory} MB</p>
            <p>Requests: {loadThree.tasks}</p></div>

             <div className="node"><h2>N4</h2>
            <p>CPU: {setLoadFour.cpu}%</p>
            <p>Memory: {setLoadFour.memory} MB</p>
            <p>Requests: {setLoadFour.tasks}</p>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
