<template>
  <div class="home">
    <Login />
  </div>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.home {
  margin: auto;
  width: 100%;
  height: 100vh;
  padding-top: 90px;
  background: #001529;
  /* background-image: url("../assets/login_background.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
