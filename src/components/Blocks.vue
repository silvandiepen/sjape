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

<script lang="ts" src="./Blocks.ts"></script>
<style scoped lang="scss" src="./Blocks.scss"></style>
