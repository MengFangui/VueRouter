<template>
    <div>
        <h1>首页</h1>
        <!--router-link会渲染为一个a标签 实现跳转-->
        <!--router-link 的tag属性 指定渲染成什么标签-->
        <!--router-link 的replace属性 不会留下history记录，不能使用后退键-->
        <!--router-link 的active-class属性 路由匹配成功时会自动给当前元素设置为一个名为router-link-active的class-->
        <router-link to="/about">跳转到 about</router-link>
    </div>
</template>
<script>
    export default {

    }
</script>