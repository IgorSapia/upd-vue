import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PainelCliente from '../views/PainelCliente.vue'
import CadastroCliente from '../views/CadastroCliente.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/painel-cliente',
      name: 'painel-cliente',
      component: PainelCliente
    },
    {
      path: '/cadastro-cliente',
      name: 'cadastro-cliente',
      component: CadastroCliente
    }
  ]
})

export default router