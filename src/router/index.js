// 1. 定义路由组件：
import {createRouter,createWebHashHistory,} from 'vue-router'
// 引入组件
import Home from '../views/Home.vue'

// 2. 定义一些路由：每个路由都需要映射到一个组件，后面再讨论嵌套路由。
const routes = [
    { path: '/', component: Home },
    { path:'/about', component: () => import('../views/About.vue') },
]

// 3. 创建路由实例并传递 `routes` 配置： 你可以在这里输入更多的配置，但我们在这里暂时保持简单
const router = createRouter({
    // 路由切换时滚动到最顶部
    scrollBehavior(_to, _from, _savedPosition) {
        return {
        x: 0,
        y: 0
        }
    },
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
   history: createWebHashHistory(),
   routes, // `routes: routes` 的缩写
})
export default router;