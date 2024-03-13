<template>
    <div class="upload" @click="triggerUpload">
        <slot></slot>
        <input
            type="file"
            v-bind="$attrs"
            ref="fileInputRef"
            @change="handleFileChange"
            :style="{ display: 'none' }"
        />
    </div>
</template>

<script lang="ts">
    import { uploadFile } from './oss'
    import { IOssUploadRes } from './props'
    import { ElLoading } from 'element-plus'
    import { defineComponent, ref } from 'vue'

    export default defineComponent({
        name: 'LyxUpload',
        emits: ['upload'],
        setup(props, { emit }) {
            const fileInputRef = ref<null | HTMLInputElement>(null)
            const triggerUpload = () => {
                fileInputRef.value?.click()
            }

            let uploadFiles: IOssUploadRes[] = []

            const handleFileChange = async (e: Event) => {
                const files = (e.target as HTMLInputElement).files

                if (!files) return

                const loading = ElLoading.service({
                    text: '正在上传，请稍后'
                })

                for (let i = 0; i < files.length; i++) {
                    const file = files[i]

                    await upload(file)
                }

                loading.close()
                emit('upload', uploadFiles)
                uploadFiles = []
                if (fileInputRef.value) {
                    fileInputRef.value.value = ''
                }
            }

            const upload = async (file: File) => {
                const result = await uploadFile(file)

                uploadFiles.push({
                    ...result,
                    fileName: file.name
                })
            }

            return {
                fileInputRef,
                triggerUpload,
                handleFileChange
            }
        }
    })
</script>
