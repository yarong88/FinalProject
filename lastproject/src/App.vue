<template>
  <nav class="header">
    <div class="inner-header">
      <div class="title-wrap">
        <router-link @click="(st = true) ? null : test" to="/"
          ><img class="header-img" src="./assets/note.png" alt="" />
          <strong class="header-text">Easy Peasy Lemon Squeezy</strong>
        </router-link>
      </div>
      <ul class="list-menu">
        <li>
          <router-link to="/HeadSearch"
            ><img
              v-if="st"
              @click="test"
              class="header-icon"
              src="./assets/search.png"
              alt=""
          /></router-link>
          <router-link to="/"
            ><img
              @click="test"
              v-if="!st"
              class="header-icon"
              src="./assets/close.png"
              alt=""
            />
          </router-link>
        </li>
        <li>
          <div v-if="st">
            <router-link to="/LogIn"
              ><img
                v-if="logInStatus"
                class="header-icon"
                src="./assets/profile.png"
                alt=""
            /></router-link>
            <img
              v-if="!logInStatus"
              class="header-icon-test"
              @click="myPageModalOn"
              src="./assets/check.png"
              alt=""
            />
          </div>
        </li>
        <li>
          <router-link to="/MemoList"
            ><img v-if="st" class="header-icon" src="./assets/video.png" alt=""
          /></router-link>
        </li>
      </ul>
    </div>
  </nav>
  <hr />
  <router-view />
  <div v-if="myPageModalStatus" class="my-page-modal-container">
    <div class="my-page-modal-background" @click="myPageModalOff"></div>
    <div class="my-page-modal">
      <div class="my-page-modal-body">
        <button @click="logout">로그아웃</button>
      </div>
    </div>
  </div>
  <hr />
  <div class="footer">Footer</div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      st: true,
      logInStatus: true,
      myPageModalStatus: false,
    };
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        // console.log(to.path, from.path)
        if (to.path === "/") {
          this.$router.go();
        }
        window.scroll(0, 0);
      }
    },
  },
  mounted() {
    if ("login-id" in window.localStorage) {
      this.logInStatus = false;
    }
  },
  methods: {
    test: function () {
      this.st = !this.st;
    },
    myPageModalOn() {
      this.myPageModalStatus = true;
      document.body.style.overflow = "hidden";
    },
    myPageModalOff() {
      this.myPageModalStatus = false;
      document.body.style.overflow = "auto";
    },
    logout() {
      window.localStorage.removeItem("login-id");
      window.location.reload();
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
  display: flex;
  justify-content: center;
  text-align: center;
  height: 80px;
  width: 100%;
  background: #caecff;
}
.inner-header {
  width: 1000px;
  display: flex;
  justify-content: space-between;
}
.title-wrap {
  display: inline-block;
  text-align: center;
  /* margin-left: 4em; */
}
.header-img {
  width: 50px;
  height: 50px;
  margin: 15px 15px 15px 30px;
  vertical-align: top;
}
.header-text {
  display: inline-block;
  margin-top: 30px;
}
.header-icon {
  width: 30px;
  height: 30px;
  margin: 25px 30px;
}
.header-icon-test {
  width: 30px;
  height: 30px;
  margin: 25px 30px;
}
.list-menu {
  display: flex;
  list-style: none;
  margin: 0;
  /* float: right; */
  /* margin: 0; */
}
li {
  float: left;
}
.my-page-modal-container {
  position: absolute;
}
.my-page-modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.my-page-modal-body {
  position: fixed;
  top: 0;
  bottom: 250px;
  left: 700px;
  right: 0;
  margin: auto;
  width: 300px;
  height: 500px;
  text-align: start;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
}
.footer {
  background: #777777;
  height: 80px;
}
@media screen and (max-width: 500px) {
  .header {
    height: 50px;
  }
  .header-text {
    display: none;
  }
  .header-img {
    width: 30px;
    height: 30px;
    margin: 10px 20px;
    vertical-align: top;
  }
  .header-icon {
    width: 20px;
    height: 20px;
    margin: 15px 20px 0px 0px;
  }
  .header-icon-test {
    width: 20px;
    height: 20px;
    margin: 15px 20px 0px 0px;
  }
  .my-page-modal-body {
    bottom: 300px;
    left: 140px;
    width: 250px;
  }
}
</style>
