<template>
    <div class="bg slot_wrap">
        <div class="header">
            <h1 class="warp_title"> slotPage 页面</h1>
        </div>
        <!-- 顶部搜索操作区域 -->
        <topSearch>
            <template v-slot:search>
                <el-input
                    placeholder="请输入..."
                    style="width: 240px; padding-right: 12px;"
                    v-model="inputSearch">
                    </el-input>
                <el-button type="warning" @click="handleSearch">查询</el-button>
            </template>
            <template v-slot:btns>
            <el-button type="info" @click="handleDetail('查看')">查看</el-button>
            </template>
        </topSearch>
        <!-- 列表区域 -->
        <tableCommon :config="configData" :tableData="tableData" :tableHeader="tableHeader">
            <template v-slot:islink="{scope}">
                <span @click="handleDetail(scope.name)">{{ scope.name }}</span>
            </template>
            <template v-slot:age>
                <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A aliquid blanditiis ut asperiores facilis inventore, temporibus doloribus distinctio ratione quaerat amet eum perferendis ullam nulla placeat labore nobis maiores eligendi?</span>
            </template>
            <template v-slot:button="{scope}">
                <el-button type="primary" @click="handleDetail(scope.name)" size="mini">查看</el-button>
            </template>
        </tableCommon>
        <!-- 分页 -->
        <paginationCommon
            :pageSizes="[10, 5]" 
            :total="total"
            @handleSizeChange="handleSizeChange" 
            @handleCurrentChange="handleCurrentChange"
        ></paginationCommon>
         <!-- 查看内容弹框 -->
         <describeDialog dialogTitle="slot" :dialogVisible="dialogVisible" @handleClose="handleClose">
            <template v-slot:message>
                <span class="title">{{detailName}}</span>
                <p>
                    <span style="font-weight: bold">v-slot</span><br/>
                    用于声明具名插槽或是期望接收 props 的作用域插槽<br/>
                    Used to declare a named slot or a scoped slot<br/>
                    that is expected to receive props.<br/>
                    要继续加油呀💪

                </p>
            </template>
        </describeDialog>
    </div>
</template>
<script>
    import topSearch from '@/components/topSearch.vue';
    import tableCommon from '@/components/tableCommon.vue';
    import paginationCommon from '@/components/paginationCommon.vue';
    import describeDialog from '@/components/describeDialog.vue';
    import {testTable} from '@/api';
    export default {
        name: 'slotPage',
        components: {
            topSearch,
            tableCommon,
            paginationCommon,
            describeDialog
        },
        data() {
            return {
                inputSearch: "",
                //列表配置
                configData: {
                    isSelection: false,
                    isIndex: true,
                },
                 //列表数据
                tableData: [],
                //列表头部信息
                tableHeader: [
                {
                    prop: 'name',       //字段
                    colWidth: '140',    //宽度
                    title: '名称',       //表头
                    isSort:false,       //是否排序
                    type: 'islink',       //islink:跳转,
                },						
                {
                    prop: 'date',
                    colWidth: '160',
                    title: '日期',
                    isSort:false,
                    type: 'date', 
                },
                {
                    prop: 'age',
                    title: 'declaration插槽',
                    type: 'slot',  
                    isSort:false
                },
                {
                    prop: 'details',
                    title: '描述',
                    // type: 'tag',
                    isSort:false
                },
                {
                    prop: '',
                    colWidth: '120',
                    title: '详情',
                    type: 'button',
                    btnText: '查看',
                    isSort:false
                }
                ],
                pageSize: '10', // 每页条数
                currentPage: '1',//当前页
                total: 0, //总数
                detailName: '查看',
                dialogVisible: false
            }
        },
        created() {
            // 获取表格数据
            this.getTableData();
        },
        methods: {
            getTableData() {
                let obj = {
                    pageSize: this.pageSize.toString(),  // 每页条数
                    currentPage: this.currentPage.toString()  //当前页
                }
                testTable(obj).then(res=>{
                    if(res.data.code === 200) {
                        this.tableData = res.data.data.list;
                        this.total = res.data.data.total;
                    }
                })
            },
            // 查询
            handleSearch() {
                if(this.inputSearch) {
                    this.$message.success(`查询的内容为：${this.inputSearch}`);
                }else {
                    this.$message.error('请输入查询内容！');
                }
            },
            // 点击查看打开弹框
            handleDetail(detail) {
                this.detailName = detail;
                this.dialogVisible=true;
            },
            handleClose() {
                this.dialogVisible=false;
            },
            // 分页操作
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = '1';
                this.getTableData();
            },
            // 当前页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getTableData();
            }
        }
    }

</script>

<style lang="scss" scoped>
    .slot_wrap {
        height: 100vh;
    }
</style>