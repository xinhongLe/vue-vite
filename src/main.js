import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router/index"

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import Icon from './plugins/icon';


const app = createApp(App);
app.use(router);
app.use(ElementPlus, {
    size: 'large',
    locale: zhCn
});
app.use(Icon);
app.mount('#app');
