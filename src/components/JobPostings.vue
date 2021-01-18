<template>
  <div class="job-postings mt-10">
    <div class="flex flex-col">
      <div class="">
        <div class="py-2 align-middle inline-block max-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Required Skills
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Your Job Matching Score
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(posting, index) in jobs" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="">
                        <div class="text-sm font-medium text-gray-900">
                          {{posting.company}}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="">
                        <div class="text-sm text-gray-500">
                          {{posting.id}}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="">
                        <div class="text-sm text-gray-900">{{posting.title}}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <div class="">
                        {{posting.skills}}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <div class="">
                        {{posting.scores ? posting.scores : "Your score will appear when you enter a skill."}}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'JobPostings',
  props: {
    getJobs: Object
  },
  computed: {
    ...mapState(['matchingSkills']),
    jobs() {
      this.jobUpdater()
      return this.matchingSkills?.length > 0 ? this.matchingSkills : this.getJobs.job_postings;
    }
  },
  methods: {
    jobUpdater() {
      this.matchingSkills.sort((a,b) => b.scores - a.scores)
    }
  }
}
</script>

<style scoped>

</style>
