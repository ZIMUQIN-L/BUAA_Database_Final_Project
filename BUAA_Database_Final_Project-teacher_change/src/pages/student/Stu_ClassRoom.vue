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
              active
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
    <h5 align = "center"><b>教室信息</b></h5> 

    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">空教室查询</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select color="teal" v-model="spareWeek" :options="weeks" label="星期" style="width: 420px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
      <q-select color="teal" v-model="spareTime" :options="times" label="时间" style="width: 420px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="查询" @click="searchSpareRoom" />
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="searchSpare" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 800px">
        <q-card-section>
          <div class="text-h6">空教室信息</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{spareWeek}}  {{spareTime}}
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-table
          :rows="spareClassRooms"
          :columns="sparecolumns"
          row-key="classRoomId"
          >
          </q-table>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="退出" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <h4>
      <div class="q-gutter-md row">
    <q-select color="teal" v-model="whichClass" :options="classroomId" label="教室编号" style="width: 420px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
    <q-select color="teal" v-model="whichWeek" :options="weeks" label="星期" style="width: 420px">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
       <q-btn label="空教室查询" color="blue-4" @click="inception = true" icon-right="send" stackstyle="width: 200px"/>
      </div>
    
    
    </h4>
     <div class="q-pa-md q-gutter-sm">
       <q-table
      :rows="allClassRooms"
      :columns="columns"
      title="教室占用信息"
      row-key="studentId"
      >
      <template v-slot:top-right>
      <q-btn
        label = "查询教室信息"
        color="white"
        text-color="black"
        icon-right="search"
        no-caps
        flat
        @click="getClassroomInfo"
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

export default{
  data () {
    var teaId = this.$route.params.teacherId
    const leftDrawerOpen = ref(false)

    return {
      // teacherId,
      inception: false,
      teacherId: ref(teaId),
      readonly: ref(false),
      classroomId: null,
      weeks: [
        "周一", "周二", "周三", "周四", "周五", "周六", "周日" 
      ],
      teacherName: ref(''),
      leftDrawerOpen,
      whichClass:ref(''),
      whichWeek:ref(''),
      spareWeek: ref(''),
      spareTime: ref(''),
      searchSpare: false,
      inputId: null,
      originGrade: null,
      options: [
       
      ],
      spareClassRooms: [
        // {
        //   classRoomId: "333",
        //   classRoomType: "实验室",
        //   classRoomPos: "三号楼797",
        //   classRoomSize: "33"
        // }
      ],
      times: [
        '第1、2节', '第3、4、5节', '第6、7节', '第8、9、10节'
      ],
      sparecolumns: [
        { 
          name: 'classRoomId', 
          required: true,
          align: 'left', 
          label: '教室编号', 
          field: 'classRoomId', 
          sortable: true
        },
        { name: 'classRoomSize', align: 'left', label: '教室容量', field: 'classRoomSize', sortable: true },
        { name: 'classRoomType', align: 'left', label: '教室类别', field: 'classRoomType', sortable: true },
        { name: 'classRoomPos', align: 'left', label: '教室位置', field: 'classRoomPos', sortable: true }
      ],
      allClassRooms: [
        // {
        //     classRoomId: "333",
        //     classRoomType: "实验室",
        //     classRoomPos: "三号楼797",
        //     classRoomSize: "33",
        //     week: "周三",
        //     time1: "",
        //     time2: "",
        //     time3: "",
        //     time4: "语文"
        // },
        // {
            
        // },
      ],
      columns: [
        { 
          name: 'classRoomId', 
          required: true,
          align: 'left', 
          label: '教室编号', 
          field: 'classRoomId', 
          sortable: true
        },
        { name: 'classRoomSize', align: 'left', label: '教室容量', field: 'classRoomSize', sortable: true },
        { name: 'classRoomType', align: 'left', label: '教室类别', field: 'classRoomType', sortable: true },
        { name: 'classRoomPos', align: 'left', label: '教室位置', field: 'classRoomPos', sortable: true },
        { name: 'week', align: 'left', label: '星期', field: 'week', sortable: true },
        { name: 'time1', align: 'left', label: '第1、2节', field: 'time1', sortable: true },
        { name: 'time2', align: 'left', label: '第3、4、5节', field: 'time2', sortable: true },
        { name: 'time3', align: 'left', label: '第6、7节', field: 'time3', sortable: true },
        { name: 'time4', align: 'left', label: '第8、9、10节', field: 'time4', sortable: true }
      ],
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },

  created() {
    this.getClassRoomInit()
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
    getClassRoomInit() {
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/classroom/init/',
        params: {
          "operation": "getallClassroom",
        }
      }).then(function (response) {
        _this.classroomId = response.data.classroomId;
        _this.allClassRooms = response.data.allClassRooms;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
    },
    getClassroomInfo() {
      let _this = this
      console.log(this.whichWeek);
      console.log(this.whichClass);
      axios({
        method: 'GET',
        url: 'http://localhost:8000/classroom/searchclassroom/',
        params: {
          "classroomId": this.whichClass,
          "week": this.whichWeek,
          "operation": "searchClassRoom",
        }
      }).then(function (response) {
        console.log(response);
        _this.allClassRooms = response.data.allClassRooms;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
    },
    searchSpareRoom() {
      this.searchSpare = true
      let _this = this
      console.log( this.spareWeek);
      console.log( this.spareTime);
      axios({
        method: 'GET',
        url: 'http://localhost:8000/classroom/searchspareroom/',
        params: {
          "week": this.spareWeek,
          "time": this.spareTime,
          "operation": "searchSpareRoom",
        }
      }).then(function (response) {
        _this.spareClassRooms = response.data.spareClassRooms;
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
