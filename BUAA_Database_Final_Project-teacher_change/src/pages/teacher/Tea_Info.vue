<template>
  <div>  
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
              active
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
              @click="goToCourseInfo">
            <q-item-section avatar>
                <q-icon name="laptop_chromebook" />
            </q-item-section>

              <q-item-section>
                学生选课与成绩
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

      
  <q-page class="q-pa-sm">
    <div class="q-pa-md flex flex-center">
    <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'60%'}">
    <q-card-section>
    <div class="q-pa-sm bg-grey-3">
      <h5 align = "center"><b>教师信息</b></h5> 
    </div>
    <div class="q-pa-md flex flex-center">
      <div class="q-gutter-y-md column" style="max-width: 600px" v-bind:style="$q.screen.lt.sm?{'width': '90%'}:{'width':'90%'}">
        <q-input v-model="teacherId" :readonly="true" label="工号">
          <template v-slot:prepend>
            <q-icon name="person"></q-icon>
          </template>
        </q-input>

        <q-input v-model="teacherName" :readonly="true" label="姓名">
          <template v-slot:prepend>
            <q-icon name="badge"></q-icon>
          </template>
        </q-input>

        <q-input v-model="teacherPhone" :readonly="!readonly" label="联系电话">
          <template v-slot:prepend>
            <q-icon name="phone"></q-icon>
          </template>
        </q-input>

        <q-input v-model="teacherMail" :readonly="!readonly" label="邮箱">
          <template v-slot:prepend>
            <q-icon name="mail"></q-icon>
          </template>
        </q-input>

        <div>
          <q-toggle v-model="readonly" label="编辑"></q-toggle>
        </div>

        <q-btn color="primary" label="提交修改" @click="changeTeacherInfo" />
        
      </div>
    </div>
    </q-card-section>
    </q-card>
    </div>
  </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';

export default({
  data () {
    var teaId = this.$route.params.teacherId
    const leftDrawerOpen = ref(false)

    return {
      // teacherId,
      teacherId: ref(teaId),
      readonly: ref(false),
      teacherName: ref(''),
      teacherPhone: ref(''),
      teacherMail: ref(''),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  created() {
    this.getTeacherInfo()
  },

  methods:{
    logout:function() {
      this.$router.push('/')
    },
    goToHomepage() {
      this.$router.push('/teacher/homepage/' + this.$route.params.teacherId)
    },
    goToLesson() {
      this.$router.push('/teacher/lesson/' + this.$route.params.teacherId)
    },
    goToSettings() {
      this.$router.push('/teacher/settings/' + this.$route.params.teacherId)
    },
    goToInfo() {
      this.$router.push('/teacher/info/' + this.$route.params.teacherId)
    },
    goToDepart() {
      this.$router.push('/teacher/depart/' + this.$route.params.teacherId)
    },
    goToCourseInfo() {
      this.$router.push('/teacher/courseinfo/' + this.$route.params.teacherId)
    },
    getTeacherInfo() {
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/teacher/info/',
        params: {
            "teacherId": _this.$route.params.teacherId,
            "operation": "checkTeacherInfo"
        }
      }).then(function (response) {
          // handle success
          _this.teacherId = response.data.data.info.teacherId;
          _this.teacherName = response.data.data.info.teacherName;
          _this.teacherPhone = response.data.data.info.teacherPhone;
          _this.teacherMail = response.data.data.info.teacherMail;
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    changeTeacherInfo() {
      let _this = this
      axios({
        method: 'POST',
        url: 'http://localhost:8000/teacher/info/',
        params: {
            "operation": "changeTeacherInfo",
            "teacherId": _this.$route.params.teacherId,
            "teacherName": this.teacherName,
            "teacherPhone": this.teacherPhone,
            "teacherMail": this.teacherMail
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
          _this.readonly = false
        });
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
