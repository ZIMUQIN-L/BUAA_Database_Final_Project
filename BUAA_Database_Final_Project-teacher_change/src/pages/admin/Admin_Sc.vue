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
                院系信息
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
              active
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
      <h5 align = "center"><b>学生课程列表</b></h5> 
    </div>
    <div  class="q-pa-sm">
      <q-input outlined v-model="studentId" label="学号" :dense="dense">
       <template v-slot:append>
          <q-icon name="search" @click="checkCourse"/>
        </template>
      </q-input>
    </div>

    <div>
      <q-tabs
        v-model="tab"
        dense
        class="bg-white text-blue shadow-2"
        inline-label
        align="left"
      >
        <q-tab name="selected_course" icon="check_box" label="已选课程" @click="checkSelectedCourse"></q-tab>
        <q-tab name="unselected_course" icon="add_box" label="未选课程" @click="checkUnselectedCourse"></q-tab>
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="selected_course">
          <div>
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
        </q-tab-panel>
        <q-tab-panel name="unselected_course">
          <div>
            <q-table
              class="my-sticky-header-table"
              :rows="rows_unselected"
              :columns="columns"
              row-key="id"
              :filter="filter_1"
              :loading="loading_1"
              v-model:selected="unselected"
              selection="single"
            >
            <template v-slot:top-left>
              <q-input bg-color="white" filled borderless dense debounce="300" v-model="filter_1" placeholder="查询课程">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:top-right>
                <q-btn
                  color="white"
                  text-color="black"
                  icon-right="add"
                  no-caps
                  @click="addSelectedCourse"
                />
              </template>
            </q-table>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true;
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
var rows_unselected = [];

export default({
  data () {
    const loading = ref(false)
    const filter = ref('')
    const loading_1 = ref(false)
    const filter_1 = ref('')
    const leftDrawerOpen = ref(false)

    return {
      studentId: ref([]),
      filter,
      loading,
      filter_1,
      loading_1,
      selected: ref([]),
      unselected: ref([]),
      columns,
      rows_selected,
      rows_unselected,
      tab: ref('selected_course'),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  created() {
    this.checkSelectedCourse()
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
            url: 'http://localhost:8000/student/lesson/delete/',
            data: {
                "studentId": this.studentId,
                "courseId": c_id,
                "operation": "delete"
            }
          }).then(function (response) {
              // handle success
              if (response.data.status == 1) {
                _this.$q.notify({
                type: 'negative',
               message: '该课程已经结束，无法进行退课操作'
               })
              }
              else {
                this.$q.notify({message: '课程已经删除！',
                color: "green-4"})
              }
              console.log(response);
              _this.rows_selected = response.data.data.courseTable;
              _this.rows_unselected = response.data.data.unCourseTable;
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
       
      }
      )
      
    },
    addSelectedCourse(){
    if (this.unselected[0].nowSum >= this.unselected[0].capacity) {
        this.$q.notify({
          type: 'negative',
          message: '该课程容量已满，无法进行选课操作'
        })
        this.unselected = []
        return
      }
      this.$q.dialog({
        title: '确认',
        message: '是否添加该课程',
        cancel: true,
        persistent: true
      }).onOk(() => {
        var c_id = "";
        this.unselected.filter(function(item){
          c_id = item.id;
          // axios({
          //   method: 'POST',
          //   url: 'http://localhost:8000/student/lesson/',
          //   params: {
          //       "userId": this.studentId,
          //       "courseId": item.id,
          //       "operation": "select"
          //   }
          // }).then(function (response) {
          //     // handle success
          //     this.rows_selected = response.data;
          //     console.log(response);
          //   }
          return item;
        });
let _this = this
        axios({
          method: "POST",
          url: "http://localhost:8000/student/lesson/select/",
          data: {
            "studentId": this.studentId,
            "courseId": c_id,
            "operation": "select"
          }
        }).then(function (response) {
              // handle success
              console.log(response);
// _this.checkSelectedCourse();
//           _this.checkUnselectedCourse();
              _this.rows_selected = response.data.data.courseTable;
              _this.rows_unselected = response.data.data.unCourseTable;
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
        this.unselected = [];
        this.$q.notify({
          message: '课程已经添加！',
          color: 'green-4'})
      })
    },
    checkSelectedCourse(){
  if (this.studentId != "") {
  // var rs = this.rows_selected;
      // console.log(rows_selected);
      // console.log("hahaha")
      // console.log(this.studentId);
let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/student/lesson/querySelected/',
        params: {
            "studentId": this.studentId,
            "operation": "selected"
        }
      }).then(function (response) {
          // console.log(response);
          // handle success
          _this.rows_selected = response.data.data.courseTable;
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
    // console.log(this.rows_selected);
    // console.log(rows_selected);
    // this.rows_selected = rs;
    // console.log(this.rows_selected);
  }
    },
checkCourse(){
  if (this.studentId != "") {
  // var rs = this.rows_selected;
      // console.log(rows_selected);
      // console.log("hahaha")
      // console.log(this.studentId);
let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/student/check/',
        params: {
            "studentId": this.studentId
        }
      }).then(function (response) {
          // console.log(response);
          // handle success
          _this.rows_selected = response.data.data.courseTable;
          _this.rows_unselected = response.data.data.unCourseTable;
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
    // console.log(this.rows_selected);
    // console.log(rows_selected);
    // this.rows_selected = rs;
    // console.log(this.rows_selected);
  }
    },
    checkUnselectedCourse(){
  if (this.studentId != "") {
  let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/student/lesson/queryUnselected/',
        params: {
            "studentId": this.studentId,
            "operation": "unselected"
        }
      }).then(function (response) {
          // handle success
          _this.rows_unselected = response.data.data.unCourseTable;
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
     }
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
