<template>
    <div class="table">
        <!-- 公共表格 -->
        <el-table
        border
        row-class-name="tableRowClassName"
        header-cell-class-name="tableRowClassName"
        :data="tableData"
        :height="tableHeight"
        style="width: 100%;">
        <el-table-column align='center' type="selection" width="55" v-if="config.isSelection" />
        <el-table-column align='center' type="index" label="序号" width="55" v-if="config.isIndex"/>
        <el-table-column
            v-for="(item,index) in tableHeader"
            :key="index"
            :align="item.align ? item.align : 'center'"
            :prop="item.prop"
            :label="item.title"
            :width="item.colWidth">
            <template v-slot="scope">
                <template v-if="item.type==='link'">
                    <el-link type="primary">
                        {{ scope.row[item.prop] }}
                    </el-link>
                </template> 
                <template v-else-if="item.type==='islink'">
                    <el-link type="primary">
                        <slot :scope="scope.row" name="islink"></slot> 
                    </el-link>
                </template>
                <!-- 插槽 -->
                <slot v-else-if="item.type==='slot'" :name="item.prop" :row="scope.row" :index="scope.$index"></slot> 
                <template v-else-if="item.type==='button'">
                    <slot :scope="scope.row" name="button"></slot>
                </template>
                <template v-else-if="item.type==='tag'">
                    <el-tag :disable-transitions="true" type="warning">{{ scope.row[item.prop] }}</el-tag>
                </template>
                <template v-else>{{ scope.row[item.prop] }}</template>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default{
        name: 'tableCommon',
        props:['config', 'tableData', 'tableHeader'],
        data() {
            return {
                tableHeight: '400'
            }
        },
        mounted() {
            // 窗口改变重新设置表格高度
            window.onresize = ()=> {
                this.tableHeight = (window.innerHeight - 175)+'px';
            } 
        },
        created() {
            // 头部标题占高50 分页占高度 45  
            this.tableHeight = (window.innerHeight - 175)+'px';
        },
        //注销window.onresize事件
        destroyed(){
            window.onresize = null;
        }
    }
</script>

<style lang="scss">
 .table {
    margin: 12px;
    .el-table {
        .tableRowClassName,.el-table__body-wrapper {
            background: #26273b;
            &:hover {
                background: #26273b;
            }
        }
    }   
  }
  
</style>

<style>
    .table .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
        background: #26273b;
    }
</style>