<template>
  <nav class="header">
    <div class="inner-header">
      <div class="title-wrap">
        <router-link
          class="main-title-container"
          @click="(searchStatus = true) ? null : searchTransform"
          to="/"
          ><img class="main-title-img" src="./assets/note.png" alt="" />
          <img class="main-title-text" src="./assets/logo_text.png" alt="" />
        </router-link>
      </div>
      <ul class="list-menu">
        <li>
          <div class="header-icon-container">
            <router-link to="/HeadSearch"
              ><img
                v-if="searchStatus"
                class="header-icon"
                src="./assets/search.png"
                alt=""
              /><span class="header-text" @click="searchTransform">
                찾기
              </span></router-link
            >
          </div>
          <div class="header-icon-container">
            <router-link to="/"
              ><img
                @click="test"
                v-if="!searchStatus"
                class="header-icon"
                src="./assets/close.png"
                alt=""
              /><span class="header-text" @click="searchTransform"> 닫기 </span>
            </router-link>
          </div>
        </li>
        <li v-if="searchStatus">
          <div class="header-icon-container">
            <router-link to="/LogIn"
              ><img
                v-if="logInStatus"
                class="header-icon"
                src="./assets/profile.png"
                alt=""
              /><span class="header-text header-text-login">
                로그인
              </span></router-link
            >
          </div>
          <div class="header-icon-container" @click="myPageModalOn">
            <img
              v-if="!logInStatus"
              class="header-icon header-icon-login"
              src="./assets/check.png"
              alt=""
            /><span class="header-text header-text-mypage">
              마이<br />페이지
            </span>
          </div>
        </li>
        <li v-if="searchStatus">
          <div class="header-icon-container">
            <router-link to="/MemoList"
              ><img class="header-icon" src="./assets/video.png" alt="" /><span
                class="header-text"
                >모음
              </span></router-link
            >
          </div>
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
            <img
              v-if="!profileOn"
              class="profile-user-img"
              :src="profileImg"
              alt=""
            />
            <i
              v-if="profileOn"
              class="fa fa-user-o fa-3x"
              aria-hidden="true"
            ></i>
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
          <button class="modal-btn" @click="bookmarkPage">
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
  <div class="footer">
    이용약관 | 개인정보처리방침 | 책임의 한계와 법적고지 | 회원정보 | 고객센터
    <br />
    Copyright © QUICKRECORD Corp. All Rights Reserved.
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      searchStatus: true,
      logInStatus: true,
      myPageModalStatus: false,
      user_nickname: "",
      user_id: "",
      user_email: "",
      profileOn: true,
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
      this.profileImg = loginData.user_profile_img;
      this.logInStatus = false;
    }
    if (this.profileImg) {
      this.profileOn = false;
    }
  },
  methods: {
    searchTransform() {
      this.searchStatus = !this.searchStatus;
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
      // this.$router.push("/");
    },
    editProfile() {
      this.$router.push("./EditProfile");
      this.myPageModalStatus = false;
    },
    bookmarkPage() {
      this.$router.push("./Bookmark");
      this.myPageModalStatus = false;
    },
    movepage() {
      this.$router.push("./EditProfile");
      this.myPageModalStatus = false;
    },
  },
};
</script>

<style>
@font-face {
  font-family: "BMEuljiro";
  src: url("../public/fonts/BMEULJIROTTF.ttf");
}
@font-face {
  font-family: "BMYEONSUNG";
  src: url("../public/fonts/BMYEONSUNG_ttf.ttf");
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "BMYEONSUNG";
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
  justify-content: flex-end;
  position: absolute;
}
.title-wrap {
  display: inline-block;
  position: absolute;
  right: 668px;
  text-align: center;
  /* margin-left: 4em; */
}
.main-title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration-line: none;
}
.main-title-img {
  width: 50px;
  height: 50px;
  margin: 15px 15px 15px 30px;
  vertical-align: top;
}
.main-title-text {
  /* font-family: "BMEuljiro"; */
  /* display: inline-block;
  margin-top: 5px;
  font-size: 30px; */
  width: 250px;
}
.main-title-container:hover .main-title-text {
  font-size: 31px;
  transition: 0.2s linear;
}
.header-icon-container {
  position: relative;
}
.header-icon {
  width: 30px;
  height: 30px;
  margin: 25px 30px;
}
.header-icon-container:hover .header-icon {
  visibility: hidden;
}
.header-text {
  visibility: hidden;
  position: absolute;
  font-size: 30px;
  top: 26px;
  left: 23px;
}
.header-icon-container:hover .header-text {
  visibility: visible;
}
.header-text-login {
  font-weight: 600;
  left: 16px;
}
.header-icon-login {
  width: 30px;
  height: 30px;
  margin: 25px 30px;
}
.header-text-mypage {
  font-size: 27px;
  font-weight: 600;
  line-height: 23px;
  top: 22px;
  left: 13px;
  cursor: pointer;
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
}
.profile-user-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
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
  .inner-header {
    width: 396px;
  }
  .title-wrap {
    right: 205px;
    top: -5px;
  }
  .main-title-img {
    width: 35px;
    height: 35px;
  }
  .main-title-text {
    width: 130px;
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
  .my-page-modal-body {
    bottom: 485px;
    left: 100px;
    width: 250px;
  }
}
</style>
