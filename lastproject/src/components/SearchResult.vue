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
        <div style="font-size: large; margin: 10px">
          {{ data.contentText[0] }}
        </div>
        <img :src="data.contentImage" alt="" style="width: 60%; height: 60%" />
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
            <p>Canvas:</p>
            <img
              class="detail-image"
              :src="searchResultModalData.contentImage"
              alt=""
              style="width: 600px; height: 400px"
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
            <span>추천 : {{ searchResultModalData.recommendPoint }}</span>
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
    };
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
  background-color: antiquewhite;
}
.result-box {
  width: 300px;
  height: 200px;
  margin: auto;
  background-color: rgb(255, 239, 219);
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgb(192, 192, 192);
}
</style>
