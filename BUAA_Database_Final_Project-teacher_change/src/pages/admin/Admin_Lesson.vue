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
    <div class="q-pa-sm row bg-white">
      <q-btn-group>
        <q-btn rounded label="课程添加" type="submit" color="blue-3" icon = "add" @click="inAddClass = true"  size="17px" style="width: 350px"/>
    
        <q-btn rounded label="课程修改" type="submit" color="blue-4" icon = "update" @click="inChangeClass = true" size="17px" style="width: 350px"/>

        <q-btn rounded label="管理员排课" type="submit" color="blue-5" icon = "assignment" @click="beginArrange" size="17px" style="width: 350px"/>
      </q-btn-group>
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

  <q-dialog v-model="inAddClass" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-blue-1 text-white">
        <q-card-section>
          <div class="text-h6 text-black">课程添加</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
      <!-- <q-input
        v-model="newId"
        label="课程号"
        style="width: 400px"
        outlined
      /> -->

      <q-input
        v-model="newClass"
        label="课程名"
        style="width: 400px"
        outlined
      />

      <q-input
        v-model="newType"
        label="课程类型"
        style="width: 400px"
        outlined
      />

      <q-input
        v-model="newCredit"
        label="课程学分"
        style="width: 400px"
        outlined
      />

      <q-input
        type="number"
        v-model="newSum"
        label="课程容量"
        style="width: 400px"
        outlined
        lazy-rules
        :rules="[
          (val => (val = '' || (val >= 0 && val <= 200))) || '课程容量需小于200'
        ]"
      />

      <q-input
        v-model="newExam"
        label="课程考核形式"
        style="width: 400px"
        outlined
      />

      <q-input
        
        v-model="newTeacher"
        label="课程授课教师"
        style="width: 400px"
        outlined
      />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确认" @click="addSelectedCourse" v-close-popup/>
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


  <q-dialog v-model="inChangeClass" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-blue-1 text-white">
        <q-card-section>
          <div class="text-h6 text-black">课程添加</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
      <q-input
        v-model="oldId"
        label="课程号"
        style="width: 400px"
        outlined
      />

      <q-input
        v-model="oldClass"
        label="课程名"
        style="width: 400px"
        outlined
      />

      <q-input
        v-model="oldType"
        label="课程类型"
        style="width: 400px"
        outlined
      />

      <q-input
        v-model="oldCredit"
        label="课程学分"
        style="width: 400px"
        outlined
      />

      <q-input
        type="number"
        v-model="oldSum"
        label="课程容量"
        style="width: 400px"
        outlined
        lazy-rules
        :rules="[
          (val => (val = '' || (val >= 0 && val <= 200))) || '课程容量需小于200'
        ]"
      />

      <q-input
        v-model="oldExam"
        label="课程考核形式"
        style="width: 400px"
        outlined
      />

      <q-input
        
        v-model="oldTeacher"
        label="课程授课教师"
        style="width: 400px"
        outlined
      />

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确认" @click="changeSelectedCourse" v-close-popup/>
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  

  <q-dialog v-model="inArrangeClass" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-blue-1 text-white">
        <q-card-section>
          <div class="text-h6 text-black">管理员排课</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-h7 text-black">课程名称：{{selected[0].name}}</div>
          <q-select color="teal" v-model="whichBuilding" :options="buildinglist" label="教学楼" style="width: 500px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-select color="teal" v-model="whichWeek" :options="weeks" label="星期" style="width: 500px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-select color="teal" v-model="whichTime" :options="times" label="时间" style="width: 500px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-select color="teal" v-model="whichType" :options="roomtype" label="教室类型" style="width: 500px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <!-- <q-select color="teal" v-model="whichClass" :options="classroomlist" label="教室编号" style="width: 500px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select> -->

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确认" @click="getClassRoomList" v-close-popup/>
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="newIncep" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-blue-1 text-white">
        <q-card-section>
          <div class="text-h6 text-black">排课教室选择</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-h7 text-black">课程名称：{{selected[0].name}}</div>
          <div class="text-h7 text-black">教学楼：{{whichBuilding}}</div>
          <div class="text-h7 text-black">星期：{{whichWeek}}</div>
          <div class="text-h7 text-black">时间：{{whichTime}}</div>
          <div class="text-h7 text-black">教室类型：{{whichType}}</div>
          
      <q-select color="teal" v-model="whichClass" :options="classroomlist" label="教室编号" style="width: 500px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确认" @click="arrangeClass" v-close-popup/>
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
  { name: 'type', align: 'center', label: '类别', field: 'type', sortable: true },
  { name: 'credit', align: 'center', label: '学分', field: 'credit', sortable: true },
  { name: 'time', align: 'center', label: '上课时间', field: 'time', sortable: true },
  { name: 'place', align: 'center', label: '上课地点', field: 'place', sortable: true },
  { name: 'capacity', align: 'center', label: '课程容量', field: 'capacity', sortable: true },
  { name: 'nowSum', align: 'center', label: '当前选课人数', field: 'nowSum', sortable: true },
  { name: 'exam', align: 'center', label: '考核方式', field: 'exam', sortable: true },
  { name: 'teacher', align: 'center', label: '授课教师', field: 'teacher', sortable: true}
]

