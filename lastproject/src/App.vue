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
        <div class="user-info">
          <div class="profile-img" @click="movepage">
            <i class="fa fa-user-o fa-3x" aria-hidden="true"></i>
          </div>
          <div class="p-nickname">{{ user_nickname }}</div>
          <div class="p-email">{{ user_email }}</div>
        </div>
        <div class="profile-wrap">
          <button
            v-if="myPageModalStatus"
            class="modal-btn"
            @click="editProfile"
          >
            <i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;프로필
          </button>
        </div>
        <div class="bookmark-wrap">
          <button class="modal-btn">
            <i class="fa fa-bookmark" aria-hidden="true"></i>&nbsp;북마크
          </button>
        </div>
        <div class="friend-wrap">
          <button class="modal-btn">
            <i class="fa fa-list" aria-hidden="true"></i>&nbsp;친구목록
          </button>
        </div>
        <div class="logout-wrap">
          <button class="modal-btn" @click="logout">
            <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;로그아웃
          </button>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="footer">Footer</div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      st: true,
      logInStatus: true,
      myPageModalStatus: false,
      user_nickname: "",
      user_email: "",
      user_id: localStorage.getItem("login-id"),
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
    if ("login-data" in window.localStorage) {
      const loginData = JSON.parse(localStorage.getItem("login-data"));
      this.user_nickname = loginData.user_nickname;
      this.user_email = loginData.user_email;
      this.logInStatus = false;
    }
    this.value();
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
      window.localStorage.removeItem("login-data");
      window.location.reload();
    },
    editProfile() {
      this.$router.push("./EditProfile");
      this.myPageModalStatus = false;
    },
    movepage() {
      this.$router.push("./EditProfile");
      this.myPageModalStatus = false;
    },
    value() {
      axios.get("/profiler/" + this.user_id).then((res) => {
        this.user_nickname = res.data.user_nickname;
        this.user_email = res.data.user_email;
      });
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
  /* top: 0; */
  top: 78px;
  left: 528px;
  right: 0;
  margin: auto;
  width: 300px;
  height: 391px;
  text-align: start;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
}
.profile-img {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #cfcfcf;
  margin-top: 45px;
  margin-left: 36.5%;
  cursor: pointer;
}
.p-nickname {
  margin-top: 17px;
}
.p-email {
  margin-top: 10px;
}
.user-info {
  text-align: center;
  margin-bottom: 40px;
}
.profile-edit {
  margin-top: 20px;
}
.modal-btn {
  /* position: relative; */
  border: 0px;
  width: 100%;
  height: 30px;
  background-color: #fff;
}
.modal-btn:hover {
  background-color: #d8d8d8;
}
.modal-btn > i {
  margin-right: 6px;
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
