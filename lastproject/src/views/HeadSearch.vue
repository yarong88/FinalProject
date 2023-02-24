<template>
  <hr />
  <br />
  <SearchResult v-model="inputtext" />
</template>

<script>
/* eslint-disable */
import SearchResult from "@/components/SearchResult.vue";
import SearchInput from "@/components/SearchInput.vue";
export default {
  props: ["value"],
  components: {
    SearchInput,
    SearchResult,
  },
  data() {
    return {
      status: false,
      inputtext: "",
    };
  },
  methods: {
    updateInput: function (event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style></style>
