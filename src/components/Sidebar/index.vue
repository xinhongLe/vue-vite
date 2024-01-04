<template>
    <div class="lyx-asset__sidebar">
        <div class="lyx-asset__title">
            <img src="/icon.png" alt="">
            菜单管理
        </div>
        <el-menu
            :default-active="activeMenu"
            :unique-opened="false"
            :collapse-transition="false"
            mode="vertical"
        >
            <sidebar-item
                v-for="route in menuRoutes"
                :key="route.path"
                :item="route"
            />
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { menuRoutes } from "@/router";
import SidebarItem from "./SidebarItem.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const activeMenu = computed(() => route.name);
</script>

<style lang="scss" scoped>
.lyx-asset__sidebar {
    width: 220px;
    display: flex;
    flex-direction: column;
    background-color: #EFF2F5;
    :deep(.el-menu) {
        border-right: 0;
        flex: 1;
        min-height: 0;
        background-color: #EFF2F5;
        overflow-y: auto;
        .el-menu-item, .el-sub-menu__title {
            background-color: transparent;
        }

        .el-menu-item-group__title {
            display: none;
        }
    }
    .el-menu::-webkit-scrollbar {
        // display: none;
    }
    .lyx-asset__title {
        height: 48px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        padding: 0 20px;
        img {
            display: block;
            width: 24px;
            margin-right: 8px;
        }
    }
}
</style>
