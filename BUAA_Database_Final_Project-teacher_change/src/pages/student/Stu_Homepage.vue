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
              @click="goToLesson">
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>

              <q-item-section>
                课程
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToGrade">
            <q-item-section avatar>
                <q-icon name="laptop_chromebook" />
            </q-item-section>

              <q-item-section>
                成绩查询
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToClass">
              <q-item-section avatar>
                <q-icon name="class" />
              </q-item-section>

              <q-item-section>
                班级
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToInfo">
            <q-item-section avatar>
                <q-icon name="import_contacts" />
            </q-item-section>

              <q-item-section>
                信息
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToDepart">
            <q-item-section avatar>
                <q-icon name="attachment" />
            </q-item-section>

              <q-item-section>
                院系
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToClassRoom">
            <q-item-section avatar>
                <q-icon name="house" />
            </q-item-section>

              <q-item-section>
                教室信息
              </q-item-section>
            </q-item>

            <q-item
              clickable 
              v-ripple
              @click="goToSettings">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>
                设置
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
    <div class="text-h6 text-black">
       <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="200px"
        style="width: 1000px"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="hello" class="column no-wrap flex-center">
          <div class="q-mt-md text-center text-h5 text-white">
            {{ hello }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="school" size="80px" @click="goToLesson"/>
          <div class="q-mt-md text-center">
            {{ lorem1 }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="laptop_chromebook" size="80px" @click="goToGrade"/>
          <div class="q-mt-md text-center">
            {{ lorem2 }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="class" size="80px" @click="goToClass"/>
          <div class="q-mt-md text-center">
            {{ lorem3 }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="import_contacts" size="80px" @click="goToInfo"/>
          <div class="q-mt-md text-center">
            {{ lorem4 }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="stu" class="column no-wrap flex-center">
          <q-icon name="attachment" size="80px" @click="goToDepart" />
          <div class="q-mt-md text-center">
            {{ lorem5 }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="choose" class="column no-wrap flex-center">
          <q-icon name="house" size="80px" @click="goToClassRoom"/>
          <div class="q-mt-md text-center">
            {{ lorem6 }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="setting" class="column no-wrap flex-center">
          <q-icon name="settings" size="80px" @click="goToSettings"/>
          <div class="q-mt-md text-center">
            {{ lorem7 }}
          </div>
        </q-carousel-slide>
      </q-carousel>
      </div>
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
axios.defaults.withCredentials = true;
import VueAxios from 'vue-axios';

export default{
  data () {
    var stuId = this.$route.params.studentId
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      slide: 'hello',
      hello: '欢迎进入教务管理系统！',
      lorem1: '课程界面',
      lorem2: '成绩查询界面',
      lorem3: '班级界面',
      lorem4: '个人信息界面',
      lorem5: '院系界面',
      lorem6: '教室信息界面',
      lorem7: '设置界面',
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  created() {
  },

  methods:{
    logout:function() {
axios({
            method: 'POST',
            url: 'http://localhost:8000/back/getout/',
            data: {
                "operation": "getout"
            }
          }).then(function (response) {
              // handle success
              console.log(response);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
      this.$router.push('/')
    },
    goToHomepage() {
      this.$router.push('/student/homepage/' + this.$route.params.studentId)
    },
    goToLesson() {
      this.$router.push('/student/lesson/' + this.$route.params.studentId)
    },
    goToClass() {
      this.$router.push('/student/class/' + this.$route.params.studentId)
    },
    goToSettings() {
      this.$router.push('/student/settings/' + this.$route.params.studentId)
    },
    goToInfo() {
      this.$router.push('/student/info/' + this.$route.params.studentId)
    },
    goToDepart() {
      this.$router.push('/student/depart/' + this.$route.params.studentId)
    },
    goToClassRoom() {
      this.$router.push('/student/classroom/' + this.$route.params.studentId)
    },
    goToGrade() {
      this.$router.push('/student/grade/' + this.$route.params.studentId)
    }
  }
}
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
