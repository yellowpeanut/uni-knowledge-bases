class Illness {

    id: number;
    name: string;
    symptoms: Symptom[];
    diagnosis_text: string;

    constructor(id: number, name: string, symptoms: Symptom[], diagnosis_text: string) {
        this.id = id
        this.name = name
        this.symptoms = symptoms
        this.diagnosis_text = diagnosis_text
    }
}