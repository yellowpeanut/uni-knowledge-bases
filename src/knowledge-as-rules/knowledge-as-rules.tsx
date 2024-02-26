import { Dispatch, SetStateAction, useState } from "react"
import './knowledge-as-rules.css'

export function KnowledgeAsRules () {

    function toReverse(){
        let straight = document.getElementsByClassName("straight")[0] as HTMLDivElement
        let reverse = document.getElementsByClassName("reverse")[0] as HTMLDivElement

        setSymptomsState([])
        setIllnessesText([])
        setLogsText("")

        straight.classList.replace("swap-visible", "swap-hidden")
        reverse.classList.replace("swap-hidden", "swap-visible")
    }

    function toStraight(){
        let straight = document.getElementsByClassName("straight")[0] as HTMLDivElement
        let reverse = document.getElementsByClassName("reverse")[0] as HTMLDivElement

        setSymptomsState([])
        setIllnessesText([])
        setLogsText("")

        reverse.classList.replace("swap-visible", "swap-hidden")
        straight.classList.replace("swap-hidden", "swap-visible")
    }

    function chooseIllness(){
        let select = (document.getElementById("illnesses-list")) as HTMLSelectElement
        let illness = select.selectedOptions[0].value
        let symptoms = ILLNESS_SYMPTOMS[illness]

        for(let ind of symptoms){
            current_symptoms[ind] = SYMPTOMS[ind]
        }

        setSymptomsState({...current_symptoms})
    }

    function checkIllness(){

    }

    function addSymptom(){
        let select = (document.getElementById("symptoms-list")) as HTMLSelectElement
        let ind = select.selectedIndex+1

        setSymptomsState({...current_symptoms, [ind]: SYMPTOMS[ind]})
        current_symptoms[ind] = SYMPTOMS[ind]
    }

    function removeSymptom(symptom_value: string){
        let ind = Number((Object.entries(current_symptoms)
        .find((symptom) => symptom[1] === symptom_value) as [string, string])[0])

        if(ind !== undefined){
            delete current_symptoms[ind]
            setSymptomsState({...current_symptoms})
        }
    }

    async function getIllness(){
        let current_illnesses: string[] = []
        let logs: string = ""

        if(6 in current_symptoms && 7 in current_symptoms && 9 in current_symptoms 
            && 15 in current_symptoms && 26 in current_symptoms && 28 in current_symptoms
            && 29 in current_symptoms && 33 in current_symptoms && 35 in current_symptoms){
                current_illnesses.push(ILLNESSES.BOTULISM)
                logs = logs + ("Заболевание " + ILLNESSES.BOTULISM + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.BOTULISM + " не найдено.\n")
        if(13 in current_symptoms && 34 in current_symptoms && 19 in current_symptoms 
            && 20 in current_symptoms && 36 in current_symptoms && 33 in current_symptoms 
            && 8 in current_symptoms && 4 in current_symptoms){
                current_illnesses.push(ILLNESSES.BRUCELLOSIS)
                logs = logs + ("Заболевание " + ILLNESSES.BRUCELLOSIS + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.BRUCELLOSIS + " не найдено.\n")
        if(29 in current_symptoms && 24 in current_symptoms && 1 in current_symptoms 
            && 34 in current_symptoms && 6 in current_symptoms && 2 in current_symptoms 
            && 28 in current_symptoms && 14 in current_symptoms){
                current_illnesses.push(ILLNESSES.HFWRS)
                logs = logs + ("Заболевание " + ILLNESSES.HFWRS + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.HFWRS + " не найдено.\n")
        if(34 in current_symptoms && 18 in current_symptoms && 29 in current_symptoms 
            && 27 in current_symptoms && 35 in current_symptoms && 28 in current_symptoms 
            && 5 in current_symptoms && 15 in current_symptoms && 16 in current_symptoms){
                current_illnesses.push(ILLNESSES.HEPATITIS)
                logs = logs + ("Заболевание " + ILLNESSES.HEPATITIS + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.HEPATITIS + " не найдено.\n")
        if(18 in current_symptoms && 23 in current_symptoms && 27 in current_symptoms 
            && 35 in current_symptoms && 3 in current_symptoms && 25 in current_symptoms){
                current_illnesses.push(ILLNESSES.INTESTIAL_DISBIOSIS)
                logs = logs + ("Заболевание " + ILLNESSES.INTESTIAL_DISBIOSIS + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.INTESTIAL_DISBIOSIS + " не найдено.\n")
        if(18 in current_symptoms && 27 in current_symptoms && 6 in current_symptoms 
            && 29 in current_symptoms && 38 in current_symptoms && 3 in current_symptoms){
                current_illnesses.push(ILLNESSES.DISENTERY)
                logs = logs + ("Заболевание " + ILLNESSES.DISENTERY + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.DISENTERY + " не найдено.\n")
        if(17 in current_symptoms && 32 in current_symptoms){
            current_illnesses.push(ILLNESSES.CANDIDIASIS)
            logs = logs + ("Заболевание " + ILLNESSES.CANDIDIASIS + " найдено.\n")
        } else logs = logs + ("Заболевание " + ILLNESSES.CANDIDIASIS + " не найдено.\n")
        if(22 in current_symptoms && 31 in current_symptoms && 32 in current_symptoms 
            && 37 in current_symptoms && 10 in current_symptoms && 21 in current_symptoms 
            && 11 in current_symptoms && 27 in current_symptoms && 34 in current_symptoms){
                current_illnesses.push(ILLNESSES.TUBERCULOSIS)
                logs = logs + ("Заболевание " + ILLNESSES.TUBERCULOSIS + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.TUBERCULOSIS + " не найдено.\n")
        if(12 in current_symptoms && 1 in current_symptoms){
            current_illnesses.push(ILLNESSES.SCABIES)
            logs = logs + ("Заболевание " + ILLNESSES.SCABIES + " найдено.\n")
        } else logs = logs + ("Заболевание " + ILLNESSES.SCABIES + " не найдено.\n")
        if(39 in current_symptoms && 12 in current_symptoms && 18 in current_symptoms 
            && 40 in current_symptoms){
                current_illnesses.push(ILLNESSES.LEPROSY)
                logs = logs + ("Заболевание " + ILLNESSES.LEPROSY + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.LEPROSY + "не найдено.\n")
        if(41 in current_symptoms && 21 in current_symptoms && 11 in current_symptoms 
            && 10 in current_symptoms){
                current_illnesses.push(ILLNESSES.NOCARDIOSIS)
                logs = logs + ("Заболевание " + ILLNESSES.NOCARDIOSIS + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.NOCARDIOSIS + " не найдено.\n")
        if(10 in current_symptoms && 13 in current_symptoms && 42 in current_symptoms 
            && 43 in current_symptoms && 29 in current_symptoms){
                current_illnesses.push(ILLNESSES.ORNITHOSIS)
                logs = logs + ("Заболевание " + ILLNESSES.ORNITHOSIS + " найдено.\n")
            } else logs = logs + ("Заболевание " + ILLNESSES.ORNITHOSIS + " не найдено.\n")

        if(current_illnesses.length === 0){
            let diagnosis: string = "По выбранным сиптомам в базе знаний ничего не найдено."
            setIllnessesText([diagnosis])
            setLogsText(logs)
            return
        }

        let illnesses_text: string[] = []

        logs += "\nНайденные заболевания: "
        for(let illness of current_illnesses){
            logs = logs + illness + " "
            illnesses_text.push(
                (await import(`./knowledge-as-rules-diagnoses/` + illness + `.txt?raw`)).default
            )
        } 
        
        setLogsText(logs)
        setIllnessesText(illnesses_text)
    }

    const enum ILLNESSES {
        BOTULISM = "ботулизм",
        BRUCELLOSIS = "бруцеллез",
        HFWRS = "геморрагическая_лихорадка_с_почечным_синдромом",
        HEPATITIS = "гепатит",
        INTESTIAL_DISBIOSIS = "дисбактериоз_кишечника",
        DISENTERY = "дизентерия",
        CANDIDIASIS = "кандидоз",
        TUBERCULOSIS = "туберкулез",
        SCABIES = "чесотка",
        LEPROSY = "лепра",
        NOCARDIOSIS = "нокардиоз",
        ORNITHOSIS = "орнитоз"
    }

    // const enum ILLNESSES {
    //     BOTULISM = "BOTULISM",
    //     BRUCELLOSIS = "BRUCELLOSIS",
    //     HFWRS = "HFWRS",
    //     HEPATITIS = "HEPATITIS",
    //     INTESTIAL_DISBIOSIS = "INTESTIAL_DISBIOSIS",
    //     DISENTERY = "DISENTERY",
    //     CANDIDIASIS = "CANDIDIASIS",
    //     TUBERCULOSIS = "TUBERCULOSIS",
    //     SCABIES = "SCABIES"
    // }

    const SYMPTOMS: {[id: number]: string} = {
        1: "Бессонница",
        2: "Боли в глазах",
        3: "Боли в животе",
        4: "Боли в мыщцах, костях, суставах",
        5: "Боли в правом подреберье",
        6: "Головная боль",
        7: "Головокружение",
        8: "Жажда",
        9: "Запоры",
        10: "Кашель",
        11: "Кожа бледная",
        12: "Кожный зуд",
        13: "Лихорадка",
        14: "Лицо, шея, верхние отделы груди и спины гиперемированы",
        15: "Метеоризм",
        16: "Нарушение стула",
        17: "На сильно покрасневшей слизистой оболочке полости рта белесовато-желтый налет",
        18: "Недомогание",
        19: "Обильный пот",
        20: "Ознобы",
        21: "Отдышка",
        22: "Повышенная,утомляемость",
        23: "Повышенное слюноотделение",
        24: "Познабливание",
        25: "Понос",
        26: "Постоянные или схваткообразные боли в области желудка",
        27: "Потеря аппетита",
        28: "Рвота",
        29: "Слабость",
        30: "Снижение массы тела",
        31: "Снижение работоспособности",
        32: "Сосание и жевание болезнены",
        33: "Сухость во рту",
        34: "Температура",
        35: "Тошнота",
        36: "Увеличение лимфоузлов",
        37: "Ухудшение сна",
        38: "Частый стул",
        39: "Красные симметричные пятна на коже",
        40: "Утолщение нервных стволов",
        41: "Поражение ЦНС",
        42: "Пневмония",
        43: "Гепатолиенальный синдром"
    }

    const ILLNESS_SYMPTOMS: {[id: string]: number[]} = {
        "ботулизм": [6, 7, 9, 15, 26, 28, 29, 33, 35],
        "бруцеллез": [13, 34, 19, 20, 36, 33, 8, 4],
        "геморрагическая лихорадка с почечным синдромом": [29, 24, 1, 2, 34, 6, 28, 14],
        "гепатит": [34, 18, 29, 27, 35, 28, 5, 15, 16],
        "дисбактериоз кишечника": [18, 23, 27, 35, 3, 25],
        "дизентерия": [18, 27, 6, 29, 38, 3],
        "кандидоз": [17, 32],
        "туберкулез": [22, 31, 32, 37, 10, 21, 11, 27, 34],
        "чесотка": [12, 1],
        "лепра": [39, 12, 18, 40],
        "нокардиоз": [41, 21, 11, 10],
        "орнитоз": [10, 13, 42, 43, 29]
    }

    //const SYMPTOMS_ITEMS = SYMPTOMS.map(symptom => <option value={symptom.value}>{symptom.value}</option>)

    // current symptoms dictionary
    const [current_symptoms, setSymptomsState]: [{[id: number]: string}, Dispatch<SetStateAction<{}>>] = useState({})

    const [found_illnesses, setIllnessesText] = useState<string[]>([])

    const [logs_text, setLogsText] = useState<string>("")

    return (
    <>
    <div id="project-1" className="project project-active">
        <div className="straight swap-visible">
        <div className="swap">
            <button className="btn-swap" onClick={toReverse}>
                Обратный ход
            </button>
        </div>
        <div className="select">
            <select name="symptoms-list" id="symptoms-list">
                {Object.entries(SYMPTOMS).map(([key, value]) => (
                    <option key={key} value={value}>{value}</option>
                ))}
            </select>
            <button className="btn" onClick={addSymptom}>
                Добавить
            </button>
        </div>
        <div className="current-symptoms">
            {Object.entries(current_symptoms).map(([key, value]) => (
                <div key={key} className="symptom-box" onClick={() => removeSymptom(String(value))}>
                    {String(value)}
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
            {found_illnesses.map(illness => (
                <pre key={found_illnesses.indexOf(illness)} className="diagnosis-text">
                    {illness}
                    </pre>
            ))}
        </div>
        </div>

        <div className="reverse swap-hidden">
        <div className="swap">
            <button className="btn-swap" onClick={toStraight}>
                Прямой ход
            </button>
        </div>
        <div className="select">
            <select name="illnesses-list" id="illnesses-list">
                {Object.entries(ILLNESS_SYMPTOMS).map(([key, value]) => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
            <button className="btn" onClick={chooseIllness}>
                Выбрать
            </button>
        </div>
        <div className="current-symptoms">
            {Object.entries(current_symptoms).map(([key, value]) => (
                <div key={key} className="symptom-box" onClick={() => removeSymptom(String(value))}>
                    {String(value)}
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
            {found_illnesses.map(illness => (
                <pre key={found_illnesses.indexOf(illness)} className="diagnosis-text">
                    {illness}
                    </pre>
            ))}
        </div>
        </div>
    </div>
    </>
    )
}