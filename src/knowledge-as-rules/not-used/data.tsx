class Initializer{
    static async get_data(): Promise<[Illness[], Symptom[]]>{
        
        let symptoms = [
            new Symptom(1, "Бесслница")
        ]
        
        let illnesses = [
            new Illness(1, "ботулизм", [symptoms[0]], 
            (await import(`./knowledge-as-rules-diagnoses/` + "ботулизм" + `.txt?raw`)).default)
        ]

        return [illnesses, symptoms]
    }
}