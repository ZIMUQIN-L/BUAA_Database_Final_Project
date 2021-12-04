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
</div>
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



  <div> 

    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">成绩查询</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
      <q-select color="teal" v-model="whichClass" :options="lessons" label="课程" style="width: 420px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="查询" @click="searchClassGrade" />
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="searchGrade" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 800px">
        <q-card-section>
          <div class="text-h6">课程成绩信息</div>
        </q-card-section>
        <q-card-section>
      <q-field standout  style="width: 280px" center readonly>
        <template v-slot:control>
          <h5><div class="self-center full-width no-outline">{{whichClass}}最终成绩:{{grade}}</div></h5>
        </template>
      </q-field>

        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="退出" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  <q-page class="q-pa-sm">
    <div class="q-pa-sm bg-grey-3">
    <h5 align = "center"><b>学生成绩</b></h5> 
     <div class="q-pa-md q-gutter-sm">
       <q-table
      :rows="selectCourse"
      :columns="columns"
      title="课程成绩"
      row-key="courseId"
      >
      <template v-slot:top-right>
      <q-btn
        label = "查询课程成绩"
        color="white"
        text-color="black"
        icon-right="search"
        no-caps
        flat
        @click="inception = true"
      />
      </template>
    </q-table>
  </div>

  </div>
  </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';

const columns = [
  { name: 'courseId', align: 'left', label: '课程号', field: 'courseId', sortable: true },
  { name: 'courseName', align: 'left', label: '课程名称', field: 'courseName', sortable: true },
  { name: 'courseGrade', align: 'left', label: '课程成绩', field: 'courseGrade', sortable: true },
  { name: 'courseTeacher', align: 'left', label: '课程教师', field: 'courseTeacher', sortable: true }
]

var rows_selected = [];

export default{
  data () {
    var studentId = this.$route.params.studentId
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      lessons: [

      ],
      whichClass: "",
      inception: false,
      searchGrade: false,
      columns,
      rows_selected,
      studentId,
      grade: "98",
      selectCourse: [
        // {
        //   "courseId": "12345",
        //   "courseName": "编译原理",
        //   "courseGrade": "98",
        //   "courseTeacher": "张三"
        // }
      ]
    }
  },

  created() {
    this.checkCourseInfo()
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
    },
    checkCourseInfo(){
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/student/gradeInit/',
        params: {
            "studentId": this.studentId,
            "operation": "getInitGrade"
        }
      }).then(function (response) {
          // console.log(response);
          // handle success
          _this.selectCourse = response.data.selectCourse;
          _this.lessons = response.data.lessons;
//           console.log(rows_selected);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    console.log("hahaha");
    },
    searchClassGrade() {
      this.searchGrade = true;
      let _this = this;
      axios({
        method: 'GET',
        url: 'http://localhost:8000/student/searchcoursegrade/',
        params: {
          "studentId": this.studentId,
          "lesson": this.whichClass,
          "operation": "searchCourseGrade",
        }
      }).then(function (response) {
        _this.grade = response.data.grade;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
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

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  max-height: 700px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #D6EAF8

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>