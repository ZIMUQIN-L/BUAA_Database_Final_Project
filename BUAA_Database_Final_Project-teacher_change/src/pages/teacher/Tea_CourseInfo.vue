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
              active
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
  </div>

  <div> 
  <q-page class="q-pa-sm">
    <div class="q-pa-sm bg-grey-3">
    <h5 align = "center"><b>学生选课与成绩</b></h5> 
    <h4>
    <q-select color="teal" v-model="whichClass" :options="options" label="课程名称">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
    </h4>
     <div class="q-pa-md q-gutter-sm">
       <q-table
      :rows="selectStudent"
      :columns="columns"
      title="选课学生名单"
      row-key="studentId"
      >
      <template v-slot:top-right>
      <q-btn
        label = "查询选课学生"
        color="white"
        text-color="black"
        icon-right="search"
        no-caps
        flat
        @click="getSelectedStudent"
      />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="studentId" :props="props">
            {{ props.row.studentId }}
          </q-td>
          <q-td key="studentName" :props="props">
            {{ props.row.studentName }}
          </q-td>
          <q-td key="studentGrade" :props="props">
            <div class="text-pre-wrap">{{ props.row.studentGrade }}</div>
            <q-popup-edit v-model.number="props.row.studentGrade"  @show="retGrade(props.row.studentId, props.row.studentGrade)"
               @hide = "setGrade(props.row.studentId, props.row.studentGrade)">
              <q-input type="number" v-model.number="props.row.studentGrade" dense autofocus>
              <template v-slot:after>
                <q-btn flat dense color="positive" icon="check_circle" @click="setGrade(props.row.studentId, props.row.studentGrade)" />
                <q-btn flat dense color="negative" icon="cancel" @click = "clear"/>
            </template>
              </q-input>
            </q-popup-edit>
          </q-td>
        </q-tr>
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
axios.defaults.withCredentials = true;
//import VueAxios from 'vue-axios';

export default{
  data () {
    var teaId = this.$route.params.teacherId
    const leftDrawerOpen = ref(false)

    return {
      // teacherId,
      teacherId: ref(teaId),
      readonly: ref(false),
      teacherName: ref(''),
      leftDrawerOpen,
      whichClass:ref(''),
      inputId: null,
      originGrade: null,
      options: [
       
      ],
      courseIds: [

      ],
      selectStudent: [
        // {
        //     studentId: '123', 
        //     studentName: 'adad', 
        //     studentGrade: '99'
        // },
        // {
        //     studentId: '1232', 
        //     studentName: 'adad222', 
        //     studentGrade: '98'
        // },
      ],
      columns: [
        { 
          name: 'studentId', 
          required: true,
          align: 'center', 
          label: '学号', 
          field: 'studentId', 
          sortable: true
        },
        { name: 'studentName', align: 'center', label: '学生姓名', field: 'studentName', sortable: true },
        { name: 'studentGrade', align: 'center', label: '成绩', field: 'studentGrade', sortable: true }
      ],
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },

  created() {
    this.getCourseInfoInit()
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
    goToClassRoom() {
      this.$router.push('/teacher/classroom/' + this.$route.params.teacherId)
    },
    getCourseInfoInit() {
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/teacher/courseinfo/init/',
        params: {
          "userId": this.teacherId,
          "operation": "getTeacherCoursesTable",
        }
      }).then(function (response) {
        _this.options = response.data.teacherCourseTable;
        _this.courseIds = response.data.teacherCourseIdTb;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
    },
    getSelectedStudent() {
      let _this = this
      var ind = this.options.indexOf(this.whichClass);
      console.log(ind);
      console.log(this.whichClass);
      console.log(this.courseIds[ind]);
      axios({
        method: 'GET',
        url: 'http://localhost:8000/teacher/courseinfo/getSelectedStudent/',
        params: {
          "userId": this.teacherId,
          "courseId": this.courseIds[ind],
          "courseName": this.whichClass,
          "operation": "getSelectStudent",
        }
      }).then(function (response) {
        _this.selectStudent = response.data.selectStudent;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
    },
    setGrade(changeId, changeGrade) {
      let _this = this
      console.log(changeId);
      console.log(changeGrade);
      var ind = this.options.indexOf(this.whichClass);
      axios({
        method: 'POST',
        url:'http://localhost:8000/teacher/courseinfo/changeGrade/',
        data:{
          "userId": this.teacherId,
          "courseName": this.whichClass,
          "courseId": this.courseIds[ind],
          "studentId": changeId,
          "studentGrade": changeGrade,
          "operation": "changeGrade"
        }
      })
      .then(response => {
        //console.log(data)
        console.log(response)
      }, error=> {
        //console.log(data)
        console.log('错误',error.message)
      })       
    },
    retGrade(ip, grade) {
      console.log(ip);
      console.log(grade);
      this.inputId = ip;
      this.originGrade = grade;
      console.log(this.inputId);
    },
    clear() {
      console.log(this.inputId);
      var ip = this.inputId;
      function check(stu) {
        return stu.studentId == ip;
      }
      var index = this.selectStudent.findIndex(check);
      console.log(index);
      this.selectStudent[index].studentGrade = this.originGrade;
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
