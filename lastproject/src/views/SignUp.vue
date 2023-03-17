<template>
  <div class="sign-up-container">
    <div id="sign_up">
      <h3>Sign Up</h3>
      <span class="icon"
        ><i class="fa fa-user fa-x" aria-hidden="true"></i
      ></span>
      <span>회원정보를 입력해주세요</span>
      <div class="info-input">
        <div class="input-group">
          <span class="signup-icon-large"
            ><i class="fa fa-user fa-2x" aria-hidden="true"></i
          ></span>
          <input
            ref="id_input"
            class="sign-up-input"
            v-model="user.id"
            placeholder=" ID"
            @keyup="idValid"
          />
          <button
            :disabled="!idValidFlag"
            id="id_valid_btn"
            class="check-valid"
            @click="idc"
          >
            중복검사
          </button>
          <div ref="valid_text" class="valid-common valid-text tooltip-bottom">
            유효하지 않은 아이디 입니다. <br />
            영문과 숫자만 사용할 수 있습니다.
          </div>
          <br />
        </div>
        <div class="input-group">
          <span class="signup-icon-large"
            ><i class="fa fa-lock fa-2x" aria-hidden="true"></i
          ></span>
          <input
            ref="pwd_input"
            class="sign-up-input-password"
            v-model="user.password"
            type="password"
            placeholder=" password"
            @keyup="pwdValid"
          />
          <div
            ref="valid_password"
            class="valid-common valid-password tooltip-bottom"
          >
            유효하지 않은 비밀번호 입니다. <br />대문자 / 소문자 / 숫자가 1개
            이상 존재해야합니다. <br />
            또한, 8자이상 16자 이하여야합니다.
          </div>
          <br />
        </div>
        <div class="input-group">
          <span class="signup-icon-large">
            <i class="fa fa-lock fa-2x" aria-hidden="true"></i
          ></span>
          <input
            class="sign-up-input-password"
            v-model="pwdCheck"
            type="password"
            placeholder=" password - confirm"
            @keyup="pwdCheckValid"
          />
          <div
            ref="match_password"
            class="valid-common match-password tooltip-bottom"
          >
            비밀번호가 동일하지 않습니다.
          </div>
        </div>
        <br />
        <div class="input-group">
          <span class="signup-icon-large"
            ><i class="fa fa-user fa-2x" aria-hidden="true"></i></span
          ><input
            ref="nick_input"
            class="sign-up-input"
            v-model="user.nickname"
            placeholder=" nickname"
            @keyup="nickValid"
          />
          <button
            :disabled="!nickValidFlag"
            id="nick_valid_btn"
            class="check-valid"
            @click="nickc"
          >
            중복검사
          </button>
          <div
            ref="valid_nickname"
            class="valid-common valid-nickname tooltip-bottom"
          >
            유효하지 않은 닉네임입니다. <br />영문과 숫자만 사용할 수 있습니다.
          </div>
          <br />
        </div>
        <div class="input-group">
          <span class="signup-icon-large"
            ><i class="fa fa-envelope fa-2x" aria-hidden="true"></i></span
          ><input
            ref="email_input"
            class="sign-up-input"
            type="email"
            v-model="user.email"
            placeholder=" email"
            @keyup="emailCheckValid"
          />
          <button
            :disabled="!emailValidFlag"
            id="email_valid_btn"
            class="check-valid"
            @click="emailc"
          >
            중복검사
          </button>
          <div
            ref="valid_email"
            class="valid-common valid-email tooltip-bottom"
          >
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
        class="sign-up-btn"
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
        this.$refs.valid_text.style.visibility = "hidden";
        this.idValidFlag = true;
      } else {
        this.$refs.valid_text.style.visibility = "visible";
        this.idValidFlag = false;
      }
    },
    pwdValid() {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(this.user.password)
        // 대문자 / 소문자 / 숫자가 1개 이상 존재하고 8자이상 16자 이하
      ) {
        this.$refs.valid_password.style.visibility = "hidden";
        this.pwdValidFlag = true;
      } else {
        this.$refs.valid_password.style.visibility = "visible";
        this.pwdValidFlag = false;
      }
    },
    pwdCheckValid() {
      if (this.user.password === this.pwdCheck) {
        this.$refs.match_password.style.visibility = "hidden";
      } else {
        this.$refs.match_password.style.visibility = "visible";
      }
    },
    nickValid() {
      if (/^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]*$/.test(this.user.nickname)) {
        // 영문/숫자/한글
        this.$refs.valid_nickname.style.visibility = "hidden";
        this.nickValidFlag = true;
      } else {
        this.$refs.valid_nickname.style.visibility = "visible";
        this.nickValidFlag = false;
        // this.$refs.idvalid_text.disabled = false;
      }
    },
    emailCheckValid() {
      if (/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(this.user.email)) {
        this.$refs.valid_email.style.visibility = "hidden";
        this.emailValidFlag = true;
      } else {
        this.$refs.valid_email.style.visibility = "visible";
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
            friends_list: [],
            bookmark_list: [],
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
.sign-up-container {
  height: 600px;
  display: inline-block;
}
#sign_up {
  width: 400px;
  height: auto;
}
.info-input {
  margin-top: 30px;
}
.input-group {
  position: relative;
  display: inline;
}
/* 유효성 검사 */
.input-group .valid-common {
  /* width: 120px; 툴팁 영역의 넓이를 설정 */
  background-color: black;
  /* color: #fff; */
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  color: red;
  font-size: 20px;
  position: absolute; /* 절대 위치를 사용 */
  z-index: 1;
}
/* 아이디 유효성 검사 */
.input-group .valid-text {
  visibility: hidden; /* 이벤트가 없으면 툴팁 영역을 숨김 */
}
.input-group .valid-text::after {
  content: " "; /* 정사각형 영역 사용 */
  position: absolute; /* 절대 위치 사용 */
  border-style: solid;
  border-width: 5px; /* 테두리 넓이를 5px 로 설정 */
}
/* 패스워드 유효성 검사 */
.input-group .valid-password {
  visibility: hidden;
}
.input-group .valid-password::after {
  content: " ";
  position: absolute;
  border-style: solid;
  border-width: 5px;
}
/* 패스워드 유효성 검사 */
.input-group .valid-password {
  visibility: hidden;
}
.input-group .valid-password::after {
  content: " ";
  position: absolute;
  border-style: solid;
  border-width: 5px;
}
/* 패스워드 매칭 검사 */
.input-group .match-password {
  visibility: hidden;
}
.input-group .match-password::after {
  content: " ";
  position: absolute;
  border-style: solid;
  border-width: 5px;
}
/* 닉네임 유효성 검사 */
.input-group .valid-nickname {
  visibility: hidden;
}
.input-group .valid-nickname::after {
  content: " ";
  position: absolute;
  border-style: solid;
  border-width: 5px;
}
/* 이메일 유효성 검사 */
.input-group .valid-email {
  visibility: hidden;
}
.input-group .valid-email::after {
  content: " ";
  position: absolute;
  border-style: solid;
  border-width: 5px;
}
/* 툴팁 박스 모양 */
.input-group .tooltip-bottom {
  width: 400px;
  top: 35px;
  left: 50px;
  margin-left: -60px;
}
.input-group .tooltip-bottom::after {
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-color: transparent transparent black transparent;
}
/* 툴팁 박스 모양 끝 */
.sign-up-input {
  display: inline;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 80%;
  height: 40px;
  margin-top: 20px;
}
.sign-up-input-password {
  display: inline;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 90%;
  height: 40px;
  margin-top: 20px;
}
.sign-up-btn {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background-color: rgb(163, 163, 163);
  cursor: pointer;
}
.check-valid {
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
@media screen and (max-width: 500px) {
  .sign-up-container {
    height: 700px;
    display: inline-flex;
  }
  #sign_up {
    position: inherit;
  }
  .input-group {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
  .signup-icon-large {
    display: flex;
    align-items: center;
  }
  .sign-up-input {
    width: 200px;
    margin-top: 0;
  }
  .sign-up-input-password {
    width: 250px;
    margin-top: 0;
  }
  .check-valid {
    margin-top: 0;
  }
  .sign-up-btn {
    width: 250px;
  }
}
</style>
