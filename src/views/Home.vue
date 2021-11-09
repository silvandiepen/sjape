<template>
  <Blocks />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Blocks from "../components/Blocks.vue";

export default defineComponent({
  name: "Home",
  components: {
    Blocks,
  },
});
</script>
