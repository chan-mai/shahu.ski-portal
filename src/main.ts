import { createApp } from 'vue'
import router from './router/index.ts'
import './style.css'
import App from './App.vue'
import { createClient } from 'microcms-js-sdk';
import "preline/preline";

export const client = createClient({
    serviceDomain: 'shahu-portal',
    apiKey: 'STtfZaMRR8kjHqpuPZllH4PSrUojqnqonXIx'
});

createApp(App).use(router).mount('#app')