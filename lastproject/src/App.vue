<template>
  <nav>
    <div class="header">
      <router-link @click="(st = true) ? null : test" to="/"
        ><img class="header_img" src="./assets/note.png" alt="" />
        <strong class="header_text">Easy Peasy Lemon Squeezy</strong>
      </router-link>
      <router-link to="/HeadSearch"
        ><img
          v-if="st"
          @click="test"
          class="header_icon"
          src="./assets/search.png"
          alt=""
      /></router-link>
      <router-link to="/"
        ><img
          @click="test"
          v-if="!st"
          class="header_icon"
          src="./assets/close.png"
          alt=""
        />
      </router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      st: true,
    };
  },
  methods: {
    test: function () {
      this.st = !this.st;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  /* padding: 30px; */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: black;
}
.header {
  display: block;
  height: 80px;
  width: 100%;
  background: rgb(240, 221, 196);
}
.header_img {
  width: 50px;
  height: 50px;
  margin: 15px 15px 15px 30px;
  vertical-align: top;
}
.header_text {
  display: inline-block;
  margin-top: 27px;
}
.header_icon {
  width: 30px;
  height: 30px;
  margin: 25px 30px;
  float: right;
}
</style>
