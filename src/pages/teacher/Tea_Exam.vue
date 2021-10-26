<template>
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

export default {
  data () {
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
      ]
    }
  },
  methods: {
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

