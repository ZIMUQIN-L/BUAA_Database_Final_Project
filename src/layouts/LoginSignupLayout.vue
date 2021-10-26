<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
</script>


<style lang="scss">
  .header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    filter: grayscale(30%);
  }
</style>