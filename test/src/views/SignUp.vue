<template>
  <div id="SignUp">
    <h3>Sign Up</h3>
    <span>회원정보를 입력해주세요</span>
    <div class="info_input">
      <div class="input_group">
        <span class="icon"
          ><i class="fa fa-user fa-2x" aria-hidden="true"></i
        ></span>
        <input
          class="input"
          v-model="user.id"
          placeholder="ID"
          @blur="idValid"
        />
        <div v-if="!idValidFlag">유효하지 않은 아이디 입니다.</div>
        <br />
      </div>
      <div class="input_group">
        <span class="icon"
          ><i class="fa fa-lock fa-2x" aria-hidden="true"></i
        ></span>
        <input
          class="input"
          v-model="user.password"
          type="password"
          placeholder="password"
          @blur="pwdValid"
        />
        <div v-if="!pwdValidFlag">유효하지 않은 비밀번호 입니다.</div>
        <br />
      </div>
      <div class="input_group">
        <span class="icon">
          <i class="fa fa-lock fa-2x" aria-hidden="true"></i
        ></span>
        <input
          class="input"
          v-model="pwdCheck"
          type="password"
          placeholder="password - confirm"
          @blur="pwdCheckValid"
        />
        <div v-if="!pwdCheckFlag">비밀번호가 동일하지 않습니다.</div>
      </div>
      <br />
      <div class="input_group">
        <span class="icon"
          ><i class="fa fa-user fa-2x" aria-hidden="true"></i></span
        ><input class="input" v-model="user.nickname" placeholder="nickname" />
        <br />
      </div>
      <div class="input_group">
        <span class="icon"
          ><i class="fa fa-envelope fa-2x" aria-hidden="true"></i></span
        ><input
          class="input"
          type="email"
          v-model="user.email"
          placeholder="email"
        />
        <br />
      </div>
    </div>
    <button class="signup_btn" v-on:click="SignUp">SignUp</button>
  </div>
</template>

<script>
/* eslint-disable */
// import axios from 'axios';
export default {
  data() {
    return {
      user: {
        id: "",
        password: "",
        nickaname: "",
        email: "",
        // birth: "", //스피너로 바꾸기
        // gender: "", //라디오 버튼으로 바꾸기
        // hobby: "", //라디오? 스피너?  영화보기, 음악듣기, 책읽기, 게임하기 등등
      },
      pwdCheck: "",
      idValidFlag: true,
      pwdValidFlag: true,
      pwdCheckFlag: true,
    };
  },
  methods: {
    idValid() {
      if (/^[A-Za-z0-9]+$/.test(this.user.id)) {
        // 영문/숫자
        this.idValidFlag = true;
      } else {
        this.idValidFlag = false;
      }
    },
    pwdValid() {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(this.user.password)
        // 대문자 / 소문자 / 숫자가 1개 이상 존재하고 8자이상 16자 이하
      ) {
        this.pwdValidFlag = true;
      } else {
        this.pwdValidFlag = false;
      }
    },
    pwdCheckValid() {
      if (this.user.password === this.pwdCheck) {
        this.pwdCheckFlag = true;
      } else {
        this.pwdCheckFlag = false;
      }
    },
    SignUp: function (event) {
      if (!this.idValid || !this.passwordValidFlag || !this.passwordCheckFlag) {
        alert("유효성 확인");
        return;
      }
      this.$http
        .post("./views/SignIn/SignUp", {
          //axios 사용
          user: this.user,
        })
        .then((response) => {
          if (response.data.result === 0) {
            alert("Error, please, try again");
          }
          if (response.data.result === 1) {
            alert("Success");
            this.$router.push("./views/SignIn"); // Login 페이지로 보내줌
          }
        })
        .catch(function (error) {
          alert("error");
        });
    },
  },
};
</script>
<style>
#SignUp {
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
  margin-top: 70px;
}
.input {
  display: inline-block;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 100%;
  height: 40px;
}
/* .icon {
  position: relative;
  width: 40px;
  height: 40px;
  border: 1px solid #000;
}
i {
  position: absolute;
  top: 50%;
  left: 50%;
} */
.signup_btn {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background-color: rgb(163, 163, 163);
}
</style>
