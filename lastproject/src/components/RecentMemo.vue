<template>
  <div class="recent-memo-container">
    <div class="recent-memo-inner-container">
      <div
        class="recent-memo"
        v-for="data in recentMemo"
        v-bind:key="data"
        @click="recentMemoModalOn(data)"
      >
        <div style="font-size: large; margin: 10px">
          {{ data.contentText[0] }}
        </div>
        <img :src="data.contentImage" alt="" style="width: 60%; height: 60%" />
        <div style="font-size: small">{{ data.writingTime }}</div>
      </div>
    </div>
  </div>
  <div class="post-item-modal-container" v-if="recentMemoModalStatus">
    <div class="post-item-modal-background" @click="recentMemoModalOff"></div>
    <div class="post-item-modal">
      <div class="post-item-modal-body">
        <div class="source">
          <div class="canvas-container">
            <p>Canvas:</p>
            <img
              class="detail-image"
              :src="recentMemoModalData.contentImage"
              alt=""
              style="width: 600px; height: 400px"
            />
          </div>
          <div class="button-container">
            <p>Details :</p>
            <div>
              {{ recentMemoModalData.contentText[0] }}
            </div>
            <div>
              {{ recentMemoModalData.contentLongText }}
            </div>
            <div>{{ recentMemoModalData.writingTime }}</div>
            <span>{{ recentMemoModalData.ratingScore }}점</span>
            <span>추천 : {{ recentMemoModalData.recommendPoint }}</span>
            <button @click="recentMemoModalOff">모달창 닫기</button>
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
  props: ["recentMemo"],
  data() {
    return {
      recentMemoModalStatus: false,
      recentMemoModalData: Object,
    };
  },
  methods: {
    recentMemoModalOn(data) {
      this.recentMemoModalData = data;
      this.recentMemoModalStatus = true;
      document.body.style.overflow = "hidden";
    },
    recentMemoModalOff() {
      this.recentMemoModalStatus = false;
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style>
.recent-memo-container {
  display: flex;
  justify-content: center;
  height: auto;
  width: 100%;
}
.recent-memo-inner-container {
  /* transform: translate(3%, 0); */
  display: grid;
  width: 1000px;
  height: auto;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 400px;
  background-color: rgb(179, 179, 179);
}
.recent-memo {
  width: 300px;
  height: 200px;
  margin: auto;
  background-color: rgb(230, 230, 230);
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgb(192, 192, 192);
}
</style>
