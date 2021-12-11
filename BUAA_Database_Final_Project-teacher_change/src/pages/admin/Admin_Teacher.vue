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
              active
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
      <h5 align = "center"><b>教师信息表</b></h5> 
    </div>
     <div class="row q-pa-sm bg-white"> 
    <q-btn-group>
    <q-btn rounded label="教师信息添加" type="submit" color="blue-3" @click="inAddTeacher = true"  icon = "add" size="17px" style="width: 330px"/>
    <q-btn rounded label="教师信息修改" type="submit" color="blue-4" @click="inChangeTeacher = true"  icon = "update" size="17px" style="width: 330px"/>
    </q-btn-group>
    </div>

    <q-dialog v-model="inAddTeacher" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-blue-1 text-white">
        <q-card-section>
          <div class="text-h6 text-black">教师信息添加</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
   <q-input
        v-model="newId"
        label="工号"
        style="width: 400px"
      />

      <q-input
        v-model="newName"
        label="姓名"
      />

      <q-input
        v-model="newPhone"
        label="联系电话"
        lazy-rules
        :rules="[ val => val && val.length == 11 || '请输入正确的电话号码']"
      />

      <q-input
        v-model="newMail"
        label="电子邮箱"
      />

      <q-input
        v-model="newIdNumber"
        label="身份证号"
        lazy-rules
        :rules="[ val => val && val.length == 18 || '请输入正确的身份证号']"
      />

      <q-input
        v-model="newPosition"
        label="职称"
      />

      <q-input
        v-model="newMajor"
        label="院系系号"
      />

      <q-input
        v-model="newPassword"
        label="登录密码"
      />

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确认" @click="addSelectedCourse" v-close-popup/>
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="inChangeTeacher" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-blue-1 text-white">
        <q-card-section>
          <div class="text-h6 text-black">教师信息修改</div>
        </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input
        v-model="oldId"
        label="工号"
        style="width: 400px"
      />

      <q-input
        v-model="oldName"
        label="姓名"
      />

      <q-input
        v-model="oldPhone"
        label="联系电话"
        lazy-rules
        :rules="[ val => val && val.length == 11 || '请输入正确的电话号码']"
      />

      <q-input
        v-model="oldMail"
        label="电子邮箱"
      />

      <q-input
        v-model="oldIdNumber"
        label="身份证号"
        lazy-rules
        :rules="[ val => val && val.length == 18 || '请输入正确的身份证号']"
      />

      <q-input
        v-model="oldPosition"
        label="职称"
      />

      <q-input
        v-model="oldMajor"
        label="院系系号"
      />

      <q-input
        v-model="oldPassword"
        label="登录密码"
      />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确认" @click="changeSelectedCourse" v-close-popup/>
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="col q-pa-sm bg-white">
            <q-table
              class="my-sticky-header-table"
              :rows="rows_selected"
              :columns="columns"
              row-key="teacherId"
              :filter="filter"
              :loading="loading"
              v-model:selected="selected"
              selection="single"
            >
            <template v-slot:top-left>
              <q-input bg-color="white" filled borderless dense debounce="300" v-model="filter" placeholder="查询教师">
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
  <!-- <div class="col q-pa-sm bg-white">
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        教师添加
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
        label="学号"
      />

      <q-input
        v-model="newName"
        label="姓名"
      />

      <q-input
        v-model="newPhone"
        label="联系电话"
      />

      <q-input
        v-model="newMail"
        label="电子邮箱"
      />

      <q-input
        v-model="newIdNumber"
        label="身份证号"
      />

      <q-input
        v-model="newPosition"
        label="职称"
      />

      <q-input
        v-model="newMajor"
        label="院系系号"
      />

      <q-input
        v-model="newPassword"
        label="登录密码"
      />

    </div>

      <div class="q-pa-md">
        <q-btn label="提交" type="submit" color="primary" @click="addSelectedCourse"/>
      </div>
    </q-form>
  </div> -->
  <!-- <div class="col q-pa-sm bg-white">
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        教师修改
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
        label="学号"
      />

      <q-input
        v-model="oldName"
        label="姓名"
      />

      <q-input
        v-model="oldPhone"
        label="联系电话"
      />

      <q-input
        v-model="oldMail"
        label="电子邮箱"
      />

      <q-input
        v-model="oldIdNumber"
        label="身份证号"
      />

      <q-input
        v-model="oldPosition"
        label="职称"
      />

      <q-input
        v-model="oldMajor"
        label="院系系号"
      />

      <q-input
        v-model="oldPassword"
        label="登录密码"
      />

    </div>

      <div class="q-pa-md">
        <q-btn label="提交" type="submit" color="primary" @click="changeSelectedCourse"/>
      </div>
    </q-form>
  </div> -->
  </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true;
