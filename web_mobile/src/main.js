import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store'
import Vuex from 'vuex'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import localStore from 'utils/local_store';
import lazyLoadMenusRoutes from 'utils/lazyload';
import axios from 'axios';

Vue.prototype.$ajax = axios;
// import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI)

Vue.use(Vuex)

let backgroundMenus = JSON.parse(localStore.get("backgroundMenus"));
if (backgroundMenus) {
    store.commit("GLOBAL_SET_UER_MENUS", backgroundMenus);
    // 加载后台菜单
    let menusRoutes = lazyLoadMenusRoutes(backgroundMenus);
    router.addRoutes([menusRoutes]);
    store.commit("GLOBAL_LOAD_ROUTES_DONE");

}

// NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
    // NProgress.start();
    if (to.path == '/admin/login') {
        localStore.remove('userinfo');
        localStore.remove("groups");
        localStore.remove("backgroundMenus");
    }
    let user = JSON.parse(localStore.get('userinfo'));
    let path = to.path;
    // 后台必须登录
    let adminPath = path.indexOf('/admin');
    if (adminPath == 0) {
        if (!user && path != '/admin/login') {
            next({ path: '/admin/login' })
        } else {
            next()
        }
    } else {
        next()
    }
});
// router.afterEach(() => {
//     NProgress.done();
// });
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')