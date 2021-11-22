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
    <h5 align = "center"><b>考试列表</b></h5> 
  </div>
  <div class="col q-pa-sm bg-white">
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        添加考试
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
        label="考试课程名称"
      />

      <q-input
        filled
        type="number"
        v-model="newSum"
        label="考试人数"
        lazy-rules
        :rules="[
          (val => (val = '' || (val >= 0 && val <= 200))) || '考试人数需小于200'
        ]"
      />
      <div>
        <q-btn label="提交" type="submit" color="primary" @click="addClass"/>
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
          <q-item-label caption> 考试人数：{{task.sum}} </q-item-label>
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

export default {
  data () {
    const leftDrawerOpen = ref(false)
    return {
      newClass: '',
      newSum: '',
      tasks: [
        {
          title: '信息学期末考试',
          done: false,
          sum: 100
        },
        {
          title: '社会学期中考试',
          done: false,
          sum: 20
        },
        {
          title: '心理学期中考试',
          done: false,
          sum: 50
        }
      ],
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    logout:function() {
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
    deleteTask(index) {
      this.$q.dialog({
        title: '确认',
        message: '是否删除该考试',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1)
        this.$q.notify('考试已经删除！')
      })
    },
    addClass() {
      if (this.newClass !== '' && this.newSum !== '') {
        this.tasks.push({
          title: this.newClass,
          done: false,
          sum: this.newSum
        })
        this.newClass = ''
        this.newSum = ''
      }
      
    },
    onSubmit () {
      if (this.newClass !== '' && this.newSum !== '') {
        this.$q.notify({
          color: 'green-4',
         textColor: 'white',
          icon: 'cloud_done',
          message: '已添加考试'
        })
      }
      else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: '请填写考试相关信息'
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