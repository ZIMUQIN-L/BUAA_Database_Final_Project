
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginSignupLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Welcome.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/LoginSignupLayout.vue'),
    children: [
      { path: 'student/login', component: () => import('src/pages/student/Login.vue') },
      { path: 'student/signup', component: () => import('src/pages/student/Signup.vue') },
      { path: 'teacher/login', component: () => import('src/pages/teacher/Login.vue') },
      { path: 'teacher/signup', component: () => import('src/pages/teacher/Signup.vue') },
      { path: 'admin/login', component: () => import('src/pages/admin/Login.vue') },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/StuLayout.vue'),
    children: [
      { path: 'student/homepage/:studentId', component: () => import('src/pages/student/Stu_Homepage.vue') },
      { path: 'student/lesson/:studentId', component: () => import('src/pages/student/Stu_Lesson.vue') },
      { path: 'student/exam/:studentId', component: () => import('src/pages/student/Stu_Exam.vue') },
      { path: 'student/settings/:studentId', component: () => import('src/pages/student/Stu_Settings.vue') },
      { path: 'student/info/:studentId', component: () => import('src/pages/student/Stu_Info.vue') },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/TeaLayout.vue'),
    children: [
      { path: 'teacher/homepage/:teacherId', component: () => import('src/pages/teacher/Tea_Homepage.vue') },
      { path: 'teacher/lesson/:teacherId', component: () => import('src/pages/teacher/Tea_Lesson.vue') },
      { path: 'teacher/exam/:teacherId', component: () => import('src/pages/teacher/Tea_Exam.vue') },
      { path: 'teacher/settings/:teacherId', component: () => import('src/pages/teacher/Tea_Settings.vue') },
      { path: 'teacher/info/:teacherId', component: () => import('src/pages/teacher/Tea_Info.vue') },
      { path: 'teacher/depart/:teacherId', component: () => import('src/pages/teacher/Tea_Depart.vue') },
      { path: 'teacher/courseinfo/:teacherId', component: () => import('src/pages/teacher/Tea_CourseInfo.vue') },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/AdmLayout.vue'),
    children: [
      { path: 'admin/homepage', component: () => import('src/pages/admin/Admin_Homepage.vue') },
      { path: 'admin/lesson', component: () => import('src/pages/admin/Admin_Lesson.vue') },
      { path: 'admin/student', component: () => import('src/pages/admin/Admin_Student.vue') },
      { path: 'admin/sc', component: () => import('src/pages/admin/Admin_Sc.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
