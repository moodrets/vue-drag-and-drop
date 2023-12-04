<template>
    <div class="svg-icon">
        <svg>
            <use :xlink:href="`${svgSpritePath}#${name}`"></use>
        </svg>
    </div>
</template>

<script lang="ts" setup>
import { routerPath } from '@/utils/routerPath'

const svgSpritePath = `${routerPath}svg-sprite.svg`

defineProps({
    name: String,
})
</script>

<style lang="scss">
.svg-icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
    flex: none;

    &.mr {
        margin-right: 8px;
    }

    &.ml {
        margin-left: 8px;
    }

    &--stroke {
        fill: none;
        stroke: currentColor;

        svg {
            fill: inherit;
            stroke: inherit;
        }
    }

    svg {
        display: block;
        width: inherit;
        height: inherit;
        fill: inherit;
    }
}
</style>
