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
              active
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
    <h5 align = "center"><b>所属院系</b></h5> 
    <q-card class="my-card">
      <q-card-section class="bg-blue-grey-2 text-white">
        <div class="text-h6" align = "center">院系基本信息</div>
        <!-- <div class="text-subtitle2">by John Doe</div> -->
        <q-field color="grey-8" label-color="grey-10" outlined label="系号" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{DpNumber}}</div>
        </template>
      </q-field>
      <q-field color="grey-8" label-color="grey-10" outlined label="系名" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{DpName}}</div>
        </template>
      </q-field>
      <q-field color="grey-8" label-color="grey-10" outlined label="系主任" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{DpMaster}}</div>
        </template>
      </q-field>
      <q-field color="grey-8" label-color="grey-10" outlined label="院系学分要求" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{DpScore}}</div>
        </template>
      </q-field>
      </q-card-section>
    </q-card>
    <q-separator inset="item" />
    <h4>
    <q-select color="teal" v-model="who" :options="options" label="院系人员信息查询">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
    </h4>
    <q-table
      title="院系成员信息"
      :rows="memberData"
      :columns="memberCol"
      row-key="memberName"
    >
      <template v-slot:top-right>
      <q-btn
        label = "查询院系成员"
        color="white"
        text-color="black"
        icon-right="search"
        no-caps
        flat
        @click="getDepartMember"
      />
      </template>
    </q-table>
  </div>
  </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true;
import VueAxios from 'vue-axios';

export default{
  data () {
    var teaId = this.$route.params.teacherId
    const leftDrawerOpen = ref(false)

    return {
      // teacherId,
      DpNumber: null,
      DpMaster: null,
      DpName: null,
      DpScore: null,
      teacherId: ref(teaId),
      readonly: ref(false),
      teacherName: ref(''),
      teacherPhone: ref(''),
      teacherMail: ref(''),
      leftDrawerOpen,
      who:ref(''),
      options: [
        "学生", "教师", "所有"
      ],
      memberCol: [
        {
          name: 'memberName',
          required: true,
          label: '成员姓名',
          align: 'left',
          field: 'memberName',
          format: val => `${val}`,
          sortable: true
        },
        {name: 'memberNumber', align: 'left', label: '成员学工号',  field: 'memberNumber', sortable: true},
        {name: 'memberIden', align: 'left', label: '成员身份',  field: 'memberIden', sortable: true}
      ],
      memberData: [

      ],
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  created() {
    this.getDepartInit()
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
    getDepartInit() {
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/teacher/depart/init/',
        params: {
            "teacherId": _this.$route.params.teacherId,
            "operation": "teacherDepartInit"
        }
      }).then(function (response) {
          // handle success
          _this.DpName = response.data.data.depart.DpName;
          _this.DpNumber = response.data.data.depart.DpNumber;
          _this.DpMaster = response.data.data.depart.DpMaster;
          _this.DpScore = response.data.data.depart.DpScore;
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
    getDepartMember() {
      console.log(this.who);
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/teacher/depart/member/',
        params: {
          "userId": this.teacherId,
          "operation": "getTeacherDepartMember",
          "type": this.who
        }
      }).then(function (response) {
        console.log(response);
        _this.memberData = response.data.memberData;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
      console.log("success!");
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
