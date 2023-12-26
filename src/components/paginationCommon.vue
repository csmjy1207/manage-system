<template>
    <!-- 公共分页 -->
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        :page-sizes="pageSizes" 
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'paginationCommon',
        props: {
            pageSize: {
                type: String,
                defalut: '100'
            },
            pageSizes: {
                type: Array,
                defalut: [10, 20, 50, 100]
            },
            total: {
                type: Number,
                defalut: 0
            }
        },
        methods: {
            // 每页条数
            handleSizeChange(val) {
                console.log(val)
                this.$emit('handleSizeChange', val);
            },
            // 当前页
            handleCurrentChange(val) {
                this.$emit('handleCurrentChange', val);
            }
        }
    }
</script>

<style>
.pagination {
    height: 30px;
    position: fixed;
    bottom: 15px;
    right: 20px;
  }
</style>
