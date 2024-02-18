import { Dispatch, SetStateAction, useState } from "react"
import './knowledge-as-rules.css'

export function KnowledgeAsRules () {

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
        let current_illnesses = []

        if(6 in current_symptoms && 7 in current_symptoms && 9 in current_symptoms 
            && 15 in current_symptoms && 26 in current_symptoms && 28 in current_symptoms
            && 29 in current_symptoms && 33 in current_symptoms && 35 in current_symptoms){
                current_illnesses.push(ILLNESSES.BOTULISM)
            }
        if(13 in current_symptoms && 34 in current_symptoms && 19 in current_symptoms 
            && 20 in current_symptoms && 36 in current_symptoms && 33 in current_symptoms 
            && 8 in current_symptoms && 4 in current_symptoms){
                current_illnesses.push(ILLNESSES.BRUCELLOSIS)
            }
        if(29 in current_symptoms && 24 in current_symptoms && 1 in current_symptoms 
            && 34 in current_symptoms && 6 in current_symptoms && 2 in current_symptoms 
            && 28 in current_symptoms && 14 in current_symptoms){
                current_illnesses.push(ILLNESSES.HFWRS)
            }
        if(34 in current_symptoms && 18 in current_symptoms && 29 in current_symptoms 
            && 27 in current_symptoms && 35 in current_symptoms && 28 in current_symptoms 
            && 5 in current_symptoms && 15 in current_symptoms && 16 in current_symptoms){
                current_illnesses.push(ILLNESSES.HEPATITIS)
            }
        if(18 in current_symptoms && 23 in current_symptoms && 27 in current_symptoms 
            && 35 in current_symptoms && 3 in current_symptoms && 25 in current_symptoms){
                current_illnesses.push(ILLNESSES.INTESTIAL_DISBIOSIS)
            }
        if(18 in current_symptoms && 27 in current_symptoms && 6 in current_symptoms 
            && 29 in current_symptoms && 38 in current_symptoms && 3 in current_symptoms){
                current_illnesses.push(ILLNESSES.DISENTERY)
            }
        if(17 in current_symptoms && 32 in current_symptoms){
            current_illnesses.push(ILLNESSES.CANDIDIASIS)
        }
        if(22 in current_symptoms && 31 in current_symptoms && 32 in current_symptoms 
            && 37 in current_symptoms && 10 in current_symptoms && 21 in current_symptoms 
            && 11 in current_symptoms && 27 in current_symptoms && 34 in current_symptoms){
                current_illnesses.push(ILLNESSES.TUBERCULOSIS)
            }
        if(12 in current_symptoms && 1 in current_symptoms){
            current_illnesses.push(ILLNESSES.SCABIES)
        }

        if(current_illnesses.length === 0){
            let diagnosis: string = "По выбранным сиптомам в базе знаний ничего не найдено."
            setIllnessesText([diagnosis])
            return
        } 

        let illnesses_text: string[] = []

        for(let illness of current_illnesses){
            illnesses_text.push(
                (await import(`./knowledge-as-rules-diagnoses/` + illness + `.txt?raw`)).default
            )
1        } 

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
        SCABIES = "чесотка"
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
        38: "Частый стул"
    }

    //const SYMPTOMS_ITEMS = SYMPTOMS.map(symptom => <option value={symptom.value}>{symptom.value}</option>)

    // current symptoms dictionary
    const [current_symptoms, setSymptomsState]: [{[id: number]: string}, Dispatch<SetStateAction<{}>>] = useState({})

    const [found_illnesses, setIllnessesText] = useState<string[]>([])

    return (
    <>
    <div id="project-1" className="project project-active">
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
    </>
    )
}