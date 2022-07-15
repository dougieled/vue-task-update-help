<script setup lang="ts">
import HeartFilledIcon from "@/assets/icon-heart-filled.svg";

//Use new Pinia Storage
import { useGitStore } from '@/stores/gitStore'
const gitStore = useGitStore()

//NOTE: Commented out old local-storage code
// import { useLocalStorage } from "@/Composables/local-storage";
// const { useRemoveLike,repoLikeMap } = useLocalStorage();
</script>
<template>
  <div class="acc-Account">
    <div class="acc-Account_Details">
      <h1 class="acc-Account_Heading">My favourite repos</h1>

      <div class="acc-Account_Item acc-Repos">
        <div class="acc-Repos_Row" v-for="repo in gitStore.likedRepos" :key="repo.full_name">
          {{ repo.name }} ({{ repo.owner.login }})
          <!--Note: 
          No harm in keeping the useRemoveLike and useSaveLike
          consistent and passing in the full repo object.
          -->
          <img @click="() => gitStore.removeLikeRepo(repo)" :src="HeartFilledIcon" class="acc-Account_Icon" />
        </div>
      </div>
    </div>
  </div>
</template>


