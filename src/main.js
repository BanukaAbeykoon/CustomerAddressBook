import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import listCC from './components/listCC.vue';
import Navbar from './components/NavbarComponent.vue';
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import addNewCustomer from './components/addNewCustomer.vue';





const routes = [

  { path: '/list', component: listCC, name: 'list' },
  { path: '/nav', component: Navbar, name: 'nav' },
  { path: '/add', component: addNewCustomer, name: 'add' },

  



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(bootstrap);
app.mount('#app');
