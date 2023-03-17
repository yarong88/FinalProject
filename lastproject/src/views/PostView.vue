<template>
  <div>
    <postItem
      v-for="post in postList"
      v-bind:post-data="post"
      v-bind:login-data="loginData"
      :key="post"
    />
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import postItem from "../components/PostItem.vue";

export default {
  name: "postList",
  data() {
    return {
      algorithmLoadMemo: [],
      recentLoadMemo: [],
      postData: [],
      postList: [],
      scrollTop: "",
      loginData: Object,
    };
  },
  components: { postItem },
  mounted() {
    if ("login-data" in window.localStorage) {
      this.loginData = JSON.parse(window.localStorage.getItem("login-data"));
      axios.get("/loadLoginData/" + this.loginData.user_id).then((res) => {
        const loginData = JSON.stringify(res.data);
        window.localStorage.setItem("login-data", loginData);
        this.loginData = JSON.parse(window.localStorage.getItem("login-data"));
        this.dataLoad(loginData.user_id);
      });
    } else {
      this.dataLoad("");
    }

    window.scrollTo(0, 0);
    document.addEventListener("scroll", this.handleScroll);
    // 스크롤시 이벤트 발생 // 잠시 잠금
  },
  unmounted() {
    document.addEventListener("scroll", this.handleScroll);
    // 다른 페이지 이동시 이벤트 삭제
  },
  methods: {
    dataLoad(loginId) {
      // DB에서 데이터 받아오기, 최신 10개 + 추천수 10개
      axios
        .all([
          axios.post("/algorithmLoad", {
            recommendPoint: 10,
            loginId: loginId,
          }),
          axios.post("/recentMemoLoad", { loginId: loginId }),
        ])
        .then(
          axios.spread((res1, res2) => {
            // 화살표 함수를 사용하면 this.를 사용할 수 있다.
            this.algorithmLoadMemo = res1.data;
            this.recentLoadMemo = res2.data;

            // proxy 상태로는 셔플할 수 없다. 그래서 아래의 방법으로 풀어준다.
            const algorithmLoadMemoDummy = JSON.parse(
              JSON.stringify(this.algorithmLoadMemo)
            );
            const recentLoadMemoDummy = JSON.parse(
              JSON.stringify(this.recentLoadMemo)
            );
            // concat 메소드로 합친 후 shuffle한다.
            const shuffleDataDummy =
              algorithmLoadMemoDummy.concat(recentLoadMemoDummy);
            const shuffleData = shuffleDataDummy.sort(
              () => Math.random() - 0.5
            );
            console.log(shuffleData);
            // 중복 제거
            const matchingArr = [];
            for (let i = 0; i < shuffleData.length; i++) {
              if (!matchingArr.includes(shuffleData[i]._id)) {
                if (!(shuffleData[i].userId === this.loginData.user_id)) {
                  matchingArr.push(shuffleData[i]._id);
                  this.postData.push(shuffleData[i]);
                }
              }
            }
            this.organizeData(10); // 최신것들로 10개 끊기
          })
        )
        .catch(() => {});
    },
    organizeData(arrLength) {
      // DB에서 받은 데이터를 최신순으로 10개까지 정렬
      if (this.postData.length >= arrLength) {
        this.postList = [...this.postData].slice(0, arrLength);
      } else {
        this.postList = [...this.postData];
      }
    },
    handleScroll() {
      // console.log(window.pageYOffset);
      this.scrollTop = window.pageYOffset;
      if (this.scrollTop > 4000) {
        this.organizeData(20);
      }
    },
  },
};
</script>

<style></style>
