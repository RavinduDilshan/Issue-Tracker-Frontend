<template>
  <header class="header">
    <h1>Issue Tracker</h1>
    <h5>wellcome {{ x }}</h5>
    <b-button v-on:click="redirect" variant="success">Logout</b-button>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      x: localStorage.getItem("user"),
    };
  },

  methods: {
    redirect: function () {
      window.location.href = "/login";
    },
  },
};
</script>

<style scoped>
.header {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}
</style>