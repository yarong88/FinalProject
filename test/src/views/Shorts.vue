// scroll-snap-align: start; // scroll-snap-stop: always;
<template>
  <div class="memo_wrap"></div>
  <div class="infinite_scroll" @infinite="infiniteHandler"></div>
</template>

<script>
import axios from "axios";
const api = "//hn.algolia.com/api/v1/search_by_date?tags=story";
export default {
  name: "app",
  data() {
    return { page: 1, list: [] };
  },
  methods: {
    infiniteHandler($state) {
      axios
        .get(api, {
          params: {
            page: this.page,
          },
        })
        .then(({ data }) => {
          if (data.hits.length) {
            this.page += 1;
            this.list.push(...data.hits);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
};
</script>

<style></style>
