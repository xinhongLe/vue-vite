<template>
    <div class="container">
<!--       <div class="left">-->
<!--           <el-tree-->
<!--               ref="treeRef"-->
<!--               icon="span"-->
<!--               class="tree-adjust"-->
<!--               node-key="id"-->
<!--               empty-text="暂无数据"-->
<!--               :indent="5"-->
<!--               :data="treeList"-->
<!--               :highlight-current="true"-->
<!--               :default-expand-all="true"-->
<!--               :current-node-key="selectedTreeNode"-->
<!--               :expand-on-click-node="false"-->
<!--               @node-click="handleClickNode"-->
<!--               :filter-node-method="filterNode"-->
<!--           />-->
<!--       </div>-->
<!--        <div class="right">-->
<!--            <Ckeditor v-model:content="obj.text" :name="'analyze'" :readonly="false" />-->
<!--        </div>-->
<!--        <div class="grid-box">-->
<!--            <div v-for="(i, index) in 10"><p>{{i}}</p></div>-->
<!--        </div>-->
        <div
            class="item-box"
            style="border: 1px solid red;height: 300px;width:100%;margin-bottom: 20px"
            v-for="(i, index) in 20"
        >
            {{i}}
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

const dom = document.getElementsByClassName("lyx-asset__scroll")
const divs = document.getElementsByClassName("item-box")
console.log(dom, "dom======")

const lazyLoad = () => {
    // 容器的高度；
    const windowHeight = dom[0].offsetHeight ;
    // 滚动过的距离；
    const scrollHeight = dom[0].scrollTop;
    console.log(windowHeight, scrollHeight, "----")
    for (let i = 0; i < divs.length; i++) {
        // 容器的高度 + 滚动过的距离 > div到顶部的距离 && div到顶部的距离 + div自身高度 > 滚动过的距离 (保证在可视区域，避免用户直接滑到底部，则所有div都满足显示的情况)
        if (windowHeight + scrollHeight > divs[i].offsetTop && (divs[i].offsetTop + divs[i].offsetHeight > scrollHeight) ) {
            console.log(windowHeight, scrollHeight,  "-----")
            console.log(divs[i].offsetTop, "-----")
        }
    }
}


dom[0].addEventListener("scroll", lazyLoad)

</script>

<style scoped lang="scss">
.container{
    width: 100%;
    height: 100%;
    //@include flex($jc: flex-start, $ac:flex-start );
    .left{
        margin-right: 40px;
    }
    .right{
        flex: 1;
    }
}

.grid-box{
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    div{
        width: 100px;
        height: 100px;
        &:nth-child(1){
            background-color: pink;
        }
        &:nth-child(2){
            background-color: skyblue;
        }
        &:nth-child(3){
            background-color: yellow;
        }
    }
}
</style>
