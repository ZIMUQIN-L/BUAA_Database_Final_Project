<template>
<q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="600"
        class="menu-image"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 20px; border-right: 0px solid #ddd">
          <q-list>
            <q-item
              clickable 
              v-ripple
              active
              @click="goToHomepage"
              >
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                主页
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToMajor">
            <q-item-section avatar>
                <q-icon name="square_foot" />
            </q-item-section>

              <q-item-section>
                专业信息
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToClass">
            <q-item-section avatar>
                <q-icon name="groups" />
            </q-item-section>

              <q-item-section>
                班级信息
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToTeacher">
            <q-item-section avatar>
                <q-icon name="psychology" />
            </q-item-section>

              <q-item-section>
                教师信息
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToLesson">
              <q-item-section avatar>
                <q-icon name="import_contacts" />
              </q-item-section>

              <q-item-section>
                课程信息
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToInfo">
            <q-item-section avatar>
                <q-icon name="school" />
            </q-item-section>

              <q-item-section>
                学生信息
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToSettings">
              <q-item-section avatar>
                <q-icon name="check_circle" />
              </q-item-section>

              <q-item-section>
                学生选课
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
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
          label = "退出"
          flat
          align="around"
          icon="logout"
          @click="logout"
        />
        </div>
      </q-toolbar>
      <q-img 
        src="../../statics/blue-trianglify.jpg"
        class="header-image absolute-top"
      />
    </q-header>
  <q-page class="flex flex-center">
    <h5 class="absolute-top-left q-pa-lg"> 管理员--主页 </h5>
    <img
      alt="BUAA logo"
      src="../../statics/logo_big.png"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';

export default({
  data () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  created() {
  },

  methods:{
    logout:function() {
      this.$router.push('/')
    },
    goToHomepage() {
      this.$router.push('/admin/homepage/')
    },
    goToClass() {
      this.$router.push('/admin/class/')
    },
    goToMajor() {
      this.$router.push('/admin/major/')
    },
    goToTeacher() {
      this.$router.push('/admin/teacher/')
    },
    goToLesson() {
      this.$router.push('/admin/lesson/')
    },
    goToSettings() {
      this.$router.push('/admin/sc/')
      },
    goToInfo() {
      this.$router.push('/admin/student/')
    }
  }
})
</script>

<style>
  .bg-image {
   background-image: url("../../statics/blue-trianglify.jpg");
   background-repeat: no-repeat; /* Do not repeat the image */
   background-size: cover; /* Resize the background image to cover the entire container */
  }
  .menu-image {
   background-image: url("../../statics/blue-trianglify-menu.jpg");
   background-repeat: no-repeat; /* Do not repeat the image */
   background-size: cover; /* Resize the background image to cover the entire container */
  }
</style>
