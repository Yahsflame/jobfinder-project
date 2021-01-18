import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    jobs: [],
    skills: [],
    selectedSkills: [],
    matchingSkills: []
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
    }
  },
  mutations: {
    setJobs (state, data) {
      state.jobs = data
    },
    setSkills: (state, payload) => {
      const { skillName, skillLevel } = payload
      state.selectedSkills.push({
        "skillName": skillName,
        "skillLevel": skillLevel
      })
    },
    removeSkills: (state, index) => {
      state.selectedSkills.splice(index, 1);
    },
    removeLoader (state) {
      state.loading = false
    },
    sumSkills (state) {
      const skillsArray = [];
      const jobsArray = state.jobs.job_postings;

      for(const skillName in state.selectedSkills) {
        skillsArray.push(state.selectedSkills[skillName].skillName);
      }

      const skillsString = skillsArray.toString();
      const escapedString = skillsString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regexString = escapedString.replace(',', '|')
      const finalString = new RegExp( regexString, 'g' );
      
      const intersection = jobsArray.filter(job => {
        return job.skills.match(finalString);
      })
      
      state.matchingSkills = intersection;
      let results = [];

      function getByValue2(arr, value) {
        let result  = arr.filter(function(o){return o.b == value;} );
        return result;
      }

      for(const skillPoint in intersection) {
        getByValue2(state.selectedSkills, intersection[skillPoint].skillName);
        results = getByValue2(state.selectedSkills, intersection[skillPoint].skillName);
        state.matchingSkills[skillPoint].scores = summingUp(results, intersection[skillPoint].skills);
      }

      function summingUp(selectedSkills, possibleJobs) {
        const strToArray = possibleJobs.split(',');
        const perfectScore = strToArray.length * 5;
        let currentScore = 0;
        for(let i = 0; i < selectedSkills.length; i++) {
          if(strToArray.includes(selectedSkills[i].skillName)) {
            currentScore += parseFloat(selectedSkills[i].skillLevel);
          }
        }
        return ((currentScore / perfectScore) * 100).toFixed(2);
      }
    },
    jobsToLowerCase (state) {
      for(const skill in state.jobs.job_postings){
        state.jobs.job_postings[skill].skills = state.jobs.job_postings[skill].skills.toLowerCase();
      }
    }
  },
  actions: {
    async fetchData ({ commit }) {
      await Axios.get('https://api.jsonbin.io/b/5f975ab4076e516c36fbc87f')
        .then(res => {
          commit('setJobs', res.data)
          commit('removeLoader', res.data)
          commit('jobsToLowerCase')
        })
    }
  }
})
