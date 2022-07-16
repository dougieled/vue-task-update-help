<script lang="ts">
import HeartEmptyIcon from "@/assets/icon-heart-empty.svg";
import UserIcon from "@/assets/icon-user.svg";
//Use new Pinia Storage
import { useGitStore } from '@/stores/gitStore'
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const gitStore = useGitStore()
    return {
      gitStore,
      HeartEmptyIcon,
      UserIcon
    }
  }
})
</script>

<template>
  <div class="hd-Header">
    <div class="hd-Header_Nav">
      <div class="hd-Header_Item">
        <RouterLink to="/">
          <img class="hd-Header_Icon" :src="UserIcon" />
        </RouterLink>
      </div>
      <div class="hd-Header_Item">
        <RouterLink class="hd-Header_Link" to="/favorites">
          <img class="hd-Header_Icon" :src="HeartEmptyIcon" />
          <!--NOTE: call the likedRepos array from pinia store-->
          <span v-if="gitStore.likedRepos.length > 0" class="hd-Header_Count">{{ gitStore.likedRepos.length }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/define.css";
@import "@/assets/header.css";
</style>

