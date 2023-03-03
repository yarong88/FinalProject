<template>
  <div class="LogInContainer">
    <div id="SignIn">
      <h3>Sign In</h3>
      <span class="icon"
        ><i class="fa fa-user fa-x" aria-hidden="true"></i
      ></span>
      <span> 회원정보를 입력해주세요</span>
      <div class="info_input">
        <div class="input_group">
          <input class="signin_input" v-model="user.id" placeholder="ID" />
          <br />
        </div>
        <input
          class="signin_input"
          v-model="user.password"
          type="password"
          password-reveal
          placeholder="password"
        /><br />
      </div>
      <br />
      <input class="checkbox" type="checkbox" value="Id_save" />아이디저장
      <input class="checkbox" type="checkbox" value="auto_login" />자동로그인
      <router-link to="/LogIn/SignUp" class="signup_link">회원가입</router-link>
      <br />
      <button v-on:click="login" class="signin_btn">login</button><br />
      <!-- <a v-bind:href="url.signUpUrl"> Sign Up </a> -->
      <hr style="color: rgb(128, 128, 128)" />
      <br />
      <div class="googlelogin" role="button" aria-disabled="false" tabindex="0">
        <svg viewBox="0 0 20 20" class="googleLogo">
          <g>
            <path
              d="M19.9996 10.2297C19.9996 9.54995 19.9434 8.8665 19.8234 8.19775H10.2002V12.0486H15.711C15.4823 13.2905 14.7475 14.3892 13.6716 15.0873V17.586H16.9593C18.89 15.8443 19.9996 13.2722 19.9996 10.2297Z"
              fill="#4285F4"
            ></path>
            <path
              d="M10.2002 20.0003C12.9518 20.0003 15.2723 19.1147 16.963 17.5862L13.6753 15.0875C12.7606 15.6975 11.5797 16.0429 10.2039 16.0429C7.54224 16.0429 5.28544 14.2828 4.4757 11.9165H1.08301V14.4923C2.81497 17.8691 6.34261 20.0003 10.2002 20.0003Z"
              fill="#34A853"
            ></path>
            <path
              d="M4.47227 11.9163C4.04491 10.6743 4.04491 9.32947 4.47227 8.0875V5.51172H1.08333C-0.363715 8.33737 -0.363715 11.6664 1.08333 14.4921L4.47227 11.9163Z"
              fill="#FBBC04"
            ></path>
            <path
              d="M10.2002 3.95756C11.6547 3.93552 13.0605 4.47198 14.1139 5.45674L17.0268 2.60169C15.1824 0.904099 12.7344 -0.0292099 10.2002 0.000185607C6.34261 0.000185607 2.81497 2.13136 1.08301 5.51185L4.47195 8.08764C5.27795 5.71762 7.53849 3.95756 10.2002 3.95756Z"
              fill="#EA4335"
            ></path>
          </g>
        </svg>
        Google로 계속하기
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data: function () {
    return {
      user: {
        id: "",
        password: "",
      },
      //   url: {
      //     signUpUrl: "/SignIn/SignUp",
      //   },
    };
  },
  methods: {
    login: function () {
      // console.log(this.user.id);
      // console.log(this.user.password);
      // axios.get("/SignIn/" + this.user.id + this.user.password).then((res) => {
      //   if ((res.data = "성공")) {
      //     alert("로그인 성공");
      //   } else {
      //     alert("로그인 실패");
      //   }
      console.log(this.user.id);
      console.log(this.user.password);
      axios
        .post("/SignIn", {
          user_id: this.user.id,
          user_pwd: this.user.password,
        })
        .then((response) => {
          if (response.data == "wrong_id") {
            alert("아이디 틀림");
          } else if (response.data == "wrong_pwd") {
            alert("비번 틀림");
          } else if (response.data == "login_success") {
            alert("로그인 성공");
            this.$router.push("/"); // 메인 페이지로 보내줌
          }
        });
    },
    // axios
    //   .post("/SignIn/", {
    //     user_id: this.user.id,
    //     user_pwd: this.user.password,
    //   })
    //   .then(
    //     (response) => {
    //       //로그인 성공
    //       alert("success login");
    //     },
    //     (error) => {
    //       // error 를 보여줌
    //       alert(error.response.data.error);
    //     }
    //   )
    //   .catch((error) => {
    //     alert(error);
    //   });
  },
};
</script>

<style>
.LogInContainer {
  width: 400px;
  height: 600px;
}
h3 {
  text-align: center;
  margin: 50px;
}
.googlelogin {
  user-select: none;
  transition: 20ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 36px;
  width: 325px;
  border-radius: 4px;
  color: rgb(17, 17, 17);
  font-size: 14px;
  line-height: 1;
  padding-left: 12px;
  padding-right: 12px;
  font-weight: 500;
  background: white;
  border: 1px solid rgba(15, 15, 15, 0.15);
  box-shadow: rgba(15, 15, 15, 0.05) 0px 1px 2px;
  margin-bottom: 4px;
}
.googlelogin:hover {
  background-color: rgb(204, 204, 204);
}
.googleLogo {
  width: 14px;
  height: 14px;
  display: block;
  fill: inherit;
  flex-shrink: 0;
  backface-visibility: hidden;
  margin-right: 6px;
}
#SignIn {
  width: 350px;
  height: auto;
  position: absolute;
  top: 10%;
  left: 40%;
}
.input_group {
  display: block;
}
.info_input {
  margin-top: 10px;
}
.signin_input {
  display: inline-block;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 100%;
  height: 40px;
}
.checkbox {
  width: 20px;
  height: 15px;
  font-size: small;
}
.signup_link {
  float: right;
}
.signin_btn {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  font-size: 15px;
  background-color: rgb(163, 163, 163);
  cursor: pointer;
}
</style>
