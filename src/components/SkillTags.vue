<template>
  <div>
    <span v-for="(skill, index) in selectedSkills" :key="index" class="text-xs font-semibold w-1/6 inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 uppercase mr-5 mt-3 mb-10 m-auto">
      {{skill.skillName}} || lev. {{skill.skillLevel}}
      <span class="float-right" @click='removeTag(index)'>x</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SkillTags',
  props: {
    selectedSkills: Array
  },
  methods: {
    removeTag (index) {
      this.selectedSkills.splice(index, 1)
      this.$store.commit('removeSkills', index);
      this.$store.commit('sumSkills');
    }
  }
}
</script>

<style scoped>
span span:hover {
  pointer-events: all;
  cursor: pointer;
}
</style>
