<script lang="ts">
import SearchIcon from "@/assets/icon-search.svg";
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  props: {
    users: Array
  },
  emits: ["handleSearchChange", "handleClick"],
  setup(props, context) {
    const username = ref('')
    const handleClickUser = (username: string) => {
      context.emit('handleClick', username)
    }
    watch(username,
      (newValue) => {
        context.emit('handleSearchChange', newValue)
      });

    return {
      props,
      username,
      handleClickUser,
      SearchIcon
    }
  }
})
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
