import './App.css'
import { KnowledgeAsRules } from './knowledge-as-rules/knowledge-as-rules.tsx'
import { UnclearInfo } from './unclear-info.tsx'
import { NeuralNetwork } from './neural-network.tsx'
import { Kar } from './knowledge-as-rules/kar.tsx'



function App() {

  return (
    <>
      <div className="main">

        <div className="header-text">
          <h1>Базы знаний</h1>
        </div>

        <div className="projects">
          <a href="#" className="project-name project-name-active" id="project-name-1">Знания как правила</a>
          <a href="#" className="project-name" id="project-name-2">Нечеткая информация</a>
          <a href="#" className="project-name" id="project-name-3">Нейронные сети</a>
        </div>

        <div className="project-frame">
        {/* <Kar /> */}
        <KnowledgeAsRules />
        <UnclearInfo />
        <NeuralNetwork />
        </div>

      </div>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
