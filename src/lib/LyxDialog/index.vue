<template>
    <el-dialog
        draggable
        v-bind="$attrs"
        :model-value="show"
        :align-center="true"
        :append-to-body="true"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <div class="dialog-container">
            <slot></slot>
        </div>
        <template #footer v-if="flag">
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>

<script lang="ts">
    import { computed, defineComponent } from 'vue'

    export default defineComponent({
        name: 'LyxDialog',
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },

        emits: ['update:show'],
        setup(props, { slots }) {
            const flag = computed(() => !!slots.footer)

            return {
                flag
            }
        }
    })
</script>

<style lang="scss">
    .el-dialog__body {
        max-height: 60vh;

        .dialog-container {
            max-height: 60vh;
        }
    }

    .el-dialog {
        border-radius: 8px;
    }

    .el-dialog__title {
        @include font();
        font-size: 16px;
    }
</style>