import VueAxios from 'vue-axios';

const columns = [
  { name: 'teacherId', align: 'center', label: '序号', field: 'teacherId', sortable: true },
  { name: 'teacherName', align: 'center', label: '姓名', field: 'teacherName', sortable: true },
  { name: 'teacherPhone', align: 'center', label: '联系电话', field: 'teacherPhone', sortable: true },
  { name: 'teacherMail', align: 'center', label: '电子邮箱', field: 'teacherMail', sortable: true },
  { name: 'teacherIdNumber', align: 'center', label: '身份证号', field: 'teacherIdNumber', sortable: true },
  { name: 'position', align: 'center', label: '职称', field: 'position', sortable: true },
  { name: 'major', align: 'center', label: '院系系号', field: 'major', sortable: true },
  { name: 'teacherPassword', align: 'center', label: '登录密码', field: 'teacherPassword', sortable: true },
]

var rows_selected = [];

export default{
  data () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      inAddTeacher: false,
      inChangeTeacher: false,
      newId: '',
      newName: '',
      newPassword: '',
      newPhone: '',
      newMail: '',
      newIdNumber: '',
      newPosition: '',
      newMajor: '',
      oldId: '',
      oldName: '',
      oldPassword: '',
      oldPhone: '',
      oldMail: '',
      oldIdNumber: '',
      oldPosition: '',
      oldMajor: '',
      columns,
      rows_selected,
      selected: ref([]),
    }
  },

  created() {
    this.checkCourseInfo()
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
        message: '是否删除该教师',
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
            url: 'http://localhost:8000/admin/teacher/delInfo/',
            data: {
                "teacherId": c_id,
                "operation": "deleteTeacherInfo"
            }
          }).then(function (response) {
              // handle success
              console.log(response);
              _this.rows_selected = response.data.data.teacherInfo;
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
        this.$q.notify({message: '教师已经删除！',
color: "green-4"})
      }
      )
      
    },
    addSelectedCourse(){
      this.$q.dialog({
        title: '确认',
        message: '是否添加该教师',
        cancel: true,
        persistent: true
      }).onOk(() => {
let _this = this
        axios({
          method: "POST",
          url: "http://localhost:8000/admin/teacher/addInfo/",
          data: {
            "teacherId": this.newId,
            "teacherName": this.newName,
            "teacherPassword": this.newPassword,
            "teacherPhone": this.newPhone,
            "teacherMail": this.newMail,
            "teacherIdNumber": this.newIdNumber,
            "position": this.newPosition,
            "major": this.newMajor,
            "operation": "addTeacherInfo"
          }
        }).then(function (response) {
              // handle success
              console.log(response);
              _this.rows_selected = response.data.data.teacherInfo;
              this.$q.notify({
          message: '教师已经添加！',
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
        message: '是否修改该教师信息',
        cancel: true,
        persistent: true
      }).onOk(() => {
let _this = this
        axios({
          method: "POST",
          url: "http://localhost:8000/admin/teacher/changeInfo/",
          data: {
            "teacherId": this.oldId,
            "teacherName": this.oldName,
            "teacherPassword": this.oldPassword,
            "teacherPhone": this.oldPhone,
            "teacherMail": this.oldMail,
            "teacherIdNumber": this.oldIdNumber,
            "position": this.oldPosition,
            "major": this.oldMajor,
            "operation": "changeTeacherInfo"
          }
        }).then(function (response) {
              // handle success
              console.log(response);
              _this.rows_selected = response.data.data.teacherInfo;
              this.$q.notify({
          message: '教师已经修改！',
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
        url: 'http://localhost:8000/admin/teacher/getInfo/',
        params: {
            "operation": "getTeacherInfo"
        }
      }).then(function (response) {
          // console.log(response);
          // handle success
          _this.rows_selected = response.data.data.teacherInfo;
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