<template>
<q-page class="">
  <div class="q-pa-sm bg-grey-3">
    <h5 align = "center"><b>教师课程列表</b></h5> 
  </div>
  <div class="col q-pa-sm bg-white">
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
  </div>
</q-page>  
</template>



<script>
import { ref } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';

var tasks = [];
export default {
  data () {
    var teacherId = this.$route.params.teacherId

    return {
      newClass: '',
      newSum: '',
      tasks: [
        // {
        //   title: '信息学',
        //   done: false,
        //   sum: 100
        // },
        // {
        //   title: '社会学',
        //   done: false,
        //   sum: 20
        // },
        // {
        //   title: '心理学',
        //   done: false,
        //   sum: 50
        // }
      ],
      teacherId
    }
  },

  created() {
    this.init()
  },

  methods: {
    deleteTask(index) {
      let _this = this
      this.$q.dialog({
        title: '确认',
        message: '是否删除该课程',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.notify('已删除课程！')
      })
      axios({
        method: 'POST',
        url:'http://localhost:8000/teacher/lesson/',
        data:{
          "userId": this.teacherId,
          "courseName": this.tasks.splice(index, 1)[0].title,
          //"courseName": this.tasks.indexOf(index).title,
          //"courseName": "离散数学",
          "operation": "delete"
        }
      })
      .then(response => {
        console.log(response)
      }, error=> {
        console.log('错误',error.message)
      })
      // this.tasks.splice(index, 1)
    },
    addClass() {
      if (this.newClass !== '' && this.newSum !== '') {
        this.tasks.push({
          title: this.newClass,
          done: false,
          sum: this.newSum
        })
      axios({
        method: 'POST',
        url:'http://localhost:8000/teacher/lesson/',
        data:{
          "userId": this.teacherId,
          "courseName": this.newClass,
          "courseSum": this.newSum,
          "operation": "add"
        }
      })
      .then(response => {
        console.log(response)
      }, error=> {
        console.log('错误',error.message)
      })        

        this.newClass = ''
        this.newSum = ''
      }
      
    },
    init() {
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/teacher/lesson/',
        params: {
          "userId": this.teacherId,
          "operation": "getClass"
        }
      }).then(function (response) {
        _this.tasks = response.data.courseTable;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {

      });
      console.log("success!");
    },
    onSubmit () {
      if (this.newClass !== '' && this.newSum !== '') {
        this.addClass()
        this.$q.notify({
          color: 'green-4',
         textColor: 'white',
          icon: 'cloud_done',
          message: '已添加课程'
        })
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
    }
  }
  
}

</script>

