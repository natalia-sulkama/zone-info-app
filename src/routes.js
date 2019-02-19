import Home from './pages/home.vue';
import Info from './pages/info.vue';

export default [{
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/info/:id',
    name: 'Info',
    component: Info,
  }
];