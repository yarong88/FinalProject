<template>
<<<<<<< HEAD:test/src/components/SearchResult.vue
  <SearchInput
    :modelValue="searchText"
    @update:modelValue="(newValue) => (searchText = newValue)"
  />
  <div class="search_text">
    <h2>'{{ searchText }}' (으)로 검색한 결과입니다.</h2>
  </div>
  <div class="result_wrap">
    <div class="inner_wrap">
      <div class="result_box">1</div>
      <div class="result_box">2</div>
      <div class="result_box">3</div>
      <div class="result_box">4</div>
      <div class="result_box">5</div>
      <div class="result_box">6</div>
=======
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
>>>>>>> main:lastproject/src/components/SearchResult.vue
    </div>
  </div>
</template>

<script>
/* eslint-disable */
<<<<<<< HEAD:test/src/components/SearchResult.vue
import SearchInput from "./SearchInput.vue";
export default {
  name: "app",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {},
  components: { SearchInput },
=======
export default {
  name: "app",
  props: ["searchResult", "dataBox"],
  data() {
    return {};
  },
  methods: {},
>>>>>>> main:lastproject/src/components/SearchResult.vue
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
<<<<<<< HEAD:test/src/components/SearchResult.vue
  margin: 30px 40px;
  width: 300px;
  height: 350px;
  background-color: aqua;
  border-radius: 20px;
  box-shadow: 5px 5px 5px rgb(192, 192, 192);
=======
  height: 200px;
  background-color: rgb(255, 239, 219);
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgb(192, 192, 192);
>>>>>>> main:lastproject/src/components/SearchResult.vue
}
</style>
