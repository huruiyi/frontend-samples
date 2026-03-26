<template>
  <div class="container">
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
}

header,
main,
footer {
  padding: 10px 12px;
}

header,
footer {
  background: var(--surface-bg);
}

main {
  background: #fff;
}
</style>
