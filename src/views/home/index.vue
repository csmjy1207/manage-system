<template>
    <div class="home_wrap">
        <div class="header">
            <h1 class="warp_title">Welcome To</h1>
            <div class="right">
                <el-input prefix-icon="el-icon-search" class="header_search" v-model="searchContent" placeholder="search for"></el-input>
                <i class="el-icon-user-solid user"></i><span @click="handleDetail" class="user_name">{{ userName }}</span>
            </div>
        </div>

        <div class="box">
            <div class="box_left">
                <div class="personal_top">
                    <div class="personal_data" v-for="item in personalData" :key="item.id">
                        <div class="title">{{ item.dateTime }}</div>    
                        <el-progress class="bfb_progress" :width="80" type="circle" :color="colors" :stroke-width="3" :percentage="item.percentage"></el-progress>
                        <p class="personal_name">{{ item.name }}</p>
                    </div>
                </div>
                <div class="personal_middle">
                    <div class="title">This Week</div>
                    <div class="echart-box" ref="box"></div>
                </div>
                <div class="personal_bottom">
                    <div class="title">Personal Ranking</div>
                    <div class="echart-box" ref="boxpie"></div>
                </div>
            </div>

            <div class="box_right">
                <div class="charts">
                    <div class="title">Personal Ranking</div>
                    <div class="introduction">
                        <p class="introduction_score">5.0</p>⭐⭐⭐
                        <div>Keep trying!</div>
                    </div>
                    <div class="detail" v-for="item in percentageSort" :key="item">
                        <el-progress :show-text="false" :stroke-width="12" :color="colors" :percentage="item"></el-progress>
                    </div>
                </div>
                <div class="comment">
                    <div class="title">Related comments</div>
                    <div class="comment_detail" v-for="item in personalData" :key="item.id">
                        <span class="comment_user">{{ item.name }}</span>
                        <p>Make a little progress every day!!!</p>
                    </div>
                </div>
            </div>
        </div>
         <!-- 查看内容弹框 -->
         <describeDialog dialogTitle="个人简介" :dialogVisible="dialogVisible" @handleClose="handleClose">
            <template v-slot:message>
                <span class="title">introduction</span>
                <p>
                    姓名：楚xx --- 职业：前端开发(待业) --- 爱好：画画和敲代码<br />
                    喜欢胡思乱想，一名菜鸟程序员想努力向上~~~<br />
                    一句话总结：
                    一名想尽心学好开发的程序媛!不思进取 只求上进~~~<br /><br />
                    <!-- <hr /> -->
                    余生可贵，不可浪费<br />
                    Strive for progress and only strive for progress!<br/>
                    Either choose to do well or not choose. 
                </p>
            </template>
        </describeDialog>
    </div>
</template>

<script>
    import {getList} from '@/api';
    import describeDialog from '@/components/describeDialog.vue';
    export default {
        name: 'Home',
        components: {
            describeDialog
        },
        data() {
            return {
                // 用户名称
                userName: sessionStorage.getItem('username') || 'unknown',
                // 头部搜索内容
                searchContent: '',
                personalData: [],
                // 定义完成不同进度的进度条颜色
                colors: [
                    {color: '#f48357', percentage: 40},
                    {color: '#c850c0', percentage: 60},
                    {color: '#4158d0', percentage: 80},
                    {color: '#d86066', percentage: 100},
                ],
                percentageSort: [],
                dialogVisible: false,
            }
        },
        computed: {
            
        },
        watch: {
            
        },
        mounted() {
            // 挂在完成dom后进行初始化
            this.showEcarts();
        },
        created() {
            console.log(this.userName);
            this.initData();
        },
        methods: {
            // 获取相关数据并存放到personalData
            initData() {
                getList().then(res=>
                {
                    if(res.data.code === 200) {
                        let { list,  percentageSort } = res.data.data;
                        this.personalData = list;
                        this.percentageSort = this.handleSort(percentageSort);
                    }else {
                        this.$message.error("获取数据失败！")
                    }
                }).catch(err=>
                    console.log(err)
                )

            },
            // 点击查看打开弹框
            handleDetail() {
                this.dialogVisible=true;
            },
            handleClose() {
                this.dialogVisible=false;
            },
            // 排序，从小到大
            handleSort(data){
                return data.sort((a,b)=>a-b);
            },
            // echarts图标实现
            showEcarts() {
                // 基于准备好的dom，初始化echarts实例
                const userdom = this.$refs.box;
                const mycart = this.$echarts.init(userdom,'vintage')
                 //绘制图表
                const option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar',
                            showBackground: true,
                            backgroundStyle: {
                                color: 'rgba(180, 180, 180, 0.2)'
                            }
                        }
                    ]
                };

                // 渲染图表
                mycart.setOption(option)

                //饼图 
                const mypie = this.$echarts.init(this.$refs.boxpie,'vintage')
                mypie.setOption({
                    title: {
                        text: 'Study Vue',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                { value: 1048, name: 'try Vue' },
                                { value: 735, name: 'Direct' },
                                { value: 580, name: 'Email' },
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                })

                window.onresize=function(){
                    // 随窗口变动自适应
                    mycart.resize();
                    mypie.resize();
                }
            }
        },
        beforeDestroy() {
            window.onresize= null;
        }
    }
