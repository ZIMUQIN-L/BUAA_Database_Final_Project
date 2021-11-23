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
              active
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
  <q-page class="q-pa-sm">
    <div class="q-pa-sm bg-grey-3">
      <h5 align = "center"><b>课程信息表</b></h5> 
    </div>
    <div class="col q-pa-sm bg-white">
            <q-table
              class="my-sticky-header-table"
              :rows="rows_selected"
              :columns="columns"
              row-key="id"
              :filter="filter"
              :loading="loading"
              v-model:selected="selected"
              selection="single"
            >
            <template v-slot:top-left>
              <q-input bg-color="white" filled borderless dense debounce="300" v-model="filter" placeholder="查询课程">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:top-right>
                <q-btn
                  color="white"
                  text-color="black"
                  icon-right="delete"
                  no-caps
                  @click="deleteSelectedCourse"
                />
              </template>
            </q-table>
          </div>
  <div class="col q-pa-sm bg-white">
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        课程添加
      </q-toolbar-title>
    </q-toolbar>
    <q-form

      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md "
    >

    <div class="q-gutter-md row items-start">

      <q-input
        v-model="newId"
        label="课程号"
      />

      <q-input
        v-model="newClass"
        label="课程名"
      />

      <q-input
        v-model="newType"
        label="课程类型"
      />

      <q-input
        v-model="newCredit"
        label="课程学分"
      />

      <q-input
        v-model="newTime"
        label="课程时间"
      />

      <q-input
        type="number"
        v-model="newSum"
        label="课程容量"
        lazy-rules
        :rules="[
          (val => (val = '' || (val >= 0 && val <= 200))) || '课程容量需小于200'
        ]"
      />

      <q-input
        v-model="newExam"
        label="课程考核形式"
      />

      <q-input
        
        v-model="newTeacher"
        label="课程授课教师"
      />

    </div>

      <div class="q-pa-md">
        <q-btn label="提交" type="submit" color="primary" @click="addSelectedCourse"/>
      </div>
    </q-form>
  </div>
  <div class="col q-pa-sm bg-white">
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        课程修改
      </q-toolbar-title>
    </q-toolbar>
    <q-form

      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md "
    >

    <div class="q-gutter-md row items-start">

      <q-input
        v-model="oldId"
        label="课程号"
      />

      <q-input
        v-model="oldClass"
        label="课程名"
      />

      <q-input
        v-model="oldType"
        label="课程类型"
      />

      <q-input
        v-model="oldCredit"
        label="课程学分"
      />

      <q-input
        v-model="oldTime"
        label="课程时间"
      />

      <q-input
        type="number"
        v-model="oldSum"
        label="课程容量"
        lazy-rules
        :rules="[
          (val => (val = '' || (val >= 0 && val <= 200))) || '课程容量需小于200'
        ]"
      />

      <q-input
        v-model="oldExam"
        label="课程考核形式"
      />

      <q-input
        
        v-model="oldTeacher"
        label="课程授课教师"
      />

    </div>

      <div class="q-pa-md">
        <q-btn label="提交" type="submit" color="primary" @click="changeSelectedCourse"/>
      </div>
    </q-form>
  </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';

const columns = [
  {
    name: 'name',
    required: true,
    label: '课程名称',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'id', align: 'center', label: '课程号', field: 'id', sortable: true },
  { name: 'name', align: 'center', label: '课程名称', field: 'name', sortable: true },
  { name: 'type', align: 'center', label: '类别', field: 'type', sortable: true },
  { name: 'credit', align: 'center', label: '学分', field: 'credit', sortable: true },
  { name: 'time', align: 'center', label: '上课时间', field: 'time', sortable: true },
  { name: 'capacity', align: 'center', label: '课程容量', field: 'capacity', sortable: true },
  { name: 'exam', align: 'center', label: '考核方式', field: 'exam', sortable: true },
  { name: 'teacher', align: 'center', label: '授课教师', field: 'teacher', sortable: true}
]

var rows_selected = [];

export default({
  data () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      newId: '',
      newClass: '',
      newType: '',
      newCredit: '',
      newSum: '',
      newExam: '',
      newTeacher: '',
      newTime: '',
      oldId: '',
      oldClass: '',
      oldType: '',
      oldCredit: '',
      oldSum: '',
      oldExam: '',
      oldTeacher: '',
      oldTime: '',
      columns,
      rows_selected
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
    },
    deleteSelectedCourse(){
      // console.log(this.studentId);
      var c_id = "";
      var rows_selected = this.rows_selected;
      console.log(rows_selected);
      this.$q.dialog({
        title: '确认',
        message: '是否删除该课程',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.selected.filter(function(item){
          // self.rows_unselected.push(self.rows_selected[self.rows_selected.indexOf(item)]);
          // self.rows_selected.splice(self.rows_selected.indexOf(item), 1);
          c_id = item.id;
return item;
        });
let _this = this;
          axios({
            method: 'POST',
            url: 'http://localhost:8000/admin/lesson/',
            data: {
                "id": c_id,
                "operation": "deleteLessonInfo"
            }
          }).then(function (response) {
              // handle success
              console.log(response);
              _this.rows_selected = response.data.data.courseInfo;
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
        // });
        this.selected = [];
        this.$q.notify({message: '课程已经删除！',
color: "green-4"})
      }
      )
      
    },
    addSelectedCourse(){
      this.$q.dialog({
        title: '确认',
        message: '是否添加该课程',
        cancel: true,
        persistent: true
      }).onOk(() => {
let _this = this
        axios({
          method: "POST",
          url: "http://localhost:8000/admin/lesson/",
          data: {
            "id": this.newId,		// 课程 id
            "name": this.newClass,		// 课程名称
            "type": this.newType,		// 课程类型
            "credit": this.newCredit,	// 学分
            "time": this.newTime,		// 上课时间
            "capacity": this.newSum,	// 课程容量
            "exam": this.newExam,		// 考核形式
            "teacher": this.newTeacher,	// 授课教师
              "operation": "addLessonInfo"
          }
        }).then(function (response) {
              // handle success
              console.log(response);
              _this.rows_selected = response.data.data.courseInfo;
              this.$q.notify({
          message: '课程已经添加！',
          color: 'green-4'})
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
        
      })
    },
    changeSelectedCourse(){
      this.$q.dialog({
        title: '确认',
        message: '是否修改该课程',
        cancel: true,
        persistent: true
      }).onOk(() => {
let _this = this
        axios({
          method: "POST",
          url: "http://localhost:8000/admin/lesson/",
          data: {
            "id": this.oldId,		// 课程 id
            "name": this.oldClass,		// 课程名称
            "type": this.oldType,		// 课程类型
            "credit": this.oldCredit,	// 学分
            "time": this.oldTime,		// 上课时间
            "capacity": this.oldSum,	// 课程容量
            "exam": this.oldExam,		// 考核形式
            "teacher": this.oldTeacher,	// 授课教师
              "operation": "changeLessonInfo"
          }
        }).then(function (response) {
              // handle success
              console.log(response);
              _this.rows_selected = response.data.data.courseInfo;
              this.$q.notify({
          message: '课程已经添加！',
          color: 'green-4'})
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
        
      })
    },
    checkCourseInfo(){
let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/admin/lesson/',
        params: {
            "operation": "getLessonInfo"
        }
      }).then(function (response) {
          // console.log(response);
          // handle success
          _this.rows_selected = response.data.data.courseInfo;
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