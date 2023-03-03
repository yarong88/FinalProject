<template>
  <div class="search_group">
    <div class="search_wrap">
      <span class="icon"
        ><i
          class="fa fa-search"
          style="
            font-size: 20px;
            background-color: rgb(128, 128, 128);
            color: #fff;
            padding: 5px 20px;
            border-radius: 10px;
          "
          ><input
            type="text"
            id="search"
            placeholder="검색어를 입력해주세요"
            @input="inputKeyWord($event)"
            @keyup.enter="memoSearch" /></i
      ></span>
    </div>
  </div>
  <br />
  <SearchResult
    v-if="status"
    v-bind:search-result="keyWord"
    v-bind:data-box="dataBox"
  />
  <br />
  <RecentMemo v-bind:recent-memo="recentDataBox" />
</template>

<script>
/* eslint-disable */
import axios from "axios";
import SearchResult from "@/components/SearchResult.vue";
import RecentMemo from "@/components/RecentMemo.vue";
export default {
  components: {
    SearchResult,
    RecentMemo,
  },
  data() {
    return {
      recentDataBox: [],
      status: false,
      keyWord: "",
      dataBox: [],
      inputtext: [],
    };
  },
  mounted() {
    axios
      .post("/memoLoad", {
        userId: "testId",
      })
      .then((response) => {
        // 화살표 함수를 사용하면 this.를 사용할 수 있다.
        this.recentDataBox = response.data;
        this.recentDataBox = [...this.recentDataBox].reverse();
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    inputKeyWord(e) {
      this.keyWord = e.target.value;
    },
    memoSearch() {
      if (!this.status) {
        this.status = !this.status;
      }
      axios
        .post("/memoSearch", {
          keyWord: this.keyWord,
        })
        .then((response) => {
          // 화살표 함수를 사용하면 this.를 사용할 수 있다.
          this.dataBox = response.data;
          // DB에서 받은 데이터를 최신순으로 10개까지 정렬
          if (this.dataBox.length >= 10) {
            this.dataBox = [...this.dataBox].slice(-10).reverse();
          } else {
            this.dataBox = [...this.dataBox].reverse();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
#search {
  background-color: rgb(128, 128, 128);
  width: 400px;
  height: 40px;
  border: 0;
  margin-left: 15px;
  font-size: 15px;
  color: #fff;
}
#search::placeholder {
  color: #fff;
}
.search_wrap {
  margin: 20px;
}
.icon {
  width: 20px;
  height: 20px;
}
.search_img {
  height: 30px;
  widows: 30px;
}
</style>
