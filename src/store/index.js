import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

// const publicPath = process.env.VUE_APP_PATH

// function checkLang () {
//   return document.getElementsByTagName('html')[0].getAttribute('lang')
// }

export default new Vuex.Store({
  state: {
    loading: true,
    jobs: [],
    skills: [],
    // cards: {},
    // quotes: {}
  },
  getters: {
    getJobs: (state) => {
      return state.jobs
    },
    getSkills: (state) => () => {
      let skillSet = [];
      
      for (const job in state.jobs.job_postings) {
        skillSet.push(state.jobs.job_postings[job].skills.split(','));
      }

      const skillSetNoDupes = [...new Set(skillSet.flat())];

      return skillSetNoDupes;
    },
    // actArray: (state, getters) => (index) => {
    //   const tempArray = [getters.getArray(0), getters.getArray(2), getters.getArray(3), getters.getArray(4)]
    //   return tempArray[index]
    // },
    // dateArray: (state, getters) => (index) => {
    //   const tempArray = [getters.getArray(13).Number, getters.getArray(14).Number]
    //   return tempArray[index]
    // }
  },
  mutations: {
    setJobs (state, data) {
      state.jobs = data
    },
    // getLangMut (state, data) {
    //   state.cards = data.cards
    //   state.title = data.title
    //   state.quotes = data.quotes
    //   state.subtitle = data.subtitle
    // },
    removeLoader (state) {
      state.loading = false
    }
  },
  actions: {
    async fetchData ({ commit }) {
      await Axios.get('https://api.jsonbin.io/b/5f975ab4076e516c36fbc87f')
        .then(res => {
          commit('setJobs', res.data)
          commit('removeLoader', res.data)
        })
    },
    // async getLang ({ commit }) {
    //   await Axios.get(`${publicPath}${checkLang()}-local.json`).then(response => {
    //     commit('getLangMut', response.data)
    //   })
    // }
  }
})
