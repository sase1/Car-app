import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



// import { DatePicker } from 'ant-design-vue'
// const app = DatePicker({})
// app.use(DatePicker)


// import Vue from 'vue';
// import { DatePicker } from 'ant-design-vue';
// Vue.use(DatePicker);

createApp(App).use(router).mount('#app')

