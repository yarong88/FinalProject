<template>
  <div class="postContainer">
    <div class="postItem">
      <div class="postTitle">타이틀 : {{ postData.contentText[0] }}</div>
      <img
        class="postImage"
        :src="postData.contentImage"
        alt=""
        style="width: 600px; height: 400px"
      />
      <div class="postText">{{ postData.contentText }}</div>
      <div>{{ postData.writingTime }}</div>
      <span>{{ postData.ratingScore }}점</span>
      <span>추천 : {{ postData.recommendPoint }}</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "postItem",
  props: {
    postData: Object,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.postContainer {
  display: flex;
  justify-content: center;
}
.postItem {
  width: 700px;
  background-color: rgb(212, 212, 212);
  margin: 10px;
}
</style>
