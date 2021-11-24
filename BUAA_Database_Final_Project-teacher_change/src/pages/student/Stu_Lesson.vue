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
              active
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
    <div class="q-pa-sm bg-grey-3">
      <h5 align = "center"><b>学生课程列表</b></h5> 
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
    // var stuId = this.$route.params.studentId
    // rows_selected = [],
    // rows_unselected = [],
    var studentId = this.$route.params.studentId

    return {
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
      studentId,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },

  created() {
    this.checkSelectedCourse()
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
            "searchText": "",
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
    },
    checkUnselectedCourse(){
  let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/student/lesson/queryUnselected/',
        params: {
            "studentId": this.studentId,
            "searchText": "",
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
</style>>

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