</script>

<style lang="scss" scoped>
    .home_wrap {
        height: 100vh;
        background: #1b1c30;
        .header {
            color: #fff;
            line-height: 50px;
            // background: #ac9ce7;
            padding: 0 12px;
            display: flex;
            justify-content: space-between;

            .right {
                .header_search {
                width: 180px;
                padding-right: 8px;
                .el-input__inner {
                    background: transparent !important;
                    }
                }   

                .user {
                    color: #e0daf6;
                }
                .user_name {
                    color: #eedaf6;
                    cursor: pointer;
                }
            }
        }

        .box {
            height: calc(100% - 60px);
            display: flex;
            color: #fff;
            padding: 10px 30px;
            .title {
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 16px;
            }
            .box_left {
                // width: 70%;
                flex: 1;
                padding-right: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                .personal_top {
                    // flex: 1;
                    height: 180px;
                    display: flex;
                    justify-content: space-between;
                    .personal_data {
                        flex: 1;
                        margin-right: 8px;
                        padding: 4px 8px;
                        background: #26273b;
                        border-radius: 6px;
                        &:last-child {
                            margin-right: 0;
                        }
    
                        // .personal_name {
                        //     text-align: center;
                        // }
                    }
                    
                }
                .personal_middle {
                    flex: 1;
                    // height: calc(100% - 200px)/2;
                    background: #26273b;
                    margin: 20px 0;
                    padding: 4px 8px;
                    border-radius: 6px;
                    overflow: auto;
                }
                .personal_bottom {
                    flex: 1;
                    // height: calc(100% - 200px)/2;
                    background: #26273b;
                    border-radius: 6px;
                    padding: 4px 8px;
                    overflow: auto;
                    margin-bottom: 15px;
                }
                
                .echart-box {
                    width: 80%;
                    // height: 200px;
                    height: calc(100% - 65px);
                    // border: 3px solid pink;
                    margin: 0 auto;
                    // margin: 20px ;
                }
            }
            .box_right { 
                // width: 30%;
                flex: .5;
                padding: 4px 8px;
                border-radius: 6px;
                .charts,.comment {
                    background: #26273b;
                    padding: 12px;
                }
                .charts {
                    height: 320px;
                    margin-bottom: 12px;
                    .introduction {
                    width: 80%;
                    height: 160px;
                    margin: 0 auto;
                    background-image: linear-gradient(#4d45bc, #5551b2);
                    border-radius: 6px;
                    text-align: center;
                    .introduction_score {
                        padding-top: 32px;
                        margin-bottom: 2px;
                        font-size: 30px;
                        font-weight: bold;
                        }
                    }
                    .detail {
                        margin: 12px 26px;
                        }
                    }
                }
                .comment {
                    height: calc(100% - 390px);
                    overflow-y: auto;
                    .comment_detail{
                        margin-bottom: 12px;
                        .comment_user {
                            font-weight: 600;
                            &::before{
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                content: '';
                                background: #92836d;
                                border-radius: 50%;
                                vertical-align: middle;
                                margin-right: 8px;
                            }
                        }
                    }
                }
                
        }
    }
</style>

<style>
    .header_search .el-input__inner {
        background: #26273b;
        height: 26px;
        color: #fff;
        border: none;
    }
</style>