<template>
  <div id="app">
    <transition  v-if="loading" name="fade">
      <p>Loading...</p>
    </transition>
    <transition-group v-else name="fade">
      <SkillList key="skills" />
      <JobPostings key="jobs" :get-jobs="this.getJobs" />
    </transition-group>
  </div>
</template>

<script>
import SkillList from './components/SkillList.vue';
import JobPostings from './components/JobPostings.vue';
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    SkillList,
    JobPostings
  },
  computed: {
    ...mapState(['loading']),
    ...mapGetters(['getJobs'])
  },
  async mounted () {
    await this.$store.dispatch('fetchData')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1440px;
  margin: 50px auto;
}
</style>
