<template>
    <div class="search">
      <div class="search_main">
        <!-- 搜索区域 -->
        <slot name="search"></slot>
      </div>
      <div class="oprea">
        <!-- 操作按钮 -->
        <slot name="btns"></slot>
      </div>
    </div>
</template>

<script>
export default {
    name: "topSearch"
}
</script>

<style lang="scss">
    .search {
        padding: 10px 20px;
        // border-bottom: 1px solid #ececec;
        display: flex;
        justify-content: space-between;
        .search_main {
          .el-input__inner {
            background: #26273b;
            color: #fff;
            border: none;
          }
          .el-button {
            background: #26273b;
            // border: none;
          }
        }
    }
</style>