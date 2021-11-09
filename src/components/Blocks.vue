<template>
  <div
    class="blocks"
    :style="`--total: ${state.total}; --line-width: ${20 / state.total}`"
  >
    <div
      v-for="(block, idx) in state.blocks"
      :key="idx"
      :class="[
        'blocks__block',
        `blocks__block--${block.type}`,
        `blocks__block--${block.color}`,
      ]"
      @mouseover="changeBlock(idx, BlockAction.HOVER)"
      @click="changeBlock(idx, BlockAction.CLICK)"
    />
  </div>
  <div class="info-block" :class="state.showInfo && `info-block--active`">
    <div
      class="info-block__background"
      @click="state.showInfo = !state.showInfo"
    ></div>
    <div class="info-block__container">
      <div class="info-block__config">
        <button
          v-for="(setting, idx) in settingsMenu"
          :key="idx"
          class="button info-block__hover"
          :class="[
            'button',
            `info-block__${setting.name}`,
            !setting.state && `info-block__${setting.name}--disabled`,
          ]"
          @click="setting.action()"
        >
          <span v-if="setting.state">{{ setting.label.disabled }}</span>
          <span v-if="!setting.state">{{ setting.label.disabled }}</span>
        </button>
      </div>
      <div class="info-block__list">
        <div
          class="info-block__type"
          v-for="(type, idx) in state.types"
          :key="idx"
        >
          <div
            class="info-block__block blocks__block blocks__block--primary"
            :class="`blocks__block--${type}`"
          ></div>
          <div class="info-block__text">
            <strong>{{ idx }} </strong><br /><span> {{ type }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button
    class="info-trigger"
    :class="state.showInfo && `info-trigger--active`"
    @click="state.showInfo = !state.showInfo"
  ></button>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  BlockAction,
  BlockColor,
  BlockType,
  Block,
  BlockSettingChange,
  State,
} from "./Blocks.model";

export default defineComponent({
  name: "Blocks",

  setup() {
    const router = useRouter();
    const route = useRoute();

    const state: State = reactive({
      showInfo: false,
      hover: true,
      click: true,
      audio: true,
      random: true,
      total: 8,
      types: Object.values(BlockType),
      colors: Object.values(BlockColor),
      blocks: [],
    });

    /*

      Initialize

    */

    const initBlocks = () => {
      restoreSettings();

      const url = deCompileUrl();
      const stored = localStorage.getItem("sjapes-blocks");
      const fromLocal = stored && (JSON.parse(stored) as Block[]);

      for (let i = 0; i < state.total * state.total; i++) {
        let value: Block;
        if (url[i]) {
          value = url[i] as Block;
        } else if (fromLocal && fromLocal[i]) {
          value = fromLocal[i];
        } else {
          value = getRandomBlock();
        }
        state.blocks.push(value);
      }
    };

    onMounted(() => {
      initBlocks();
    });

    /*

      Blocks

    */
    const getRandomBlock = (): Block => {
      const block: Block = {
        type: state.types[Math.floor(Math.random() * state.types.length)],
        color: state.colors[Math.floor(Math.random() * state.colors.length)],
      };
      return block;
    };

    const getNextBlock = (current: Block): Block => {
      const typeIdx = state.types.findIndex((type) => type === current.type);
      const colorIdx = state.colors.findIndex(
        (color) => color === current.color
      );
      let nextType = typeIdx + 1;
      let nextColor = colorIdx;

      if (nextType == state.types.length) {
        nextType = 0;
        nextColor = colorIdx + 1;
      }
      if (nextColor == state.colors.length) nextColor = 0;

      const next = {
        type: state.types[nextType],
        color: state.colors[nextColor],
      };

      return next;
    };

    /*

      Urls

    */
    const deCompileUrl = (): Block[] =>
      route.hash
        .replace("#", "")
        .split("|")
        .map((block) => {
          const parts: string[] = block.split(":");
          const color = state.colors[parseInt(parts[0])];
          const type = state.types[parseInt(parts[1])];
          return {
            color,
            type,
          };
        });

    const createUrl = (): string => {
      const url: string[] = [];

      state.blocks.forEach((block) => {
        const colorIdx = state.colors.findIndex(
          (color) => color === block.color
        );
        const typeIdx = state.types.findIndex((type) => type === block.type);

        url.push(`${colorIdx}:${typeIdx}`);
      });
      return `#${url.join("|")}`;
    };

    /*

      Actions

    */

    const setRoute = (): void => {
      const url = createUrl();
      router.push({ name: "Home", hash: url });
    };

    const changeBlock = (id: number, action: BlockAction): void => {
      if (
        (action == BlockAction.HOVER && state.hover) ||
        (action == BlockAction.CLICK && state.click)
      ) {
        state.blocks[id] = state.random
          ? getRandomBlock()
          : getNextBlock(state.blocks[id]);

        localStorage.setItem("sjapes-blocks", JSON.stringify(state.blocks));
        setRoute();
        state.audio && playSound();
      }
    };

    const playSound = (): void => {
      var audio = new Audio("/pop.mp3");
      audio.volume = 0.1;
      audio.play();
    };

    /*

      Settings

    */
    const storeSettings = (): void => {
      const settings = {
        hover: state.hover,
        random: state.random,
        click: state.click,
        audio: state.audio,
      };
      localStorage.setItem("sjapes-settings", JSON.stringify(settings));
    };

    const restoreSettings = (): void => {
      const settings = JSON.parse(
        localStorage.getItem("sjapes-settings") || "{}"
      );
      if (Object.keys(settings).length) {
        state.hover = settings.hover;
        state.click = settings.click;
        state.random = settings.random;
        state.audio = settings.audio;
      }
    };

    const setSetting = (setting: BlockSettingChange, value: boolean): void => {
      switch (setting) {
        case BlockSettingChange.HOVER:
          state.hover = value;
          break;
        case BlockSettingChange.CLICK:
          state.click = value;
          break;
        case BlockSettingChange.RANDOM:
          state.random = value;
          break;
        case BlockSettingChange.AUDIO:
          state.audio = value;
          break;
      }
      storeSettings();
    };

    interface SettingMenu {
      name: string;
      action: () => void;
      state: boolean;
      label: {
        enabled: string;
        disabled: string;
      };
    }

    const settingsMenu = computed(() => [
      {
        name: "hover",
        action: () => {
          setSetting(BlockSettingChange.HOVER, !state.hover);
        },
        state: state.hover,
        label: {
          enabled: "Hover enabled",
          disabled: "Hover disabled",
        },
      },
      {
        name: "click",
        action: () => {
          setSetting(BlockSettingChange.CLICK, !state.click);
        },
        state: state.click,
        label: {
          enabled: "Clicking enabled",
          disabled: "Clicking disabled",
        },
      },
      {
        name: "audio",
        action: () => {
          setSetting(BlockSettingChange.AUDIO, !state.audio);
        },
        state: state.audio,
        label: {
          enabled: "Sounds enabled",
          disabled: "Sounds disabled",
        },
      },
      {
        name: "random",
        action: () => {
          setSetting(BlockSettingChange.RANDOM, !state.random);
        },
        state: state.random,
        label: {
          enabled: "Random shapes",
          disabled: "Ordered shapes",
        },
      },
    ]);

    return {
      changeBlock,
      state,
      BlockAction,
      settingsMenu,
    };
  },
});
</script>

<style scoped lang="scss" src="./Blocks.scss"></style>
