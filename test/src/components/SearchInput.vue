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
            :value="modelValue"
            @keyup.enter="$emit('update:modelValue', $event.target.value)" /></i
      ></span>
    </div>
    <button class="bt1">test</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "app",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {};
  },
  methods: {},
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
