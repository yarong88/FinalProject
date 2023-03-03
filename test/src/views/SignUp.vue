<template>
  <div class="SignUpContainer">
    <div id="SignUp">
      <h3>Sign Up</h3>
      <span class="icon"
        ><i class="fa fa-user fa-x" aria-hidden="true"></i
      ></span>
      <span>회원정보를 입력해주세요</span>
      <div class="info_input">
        <div class="input_group">
          <span class="icon"
            ><i class="fa fa-user fa-2x" aria-hidden="true"></i
          ></span>
          <input
            ref="id_input"
            class="signup_input"
            v-model="user.id"
            placeholder=" ID"
            @keyup="idValid"
          />
          <button
            :disabled="!idValidFlag"
            id="idvalid_btn"
            class="checkValid"
            @click="idc"
          >
            중복검사
          </button>
          <div class="valid_text" v-if="!idValidFlag">
            유효하지 않은 아이디 입니다. <br />
            영문과 숫자만 사용할 수 있습니다.
          </div>
          <br />
        </div>
        <div class="input_group">
          <span class="icon"
            ><i class="fa fa-lock fa-2x" aria-hidden="true"></i
          ></span>
          <input
            ref="pwd_input"
            class="signup_input"
            v-model="user.password"
            type="password"
            placeholder=" password"
            @keyup="pwdValid"
          />
          <div class="valid_text" v-if="!pwdValidFlag">
            유효하지 않은 비밀번호 입니다. <br />대문자 / 소문자 / 숫자가 1개
            이상 존재해야합니다. <br />
            또한, 8자이상 16자 이하여야합니다.
          </div>
          <br />
        </div>
        <div class="input_group">
          <span class="icon">
            <i class="fa fa-lock fa-2x" aria-hidden="true"></i
          ></span>
          <input
            class="signup_input"
            v-model="pwdCheck"
            type="password"
            placeholder=" password - confirm"
            @keyup="pwdCheckValid"
          />
          <div class="valid_text" v-if="!pwdCheckFlag">
            비밀번호가 동일하지 않습니다.
          </div>
        </div>
        <br />
        <div class="input_group">
          <span class="icon"
            ><i class="fa fa-user fa-2x" aria-hidden="true"></i></span
          ><input
            ref="nick_input"
            class="signup_input"
            v-model="user.nickname"
            placeholder=" nickname"
            @keyup="nickValid"
          />
          <button
            :disabled="!nickValidFlag"
            id="nickvalid_btn"
            class="checkValid"
            @click="nickc"
          >
            중복검사
          </button>
          <div class="valid_text" v-if="!nickValidFlag">
            유효하지 않은 닉네임입니다. <br />영문과 숫자만 사용할 수
            있습니다..<br />
            또한, 4자이상 8자 이하여야합니다.
          </div>
          <br />
        </div>
        <div class="input_group">
          <span class="icon"
            ><i class="fa fa-envelope fa-2x" aria-hidden="true"></i></span
          ><input
            ref="email_input"
            class="signup_input"
            type="email"
            v-model="user.email"
            placeholder=" email"
            @keyup="emailCheckValid"
          />
          <button
            :disabled="!emailValidFlag"
            id="emailvalid_btn"
            class="checkValid"
            @click="emailc"
          >
            중복검사
          </button>
          <div class="valid_text" v-if="!emailValidFlag">
            유효하지 않은 이메일 입니다.
          </div>
          <br />
        </div>
      </div>
      <button
        :disabled="
          !user.email ||
          !user.password ||
          !pwdCheck ||
          !user.nickname ||
          !user.email
        "
        class="signup_btn"
        v-on:click="SignUp"
      >
        SignUp
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      user: {
        id: "",
        password: "",
        nickname: "",
        email: "",
        // birth: "", //스피너로 바꾸기
        // gender: "", //라디오 버튼으로 바꾸기
        // hobby: "", //라디오? 스피너?  영화보기, 음악듣기, 책읽기, 게임하기 등등
      },
      pwdCheck: "",
      idValidFlag: true,
      pwdValidFlag: true,
      pwdCheckFlag: true,
      nickValidFlag: true,
      emailValidFlag: true,
    };
  },
  watch: {
    user: "idValid",
  },
  methods: {
    idValid() {
      if (/^[A-Za-z0-9]+$/.test(this.user.id)) {
        // 영문/숫자
        this.idValidFlag = true;
      } else {
        this.idValidFlag = false;
        // this.$refs.idvalid_text.disabled = false;
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
    nickValid() {
      if (/^[A-Za-z0-9].{4,8}$/.test(this.user.nickname)) {
        // 영문/숫자
        this.nickValidFlag = true;
      } else {
        this.nickValidFlag = false;
        // this.$refs.idvalid_text.disabled = false;
      }
    },
    emailCheckValid() {
      if (/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(this.user.email)) {
        this.emailValidFlag = true;
      } else {
        this.emailValidFlag = false;
      }
    },
    SignUp: function () {
      console.log(this.idValidFlag);
      if (!this.idValidFlag) {
        alert("id 유효성을 확인 해주세요");
      } else if (!this.pwdValidFlag) {
        alert("password 유효성을 확인 해주세요");
      } else if (!this.nickValidFlag) {
        alert("nickname 유효성을 확인 해주세요");
      } else if (!this.emailValidFlag) {
        alert("email 유효성을 확인 해주세요");
      } else if (!this.$refs.id_input.readOnly) {
        alert("id 중복검사를 실행해주세요");
      } else if (!this.$refs.nick_input.readOnly) {
        alert("nickname 중복검사를 실행해주세요");
      } else if (!this.$refs.email_input.readOnly) {
        alert("email 중복검사를 실행해주세요");
      } else {
        axios
          .post("/SignUp", {
            //axios 사용
            user_id: this.user.id,
            user_pwd: this.user.password,
            user_nickname: this.user.nickname,
            user_email: this.user.email,
          })
          .then((response) => {
            if (response.data == "회원가입성공") {
              alert("SignUp Success");
              this.$router.push("./"); // Login 페이지로 보내줌
            }
          });
      }
    },
    idc: function () {
      console.log(this.user.id);
      axios.get("/SignIn/SignUp/idc/" + this.user.id).then((response) => {
        if (response.data == "가능") {
          const a = confirm("사용가능한 아이디입니다. 사용하시겠습니까?");
          console.log(a);
          if (a) {
            this.$refs.id_input.readOnly = true;
          }
        } else {
          alert("id중복입니다! 사용불가");
        }
      });
    },
    nickc: function () {
      axios
        .get("/SignIn/SignUp/nickc/" + this.user.nickname)
        .then((response) => {
          if (response.data == "가능") {
            const a = confirm("사용가능한 닉네임입니다. 사용하시겠습니까?");
            console.log(a);
            if (a) {
              this.$refs.nick_input.readOnly = true;
            }
          } else {
            alert("닉네임 중복입니다! 사용불가");
          }
        });
    },
    emailc: function () {
      axios.get("/SignIn/SignUp/emailc/" + this.user.email).then((response) => {
        if (response.data == "가능") {
          const a = confirm("사용가능한 이메일입니다. 사용하시겠습니까?");
          console.log(a);
          if (a) {
            this.$refs.email_input.readOnly = true;
          }
        } else {
          alert("이메일중복입니다! 사용불가");
        }
      });
    },
  },
};
</script>
<style>
.SignUpContainer {
  width: 400px;
  height: 600px;
}
#SignUp {
  width: 400px;
  height: auto;
  position: absolute;
  top: 10%;
  left: 40%;
}
.input_group {
  display: inline;
}
.info_input {
  margin-top: 30px;
}
.signup_input {
  display: inline;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 80%;
  height: 40px;
  margin-top: 20px;
}
.signup_btn {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background-color: rgb(163, 163, 163);
  cursor: pointer;
}
.checkValid {
  width: 10%;
  height: 40px;
  font-size: 5px;
  cursor: pointer;
  float: right;
  margin-top: 20px;
}
[aria-disabled="true"] {
  opacity: 0.5;
}
.valid_text {
  color: red;
  font-size: small;
}
</style>
