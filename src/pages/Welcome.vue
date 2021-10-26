<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/logo_big.png">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                教务管理系统
              </div>
              <div class="col text-h7 ellipsis">
                欢迎！您的身份是：
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <div>
                <q-select 
                  v-model="identity" 
                  :options="options" 
                  label="请选择">
                </q-select>
              </div>
              <div>
                <q-btn 
                  class="full-width" 
                  label="提交" 
                  @click="onClick"
                  type="submit" 
                  color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {

  data () {
    return {
      identity : '',

      options: [
        '学生', '教师'//, '管理员'
      ]
    }
  },

  methods :{
    onClick:function() {
      if (this.identity == '学生') {
        this.$router.push('/student/login');
        // window.open('http://localhost:8080/#/student/homepage');
      }
      else if (this.identity == '教师') {
        this.$router.push('/teacher/login');
      }
      else if (this.identity == '管理员') {
        this.$router.push('/admin/login');
      }
      else {
        this.$q.notify({
          type: 'negative',
          message: '请选择您的身份'
        })
      }
    }
  }
}
</script>

<style>
  .bg-image {
   background-image: url("../statics/blue-trianglify.jpg");
   background-repeat: no-repeat; /* Do not repeat the image */
   background-size: cover; /* Resize the background image to cover the entire container */
  }
</style>