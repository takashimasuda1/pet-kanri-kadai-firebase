import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import ViewPet from '@/components/ViewPet';
import NewPet from '@/components/NewPet';
import EditPet from '@/components/EditPet';
import Login from '@/components/Login';
import Register from '@/components/Register';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-pet',
      component: NewPet,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:pet_id',
      name: 'edit-pet',
      component: EditPet,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pet_id',
      name: 'view-pet',
      component: ViewPet,
      meta: {
        requiresAuth: true
      }
    }
  ]
});


router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!firebase.auth().currentUser) {
      // ログインへ
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // ルートへ
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // 
    if (firebase.auth().currentUser) {
      // ログインへ
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // ルートへ
      next();
    }
  } else {
    //  ルートへ
    next();
  }
});

export default router;
