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
<q-page class="">
  <div class="q-pa-sm bg-grey-3">
    <h5 align = "center"><b>教师课程列表</b></h5> 
  </div>
  <div class="q-pa-md q-gutter-sm">
    <q-table
      title="教师课表"
      :rows="teacherCourse"
      :columns="columns"
      row-key="courseName"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
    >
    <template v-slot:top-right>
      <q-btn
        label = "删除课程"
        color="white"
        text-color="black"
        icon-right="delete"
        no-caps
        flat
        @click="deleteSelectedCourse"
      />
      <q-btn 
        label="添加课程" 
        color="primary" 
        icon-right="add"
        flat
        @click="basic = true" />
    </template>
    </q-table>
  </div>
  <q-dialog v-model="basic" transition-show="rotate" transition-hide="rotate">
    <q-card style="width: 600px">
      <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="newClass"
          label="新添课程名称"
          hint="课程名称"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '请输入课程名称']"
        />

        <q-input
          filled
          type="number"
          v-model="newSum"
          label="课程最大容量"
          hint="课程容量"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || '请输入课程最大容量',
            val => val > 50 && val < 200 || '请合理设置课程容量'
          ]"
        />

        <q-input
          filled
          v-model="newType"
          label="新添课程类别"
          hint="课程类别"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '清添加课程类别']"
        />

        <q-input
          filled
          type = "number"
          v-model="newCredit"
          label="新添课程学分"
          hint="课程学分"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || '请设置课程学分',
            val => val > 0 && val <= 9 || '请合理设置课程学分'
          ]"
        />

        <q-input
          filled
          v-model="newExam"
          label="新添课程考核方式"
          hint="课程考核方式"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '请输入课程考核方式']"
        />

        <!-- <q-input
          filled
          v-model="newTime"
          label="新添课程时间"
          hint="上课时间"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '请输入该课程上课时间']"
        /> -->

        <div>
          <q-btn label="提交" type="submit" color="primary" v-close-popup/>
          <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
        </div>
      </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- <div class="col q-pa-sm bg-white">
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        课程添加
      </q-toolbar-title>
    </q-toolbar>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="newClass"
        label="新添课程名"
        hint="课程名称"
      />
      <q-input
        filled
        type="number"
        v-model="newSum"
        label="课程容量"
        hint="课程最大容量"
        lazy-rules
        :rules="[
          (val => (val = '' || (val >= 0 && val <= 200))) || '课程容量需小于200'
        ]"
      />
      <div>
        <q-btn label="提交" type="submit" color="primary"/>
        <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
  <div>
    <q-list 
      class="bg-white"
      separator
      bordered>
      <q-item 
        v-for = "(task, index) in tasks"
       :key="task.title"
       @click="task.done = !task.done"
       clickable
        v-ripple>
        <q-item-section avatar>
          <q-checkbox 
            v-model="task.done"
            class="no-pointer-events"
            color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{task.title}}</q-item-label>
          <q-item-label caption> 课程容量：{{task.sum}} </q-item-label>
        </q-item-section>
        <q-item-section
          v-if="task.done"
          side>
          <q-btn 
            @click.stop ="deleteTask(index)"
            flat round dense color="primary"
            icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
  </div> -->


</q-page>  
</template>



