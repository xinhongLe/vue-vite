import { App } from 'vue';
import { CaretBottom, ArrowLeftBold, Edit, EditPen, Plus, Delete, MoreFilled, Search, ArrowRightBold, Setting, Fold, ArrowDown, View } from '@element-plus/icons-vue';

export default {
  install(app: App) {
    app.component('CaretBottom', CaretBottom);
    app.component('MoreFilled', MoreFilled);
    app.component('Edit', Edit);
    app.component('EditPen', EditPen);
    app.component('Plus', Plus);
    app.component('Delete', Delete);
    app.component('Search', Search);
    app.component('ArrowRightBold', ArrowRightBold);
    app.component('Setting', Setting);
    app.component('Fold', Fold);
    app.component('ArrowDown', ArrowDown);
    app.component('ArrowLeftBold', ArrowLeftBold);
    app.component('View', View);
  }
};
