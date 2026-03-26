<script setup>
import { getPhones } from '../api/phone';

import { onMounted, ref } from 'vue';

const phones = ref([])

const phoneName = ref("")

// 分页
const page = ref(0)
const size = 2
const totalPage = ref(0)

const loadData = async () => {
    const res = await getPhones({
        model: phoneName.value,
        page: page.value,
        size: size
    })
    console.log(res)
    if (res.status === 200){
        phones.value = res.data.content
        totalPage.value = res.data.totalPages
        console.log(phones.value)
    }
}

onMounted(() => {
  loadData()
})

const nextPage = () => {
  if (page.value < totalPage.value - 1){
    page.value++
    loadData()
  }
}

const prevPage = () => {
  if(page.value > 0){
    page.value--
    loadData()
  }
}

const handleSearch = () => {
  page.value = 0
  loadData()
}

const handlePageChange = (val) => {
  page.value = val - 1   // ❗ 因为后端从0开始
  loadData()
}
</script>

<template>
  <h2>手机查询</h2>
  <el-input v-model="phoneName" placeholder="输入手机品牌名称" style="width: 200px; margin-right: 10px;"/>
  <!-- <button @click="handleSearch">搜索</button> -->
  <el-button type="primary" @click="handleSearch">
    検索
  </el-button>
  <hr>

  <el-table :data="phones" style="width: 100%; margin-top: 20px;">
    <el-table-column prop="model" label="型号"/>
    <el-table-column prop="price" label="价格"/>
  </el-table>

  <!-- <div style="margin-top: 20px;">
    <button @click="prevPage()":disabled="page===0">上一页</button>
    <span>第{{ page + 1 }}页</span>
    <button @click="nextPage()":disabled="page + 1 >= totalPage">下一页</button>
  </div> -->
  <el-pagination 
    size="small"
    background
    layout="prev,pager,next"
    :current-page="page + 1"
    :page-size="size"
    :total="size * totalPage"
    @current-change="handlePageChange"
  />
</template>

<style scoped>

</style>