<script>
import { ref } from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true;
//import VueAxios from 'vue-axios';
var tasks = [];
export default {
  data () {
    var teacherId = this.$route.params.teacherId
    const leftDrawerOpen = ref(false)
    return {
      basic: false,
      selected: ref([]),
      columns: [
        {
          name: 'courseName',
          required: true,
          label: '课程名称',
          align: 'left',
          field: 'courseName',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'id', align: 'center', label: '课程号', field: 'id', sortable: true },
        {name: 'courseType', align: 'center', label: '课程类型', field: 'courseType', sortable: true },
        {name: 'nowSum', align: 'center', label: '当前选课人数', field: 'nowSum', sortable: true },
        {name: 'courseSum', label: '课程容量', field: 'courseSum', sortable: true },
        {name: 'courseExam', label: '考核形式', field: 'courseExam', sortable: true },
        {name: 'courseCredit', label: '学分', field: 'courseCredit', sortable: true },
        { name: 'time', align: 'center', label: '上课时间', field: 'time', sortable: true },
        { name: 'place', align: 'center', label: '上课地点', field: 'place', sortable: true }
        //{name: 'courseTime', label: '上课时间', field: 'courseTime', sortable: true }
      ],
      teacherCourse: [
        // {
        //   courseName: '数据库',
        //   courseType: '核心专业课',
        //   courseSum: '100',
        //   courseExam: '闭卷考试',
        //   courseCredit: '10',
        //   courseTime: '周一第三节'
        // },
        // {
        //   courseName: '操作系统',
        //   courseType: '核心专业课',
        //   courseSum: '100',
        //   courseExam: '闭卷考试',
        //   courseCredit: '10',
        //   courseTime: '周一第三节'
        // }
      ],
      newClass: '',
      newSum: '',
      newType: '',
      newExam: '',
      newCredit: '',
      newTime: '',
      tasks: [
      ],
      teacherId,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
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
    deleteSelectedCourse() {
      console.log(this.teacherCourse);
      console.log(this.selected);
      console.log("happ");
      // this.selected.filter(function(item){
      //   teacherCourse.splice(item.id, 1);
      // });
      var c_name = [];
      this.$q.dialog({
        title: '确认',
        message: '是否删除该课程',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.selected.filter(function(item){
          // self.rows_unselected.push(self.rows_selected[self.rows_selected.indexOf(item)]);
          // self.rows_selected.splice(self.rows_selected.indexOf(item), 1);
          c_name.unshift(item);
          return item;
      })
      if (this.selected.length == 0) {
        this.$q.notify({
          type: 'negative',
          message: '请选择需要删除的课程'
        })
        return;
      }
      else {
        console.log(c_name[0]);
        var decourse = []
        //decourse = this.teacherCourse.splice(this.teacherCourse.indexOf(c_name[0]), 1)
        let _this = this
        axios({
          method: 'POST',
          url:'http://localhost:8000/teacher/lesson/delete/',
          data:{
            "userId": this.teacherId,
            "courseName": c_name[0].courseName,
            "operation": "delete"
          }
        })
        .then(response => {
          if (response.data.status == 0) {
            decourse = _this.teacherCourse.splice(this.teacherCourse.indexOf(c_name[0]), 1)
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
          console.log(response)
        }, error=> {
          console.log('错误',error.message)
        })
      }
      this.selected = [];
        // this.$q.notify({
        //   message: '课程已经删除！',
        //   color: "green-4"
        // })
      })
    },
    // deleteTask(index) {
    //   let _this = this
    //   this.$q.dialog({
    //     title: '确认',
    //     message: '是否删除该课程',
    //     cancel: true,
    //     persistent: true
    //   }).onOk(() => {
    //     this.$q.notify('已删除课程！')
    //   })
    //   axios({
    //     method: 'POST',
    //     url:'http://localhost:8000/teacher/lesson/',
    //     data:{
    //       "userId": this.teacherId,
    //       "courseName": this.tasks.splice(index, 1)[0].title,
    //       //"courseName": this.tasks.indexOf(index).title,
    //       //"courseName": "离散数学",
    //       "operation": "delete"
    //     }
    //   })
    //   .then(response => {
    //     console.log(response)
    //   }, error=> {
    //     console.log('错误',error.message)
    //   })
    //   // this.tasks.splice(index, 1)
    // },
    addClass() {
      if (this.newClass !== '' && this.newSum !== '' 
        && this.newType != '' && this.newExam != '' && this.newCredit != '') {
        // this.teacherCourse.push({
        //   courseName: this.newClass,
        //   courseType: this.newType,
        //   courseSum: this.newSum,
        //   courseExam: this.newExam,
        //   courseCredit: this.newCredit,
        //   // courseTime: this.newTime
        // })
      let _this = this
      axios({
        method: 'POST',
        url:'http://localhost:8000/teacher/lesson/add/',
        data:{
          "userId": this.teacherId,
          "courseName": this.newClass,
          "courseType": this.newType, 
          "courseSum": this.newSum,
          "courseExam": this.newExam,
          "courseCredit": this.newCredit,
          "operation": "add"
        }
      })
      .then(response => {
        _this.teacherCourse = response.data.data.courseTable;
        //console.log(data)

        console.log(response)
      }, error=> {
        //console.log(data)
        console.log('错误',error.message)
      })        
      }
      
    },
    init() {
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/teacher/lesson/query/',
        params: {
          "userId": this.teacherId,
          "operation": "getClass"
        }
      }).then(function (response) {
        _this.teacherCourse = response.data.data.courseTable;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
      console.log("success!");
    },
    onSubmit () {
      if (this.newClass !== '' && this.newSum !== '' && this.newType != '' 
         && this.newExam != '' && this.newCredit != '') {
        this.addClass()
        this.$q.notify({
          color: 'green-4',
         textColor: 'white',
          icon: 'cloud_done',
          message: '已添加课程'
        })
        this.newClass = ''
        this.newSum = ''
        this.newType = ''
        this.newTime = ''
        this.newCredit = ''
        this.newExam = ''
      }
      else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: '请填写课程相关信息'
        })
      }
    },
    onReset () {
      this.newClass = null
      this.newSum = null
      this.newExam = null
      this.newCredit = null
      this.newType = null
      this.newTime = null
    }
  }
  
}
</script>