<template>
  <div class="">

  <div class="col-span-3 sm:col-span-3">
    <label for="skill" class="block text-sm font-medium text-gray-700">Please make a skill selection (up to 10)</label>
    <select id="skill" name="skill" autocomplete="skill" class="mt-1 m-auto block w-1/6 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <option v-for="(skill, index) in this.skills" :key="index" :value="skill">{{skill}}</option>
    </select>
    <fieldset>
      <div>
        <legend class="mt-4 text-sm font-medium text-gray-700">Please rate your aptitude for the selected skill:</legend>
      </div>
      <div class="mt-4 flex flex-row justify-center">
        <div v-for="number in 5" :key="number" class="mr-5 flex flex-col justify-center items-center">
          <input :id="`skill_level-${number}`" name="skill_level" type="radio" :value="number" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
          <label for="skill_level" class="block text-sm font-medium text-gray-700">
            {{number}}
          </label>
        </div>
      </div>
    </fieldset>
    <button @click="createSkill" class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm mt-4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
      Add Skill
    </button>
    <SkillTags :selected-skills="selectedSkills" />
  </div>

  </div>
</template>

<script>
import SkillTags from "./SkillTags";
import { mapGetters } from 'vuex';

export default {
  name: 'SkillList',
  components: {
    SkillTags,
  },
  data() {
    return {
      skills: [],
      selectedSkills: []
    }
  },
  computed: {
    ...mapGetters(['getSkills'])
  },
  methods: {
    createSkill() {
      if (this.selectedSkills.some(e => e.skillName === document.getElementById('skill').value)) {
        return alert('You have already selected this skillset before. Please select a different one.')
      }
      
      if (this.selectedSkills.length <= 9) {
        this.selectedSkills.push(
          {"skillName": document.getElementById('skill').value,
          "skillLevel": document.querySelector('input[name = "skill_level"]:checked').value
          }
        );
      } else {
        alert("You can only select 10 skills. Please clear one to select another.")
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getSkills()
      this.skills = this.getSkills();
    })
  },
}
</script>

<style scoped>

</style>
