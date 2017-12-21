import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
//使用vue-router插件
Vue.use(VueRouter);

// 路由配置,配置路由匹配列表
//webpack会把每一个路由打包为一个js文件，在请求该页面时，加载这个页面的js，异步实现懒加载（按需加载）
const Routers = [
    {
    	//匹配的路径
        path: '/index',
        //
        meta: {
            title: '首页'
        },
        //映射的组件
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./views/about.vue'], resolve)
    },
    {
    	//路由到同一个页面，数据不同
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
    //访问的路径不存在时，重定向到首页。
    {
        path: '*',
        redirect: '/index'
    }
];
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式，通过‘/’设置路径
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);
//导航钩子，beforeEach路由改变前触发
//to形参 即将进入的路由对象
//from 即将离开的路由对象
//next 调用改方法后才能进入下一个钩子
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});
//导航钩子，afterEach路由改变后触发
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => {
        return h(App)
    }
});