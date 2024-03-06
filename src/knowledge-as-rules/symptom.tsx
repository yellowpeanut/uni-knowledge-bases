export default class Symptom{

    id: number
    name: string
    pre_symptoms: Symptom[]

    constructor(id: number, name: string, pre_symptoms: Symptom[]) {
        this.id = id
        this.name = name
        this.pre_symptoms = pre_symptoms
    }
}