import { useState } from "react"
import Symptom from "./symptom.tsx"
import Illness from "./illness.tsx"
import Data from "./data.tsx"
import get_data from "./init.tsx"

import './knowledge-as-rules.css'

export function KnowledgeAsRules () {

    function toReverse(){
        let straight = document.getElementsByClassName("straight")[0] as HTMLDivElement
        let reverse = document.getElementsByClassName("reverse")[0] as HTMLDivElement

        setSymptomsState([])
        setIllnesses([])
        setIllnessesText([])
        setLogsText("")
        setReversed(true)

        straight.classList.replace("swap-visible", "swap-hidden")
        reverse.classList.replace("swap-hidden", "swap-visible")
    }

    function toStraight(){
        let straight = document.getElementsByClassName("straight")[0] as HTMLDivElement
        let reverse = document.getElementsByClassName("reverse")[0] as HTMLDivElement

        setSymptomsState([])
        setIllnesses([])
        setIllnessesText([])
        setLogsText("")
        setReversed(false)

        reverse.classList.replace("swap-visible", "swap-hidden")
        straight.classList.replace("swap-hidden", "swap-visible")
    }

    function chooseIllness(){
        // if(!data) return
        let select = (document.getElementById("illnesses-list")) as HTMLSelectElement

        let illness = data.illness(select.selectedOptions[0].value)
        for(let s of illness.symptoms){
            if(!current_symptoms.some((cs) => cs.id === s.id)){
                current_symptoms.push(s)
            }
        }
        setSymptomsState([...current_symptoms])
    }

    function addSymptom(){
        // if(!data) return
        let select = (document.getElementById("symptoms-list")) as HTMLSelectElement
        let val = select.value
        let symptom = data.symptom(val)

        for(let s of current_symptoms){
            if(s.name === val) return
        }
        
        setSymptomsState([...current_symptoms, symptom])
        current_symptoms.push(symptom)

    }

    function removeSymptom(symptom: Symptom){
        current_symptoms.splice(current_symptoms.indexOf(symptom), 1)
        setSymptomsState([...current_symptoms])
    }

    async function getIllness(){
        // if(!data) return
        let current_illnesses: Illness[] = []
        let logs: string = ""

        let symptoms = [...current_symptoms]

        if(reversed){

            for(let symptom of symptoms){
                if(symptom.pre_symptoms.length !== 0){
                    for(let s of symptom.pre_symptoms){
                        if(!symptoms.some((cs) => cs.id === s.id)){
                            symptoms.push(s)
                            logs = logs + ("Симптом '" + s.name + "' выявлен.\n")
                        }
                    }
                }
            }
            for(let symptom of symptoms){
                if(symptom.pre_symptoms.length !== 0){
                    for(let s of symptom.pre_symptoms){
                        if(!symptoms.some((cs) => cs.id === s.id)){
                            symptoms.push(s)
                            logs = logs + ("Симптом '" + s.name + "' выявлен.\n")
                        }
                    }
                }
            }
        }
        else{
            for (let second_symptom of data.second_symptoms){
                if(second_symptom.pre_symptoms.every(s => symptoms.some(
                    (cs) => cs.id === s.id
                ))){
                    if(!symptoms.some((cs) => cs.id === second_symptom.id))
                        symptoms.push(second_symptom)
                    logs = logs + ("Вторичный симптом '" + second_symptom.name + "' найден.\n")
                }
            }

            for (let third_symptom of data.third_symptoms){
                if(third_symptom.pre_symptoms.every(s => symptoms.some(
                    (cs) => cs.id === s.id
                ))){
                    if(!symptoms.some((cs) => cs.id === third_symptom.id))
                        symptoms.push(third_symptom)
                    logs = logs + ("Третичный симптом '" + third_symptom.name + "' найден.\n")
                }
            }
        }

        for (let illness of data.illnesses){
            if(illness.symptoms.every(s => symptoms.some(
                (cs) => cs.id === s.id
            ))){
                current_illnesses.push(illness)
                logs = logs + ("Заболевание " + illness.name + " найдено.\n")
            }
            else
                logs = logs + ("Заболевание " + illness.name + " не найдено.\n")
        }

        if(current_illnesses.length === 0){
            let diagnosis: string = "По выбранным сиптомам в базе знаний ничего не найдено."
            setIllnessesText([diagnosis])
            setLogsText(logs)
            return
        }

        let current_illnesses_text: string[] = []

        logs += "\nНайденные заболевания: \n"
        for(let illness of current_illnesses){
            logs = logs + illness.name + "\n"
            
            current_illnesses_text.push(
                (await import(`./knowledge-as-rules-diagnoses/` + illness.name + `.txt?raw`)).default
            )
        } 
        
        setLogsText(logs)
        setIllnessesText(current_illnesses_text)
        setIllnesses(current_illnesses)
    }

    const [current_symptoms, setSymptomsState] = useState<Symptom[]>([])
    const [found_illnesses, setIllnesses] = useState<Illness[]>([])
    const [illnesses_text, setIllnessesText] = useState<string[]>([])
    const [logs_text, setLogsText] = useState<string>("")
    const [reversed, setReversed] = useState<boolean>(false)
    const data: Data = get_data()

    // UI //
    return (
        data ? (
    <>
    <div id="project-1" className="project project-active">

        {/* STRAIGHT UI */}

        <div className="straight swap-visible">
        <div className="swap">
            <button className="btn-swap" onClick={toReverse}>
                Обратный ход
            </button>
        </div>
        <div className="select">
            <select name="symptoms-list" id="symptoms-list">
                {data.first_symptoms.map(s =>(
                    <option key={s.id} value={s.name}>{s.name}</option>
                ))}
            </select>
            <button className="btn" onClick={addSymptom}>
                Добавить
            </button>
        </div>
        <div className="current-symptoms">
            {current_symptoms.map(s => (
                <div key={s.id} className="symptom-box" onClick={() => removeSymptom(s)}>
                    {s.name}
                </div>
            ))}
        </div>
        {(logs_text !== "") &&
        <div className="logs">
            <pre>
            {logs_text}
            </pre>
        </div>}
        <div className="get-illness">
            <button className="btn-big" onClick={getIllness}>
                Получить результат
            </button>
        </div>
        <div className="diagnosis">
            {Object.entries(illnesses_text).map((v, ind) => 
                <pre key={ind} className="diagnosis-text">
                {v[1]}
                </pre>
                )}
        </div>
        </div>

        {/* REVERSED UI */}

        <div className="reverse swap-hidden">
        <div className="swap">
            <button className="btn-swap" onClick={toStraight}>
                Прямой ход
            </button>
        </div>
        <div className="select">
            <select name="illnesses-list" id="illnesses-list">
                {data.illnesses.map(i =>(
                    <option key={i.id} value={i.name}>{i.name}</option>
                ))}
            </select>
            <button className="btn" onClick={chooseIllness}>
                Выбрать
            </button>
        </div>
        <div className="current-symptoms">
        {current_symptoms.map(s => (
                <div key={s.id} className="symptom-box" onClick={() => removeSymptom(s)}>
                    {s.name}
                </div>
            ))}
        </div>
        {(logs_text !== "") &&
        <div className="logs">
            <pre>
            {logs_text}
            </pre>
        </div>}
        <div className="check-illness">
            <button className="btn-big" onClick={getIllness}>
                Получить результат
            </button>
        </div>
        <div className="diagnosis">
            {Object.entries(illnesses_text).map((v, ind) => 
                <pre key={ind} className="diagnosis-text">
                {v[1]}
                </pre>
                )}
        </div>
        </div>
    </div>
    </>
        ) : (<>Loading...</>)
    )
}