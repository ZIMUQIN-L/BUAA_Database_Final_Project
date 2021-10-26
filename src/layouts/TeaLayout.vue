<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          教务系统
        </q-toolbar-title>


        <div>
          <q-btn
          flat
          align="around"
          label = "设置"
          icon="lightbulb_outline"
          @click="setting"
        />
        </div>

      

        <div>
          <q-btn
          label = "退出"
          flat
          align="around"
          icon="logout"
          @click="logout"
        />
        </div>
      </q-toolbar>
      <q-img 
        src="../statics/blue-trianglify.jpg"
        class="header-image absolute-top"
      />
    </q-header>

      

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
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
    },
    setting:function() {
      this.$router.push('/teacher/settings')
    }
  }
})

// <q-drawer
//         v-model="leftDrawerOpen"
//         show-if-above
//         :width="200"
//         :breakpoint="600"
//       >
//         <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
//           <q-list>
//             <q-item 
//               clickable 
//               v-ripple
//               to="/teacher/homepage">
//               <q-item-section avatar>
//                 <q-icon name="home" />
//               </q-item-section>

//               <q-item-section>
//                 主页
//               </q-item-section>
//             </q-item>

//             <q-item
//               clickable 
//               v-ripple
//               to="/teacher/lesson">
//               <q-item-section avatar>
//                 <q-icon name="school" />
//               </q-item-section>

//               <q-item-section>
//                 课程
//               </q-item-section>
//             </q-item>

//             <q-item
//               clickable 
//               v-ripple
//               to="/teacher/exam">
//             <q-item-section avatar>
//                 <q-icon name="import_contacts" />
//             </q-item-section>

//               <q-item-section>
//                 考试
//               </q-item-section>
//             </q-item>

//             <q-item
//               clickable 
//               v-ripple
//               to="/teacher/settings">
//               <q-item-section avatar>
//                 <q-icon name="settings" />
//               </q-item-section>

//               <q-item-section>
//                 设置
//               </q-item-section>
//             </q-item>
//           </q-list>
//         </q-scroll-area>

//         <q-img class="header-image absolute-top" src="../statics/blue-trianglify.jpg" style="height: 150px">
//           <div class="absolute-bottom bg-transparent">
//             <q-avatar size="56px" class="q-mb-sm">
//               <img src="../statics/default-account.png">
//             </q-avatar>
//             <div class="text-weight-bold">19231133</div>
//             <div>19231133@buaa.edu.cn</div>
//           </div>
//         </q-img>
//       </q-drawer>
</script>


<style lang="scss">
  .header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    filter: grayscale(30%);
  }
</style>