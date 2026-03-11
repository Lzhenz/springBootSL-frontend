<script setup>
import request from './api/request';

import { onMounted, ref } from 'vue';

const phones = ref([])

const phoneName = ref("")

// 分页
const page = ref(0)
const size = 2
const totalPage = ref(0)

const loadData = async () => {
  const res = await request.get(
    '/phoneData/getPageSearch',
    {
      params: {
        model: phoneName.value,
        page: page.value,
        size: size
      }
    }
  )
  if (res.status === 200){
      phones.value = res.data
      totalPage.value = res.data.totalPages
      console.log(phones.value)
  }

}

onMounted(() => {
  loadData()
})
</script>

<template>
  <h2>手机查询</h2>
  <input v-model="phoneName" placeholder="输入手机品牌名称"/>
  <button @click="loadData">
    搜索
  </button>
  <hr>
  
  <ul>
    <li v-for="p in phones.content" :key = "p.model">
      {{ p.model }} - {{ p.price }}
    </li>
  </ul>

  <div style="margin-top: 20px;">
    <button @click="page-- ;loadData()":disabled="page===0">
      上一页
    </button>
    
    <span>第{{ page + 1 }}页</span>

    <button @click="page++ ;loadData()":disabled="(page + 1) >= totalPage">
      下一页
    </button>
  </div>
</template>

<style scoped>

</style>
