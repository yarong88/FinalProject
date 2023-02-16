<template>
  <div class="table-container">
    <table v-if="status" class="table-list">
      <thead>
        <tr>
          <th class="table-text">text</th>
          <th class="table-content">content</th>
          <th class="table-date">date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in arrData" :key="data">
          <td>{{ data }}</td>
          <td>{{ data }}</td>
          <td>{{ data }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      status: true,
      arrData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  methods: {},
};
</script>

<style>
.table-container {
  display: flex;
  justify-content: center;
}
.table-text {
  width: 200px;
}
.table-content {
  width: 200px;
}
.table-date {
  width: 200px;
}
</style>
