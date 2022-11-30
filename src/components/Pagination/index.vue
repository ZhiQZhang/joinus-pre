<template>
  <div class="pagination">
    <button @click="$emit('currentPage', pageNo - 1)" :disabled="pageNo === 1">上一页</button>
    <button @click="$emit('currentPage', 1)" v-if="startNumAndendNum.start > 1">1</button>
    <button v-if="startNumAndendNum.start > 2">...</button>

    <button @click="$emit('currentPage', page)" v-for="page in startNumAndendNum.end" :key="page" v-show="page >= startNumAndendNum.start" :class="{active:pageNo==page}">{{page}}</button>

    <button v-if="startNumAndendNum.end <= totalPages - 1">···</button>
    <button @click="$emit('currentPage', totalPages)" v-if="startNumAndendNum.end < totalPages">{{totalPages}}</button>
    <button :disabled="pageNo === totalPages" @click="$emit('currentPage', pageNo + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
    <button>/每页{{pageSize}}条</button>
  </div>
</template>

<script>
export default {
  name: 'PaginationCom',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  data () {
    return {}
  },
  methods: {},
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumAndendNum () {
      let start = 1
      let end = 1
      if (this.totalPages <= this.continues) {
        start = 1
        end = this.totalPages
      } else {
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        if (start < 1) {
          start = 1
          end = this.continues
        }
        if (end > this.totalPages) {
          end = this.totalPages
          start = this.totalPages - this.continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
