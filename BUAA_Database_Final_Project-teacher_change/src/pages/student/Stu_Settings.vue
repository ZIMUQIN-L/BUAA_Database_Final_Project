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
  <q-page class="flex flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'60%'}">
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                教务系统密码修改
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input 
                v-model="studentId" 
                filled :type="number" 
                hint="请输入学工号"
                bottom-slots label="用户学工号">
                <template v-slot:before>
                  <q-icon name="person"></q-icon>
                </template>
              </q-input>

              <q-input 
                v-model="studentPwd" 
                filled :type="isPwd ? 'password' : 'text'" 
                pattern="[a-zA-Z0-9_]{6,10}"
                hint="请输入原密码"
                bottom-slots label="用户原密码">
                <template v-slot:before>
                  <q-icon name="lock"></q-icon>
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  ></q-icon>
                </template>
              </q-input>

              <q-input 
                v-model="studentNewPwd1" 
                filled :type="isPwd1 ? 'password' : 'text'" 
                pattern="[a-zA-Z0-9_]{6,10}"
                hint="请输入新密码"
                bottom-slots label="用户新密码">
                <template v-slot:before>
                  <q-icon name="lock"></q-icon>
                </template>
              <template v-slot:append>
                  <q-icon
                    :name="isPwd1 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd1 = !isPwd1"
                  ></q-icon>
                </template>
              </q-input>

              <q-input 
                v-model="studentNewPwd2" 
                filled :type="isPwd2 ? 'password' : 'text'" 
                pattern="[a-zA-Z0-9_]{6,10}"
                hint="请再次确认新密码"
                bottom-slots label="确认用户新密码"
                :rules="[ val => val == studentNewPwd1 || '请输入与前面一致的密码']">
                <template v-slot:before>
                  <q-icon name="lock"></q-icon>
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  ></q-icon>
                </template>
              </q-input>

              <div>
              <center>
                <q-btn 
                  label="确认" 
                  @click="onClick"
                  type="submit" 
                  color="primary"/>
                <q-btn 
                  label="撤销" 
                  type="reset"
                  @click="onReset" 
                  color="primary"
                  flat class="q-ml-sm"/>
              </center>
              </div>
              
              <q-card-section class="text-center q-pa-none">
            
          </q-card-section>
            </q-form>
          </q-card-section>
        </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios';

export default {
  data () {
    var stuId = this.$route.params.studentId
    const leftDrawerOpen = ref(false)

    return {
      isPwd: true,
      isPwd1: true,
      isPwd2: true,
      studentId: '',
      studentPwd: '',
      studentNewPwd1: '',
      studentNewPwd2: '',
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },

  methods :{
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
    onClick:function() {
      let _this = this
      axios({
        method: 'GET',
        url: 'http://localhost:8000/student/settings/',
        params: {
            "studentId": this.studentId,
            "studentPwd": this.studentPwd,
            "studentNewPwd": this.studentNewPwd1
        }
      }).then(function (response) {
        console.log(response);
          if (!response.data.status) {
            _this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: '已修改密码'
            })
            _this.$router.push('/student/lesson/' + _this.studentId);
            console.log(response);
          }
          else {
            _this.$q.notify({
            type: 'negative',
            message: '请输入正确的用户名 / 密码'
          })
          }
          
        })
        .catch(function (error) {
          // handle error
            _this.$q.notify({
            type: 'negative',
            message: '请输入正确的用户名 / 密码'
          })
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    onReset:function() {
      this.studentNewPwd1 = ''
      this.studentNewPwd2 = ''
    },
    backLesson:function() {
      this.$router.push('/student/lesson' + _this.studentId)
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
