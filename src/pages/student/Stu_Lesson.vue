<template>
  <q-page class="">
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
  { name: 'capacity', label: '课程容量', field: 'capacity', sortable: true },
  { name: 'teacher', label: '授课教师', field: 'teacher', sortable: true}
]

// var rows_selected = [
//   {
//     name: '离散数学',
//     capacity: 57,
//     id: 1,
//     teacher: '马殿富'
//   },
//   {
//     name: '基物实验',
//     capacity: 1000,
//     id: 4,
//     teacher: '王文玲'
//   },
//   {
//     name: '操作系统',
//     capacity: 75,
//     id: 2,
//     teacher: '王雷'
//   },
//   {
//     name: '形式语言与自动机',
//     capacity: 50,
//     id: 6,
//     teacher: '胡春明'
//   },
//   {
//     name: '高等代数',
//     capacity: 85,
//     id: 7,
//     teacher: '孙晓伟'
//   }
// ]

// var rows_unselected = [
//   {
//     name: '数据结构',
//     capacity: 57,
//     id: 3,
//     teacher: '李波'
//   },
//   {
//     name: '计算机组成',
//     capacity: 63,
//     id: 5,
//     teacher: '高小鹏'
//   }
// ]

var rows_selected = [];
var rows_unselected = [];

export default({
  
  data () {
    const loading = ref(false)
    const filter = ref('')
    const loading_1 = ref(false)
    const filter_1 = ref(''),
    // rows_selected = [],
    // rows_unselected = [],
    studentId = this.$route.params.studentId

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
      studentId
    }
  },

  created() {
    this.checkSelectedCourse()
  },

  methods:{
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
            url: 'http://localhost:8000/student/lesson/',
            data: {
                "userId": this.studentId,
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
          url: "http://localhost:8000/student/lesson/",
          data: {
            "userId": this.studentId,
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
        url: 'http://localhost:8000/student/lesson/',
        params: {
            "userId": this.studentId,
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
        url: 'http://localhost:8000/student/lesson/',
        params: {
            "userId": this.studentId,
            "searchText": "",
            "operation": "unselected"
        }
      }).then(function (response) {
          // handle success
          _this.rows_unselected = response.data.data.courseTable;
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