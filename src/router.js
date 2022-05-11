import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';




//TablesPage
import TablesPage from './pages/TablesPage.vue'

//SportInstitution
import SportInstitutionDetails from './pages/ItemFromGrid.vue'
// import SportInstitutionPage from './pages/HomeGrid.vue'
import SportInstitutionPage from './pages/GridSystem3.vue'

//locate
import LocateDetails from './pages/locate/LocateDetails.vue'
import LocatePage from './pages/locate/LocatePage.vue'
import LocateRegistration from './pages/locate/LocateRegistration.vue'
import LocateEdit from './pages/locate/LocateEdit.vue'
import BarChart from './pages/locate/LocateChartPage.vue'

//Contacts
import ContactsDetails from './pages/contacts/ContactsDetails.vue'
import ContactsPage from './pages/contacts/ContactsPage.vue'
import ContactsRegistration from './pages/contacts/ContactsRegistration.vue'
import ContactsEdit from './pages/contacts/ContactsEdit'

//director
import DirectorDetails from './pages/director/DirectorDetails.vue'
import DirectorPage from './pages/director/DirectorPage.vue'
import DirectorRegistration from './pages/director/DirectorRegistration.vue'
import DirectorEdit from './pages/director/DirectorEdit.vue'

//trainer
import TrainerDetails from './pages/trainer/TrainerDetails.vue'
import TrainerPage from './pages/trainer/TrainerPage.vue'
import TrainerRegistration from './pages/trainer/TrainerRegistration.vue'
import TrainerEdit from './pages/trainer/TrainerEdit.vue'


Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },

     // sport institution
     {
      path: '/sportinstitutionpage', //GET api
      component: SportInstitutionPage,
    },
    {
      path: '/sportinstitution/:id/:name', //GET by id API
      component: SportInstitutionDetails,
    },


    //Locate
    {
      path: '/locatepage', //GET api
      component: LocatePage,
    },
    {
      path: '/locatedetails/:id/:address', //GET by id API
      component: LocateDetails,
    },
    {
      path: '/register-new-locate', //POST api
      component: LocateRegistration,
    },
    {
      path: '/edit/:id/:address', //PUT api
      component: LocateEdit
    },
    {
      path: '/locatepage/chart', //PUT api
      component: BarChart
    },

    //Contacts
    {
      path: '/contactspage',
      component: ContactsPage,
    },
    {
      path: '/contactsdetails/:id/:fullname',
      component: ContactsDetails,
    },
    {
      path: '/register-new-contacts', //POST api
      component: ContactsRegistration,
    },
    {
      path: '/contactsedit/:id/:website', //PUT api
      component: ContactsEdit
    },

    //Director
    {
      path: '/directorpage', //GET api
      component: DirectorPage,
    },
    {
      path: '/directordetails/:id/:fullname',//GET by id api
      component: DirectorDetails,
    },
    {
      path: '/register-new-director', //POST api
      component: DirectorRegistration,
    },
    {
      path: '/directoredit/:id/:fullname', //PUT api
      component: DirectorEdit
    },

    //Trainer
    {
      path: '/trainerpage',
      component: TrainerPage,
    },
    {
      path: '/trainerdetails/:id/:fullname',
      component: TrainerDetails,
    },
    {
      path: '/register-new-trainer',
      component: TrainerRegistration,
    },
    {
      path: '/traineredit/:id/:fullname', //PUT api
      component: TrainerEdit
    },







    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
