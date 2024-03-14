<template>
    <div class="container">
       <div class="left">
           <el-tree
               ref="treeRef"
               icon="span"
               class="tree-adjust"
               node-key="id"
               empty-text="暂无数据"
               :indent="5"
               :data="treeList"
               :highlight-current="true"
               :default-expand-all="true"
               :current-node-key="selectedTreeNode"
               :expand-on-click-node="false"
               @node-click="handleClickNode"
               :filter-node-method="filterNode"
           />
       </div>
        <div class="right">
            <Ckeditor v-model:content="obj.text" :name="'analyze'" :readonly="false" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue"
const selectedTreeNode = ref("");
import Ckeditor from './components/ckEditor.vue'

const obj = reactive({
    text: ""
})
const treeList = [
    {
        label: 'Level one 1',
        children: [
            {
                label: 'Level two 1-1',
                children: [
                    { label: 'Level three 1-1-1' },
                ],
            },
        ],
    },
    {
        label: 'Level one 2',
        children: [
            {
                label: 'Level two 2-1',
                children: [
                    { label: 'Level three 2-1-1' },
                ],
            },
            {
                label: 'Level two 2-2',
                children: [
                    { label: 'Level three 2-2-1' },
                ],
            },
        ],
    },
    {
        label: 'Level one 3',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    { label: 'Level three 3-1-1' },
                ],
            },
            {
                label: 'Level two 3-2',
                children: [
                    { label: 'Level three 3-2-1'},
                ],
            },
        ],
    },
]

const handleClickNode = (data) => {
    selectedTreeNode.value = data.label;
};

const filterNode = (value, data) => {
    if (!value) return true;
    return data.label.includes(value);
};
</script>

<style scoped lang="scss">
.container{
    @include flex($jc: flex-start, $ac:flex-start );
    .left{
        margin-right: 40px;
    }
    .right{
        flex: 1;
    }
}
</style>
