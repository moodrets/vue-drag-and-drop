import { ITreat, ITreatEmitData } from '@/types/TreatTypes'

let dragInfo: any = {}

export function treatDragHandler(data: ITreatEmitData, treats: ITreat[]) {
    if (data.event.type === 'dragstart') {
        dragInfo.startIndex = data.index
    }

    if (data.event.type === 'dragover') {
        dragInfo.endIndex = data.index
    }

    if (data.event.type === 'dragend') {
        if (dragInfo.startIndex !== dragInfo.endIndex && !data.outside) {
            const fromTreat = treats[dragInfo.startIndex]
            const toTreat = treats[dragInfo.endIndex]
            treats[dragInfo.endIndex] = fromTreat
            treats[dragInfo.startIndex] = toTreat
        }
        dragInfo = {}
    }
}
