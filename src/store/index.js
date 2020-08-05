import Vue from 'vue'
import Vuex from 'vuex'
import * as  firebase from 'firebase'
// import VueRouter from 'vue-router'
import router from '@/router'

Vue.use(Vuex)
// Vue.use(VueRouter)

export const store = new Vuex.Store({
  state: {
    loadedSlides: [
      // {
      //   imgUrl:'https://wittyenglish.files.wordpress.com/2015/10/gandalf-at-the-shire.jpg' ,
      //   title: 'The Shire', 
      //   id:1,
      //   date: '2020-02-20',
      //   time: '13.00',
      //   content: 'A loosely organized set of territories nestled in northwest Middle-earth, the Shire is home to the hobbits and the place where Frodo Baggins, Bilbo Baggins, and Samwise Gamgee call home. Defined by lush wilderness and agriculture, the Shire is isolated from the rest of Middle-earth but it is that determination to keep it safe which motivates Frodo and Sam to keep it safe throughout their long quest to destroy the One Ring. The Shire begins our introduction to the world of Middle-earth and its a place that we, much like Frodo and Bilbo, always wish to return to.'
      // },
      // {
      //   imgUrl:'https://c4.wallpaperflare.com/wallpaper/335/429/69/rivendell-the-lord-of-the-rings-fantasy-art-waterfall-artwork-hd-wallpaper-preview.jpg' , 
      //   title: 'Riverndell', 
      //   id:2,
      //   date: '2020-07-25',
      //   time: '07.00' ,
      //   content: 'A haven for the elves in the midst of the Misty Mountains, this place is where the Fellowship of the Ring is formed during the Council of Elrond. Rivendell is a valley, surrounded by pine-trees and maintained as a hidden place. Rivendell features a cool, temperate climate. Uniquely, Rivendell is not affected by time, allowing Elrond and his people to live free of the vestiges of time, in peace but at the same time, somewhat stagnant. Playing an important role throughout the books, Rivendell’s time comes to an end when the One Ring is destroyed, the elves leaving Rivendell and heading to the Grey Havens across the seas.'
      // },
      // {
      //   imgUrl:'https://vignette.wikia.nocookie.net/lotr/images/7/79/Argonath.png/revision/latest?cb=20180902182809' , 
      //   title: 'Argonath', 
      //   id:3,
      //   date: '2012-12-21',
      //   time: '08.00',
      //   content: 'The monument was comprised of two enormous statues carved in the likenesses of Isildur and Anárion, standing upon either side of the River Anduin at the northern entrance to Nen Hithoel. It marked the northern border of Gondor, and nearby to the south were previous outposts, Amon Hen and Amon Lhaw.Each of the two figures bore a crown and a helm, with an axe in its right hand and its left hand respectively, raised in a gesture of defiance to the enemies of Gondor.'
      // },
      // {
      //   imgUrl:'https://bookstr.com/wp-content/uploads/2019/03/0sMr-BCAuLfq4XmHY.gif' , 
      //   title: 'Barad-dûr', 
      //   id:4,
      //   date: '2012-12-12',
      //   time: '09.00',
      //   content: 'Barad-dûr, otherwise known as the Dark Tower, is the second of the titular Two Towers. It is the fortress of the Dark Lord Sauron, acting as his stronghold in the barren wasteland of Mordor. Sauron keeps watch over his land via his great eye, the Eye of Sauron, acting as a symbol of his evil. The fortress itself is described as huge and utterly impenetrable. Held together via Sauron’s magic, it falls to ruin when the One Ring is destroyed, again symbolizing Sauron’s own fall.'
      // },
    ],
    user: null,
    loading: false,
    error: null
  },

  mutations: {
    setLoadedSlides(state, payload){
      state.loadedSlides = payload
    },

    createSlide(state, payload){
      state.loadedSlides.push(payload)
    },

    setUser(state, payload){
      state.user = payload
    },

    setLoading(state, payload){
      state.loading = payload
    },

    setError(state, payload){
      state.error = payload
    },

    clearError(state){
      state.error = null
    }
  },

  actions: {
    loadSlides( {commit}){
      commit('setLoading', true)
      firebase.database().ref('slides').once('value')
      .then( data => {
        console.log(data)
        console.log(123)
        const slides = []
        const obj = data.val()
        // obj.forEach( record => {
        //   slides.push({
        //     id: record.key,
        //     title: record.title,
        //     content: record.content,
        //     date: record.date,
        //     time: record.time
        //   })
        // })
        for(let key in obj){
          slides.push({
            id: key,
            title: obj[key].title,
            content: obj[key].content,
            imgUrl: obj[key].imgUrl,
            date: obj[key].date,
            time: obj[key].time,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedSlides', slides)
        commit('setLoading', false)
      })
      .catch(err =>{ 
        console.log(err)
        commit('setLoading', true)
      })
    },

    createSlide( {commit, getters}, payload){
      commit('setLoading', true)
      const slide = {
        title: payload.title,
        content: payload.description,
        // imgUrl: payload.imgUrl,
        date: payload.date,
        time: payload.time,
        creatorId: getters.user.id
        // id: 'ahshdhdh'
      }
      // Reach out to firebase and store it
      let imgUrl
      let key
      firebase.database().ref('slides').push(slide)
      .then(data => {
        console.log(data.key)
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('slides/' + key +  ext).put(payload.image)
      })
      .then(fileData => {
        imgUrl = fileData.ref.getDownloadURL()
        // console.log(imgUrl, 'img url')
        // console.log(imgUrl.i, 'img url.i')
        fileData.ref.getDownloadURL()
        .then(downloadURL => {
          //  console.log(downloadURL) 
          imgUrl = downloadURL
           console.log(imgUrl, 'imgurl 2')
           return firebase.database().ref('slides').child(key).update({
            imgUrl : downloadURL
          })
        })
        .then(()=> {
          commit('createSlide', {
            ...slide,
            imgUrl: imgUrl,
            id: key
          })
          console.log(imgUrl, 'imgurl 3')
          router.push('/meetups')
          commit('setLoading', false)
        })

      })
      .catch(err => {
        console.log(err)
      })
    },

    signUserUp( {commit}, payload){
      commit('setLoading', true)
      commit('clearError')

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then( cred => {
        commit('setLoading', false)
        const newUser = {
          id: cred.user.uid,
          registeredMeetups: []
        }
        commit('setUser', newUser)
      })
      .catch( err => {
        console.log(err)
        commit('setLoading', false)
        commit('setError', err )
      })
    },

    signUserIn( {commit}, payload){
      commit('setLoading', true)
      commit('clearError')

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then( cred => {
        const newUser = {
          id: cred.user.uid,
          registeredMeetups: []
        }
        commit('setUser', newUser)
      })
      .catch(err => {
        console.log(err)
        commit('setLoading', false)
        commit('setError', err)
      })
    },

    autoSignin({commit}, payload){
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: []
      })
    },

    logout({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
    },

    clearError({commit}){
      commit('clearError')
    }
  },

  getters: {
    loadedSlides (state){
      return state.loadedSlides.sort((a, b) => {
        return a.date > b.date
      })
    },
    featuredSlides(state, getters){
      return getters.loadedSlides.slice(0, 5)
    },
    loadedSlide(state){
      return (slideId => {
        return state.loadedSlides.find(slide => {
          return slide.id == slideId
        })
      })
    },
    user(state){
      return state.user
    },
    loading(state){
      return state.loading
    },
    error(state){
      return state.error
    }
  }
})