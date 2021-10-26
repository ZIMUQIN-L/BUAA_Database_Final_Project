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
      <h5 align = "center"><b>学生信息</b></h5> 
    </div>
    <div class="q-pa-md flex flex-center">
      <div class="q-gutter-y-md column" style="max-width: 600px" v-bind:style="$q.screen.lt.sm?{'width': '90%'}:{'width':'90%'}">
        <q-input v-model="studentId" :readonly="true" label="学号">
          <template v-slot:prepend>
            <q-icon name="person"></q-icon>
          </template>
        </q-input>

        <q-input v-model="studentName" :readonly="true" label="姓名">
          <template v-slot:prepend>
            <q-icon name="badge"></q-icon>
          </template>
        </q-input>

        <q-input v-model="studentGender" :readonly="!readonly" label="性别">
          <template v-slot:prepend>
            <q-icon name="face"></q-icon>
          </template>
        </q-input>

        <q-input v-model="studentBirthDate" :readonly="true" label="出生日期">
          <template v-slot:prepend>
            <q-icon name="event"></q-icon>
          </template>
        </q-input>

        <q-input v-model="studentGPA" :readonly="true" label="绩点">
          <template v-slot:prepend>
            <q-icon name="grading"></q-icon>
          </template>
        </q-input>

        <div>
          <q-toggle v-model="readonly" label="编辑"></q-toggle>
        </div>

        <q-btn color="primary" label="提交修改" @click="changeStudentInfo" />
        
      </div>
    </div>
    </q-card-section>
    </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';

export default({
  data () {
    var stuId = this.$route.params.studentId
    const leftDrawerOpen = ref(false)

    return {
      // studentId,
      studentId: ref(stuId),
      studentGender: ref(''),
      readonly: ref(false),
      studentName: ref(''),
      studentBirthDate: ref(''),
      studentGPA: ref(''),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  created() {
    this.getStudentInfo()
  },

  methods:{
    logout:function() {
      this.$router.push('/')
    },
    goToHomepage() {
      this.$router.push('/student/homepage/' + this.$route.params.studentId)
    },
    goToLesson() {
      this.$router.push('/student/lesson/' + this.$route.params.studentId)
    },
    goToSettings() {
      this.$router.push('/student/settings/' + this.$route.params.studentId)
    },
    goToInfo() {
      this.$router.push('/student/info/' + this.$route.params.studentId)
    },
    getStudentInfo() {
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/student/info/',
        params: {
            "studentId": _this.$route.params.studentId,
            "operation": "checkStudentInfo"
        }
      }).then(function (response) {
          // handle success
          _this.studentId = response.data.data.info.studentId;
          _this.studentGender = response.data.data.info.studentGender;
          _this.studentName = response.data.data.info.studentName;
          _this.studentBirthDate = response.data.data.info.studentBirthDate;
          _this.studentGPA = response.data.data.info.studentGPA;
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
    changeStudentInfo() {
      let _this = this
      axios({
        method: 'POST',
        url: 'http://localhost:8000/student/info/',
        params: {
            "operation": "changeStudentInfo",
            "studentId": _this.$route.params.studentId,
            "studentName": this.studentName,
            "studentGender": this.studentGender,
            "studentBirthDate": this.studentBirthDate,
            "studentGPA": this.studentGPA
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
