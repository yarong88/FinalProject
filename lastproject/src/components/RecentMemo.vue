<template>
  <div class="recentMemoContainer">
    <div class="innerContainer">
      <div class="recentMemo" v-for="data in recentMemo" v-bind:key="data">
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
  props: ["recentMemo"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.recentMemoContainer {
  height: auto;
  width: 100%;
}
.innerContainer {
  transform: translate(3%, 0);
  display: grid;
  width: 95%;
  height: auto;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 400px;
  background-color: rgb(179, 179, 179);
}
.recentMemo {
  height: 200px;
  background-color: rgb(230, 230, 230);
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgb(192, 192, 192);
}
</style>
