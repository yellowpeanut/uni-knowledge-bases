import Symptom from "./symptom.tsx"
import Illness from "./illness.tsx"

export default class Data{
    public illnesses: Illness[]
    public first_symptoms: Symptom[]
    public second_symptoms: Symptom[]
    public third_symptoms: Symptom[]

    constructor(illnesses: Illness[], first_symptoms: Symptom[], 
        second_symptoms: Symptom[], third_symptoms: Symptom[]) {
        this.illnesses = illnesses
        this.first_symptoms = first_symptoms
        this.second_symptoms = second_symptoms
        this.third_symptoms = third_symptoms
        
    }

    public symptom(name:string) {
        for(let s of this.first_symptoms.concat(this.second_symptoms, this.third_symptoms)){
            if(s.name === name) return s
        }
        return new Symptom(-1, "", [])
        // if (smptom === undefined)
        //     smptom = this.second_symptoms.find(s => s.name=name) as Symptom
        // if (smptom === undefined)
        //     smptom = this.third_symptoms.find(s => s.name=name) as Symptom
        // console.log(smptom)
        // return smptom
    }
    public symptom_by_id(id:number) {
        for(let s of this.first_symptoms.concat(this.second_symptoms, this.third_symptoms)){
            if(s.id === id) return s
        }
        return new Symptom(-1, "", [])
        // let smptom = this.first_symptoms.find(s => s.id=id) as Symptom
        // if (smptom === undefined)
        //     smptom = this.second_symptoms.find(s => s.id=id) as Symptom
        // if (smptom === undefined)
        //     smptom = this.third_symptoms.find(s => s.id=id) as Symptom
        // return smptom
    }

    public illness(name:string) {
        // let smptom = this.illnesses.find(i => i.name=name) as Illness
        // return smptom
        for(let i of this.illnesses){
            if(i.name === name) return i
        }
        return new Illness(-1, "", [], "")
    }
}

