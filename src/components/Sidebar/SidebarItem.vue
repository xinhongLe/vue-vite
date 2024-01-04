<template>
    <el-sub-menu class="lyx-sub-menu" :index="item.name" v-if="item.children">
        <template #title>
            <img
                class="lyx-sidebar__icon"
                v-if="item.meta?.icon && icon"
                :src="icon"
                alt=""
            />
            <div class="lyx-sidebar__text">{{ item.meta?.title }}</div>
        </template>
        <el-menu-item-group>
            <sidebar-item
                v-for="route in item.children"
                :key="route.path"
                :item="route"
            />
        </el-menu-item-group>
    </el-sub-menu>
    <div v-else class="lyx-menu-item">
        <el-menu-item :index="item.name" @click="onJump">
            <template #title>
                <img
                    class="lyx-sidebar__icon"
                    v-if="item.meta?.icon && icon"
                    :src="icon"
                    alt=""
                />
                <div class="lyx-sidebar__text">{{ item.meta?.title }}</div>
            </template>
        </el-menu-item>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import SidebarItem from "./SidebarItem.vue";


const route = useRoute();
const router = useRouter();

const props = defineProps({
    item: {
        type: Object as PropType<RouteRecordRaw>,
        required: true
    }
});

const icon = computed(() => {
    const url = `../../assets/icons/icon_${props.item.meta?.icon as string}${
        props.item.name === route.name ? "_selected" : "_rest"
    }.svg`;
    return new URL(url, import.meta.url).href;
});

const onJump = () => {
    router.push({
        path: props.item.path
    });
};
</script>

<style lang="scss" scoped>
.lyx-menu-item {
    :deep(.el-menu-item) {
        height: 44px;
        line-height: 44px;
    }
    :deep(.is-active) {
        .lyx-sidebar__text {
            color: #fff;
        }
        &:after {
            content: "";
            background-color: #242b3a;
            display: block;
            border-radius: 8px;
            position: absolute;
            left: 10px;
            right: 10px;
            height: 40px;
            top: 2px;
            z-index: 0;
        }
    }

    .lyx-sidebar__icon {
        display: block;
        position: relative;
        z-index: 1;
        width: 16px;
    }
}

.lyx-sub-menu {
    :deep(.el-sub-menu__title) {
        height: 44px;
        line-height: 44px;
    }
}

.lyx-sidebar__text {
    margin-left: 12px;
    height: 40px;
    line-height: 40px;
    position: relative;
    z-index: 1;
    color: #242b3a;
}
</style>
