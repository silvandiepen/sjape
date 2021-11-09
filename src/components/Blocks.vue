<template>
  <div class="blocks" :style="`--total: ${total}; --line-width: ${20 / total}`">
    <div
      v-for="(block, idx) in blocks"
      :key="idx"
      :class="[
        'blocks__block',
        `blocks__block--${block.type}`,
        `blocks__block--${block.color}`,
      ]"
      @mouseover="changeBlock(idx)"
      @click="changeBlock(idx)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

enum BlockType {
  SQUARE = "square",
  CIRCLE = "circle",
  CIRCLELINE = "circle-line",
  MOONLINE1 = "moon-line1",
  MOONLINE2 = "moon-line2",
  MOONLINE3 = "moon-line3",
  MOONLINE4 = "moon-line4",
  CORNER1 = "corner1",
  CORNER2 = "corner2",
  CORNER3 = "corner3",
  CORNER4 = "corner4",
  MOON1 = "moon1",
  MOON2 = "moon2",
  MOON3 = "moon3",
  MOON4 = "moon4",
  DOT = "dot",
  EMPTY = "empty",
  DIAMOND = "diamond",
}

enum BlockColor {
  RED = "red",
  WHITE = "white",
  BLUE = "blue",
  ORANGE = "orange",
}

interface Block {
  type: BlockType;
  color: BlockColor;
}
export default defineComponent({
  name: "HelloWorld",

  setup() {
    const total = 8;
    const types = Object.values(BlockType);
    const colors = Object.values(BlockColor);
    const emptyBlock: Block = {
      type: BlockType.SQUARE,
      color: BlockColor.BLUE,
    };
    const blocks = ref([emptyBlock]);

    const getRandomBlock = (): Block => {
      const block: Block = {
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      return block;
    };

    const initBlocks = () => {
      const stored = localStorage.getItem("sjapes");

      if (stored) {
        blocks.value = JSON.parse(stored) as Block[];
      } else {
        for (let i = 1; i < total * total; i++) {
          blocks.value.push(getRandomBlock());
        }
      }
    };

    onMounted(() => {
      initBlocks();
    });

    const createUrl = () => {
      const url: string[] = [];

      blocks.value.forEach((block) => {
        const colorIdx = colors.findIndex((color) => color === block.color);
        const typeIdx = types.findIndex((type) => type === block.type);

        url.push(`${colorIdx}:${typeIdx}`);
      });
      return url.join("|");
    };

    const setRoute = () => {
      // console.log(createUrl());
    };

    const changeBlock = (id: number) => {
      blocks.value[id] = getRandomBlock();
      localStorage.setItem("sjapes", JSON.stringify(blocks.value));
      setRoute();
    };

    return {
      total,
      blocks,
      changeBlock,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$shade: purple;
$percentage: 50%;
.blocks {
  --line: calc(var(--line-width) * 1vmin);

  display: grid;
  grid-template-rows: repeat(var(--total), 1fr);
  grid-template-columns: repeat(var(--total), 1fr);
  width: 75vmin;
  height: 75vmin;

  &--test {
    margin-top: 10em;
    .blocks__block {
      outline: 1px solid white;
      &:hover {
        overflow: visible;
      }
    }
    .blocks__block:hover::before {
      opacity: 0.2;
    }
  }
  &__block {
    height: 100%;
    display: block;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
      z-index: 2;
    }
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0 0 calc(var(--line) * 4) 0em var(--shape-color);
      transition: all 0.3s ease-in-out;
    }

    // Colors
    &--red::before {
      --shape-color: #{mix(red, $shade, $percentage)};
    }
    &--white::before {
      --shape-color: #{mix(white, $shade, $percentage)};
    }
    &--blue::before {
      --shape-color: #{mix(skyblue, $shade, $percentage)};
    }
    &--orange::before {
      --shape-color: #{mix(orange, $shade, $percentage)};
    }

    // Shapes
    &--square::before {
      border-radius: 0;
      width: 50%;
      height: 50%;
      // background-color: mix(red, $shade, 75%);
    }
    &--diamond::before {
      border-radius: 0;
      width: 66.66%;
      height: 66.66%;
      transform: translate(-50%, -50%) scale(1, 1) rotate(45deg);
    }
    &--corner1::before,
    &--corner2::before,
    &--corner3::before,
    &--corner4::before {
      border-radius: 0;
      height: 100%;
      top: 0;
      left: 0;
      transform: translate(0%, 0%) rotate(-45deg) scale(2, 1);
      transform-origin: 0% 100%;
    }
    &--corner2::before {
      transform: translate(0%, 0%) rotate(45deg) scale(1, 2);
      transform-origin: 0% 100%;
    }
    &--corner3::before {
      transform: translate(-0%, -0%) rotate(-45deg) scale(1, 2);
      transform-origin: 100% 100%;
    }
    &--corner4::before {
      transform: translate(0%, -0%) rotate(45deg) scale(2, 1);
      transform-origin: 100% 100%;
    }
    &--empty::before {
      transform: scale(0, 0);
    }
    &--circle-line::before {
      box-shadow: inset 0 0 0 var(--line) var(--shape-color);
    }
    &--moon-line1::before,
    &--moon-line2::before,
    &--moon-line3::before,
    &--moon-line4::before {
      width: 200%;
      height: 200%;
      box-shadow: inset 0 0 0 var(--line) var(--shape-color);
    }
    &--moon-line1::before {
      transform: translate(-25%, -25%);
    }
    &--moon-line2::before {
      transform: translate(-25%, -75%);
    }
    &--moon-line3::before {
      transform: translate(-75%, -25%);
    }
    &--moon-line4::before {
      transform: translate(-75%, -75%);
    }
    &--moon1::before {
      transform: translate(-25%, -25%);
      width: 200%;
      height: 200%;
    }
    &--moon2::before {
      transform: translate(-25%, -75%);
      width: 200%;
      height: 200%;
    }
    &--moon3::before {
      transform: translate(-75%, -25%);
      width: 200%;
      height: 200%;
    }
    &--moon4::before {
      transform: translate(-75%, -75%);
      width: 200%;
      height: 200%;
    }
    &--dot::before {
      transform: translate(-50%, -50%) scale(0.5);
    }
  }
}
</style>
