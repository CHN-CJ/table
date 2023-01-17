import MyTable from './MyTable/MyTable.vue';

const components = {
    //es6语法
    //key与value一样
    //可以写成MyTable
    'MyTable': MyTable
}


export default {
    install(app) {
        for (let c in components) {
            app.component(c, components[c]);
        }
    }
}