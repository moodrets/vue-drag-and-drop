<template>
    <div class="container">
        <div class="app-header">
            <h1>Список тем обращения и продуктов</h1>
            <div v-if="treatsList.length" class="app-button app-button--info">
                Найдено: {{ reactiveTreatList.length }}
            </div>
        </div>
        <div class="app-treat-list" ref="parentRef">
            <TreatItem
                @emit-drag-event="onEmitDragEvent($event)"
                type="main"
                v-for="(treat, index) in reactiveTreatList"
                :key="index"
                :parent-index="index"
                :parent-elemet="parentRef"
                :index="index"
                :treat="treat"
            ></TreatItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import TreatItem from './TreatItem.vue'
import { treatsList } from '../../data/InitialData'
import { ITreat, ITreatEmitData } from 'types/TreatTypes'
import { reactive, ref } from 'vue'
import { treatDragHandler } from '../../data/DragHandler'

const reactiveTreatList = reactive<ITreat[]>(treatsList)
const parentRef = ref<HTMLElement>()

const onEmitDragEvent = (data: ITreatEmitData) => {
    treatDragHandler(data, reactiveTreatList)
}
</script>

<style scoped lang="scss">
.app-header {
    display: flex;
    align-items: center;
    margin-top: var(--app-spacing-lg);
    margin-bottom: var(--app-spacing-lg);

    h1 {
        margin: 0;
    }

    .app-button {
        margin-left: var(--app-spacing-md);
    }
}
</style>
