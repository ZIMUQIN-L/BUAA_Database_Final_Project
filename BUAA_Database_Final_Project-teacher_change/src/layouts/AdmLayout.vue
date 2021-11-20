<template>
<div>
  
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</div>
</template>

<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  methods: {
    logout:function() {
      this.$router.push('/')
    }
  }
})
</script>


<style lang="scss">
  .header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    filter: grayscale(30%);
  }
</style>