var rows_selected = [
  {'name': "hello", 'id': "123"}
];

export default{
  data () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      inAddClass: false,
      inChangeClass: false,
      inArrangeClass: false,
      newId: '',
      newClass: '',
      weeks: [
        "周一", "周二", "周三", "周四", "周五", "周六", "周日" 
      ],
      times: [
        '第1、2节', '第3、4、5节', '第6、7节', '第8、9、10节'
      ],
      roomtype: [
        "机房", "实验室", "教室"
      ],
      whichBuilding: '',
      whichClass: '',
      whichTime: '',
      whichWeek: '',
      whichType: '',
      classroomlist: [],
      newType: '',
      newCredit: '',
      newSum: '',
      buildinglist: [],
      newExam: '',
      newTeacher: '',
      newTime: '',
      newPlace: '',
      oldId: '',
      oldClass: '',
      newIncep: false,
      oldType: '',
      oldCredit: '',
      oldSum: '',
      oldExam: '',
      oldTeacher: '',
      oldTime: '',
      oldPlace: '',
      columns,
      rows_selected,
      selected: ref([]),
    }
  },

  created() {
    this.checkCourseInfo()
    this.getBuildingList()
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
    beginArrange() {
      if (this.selected.length == 0) {
        this.$q.notify({
          type: 'negative',
          message: '请选择需要排课的课程'
        })
        return;
      }
      this.inArrangeClass = true;
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
            url: 'http://localhost:8000/admin/lesson/delInfo/',
            data: {
                "id": c_id,
                "operation": "deleteLessonInfo"
            }
          }).then(function (response) {
              // handle success
              console.log(response);
              if (response.data.status == 0) {
              _this.$q.notify({
                message: '课程已经删除！',
                color: "green-4"
              })
              }
              else {
                _this.$q.notify({
                type: 'negative',
                message: '该课程已经结束，无法进行取消该课程'
              })
          }
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
//         this.$q.notify({message: '课程已经删除！',
// color: "green-4"})
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
          url: "http://localhost:8000/admin/lesson/addInfo/",
          data: {
            "id": this.newId,		// 课程 id
            "name": this.newClass,		// 课程名称
            "type": this.newType,		// 课程类型
            "credit": this.newCredit,	// 学分
            "time": this.newTime,		// 上课时间
            "place": this.newPlace, // 上课地点
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
              this.inAddClass = false;
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
          url: "http://localhost:8000/admin/lesson/changeInfo/",
          data: {
            "id": this.oldId,		// 课程 id
            "name": this.oldClass,		// 课程名称
            "type": this.oldType,		// 课程类型
            "credit": this.oldCredit,	// 学分
            "time": this.oldTime,		// 上课时间
            "place": this.oldPlace, // 上课地点
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
        url: 'http://localhost:8000/admin/lesson/getInfo/',
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
    getBuildingList() {
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/admin/lesson/getbuildinglist/',
        params: {
            "operation": "getBuildingList"
        }
      }).then(function (response) {
          // console.log(response);
          // handle success
          _this.buildinglist = response.data.buildinglist;
//           console.log(rows_selected);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      console.log("okokok");
    },
    getClassRoomList() {
        console.log("haaa");
        let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/admin/lesson/getclassroomlist/',
        params: {
            "building": this.whichBuilding,
            "week": this.whichWeek,
            "time": this.whichTime,
            "type": this.whichType,
            "courseId": this.selected[0].id,
            "operation": "getClassRoomList"
        }
      }).then(function (response) {
          // console.log(response);
          // handle success
          _this.classroomlist = response.data.classroomlist;
//           console.log(rows_selected);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      console.log("okokok");
      this.newIncep = true;
    },
    arrangeClass() {
      console.log("haaa");
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/admin/lesson/getarrangeclass/',
        params: {
            "building": this.whichBuilding,
            "week": this.whichWeek,
            "time": this.whichTime,
            "classroom": this.whichClass,
            "courseId": this.selected[0].id,
            "operation": "getArrangeClass"
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
      console.log("okokok");
      this.whichClass = ''
      this.whichBuilding = ''
      this.whichTime = ''
      this.whichWeek = ''
      this.whichType = ''
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