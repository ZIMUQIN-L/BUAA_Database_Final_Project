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
              active
              @click="goToEmpty">
              <q-item-section avatar>
                <q-icon name="search" />
              </q-item-section>

              <q-item-section>
                空教室
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
  <q-page class="q-pa-sm">
    <div class="q-pa-sm bg-grey-3">
      <h5 align = "center"><b>空教室查询</b></h5> 
    </div>
    <div id="q-app" style="min-height: 100vh;">
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-column-table"
      :rows="rows"
      :columns="columns"
      row-key="name"
    ></q-table>
  </div>
</div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios';

export default({
  data () {
    var stuId = this.$route.params.studentId
    const leftDrawerOpen = ref(false)
    const columns = [
  {
    name: 'name',
    required: true,
    label: '',
    align: 'center',
    field: row => row.name,
    format: val => `${val}`
  },
  { name: 'Monday', align: 'center', label: '星期一', field: 'Monday' },
  { name: 'Tuesday', align: 'center', label: '星期二', field: 'Tuesday' },
  { name: 'Wednesday', align: 'center', label: '星期三', field: 'Wednesday' },
  { name: 'Thursday', align: 'center', label: '星期四', field: 'Thursday' },
  { name: 'Friday', align: 'center', label: '星期五', field: 'Friday' },
  { name: 'Saturday', align: 'center', label: '星期六', field: 'Saturday' },
  { name: 'Sunday', align: 'center', label: '星期日', field: 'Sunday' }
]

const rows = [
  {
    name: '上午第 1, 2 节',
    Monday: 'A101, F335',
    Tuesday: '（一）301',
    Wednesday: '主102',
    Thursday: '主M404',
    Friday: '（三）301, （四）202',
    Saturday: '',
    Sunday: 'A208, G101, H31, （三）301, （四）202'
  },
  {
    name: '上午第 3, 4, 5 节',
    Monday: '',
    Tuesday: '',
    Wednesday: '主102',
    Thursday: '主M404, （三）301, （四）202',
    Friday: '',
    Saturday: '',
    Sunday: 'H315'
  },
  {
    name: '下午第 6, 7 节',
    Monday: 'F335',
    Tuesday: 'G101',
    Wednesday: '主102',
    Thursday: '',
    Friday: '（三）301, （四）202',
    Saturday: '',
    Sunday: 'G101, H315'
  },
  {
    name: '下午第 8, 9, 10 节',
    Monday: 'F335',
    Tuesday: 'G101, H315, B334',
    Wednesday: '主102',
    Thursday: '',
    Friday: '（三）301',
    Saturday: '',
    Sunday: 'A208'
  },
  {
    name: '晚上第 11, 12 节',
    Monday: '（二）104',
    Tuesday: '',
    Wednesday: '主102',
    Thursday: '',
    Friday: 'F332,（四）202',
    Saturday: '',
    Sunday: ''
  },
  {
    name: '晚上第 13, 14 节',
    Monday: '',
    Tuesday: 'A208, G101, H315, F335, G102',
    Wednesday: '主102',
    Thursday: '主M404',
    Friday: '（三）301, （四）202',
    Saturday: '',
    Sunday: 'A208, G101, H315'
  },
]

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      columns,
      rows
    }
  },

  created() {
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
    goToEmpty() {
      this.$router.push('/student/empty/' + this.$route.params.studentId)
    },
    goToSettings() {
      this.$router.push('/student/settings/' + this.$route.params.studentId)
    },
    goToInfo() {
      this.$router.push('/student/info/' + this.$route.params.studentId)
    }
  }
})
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
.my-sticky-header-column-table
  /* height or max-height is important */
  max-height: 1000px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #D6EAF8 !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #D6EAF8

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>