<template>
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
    </div>
  </div>
</template>

<script>
/* eslint-disable */
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
  margin: 30px 40px;
  width: 300px;
  height: 350px;
  background-color: aqua;
  border-radius: 20px;
  box-shadow: 5px 5px 5px rgb(192, 192, 192);
}
</style>
