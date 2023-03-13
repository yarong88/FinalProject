<template>
  <div class="search-text">
    <h2>'{{ searchResult }}' (으)로 검색한 결과입니다.</h2>
  </div>
  <div class="result-wrap">
    <div class="inner-wrap">
      <div
        class="result-box"
        v-for="data in dataBox"
        v-bind:key="data"
        @click="searchResultModalOn(data)"
      >
        <div class="result-title">
          {{ data.contentText[0] }}
        </div>
        <img class="result-image" :src="data.contentImage" alt="" />
        <div style="font-size: small">{{ data.writingTime }}</div>
      </div>
    </div>
  </div>
  <div class="post-item-modal-container" v-if="searchResultModalStatus">
    <div class="post-item-modal-background" @click="searchResultModalOff"></div>
    <div class="post-item-modal">
      <div class="post-item-modal-body">
        <div class="source">
          <div class="canvas-container">
            <p class="canvas-title">Canvas:</p>
            <img
              class="detail-image"
              :src="searchResultModalData.contentImage"
              alt=""
            />
          </div>
          <div class="button-container">
            <p>Details :</p>
            <div>
              {{ searchResultModalData.contentText[0] }}
            </div>
            <div>
              {{ searchResultModalData.contentLongText }}
            </div>
            <div>{{ searchResultModalData.writingTime }}</div>
            <span>{{ searchResultModalData.ratingScore }}점</span>
            <span>추천 : {{ searchResultModalData.likeIdList.length }}</span>
            <button @click="searchResultModalOff">모달창 닫기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "app",
  props: ["searchResult", "dataBox"],
  data() {
    return {
      searchResultModalStatus: false,
      searchResultModalData: Object,
      mobileStatus: false,
    };
  },
  mounted() {
    if (screen.width <= 500) {
      this.mobileStatus = true;
    }
  },
  methods: {
    searchResultModalOn(data) {
      this.searchResultModalData = data;
      this.searchResultModalStatus = true;
      document.body.style.overflow = "hidden";
    },
    searchResultModalOff() {
      this.searchResultModalStatus = false;
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style>
.result-wrap {
  display: flex;
  justify-content: center;
  height: auto;
  width: 100%;
}
.inner-wrap {
  /* transform: translate(3%, 0); */
  display: grid;
  width: 1000px;
  height: auto;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 400px;
  background-color: #fff7e5;
}
.result-box {
  width: 300px;
  height: 250px;
  margin: auto;
  background-image: url("../assets/memo_background.png");
  background-size: 100% 120%;
}
.result-title {
  width: 150px;
  font-size: large;
  margin-top: 65px;
  margin-left: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.result-image {
  width: 180px;
  height: 120px;
}
.detail-image {
  width: 600px;
  height: 400px;
}
@media screen and (max-width: 500px) {
  .result-wrap {
    width: 375px;
  }
  .inner-wrap {
    display: block;
    width: 370px;
  }
  .canvas-title {
    display: none;
  }
  .detail-image {
    width: 360px;
    height: 240px;
  }
}
</style>
