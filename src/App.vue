<template>
  <Blocks />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Blocks from "./components/Blocks.vue";

export default defineComponent({
  name: "App",
  components: {
    Blocks,
  },
});
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #21213a;
  background-image: linear-gradient(#21213a, darken(#21213a, 10%));
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
