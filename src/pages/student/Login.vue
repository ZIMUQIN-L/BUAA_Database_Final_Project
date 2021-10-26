<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-btn
              class="q-mt-md q-ml-md absolute-top-left"
              size="15px"
              round
              push
              glossy
              color="blue-8"
              icon="arrow_back"
              @click="back"
            ></q-btn>
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../../statics/logo_big.png">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                教务管理系统
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
                bottom-slots label="学工号"
                error-message="请输入 8 位数字"
                :error="!isIdValid">
                <template v-slot:before>
                  <q-icon name="person"></q-icon>
                </template>
              </q-input>

              <q-input 
                v-model="studentPwd" 
                filled :type="isPwd ? 'password' : 'text'" 
                pattern="[a-zA-Z0-9_]{6,10}"
                hint="请输入密码"
                bottom-slots label="密码">
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

              <div>
                <q-btn 
                  class="full-width" 
                  label="登录" 
                  @click="onClick"
                  type="submit" 
                  color="primary"/>
              </div>
              <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">没有账号？<a href="http://localhost:8080/?#/student/signup"> 注册 </a> </p>
            
          </q-card-section>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      studentId: '',
      studentPwd: '',
      isPwd: true,
      isIdValid: true,
    }
  },

 methods :{
    onClick:function() {
      let _this = this
      // this.$router.push({
      //       // path: '/student/homepage', 
      //       path: '/student/lesson/12345',
      //       // params: { studentId: this.studentId.toString }
      //     });
      // console.log('/student/homepage/' + this.studentId);
      axios({
        method: 'GET',
        url: 'http://localhost:8000/student/login/',
        params: {
            "studentId": this.studentId,
            "studentPwd": this.studentPwd
        }
      }).then(function (response) {
          // handle success
          // this.$router.push?('/student/homepage');
          if (!response.data.status) {
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
        .catch(function (error) {
          // handle error
          this.$q.notify({
            type: 'negative',
            message: '请输入正确的用户名 / 密码'
          })
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      // if (this.studentId == 12345) {
      //   this.$router.push('/student/homepage');
      //   // window.open('http://localhost:8080/#/student/homepage');
      // }
    },
    back:function() {
      this.$router.push('/')
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
</style>