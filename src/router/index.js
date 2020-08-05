import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Meetups from '../views/Meetup/Meetups.vue'
import CreateMeetup from '../views/Meetup/CreateMeetup.vue'
import ViewMeetup from '../views/Meetup/ViewMeetup.vue'
import Profile from '../views/User/Profile.vue'
import Signin from '../views/User/Signin.vue'
import Signup from '../views/User/Signup.vue'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/meetup/create',
    name: 'CreateMeetup',
    component: CreateMeetup,
    beforeEnter: AuthGuard  /** <<<<------ auth guards */
  },
  {
    path: '/meetup/:meetup_id',
    name: 'ViewMeetup',
    props: true,
    component: ViewMeetup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
