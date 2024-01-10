<template>
    <div class="lyx-asset__container">
        <Sidebar />
        <div class="lyx-asset-layout">
            <div class="lyx-asset__header">
                <div v-html="title"></div>
                <el-button>退出</el-button>
            </div>
            <div class="lyx-asset__scroll">
                <div class="lyx-asset__content">
                    <router-view />
                </div>
                <div>1</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar/index.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const title = computed(() => {
    const title = route.meta.title as string;
    if (title && title.indexOf("/") > -1) {
        const arr = title.split("/");
        return `${arr[0]} &nbsp;<span>/</span>&nbsp; <span>${arr[1]}</span>`;
    } else {
        return title;
    }
});
</script>

<style lang="scss" scoped>
.lyx-asset__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    background-color: #fff;
    z-index: 1;
}

.lyx-asset__header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 10px 20px;
    line-height: 30px;
    color: #90949E;
    background-color: #EFF2F5;
}

.lyx-asset-layout {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
}

.lyx-asset__scroll {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
}

.lyx-asset__content {
    padding: 20px;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    min-width: 980px;
}
</style>
