export interface ITreat {
    name: string
    subTreats?: ITreat[]
}

export interface ITreatEmitData {
    event: DragEvent
    index: number
    outside?: boolean
}
