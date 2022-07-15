<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { repo } from "@/Composables/local-storage";

import HeartEmptyIcon from "@/assets/icon-heart-empty.svg";
import HeartFilledIcon from "@/assets/icon-heart-filled.svg";
import ButtonIcon from "@/assets/icon-dots.svg";

//Use new Pinia Storage
import { useGitStore } from '@/stores/gitStore'
const gitStore = useGitStore()

//NOTE: Commented out old local-storage code
// import { useLocalStorage } from "@/Composables/local-storage";
// const { repo } = useLocalStorage();
//const { useRemoveLike, useSaveLike, repoLikeMap } = useLocalStorage();
const props = defineProps(["selectedUser"]);
const repos = ref<repo[]>([]);

//Note
//Made new method which will be used to as a boolean below to handle
//the filled in or not heart icon and which method to run based on this
const isRepoLiked = (repo: repo) => {
  return gitStore.likedRepos.find(x => x.full_name === repo.full_name) !== undefined;
};

watch(
  () => props.selectedUser,
  (newValue) => {
    fetchUserRepos(newValue.reposUrl);
  }
);

const fetchUserRepos = async (repoLink: string) => {
  const response = await fetch(repoLink);
  if (response.ok) {
    const data = await response.json();
    repos.value = data;
  }
};

onMounted(() => {
  if (props.selectedUser) {
    fetchUserRepos(props.selectedUser.reposUrl);
  }
});
</script>

<template>
  <div class="acc-Account_Item acc-User">
    <div class="acc-User_Picture">
      <img class="acc-User_Picture" width="200" :src="selectedUser.avatarUrl" />
    </div>
    <div class="acc-User_Content">
      <div class="acc-User_Name">
        <h2>{{ selectedUser.username }}</h2>
      </div>
      <div class="acc-User_Link">
        <a :href="selectedUser.profileUrl" class="btn-Button btn-Button-primary" target="_blank" alt="View profile">
          <span>View profile</span>
          <span class="btn-Button_Icon">
            <img :src="ButtonIcon" />
          </span>
        </a>
      </div>
    </div>
  </div>
  <div class="acc-Account_Item acc-Repos">
    <div class="acc-Repos_Row" v-for="repo of repos" :key="repo.name">
      {{ repo.name }}
      <!--
      Note:
      Merged the 2 images into one image. Made use of isRepoLiked
      Below is a Ternary Operator(if-else) which basically handles
      the filled in or not heart icon and which method to run based on this
      -->

      <img class="acc-Account_Icon"
        @click="isRepoLiked(repo) ? gitStore.removeLikeRepo(repo) : gitStore.addLikedRepo(repo)"
        :src="isRepoLiked(repo) ? HeartFilledIcon : HeartEmptyIcon" />
    </div>
  </div>
</template>

