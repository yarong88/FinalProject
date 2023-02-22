<template>
  <nav>
    <div class="header">
      <div class="logo_wrap">
        <router-link @click="(st = true) ? null : test" to="/"
          ><img class="header_img" src="./assets/note.png" alt="" />
          <strong class="header_text">Easy Peasy Lemon Squeezy</strong>
        </router-link>
      </div>
      <ul class="list_menu">
        <li>
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
        </li>
        <li>
          <router-link to="/SignIn"
            ><img
              v-if="st"
              class="header_icon"
              src="./assets/profile.png"
              alt=""
          /></router-link>
        </li>
        <li>
          <router-link to="/Shorts"
            ><img v-if="st" class="header_icon" src="./assets/video.png" alt=""
          /></router-link>
        </li>
      </ul>
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
  margin-top: 30px;
}
.logo_wrap {
  display: inline-block;
  text-align: center;
  margin-left: 4em;
}
.header_icon {
  width: 30px;
  height: 30px;
  margin: 25px 30px;
}
.list_menu {
  list-style: none;
  float: right;
  margin: 0;
}
li {
  float: left;
}
</style>
