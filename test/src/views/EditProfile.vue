<template>
  <div class="EditProfileContainer">
    <div class="EditProfile">
      <h3>프로필 편집</h3>

      <div class="img-wrap">
        <div class="profile-edit">
          <i class="fa fa-user-o fa-3x" aria-hidden="true"></i>
        </div>
        <input type="file" class="file" onchange="readURL(this)" />
      </div>

      <div class="nick-wrap">
        <div class="title">nickname</div>
        <input
          type="text"
          class="editpro_input"
          v-model="user.nickname"
          :value="user.nickname"
        />
      </div>

      <div class="email-wrap">
        <div class="title">email</div>
        <input
          type="text"
          class="editpro_input"
          v-model="user.email"
          :value="user.email"
        />
      </div>

      <div class="birth-wrap">
        <div class="title">생년월일</div>
        <input type="date" class="editpro_input" />
      </div>

      <div class="gender-wrap">
        <div class="title">성별</div>
        <input type="radio" value="여성" /> 여성
        <input type="radio" value="남성" /> 남성
      </div>

      <div class="hobby-wrap">
        <div class="title">취미</div>
        <select name="hobby" class="selectbox">
          <option v-for="hobby in hobbys" :key="hobby">{{ hobby }}</option>
        </select>
      </div>
      <button class="profile-save" @click="profile_save">Modify</button>
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
        id: localStorage.getItem("login-id"),
        nickname: "abc",
        email: "@@@@",
      },
      hobbys: ["운동하기", "노래듣기"],
    };
  },

  methods: {
    value() {
      axios.get("/nickr/" + this.user.id).then((res) => {
        this.user.nickname = res.data.user_nickname;
        this.user.email = res.data.user_email;
        this.aa = res.data.user_nickname;
      });
    },
    readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementsByClassName("profile-edit").src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        document.getElementsByClassName("profile-edit").src = "";
      }
    },
  },

  mounted() {
    this.value();
  },
};
</script>

<style>
h3 {
  margin: 50px;
}
.EditProfileContainer {
  width: 500px;
  height: 800px;
}
.EditProfile {
  width: 400px;
  height: auto;
  position: absolute;
  top: 10%;
  left: 40%;
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
  margin-left: 20px;
  text-align: start;
}
.editpro_input {
  display: inline;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 90%;
  height: 40px;
  margin-bottom: 25px;
}
.gender-wrap {
  margin-bottom: 20px;
}
.profile-save {
  width: 90%;
  height: 40px;
  margin-top: 30px;
  background-color: rgb(163, 163, 163);
  cursor: pointer;
}
.selectbox {
  width: 200px;
  text-align: center;
  height: 30px;
}
</style>
