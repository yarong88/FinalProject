<template>
  <div class="EditProfileContainer">
    <div class="EditProfile">
      <h3>프로필</h3>

      <div class="info-box">
        <h4>기본정보</h4>

        <div class="img-wrap">
          <img v-if="!imgstate" alt="????" :src="priview" class="pro-img" />
          <i
            class="fa fa-user-circle-o fa-3x"
            aria-hidden="true"
            v-if="imgstate"
          ></i>
          <input type="file" class="file" @change="readURL($event)" />
        </div>

        <div class="nick-wrap">
          <div class="title">nickname</div>
          <input
            ref="nick_input"
            type="text"
            class="editpro_input"
            v-model="user.nickname"
            :value="user.nickname"
            @keyup="nickValid"
          />
          <button
            :disabled="!nickValidFlag"
            id="nick_valid_btn"
            class="validc"
            @click="nickc"
          >
            중복검사
          </button>
          <div class="valid-text" v-if="!nickValidFlag">
            유효하지 않은 닉네임입니다. <br />영문과 숫자만 사용할 수 있습니다.
          </div>
        </div>

        <div class="email-wrap">
          <div class="title">email</div>
          <input
            ref="email_input"
            type="text"
            class="editpro_input"
            v-model="user.email"
            :value="user.email"
            @keyup="emailCheckValid"
          />
          <button
            :disabled="!emailValidFlag"
            id="email_valid_btn"
            class="validc"
            @click="emailc"
          >
            중복검사
          </button>
          <div class="valid-text" v-if="!emailValidFlag">
            유효하지 않은 이메일 입니다.
          </div>
        </div>
      </div>

      <div class="info-box">
        <h4>추가 정보 입력</h4>
        <div class="birth-wrap">
          <div class="title">생년월일</div>
          <input type="date" class="birth_input" v-model="user.birth" />
        </div>

        <div class="gender-wrap">
          <div class="title">성별</div>
          <input
            type="radio"
            name="g"
            v-model="user.gender"
            value="female"
            id="female"
          />
          <label for="female">여성</label>
          <input
            type="radio"
            name="g"
            v-model="user.gender"
            value="male"
            id="male"
          />
          <label for="male">남성</label>
        </div>

        <div class="hobby-wrap">
          <div class="title">취미</div>
          <select name="hobby" class="selectbox" v-model="user.hobby">
            <option v-for="hobby in hobbys" :key="hobby">
              {{ hobby }}
            </option>
          </select>
        </div>
      </div>
      <button class="modify-btn" @click="profile_save">Modify</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      user: {
        id: "",
        nickname: "",
        email: "",
        birth: "",
        gender: "",
        hobby: "노래듣기",
        profile_img: "",
      },
      hobbys: [
        "노래듣기",
        "영화감상하기",
        "사진찍기",
        "그림그리기",
        "요리하기",
        "연주하기",
        "기타",
      ],
      priview: "",
      nickValidFlag: true,
      emailValidFlag: true,
      imgstate: true,
    };
  },
  mounted() {
    const logindData = JSON.parse(window.localStorage.getItem("login-data"));
    this.user.id = logindData.user_id;
    this.user.nickname = logindData.user_nickname;
    this.user.email = logindData.user_email;
    this.user.birth = logindData.user_birth;
    this.user.gender = logindData.user_gender;
    this.user.hobby = logindData.user_hobby;
    this.user.profile_img = logindData.user_profile_img;

    if (this.user.profile_img) {
      this.priview = this.user.profile_img;
      this.imgstate = false;
    }
    // 로그인 데이터 불러오기
  },
  methods: {
    nickValid() {
      if (/^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]*$/.test(this.user.nickname)) {
        // 영문/숫자/한글
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
    nickc: function () {
      axios.get("/nickc/" + this.user.nickname).then((response) => {
        if (response.data == "가능") {
          const a = confirm("사용가능한 닉네임입니다. 사용하시겠습니까?");
          console.log(a);
          if (a) {
            this.$refs.nick_input.readOnly = true;
          }
        } else if (this.user.nickname == response.data) {
          alert("닉네임이 변경되지 않았습니다.");
        } else {
          alert("닉네임 중복입니다! 사용불가");
        }
      });
    },
    emailc: function () {
      axios.get("/emailc/" + this.user.email).then((response) => {
        if (response.data == "가능") {
          const a = confirm("사용가능한 이메일입니다. 사용하시겠습니까?");
          console.log(a);
          if (a) {
            this.$refs.email_input.readOnly = true;
          }
        } else if (this.user.email == response.data) {
          alert("이메일이 변경되지 않았습니다.");
        } else {
          alert("이메일 중복입니다! 사용불가");
        }
      });
    },
    // stateChange(event) {
    //   var selected = event.target.value;
    //   console.log("selected : ", selected);
    // },
    profile_save() {
      // console.log(this.user);
      axios
        .post("/editpro", {
          user_id: this.user.id,
          user_nickname: this.user.nickname,
          user_email: this.user.email,
          user_birth: this.user.birth,
          user_gender: this.user.gender,
          user_hobby: this.user.hobby,
          user_profile_img: this.priview,
        })
        .then((response) => {
          if (response.data == "수정완료") {
            axios.get("/loadLoginData/" + this.user.id).then((res) => {
              const loginData = JSON.stringify(res.data);
              window.localStorage.setItem("login-data", loginData);
              alert("Modify Success");
              // this.$router.push("/"); // 메인 페이지로 보내줌
              window.location.reload();
            });
          }
        });
    },
    readURL(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (event) => {
          this.priview = event.target.result;
          console.log(this.priview);
        };
        reader.readAsDataURL(input.files[0]);
        this.imgstate = false;
      }
    },
  },
};
</script>

<style>
h3 {
  margin: 50px;
}
h4 {
  text-align: start;
  margin-left: 20px;
}
.EditProfileContainer {
  width: 400px;
  height: 1000px;
  display: inline-block;
}
.EditProfile {
  width: 400px;
  height: auto;
}
.pro-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.info-box {
  border: 1px solid #929292;
  border-radius: 20px;
  margin-bottom: 15px;
}
.img-wrap {
  display: inline-block;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
.profile-edit {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #cfcfcf;
  /* margin-top: 45px; */
  margin-left: 25px;
  margin-bottom: 20px;
}
.file {
  margin-left: 20px;
}
.title {
  margin-left: 15px;
  text-align: start;
}
.editpro_input {
  display: inline;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 80%;
  height: 40px;
  margin-bottom: 25px;
}
.validc {
  width: 10%;
  height: 40px;
  font-size: 5px;
  cursor: pointer;
  float: right;
  margin-right: 10px;
}
.birth_input {
  display: inline;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 92%;
  height: 40px;
  margin-bottom: 25px;
}
.gender-wrap {
  margin-bottom: 20px;
}
#male {
  margin-left: 30px;
}
.modify-btn {
  width: 100%;
  height: 40px;
  background-color: rgb(163, 163, 163);
  cursor: pointer;
  margin-top: 10px;
}
.selectbox {
  width: 200px;
  text-align: center;
  height: 30px;
  margin-bottom: 25px;
}
</style>
