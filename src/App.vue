<template>
  <router-view></router-view>
</template>

<style lang="scss">
:root {
  --foreground: white;
  --background: #21213a;
  --background-accent: #{darken(#21213a, 10%)};
}
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: var(--background);
  background-image: linear-gradient(
    var(--background),
    var(--background-accent)
  );
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
}
* {
  box-sizing: border-box;
}
</style>
