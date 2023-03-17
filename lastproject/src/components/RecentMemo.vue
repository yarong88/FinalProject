<template>
  <div class="recent-memo-container">
    <div class="recent-memo-inner-container">
      <div
        class="recent-memo"
        v-for="data in recentMemo"
        v-bind:key="data"
        @click="recentMemoModalOn(data)"
      >
        <div class="recent-memo-title">
          {{ data.contentText[0] }}
        </div>
        <img class="recent-memo-image" :src="data.contentImage" alt="" />
        <div style="font-size: small">{{ data.writingTime }}</div>
        <div class="predict-text">
          <span>{{ data.mobilenetResult }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="post-item-modal-container" v-if="recentMemoModalStatus">
    <div class="post-item-modal-background" @click="recentMemoModalOff"></div>
    <div class="post-item-modal">
      <div class="post-item-modal-body">
        <div class="source">
          <div class="canvas-container">
            <p class="canvas-title">Canvas:</p>
            <img
              class="detail-image"
              :src="recentMemoModalData.contentImage"
              alt=""
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
            <span>추천 : {{ recentMemoModalData.likeIdList.length }}</span>
            <button @click="recentMemoModalOff">모달창 닫기</button>
            <div>
              <span>이미지 분석하기</span>
              <button @click="predict(recentMemoModalData)">mobilenet</button>
            </div>
            <div>
              이미지 분석 결과 <span>{{ this.mobilenetResult }}</span>
            </div>
            <div>
              이전 분석 결과
              <span>{{ recentMemoModalData.mobilenetResult }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
export default {
  name: "app",
  props: ["recentMemo"],
  data() {
    return {
      recentMemoModalStatus: false,
      recentMemoModalData: Object,
      mobilenetResult: "",
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
    predict(data) {
      const img = document.createElement("img");
      img.src = data.contentImage;
      this.mobilenetResult = "이미지 분석중..";
      mobilenet
        .load()
        .then((model) => model.classify(img))
        .then((rst) => {
          this.mobilenetResult =
            "분석결과 : " +
            rst[0].className +
            "(" +
            (rst[0].probability * 100).toFixed(2) +
            "%)";
          axios
            .post("/mobilenetUpdate", {
              _id: data._id,
              mobilenetResult:
                rst[0].className +
                "(" +
                (rst[0].probability * 100).toFixed(2) +
                "%)",
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        });
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
  background-color: #e1e1e1;
}
.recent-memo {
  position: relative;
  width: 300px;
  height: 250px;
  margin: auto;
  background-image: url("../assets/memo_background.png");
  background-size: 100% 120%;
  /* background-color: #f1f1f1;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgb(192, 192, 192); */
}
.recent-memo-title {
  width: 150px;
  font-size: large;
  margin-top: 65px;
  margin-left: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recent-memo-image {
  width: 180px;
  height: 120px;
}
.predict-text {
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  background-image: url("../assets/speech_bubble.png");
  background-size: 100% 90%;
  position: absolute;
  z-index: 1;
  bottom: 65px;
  left: 210px;
}
.recent-memo:hover .predict-text {
  visibility: visible;
}
</style>
