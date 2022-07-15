import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
const app = createApp(App);

app.use(pinia)
app.use(router);

app.mount("#app");
