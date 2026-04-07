<script setup>
import { fa } from 'element-plus/es/locale/index.mjs';
import { getPhones } from '../api/phone';

import { onMounted, ref } from 'vue';

const phones = ref([])

const phoneName = ref("")

// 分页
const page = ref(0)
const size = 2
const totalPage = ref(0)
const loading = ref(false)

const loadData = async () => {
  // 防止重复请求
  // if(loading) return
  try{
    loading.value = true
    const res = await getPhones({
        model: phoneName.value,
        page: page.value,
        size: size
    })
    console.log(res)
    if (res.status === 200){
      // await sleep(1000)
      phones.value = res.data.content
      totalPage.value = res.data.totalPages
      console.log(phones.value)
    }
  }catch(e){
    alert("search error: " + e)
    console.error(e)
  }finally{
    loading.value = false
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

onMounted(() => {
  // loadData()
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

const gotoNextPage = () =>{
  // alert("goto next page")
  location.href = "/src/views/oldSearch.html"
}

</script>

<template>
  <h2>手机查询</h2>
  <el-button type="primary" @click="gotoNextPage" style="width: 100%; margin-bottom: 10px;">OLD</el-button>
  <br>
  <el-input v-model="phoneName" placeholder="输入手机品牌名称" style="width: 200px; margin-right: 10px;"/>
  <!-- <button @click="handleSearch">搜索</button> -->
  <el-button type="primary" @click="handleSearch">
    検索
  </el-button>
  <hr>
  <div v-if="loading"> loading...</div>
  <div v-else-if="phones.length === 0">暂无数据</div>
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