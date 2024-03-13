import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const menuRoutes: Array<RouteRecordRaw> = [
    {
        path: "/home",
        name: "Home",
        meta: {
            title: "主页",
            icon: "home",
            code: "ASSET_HOME"
        },
        component: () => import("@/views/home/index.vue")
    },
    {
        path: "/slot",
        name: "slot",
        meta: {
            title: "插槽",
            icon: "home",
            code: "ASSET_HOME"
        },
        component: () => import("@/views/slot/index.vue")
    },
    {
        path: "/searchTable",
        name: "searchTable",
        meta: {
            title: "查询页面",
            icon: "home",
            code: "ASSET_HOME"
        },
        component: () => import("@/views/searchTable/index.vue")
    },
    // {
    //     path: "/searchTable",
    //     name: "searchTable",
    //     meta: {
    //         title: "表格页面",
    //         icon: "jcgl",
    //         code: "ASSET_BASE_SETTING"
    //     },
    //     component: () => import("@/views/Setting/index.vue"),
    //     children: [
    //         {
    //             path: "/screenManagement",
    //             name: "ScreenManagement",
    //             meta: {
    //                 title: "品目设置",
    //                 code: "ASSET_CATEGORY"
    //             },
    //             component: () => import("@/views/Setting/ScreenManagement/index.vue")
    //         }
    //     ]
    // }
];

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home",
        children: menuRoutes
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404.vue")
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404"
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
