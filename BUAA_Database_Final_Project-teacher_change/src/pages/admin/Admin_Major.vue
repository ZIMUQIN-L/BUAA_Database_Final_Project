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
              active
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
      <h5 align = "center"><b>院系信息表</b></h5> 
    </div>
    <!-- <q-toolbar class="text-primary">
      <q-toolbar-title>
        专业添加
      </q-toolbar-title>
    </q-toolbar> -->
        <q-dialog v-model="addMajor" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-blue-1 text-white">
        <q-card-section>
          <div class="text-h6 text-black">院系添加</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
        v-model="newId"
        label="院系号"
        style="width: 400px"
      />

      <q-input
        v-model="newName"
        label="院系名称"
      />

      <!-- <q-input
        v-model="newNum"
        label="院系人数"
      /> -->

      <q-input
        v-model="newChief"
        label="系主任工号"
      />

      <q-input
        v-model="newEmail"
        label="院系邮箱"
      />

      <q-input
        v-model="newCredit"
        label="学分要求"
      />

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确认" @click="addSelectedCourse" v-close-popup/>
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="row q-pa-sm bg-white"> 
    <q-btn-group>
    <q-btn rounded label="院系添加" type="submit" color="blue-3" @click="addMajor = true"  icon = "add" size="17px" style="width: 330px"/>

    <!-- <q-form

      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md "
    >

    <div class="q-gutter-md row items-start">

      <q-input
        v-model="newId"
        label="院系号"
      />

      <q-input
        v-model="newName"
        label="院系名称"
      />

      <q-input
        v-model="newNum"
        label="院系人数"
      />

      <q-input
        v-model="newChief"
        label="系主任工号"
      />

      <q-input
        v-model="newEmail"
        label="院系邮箱"
      />

      <q-input
        v-model="newCredit"
        label="学分要求"
      />

    </div>

      <div class="q-pa-md">
        <q-btn label="提交" type="submit" color="primary" @click="addSelectedCourse"/>
      </div>
    </q-form> -->
  <!-- </div>
  <div class="col q-pa-sm bg-white"> -->
    <q-btn right rounded label="院系修改" type="submit" color="blue-4" @click="changeMajor = true"  icon = "update" size="17px" style="width: 330px"/>
      </q-btn-group>
    </div>
    <q-dialog v-model="changeMajor" transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-blue-1 text-white">
        <q-card-section>
          <div class="text-h6 text-black">院系修改</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <q-input
        v-model="oldId"
        label="院系号"
        style="width: 400px"
      />

      <q-input
        v-model="oldName"
        label="院系名称"
      />

      <!-- <q-input
        v-model="oldNum"
        label="院系人数"
      /> -->

      <q-input
        v-model="oldChief"
        label="系主任工号"
      />

      <q-input
        v-model="oldEmail"
        label="院系邮箱"
      />

      <q-input
        v-model="oldCredit"
        label="学分要求"
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
              row-key="id"
              :filter="filter"
              :loading="loading"
              v-model:selected="selected"
              selection="single"
            >
            <template v-slot:top-left>
              <q-input bg-color="white" filled borderless dense debounce="300" v-model="filter" placeholder="查询院系">
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
  <div class="row q-pa-bg bg-white">

    <!-- <q-toolbar class="text-primary">
      <q-toolbar-title>
        专业修改
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
        label="院系号"
      />

      <q-input
        v-model="oldName"
        label="院系名称"
      />

      <q-input
        v-model="oldNum"
        label="院系人数"
      />

      <q-input
        v-model="oldChief"
        label="系主任工号"
      />

      <q-input
        v-model="oldEmail"
        label="院系邮箱"
      />

      <q-input
        v-model="oldCredit"
        label="学分要求"
      />
    </div>

      <div class="q-pa-md">
        <q-btn label="提交" type="submit" color="primary" @click="changeSelectedCourse"/>
      </div>
    </q-form> -->
  </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true;
import VueAxios from 'vue-axios';

const columns = [
  { name: 'id', align: 'center', label: '班号', field: 'id', sortable: true },
  { name: 'name', align: 'center', label: '院系名称', field: 'name', sortable: true },
  { name: 'num', align: 'center', label: '院系人数', field: 'num', sortable: true },
  { name: 'chief', align: 'center', label: '系主任工号', field: 'chief', sortable: true },
  { name: 'email', align: 'center', label: '院系邮箱', field: 'email', sortable: true },
  { name: 'credit', align: 'center', label: '学分要求', field: 'credit', sortable: true }
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
      newId: '',
      addMajor: false,
      changeMajor: false,
      newName: '',
      newNum: '',
      newChief: '',
      newEmail: '',
      newCredit: '',
      oldId: '',
      oldName: '',
      oldNum: '',
      oldChief: '',
      oldEmail: '',
      oldCredit: '',
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
        message: '是否删除该院系',
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
            url: 'http://localhost:8000/admin/major/delInfo/',
            data: {
                "id": c_id,
                "operation": "deleteMajorInfo"
            }
          }).then(function (response) {
              // handle success
            if (response.data.status == 1) {
                _this.$q.notify({
                type: 'negative',
               message: '该班级内仍有学生，无法删除该班级'
               })
              }
              else {
                _this.$q.notify({message: '班级删除成功！',
                color: "green-4"})
              }
              console.log(response);
              _this.rows_selected = response.data.data.majorInfo;
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
//         this.$q.notify({message: '专业已经删除！',
// color: "green-4"})
      }
      )
      
    },
    addSelectedCourse(){
      this.$q.dialog({
        title: '确认',
        message: '是否添加该院系',
        cancel: true,
        persistent: true
      }).onOk(() => {
let _this = this
        axios({
          method: "POST",
          url: "http://localhost:8000/admin/major/addInfo/",
          data: {
            "id": this.newId,
            "name": this.newName,
            "chief": this.newChief,
            "email": this.newEmail,
            "credit": this.newCredit,
            "operation": "addMajorInfo"
          }
        }).then(function (response) {
              // handle success
              console.log(response);
              _this.rows_selected = response.data.data.majorInfo;
              this.$q.notify({
          message: '院系已经添加！',
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
        message: '是否修改该院系信息',
        cancel: true,
        persistent: true
      }).onOk(() => {
let _this = this
        axios({
          method: "POST",
          url: "http://localhost:8000/admin/major/changeInfo/",
          data: {
            "id": this.oldId,
            "name": this.oldName,
            "chief": this.oldChief,
            "email": this.oldEmail,
            "credit": this.oldCredit,
            "operation": "changeMajorInfo"
          }
        }).then(function (response) {
              // handle success
              console.log(response);
              _this.rows_selected = response.data.data.majorInfo;
              this.$q.notify({
          message: '院系已经添加！',
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
        url: 'http://localhost:8000/admin/major/getInfo/',
        params: {
            "operation": "getMajorInfo"
        }
      }).then(function (response) {
          // console.log(response);
          // handle success
          _this.rows_selected = response.data.data.majorInfo;
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
