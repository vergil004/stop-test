<template>
  <payments-app></payments-app>
</template>

<script>
import PaymentsApp from "@/components/PaymentsApp";

export default {
  name: 'App',
  components: {
    PaymentsApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
