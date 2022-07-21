<script setup lang="ts">
import SearchIcon from "@/assets/icon-search.svg";
import { defineComponent, ref, watch } from 'vue'


const props = defineProps(['users'])
const emits = defineEmits(["handleSearchChange", "handleClick"])
const username = ref('')
const handleClickUser = (username: string) => {
  emits('handleClick', username)
}
watch(username,
  (newValue) => {
    emits('handleSearchChange', newValue)
  });

</script>
<template>
  <input class="acc-Search_Input" type="text" placeholder="Type a GitHub username" v-model="username" />
  <img class="acc-Search_Icon" :src="SearchIcon" />
  <div class="acc-Search_Auto">
    <div @click="handleClickUser(user.username)" v-for="user in props.users" :key="user.username">
      {{ user.username }}
    </div>
  </div>
</template>
