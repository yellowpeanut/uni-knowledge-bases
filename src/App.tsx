import './App.css'
import { KnowledgeAsRules } from './knowledge-as-rules/knowledge-as-rules.tsx'
import { UnclearInfo } from './unclear-info/unclear-info.tsx'
import { NeuralNetwork } from './neural-network.tsx'



function App() {

  function change_project(id: string){
      let project_names = document.getElementsByClassName("project-name")
      let project_name_active = document.getElementById(id)

      for(let p of project_names){
        p.classList.remove("project-name-active")
      }
      project_name_active?.classList.add("project-name-active")

      let projects = document.getElementsByClassName("project")
      let project_active = document.getElementById(id.substring(0, 8) + id[id.length-1])

      for(let p of projects){
        p.classList.remove("project-active")
      }
      project_active?.classList.add("project-active")
  }

  return (
    <>
      <div className="main">

        <div className="header-text">
          <h1>Базы знаний</h1>
        </div>

        <div className="projects">
          <a href="#" className="project-name project-name-active" id="project-name-1" onClick={() => change_project("project-name-1")}>Знания как правила</a>
          <a href="#" className="project-name" id="project-name-2" onClick={() => change_project("project-name-2")}>Нечеткая информация</a>
          <a href="#" className="project-name" id="project-name-3" onClick={() => change_project("project-name-3")}>Нейронные сети</a>
        </div>

        <div className="project-frame">
        {/* <Kar /> */}
        <KnowledgeAsRules />
        <UnclearInfo />
        <NeuralNetwork />
        </div>

      </div>

    </>
  )
}

export default App
