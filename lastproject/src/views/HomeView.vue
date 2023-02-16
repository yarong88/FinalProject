<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="clickView" />
    <HelloWorld v-if="statu" msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      statu: false,
    };
  },
  methods: {
    clickView() {
      this.statu = true;
    },
  },
};
</script>
