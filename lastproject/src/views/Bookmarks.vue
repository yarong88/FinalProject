<template>
  <RecentMemo v-bind:recent-memo="recentDataBox" />
</template>

<script>
/* eslint-disable */
import axios from "axios";
import RecentMemo from "@/components/RecentMemo.vue";
export default {
  name: "app",
  components: {
    RecentMemo,
  },
  data() {
    return {
      recentDataBox: [],
    };
  },
  mounted() {
    if ("login-data" in window.localStorage) {
      const logindData = JSON.parse(window.localStorage.getItem("login-data"));
      // DB에서 데이터 받아오기
      axios
        .post("/bookmarkMemoLoad", {
          loginId: logindData.user_id,
        })
        .then((response) => {
          console.log(response.data);
          // 화살표 함수를 사용하면 this.를 사용할 수 있다.
          this.recentDataBox = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  methods: {},
};
</script>

<style></style>
