import { defineStore } from 'pinia'
import type {repo} from '../Composables/local-storage'
export const useGitStore = defineStore('git', {
  state: () => {
    return {
     likedRepos: [] as repo[],
    }
  },
  actions: {
    addLikedRepo(repo:repo) {
      this.likedRepos.push(repo)
    },
    removeLikeRepo(repo:repo) {
      this.likedRepos.splice(this.likedRepos.indexOf(repo), 1)
    }
  },
  getters: {
    likedRepoCount(): boolean {
      return this.likedRepos.length > 0
    }
  },
  //This persists the data to local storage via the npm package pinia-plugin-persistedstate
  persist: true,
})

