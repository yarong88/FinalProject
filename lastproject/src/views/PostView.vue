<template>
  <div>
    <postItem
      v-for="(post, i) in postList"
      v-bind:postData="post"
      v-bind:key="i"
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
      postData: [],
      postList: [],
      scrollTop: "",
    };
  },
  components: { postItem },
  mounted() {
    // DB에서 데이터 받아오기
    axios
      .post("/memoLoad", {
        userId: "testId",
      })
      .then((response) => {
        // 화살표 함수를 사용하면 this.를 사용할 수 있다.
        this.postData = response.data;
        this.dataLoad(10);
      })
      .catch(function (error) {
        console.log(error);
      });

    window.scrollTo(0, 0);
    document.addEventListener("scroll", this.handleScroll);
    // 스크롤시 이벤트 발생 // 잠시 잠금
  },
  unmounted() {
    document.addEventListener("scroll", this.handleScroll);
    // 다른 페이지 이동시 이벤트 삭제
  },
  methods: {
    dataLoad(arrLength) {
      // DB에서 받은 데이터를 최신순으로 10개까지 정렬
      if (this.postData.length >= arrLength) {
        this.postList = [...this.postData].slice(-arrLength).reverse();
      } else {
        this.postList = [...this.postData].reverse();
      }
    },
    handleScroll() {
      // console.log(window.pageYOffset);
      this.scrollTop = window.pageYOffset;
      if (this.scrollTop > 4000) {
        this.dataLoad(20);
      }
    },
  },
};
</script>

<style></style>
