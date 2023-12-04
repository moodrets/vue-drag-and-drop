<template>
    <div
        ref="appTreat"
        class="app-treat"
        draggable="true"
        :class="{ 'app-treat--child': props.type === 'child' }"
        @dragstart="onDragEvent($event)"
        @dragend="onDragEvent($event)"
        @dragover="onDragEvent($event)"
        @dragenter="onDragEvent($event)"
        @dragleave="onDragEvent($event)"
    >
        <div class="app-treat__info">
            <div class="app-treat__column app-treat__column--number">
                <div class="app-treat__label">№</div>
                <div class="app-treat__value" v-if="props.type === 'main'">{{ index + 1 }}</div>
                <div class="app-treat__value" v-if="props.type === 'child'">{{ parentIndex + 1 }}.{{ index + 1 }}</div>
            </div>
            <div class="app-treat__column app-treat__column--name">
                <div class="app-treat__label">Название</div>
                <div class="app-treat__category-name">
                    <SvgIcon v-if="props.type === 'main'" class="mr" name="folder"></SvgIcon>
                    <SvgIcon v-if="props.type === 'child'" class="mr" name="page"></SvgIcon>
                    <span>{{ props.treat.name }}</span>
                </div>
            </div>
            <div class="app-treat__column app-treat__column--priority">
                <div class="app-treat__label">Очередность</div>
                <div class="app-treat__value">{{ index + 1 }}</div>
            </div>
            <div class="app-treat__column app-treat__column--subcategories" v-if="props.type === 'main'">
                <div class="app-treat__label">Подкатегории</div>
                <div class="app-treat__value">{{ subTreatsNames() }}</div>
            </div>
            <div class="app-treat__column app-treat__column--count" v-if="subTreatsExists && props.type === 'main'">
                <div class="app-treat__subcategories-count">
                    {{ props.treat.subTreats?.length }}
                </div>
            </div>
            <div class="app-treat__column app-treat__column--actions">
                <div
                    class="app-action-icon app-action-icon--expand"
                    :class="{ 'is-active': bodyIsOpen }"
                    @click.stop="toggleBody()"
                    v-if="subTreatsExists"
                >
                    <SvgIcon class="svg-icon--stroke" name="arrow-down"></SvgIcon>
                </div>
                <div class="app-action-icon app-action-icon--more" v-dropdown="DropdownDirectiveClickConfig">
                    <SvgIcon name="more"></SvgIcon>
                    <div class="app-dropdown">
                        <ul class="app-dropdown__list">
                            <li class="app-dropdown__list-item">
                                <SvgIcon class="mr" name="edit"></SvgIcon>
                                <div>Редактировать</div>
                            </li>
                            <li class="app-dropdown__list-item">
                                <SvgIcon class="mr" name="trash"></SvgIcon>
                                <div>Удалить</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-treat__body" v-if="bodyIsOpen && subTreatsExists">
            <TreatItem
                @emit-drag-event="onEmitDragEvent($event)"
                v-for="(subtreat, subindex) in props.treat.subTreats"
                type="child"
                :parentIndex="index"
                :index="subindex"
                :key="subindex"
                :treat="subtreat"
            ></TreatItem>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import SvgIcon from '@/components/common/SvgIcon.vue'
import { ITreat, ITreatEmitData } from '@/types/TreatTypes'
import { DropdownDirectiveClickConfig } from '@/directives/Dropdown'
import { treatDragHandler } from '@/data/DragHandler'

interface ComponentProps {
    parentIndex: number
    type: 'main' | 'child'
    index: number
    treat: ITreat
}

const emit = defineEmits<{
    (e: 'emitDragEvent', data: ITreatEmitData): void
}>()

const props = defineProps<ComponentProps>()

const appTreat = ref<HTMLDivElement>()

const bodyIsOpen = ref<boolean>(false)

const toggleBody = () => {
    bodyIsOpen.value = !bodyIsOpen.value
}

const subTreatsNames = () => {
    return props.treat.subTreats?.map((treat) => treat.name)?.join(' / ')
}

const subTreatsExists = computed(() => {
    return props.treat.subTreats && props.treat.subTreats.length ? true : false
})

const onDragEvent = (event: DragEvent) => {
    event.stopPropagation()

    const target = event.currentTarget as HTMLElement
    const parent = target.parentElement as HTMLElement

    if (event.type === 'dragstart') {
        bodyIsOpen.value = false
    }

    if (event.type === 'dragover') {
        appTreat.value?.classList.add('drag-over')
    }

    if (event.type === 'dragenter') {
    }

    if (event.type === 'dragleave') {
        appTreat.value?.classList.remove('drag-over')
    }

    if (event.type === 'dragend') {
    }

    emit('emitDragEvent', {
        event,
        index: props.index,
    })
}

const onEmitDragEvent = (data: ITreatEmitData) => {
    if (props.treat.subTreats?.length) {
        treatDragHandler(data, props.treat.subTreats)
    }
}
</script>
