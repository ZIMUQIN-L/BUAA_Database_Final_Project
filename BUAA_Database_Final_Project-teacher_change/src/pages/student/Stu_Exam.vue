<template>
  <q-page class="">
    <div class="q-pa-sm bg-grey-3">
      <h5 align = "center"><b>学生考试列表</b></h5> 
    </div>
    <div>
      <q-table
        class="my-sticky-header-table q-pa-sm"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        :loading="loading"
      >
      <template v-slot:top-left>
        <q-input bg-color="white" filled borderless dense debounce="300" v-model="filter" placeholder="查询考试">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'name',
    required: true,
    label: '考试名称',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'id', align: 'center', label: '课程号', field: 'id', sortable: true },
  { name: 'capacity', label: '考试人数', field: 'capacity', sortable: true },
  { name: 'teacher', label: '授课教师', field: 'teacher', sortable: true}
]

var rows = [
  {
    name: '离散数学',
    capacity: 57,
    id: 1,
    teacher: '马殿富'
  },
  {
    name: '基物实验',
    capacity: 1000,
    id: 4,
    teacher: '王文玲'
  },
  {
    name: '操作系统',
    capacity: 75,
    id: 2,
    teacher: '王雷'
  },
  {
    name: '形式语言与自动机',
    capacity: 50,
    id: 6,
    teacher: '胡春明'
  },
  {
    name: '高等代数',
    capacity: 85,
    id: 7,
    teacher: '孙晓伟'
  }
]

export default({
  data () {
    const loading = ref(false)
    const filter = ref('')

    return {
      filter,
      loading,
      columns,
      rows,
      tab: ref('selected_course'),
    }
  },
})
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  max-height: 700px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #D6EAF8

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>