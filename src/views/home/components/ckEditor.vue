<template>
    <div :id="name" :name="name"></div>
</template>
<script lang="ts" setup>
    import { onMounted, ref, watch, onBeforeUnmount, nextTick } from 'vue'
    import { debounce } from 'lodash'

    const props = defineProps({
        name: {
            type: String,
            default: ''
        },
        readonly: {
            type: Boolean,
            default: false
        },
        content: {
            Type: String,
            default: ''
        }
    })
    let ckEditor = ref()

    watch(
        () => props.content,
        (newVal, oldVal) => {
            nextTick(() => {
                if (newVal != ckEditor.value.getData()) {
                    setTimeout(() => {
                        ckEditor.value.setData(newVal)
                    }, 1500)
                }
            })
        },
        { immediate: true, deep: true }
    )
    watch(() => props.readonly,
        val => {
            if (!ckEditor.value || !val) return
            if(val){
                ckEditor.value.setReadOnly(val)
            }
        },
        {
            immediate: true
        }
    )
    // 初始化
    const init = () => {
        console.log(window.CKEDITOR, "-------------------")
        // 创建富文本实例
        ckEditor.value = (window as any).CKEDITOR.replace(props.name, {
            width: '100%'
            // readOnly: props.readonly
        })
        ckEditor.value.on('instanceReady', () => {
            ckEditor.value.setReadOnly(props.readonly)

            // 监听change回传内容
            ckEditor.value.on(
                'change',
                debounce(() => {
                    emit('update:content', ckEditor.value.getData())
                }, 300)
            )

            // 监听change回传内容
            ckEditor.value.on(
                'blur',
                debounce(() => {
                    emit('blur')
                }, 300)
            )

            // 监听上传返回内容，重设url
            ckEditor.value.on('fileUploadResponse', (evt: any) => {
                evt.stop()
                var data = evt.data
                let xhr = data.fileLoader.xhr
                let response = xhr.responseText
                let imgUrl = import.meta.env.VITE_ONEPLUS_DRH_IMG_URL + JSON.parse(response).result.FilePath
                if (!imgUrl) {
                    data.message = '上传失败' // 这是失败alert提示信息
                    evt.cancel()
                } else {
                    data.url = imgUrl // 返回到“图像信息”那里的URL框里面
                }
            })

            // 监听上传前内容，发送请求
            ckEditor.value.on('fileUploadRequest', (evt: any) => {
                var fileLoader = evt.data.fileLoader,
                    formData = new FormData(),
                    xhr = fileLoader.xhr
                // 重置上传地址
                fileLoader.uploadUrl = import.meta.env.VITE_ONEPLUS_DRH_URL + 'Api/Common/UploadFile'
                xhr.open('POST', fileLoader.uploadUrl, true)
                formData.append('file', fileLoader.file)
                fileLoader.xhr.send(formData)
                evt.stop()
            })

        })


    }
    onMounted(() => {
        init()
    })
    onBeforeUnmount(() => {
        const editor = ckEditor.value
        if (editor == null) return
        editor.destroy()
    })
    const emit = defineEmits(['update:content', 'blur'])
</script>

<style lang="scss">
    .cke_reset {
        background: #fff !important;
        border-radius: 4px;
    }

    .cke_top.cke_reset_all {
        background: #fff !important;
        padding: 0;
        margin: 6px 8px 2px 8px;
    }

    .cke_chrome {
        border: 1px solid #DBE1E7 !important;
    }

    .cke_top {
        border-bottom: 1px solid #DBE1E7 !important;
    }

    .cke_editable {
        width: 100%;
    }

    .cke_editable img {
        max-width: 100%;
    }

</style>
