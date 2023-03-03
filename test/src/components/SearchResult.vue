<template>
  <div class="search_text">
    <h2>'{{ searchResult }}' (으)로 검색한 결과입니다.</h2>
  </div>
  <div class="result_wrap">
    <div class="inner_wrap">
      <div class="result_box" v-for="data in dataBox" v-bind:key="data">
        <div style="font-size: large; margin: 10px">
          {{ data.contentText[0] }}
        </div>
        <img :src="data.contentImage" alt="" style="width: 60%; height: 60%" />
        <div style="font-size: small">{{ data.writingTime }}</div>
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
    return {};
  },
  methods: {},
};
</script>

<style>
.result_wrap {
  height: auto;
  width: 100%;
}
.inner_wrap {
  transform: translate(3%, 0);
  display: grid;
  width: 95%;
  height: auto;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 400px;
  background-color: antiquewhite;
}
.result_box {
  height: 200px;
  background-color: rgb(255, 239, 219);
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgb(192, 192, 192);
}
</style>
