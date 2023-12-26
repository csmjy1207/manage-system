<template>
    <div class="screen_wrap bg">
        <div class="header">
            <h1 class="warp_title"> largeScreen</h1>
            <div class="right">
                <el-input prefix-icon="el-icon-search" class="header_search" v-model="searchContent" placeholder="search for"></el-input>
                <el-button @click="handleSearch" type="info">搜索</el-button>
                <el-button @click="jumpHome" type="warning">首页</el-button>
            </div>
        </div>
        <div :style="{'height': mapheight}" class="box" ref="box"></div>
    </div>
</template>

<script>
import geoJson from '@/utils/china.json';
import * as echarts from 'echarts';
echarts.registerMap('china', geoJson)
export default {
    data() {
        return {
            searchContent: '',
            mapheight: '500px'
        }
    },
    created() {
        this.mapheight = (window.innerHeight - 100)+'px';
    },
    mounted() {
        let self = this;
        const viewElem = document.body;
        // 挂在完成dom后进行初始化
        this.showEcarts();
        // 窗口改变重新设置地图高度
        window.onresize = ()=> {
            this.mapheight = (window.innerHeight - 100)+'px';
        } 
    },
    methods: {
        // 搜索
        handleSearch() {
            if(this.searchContent) {
                this.$message.success(`查询的内容为：${this.searchContent}`);
            }else {
                this.$message.error('请输入查询内容！');
            }
        },
        // 跳转首页
        jumpHome() {
            this.$router.push({
                path: '/home'
            })
        },
        // echarts图标实现
        showEcarts() {
            // 基于准备好的dom，初始化echarts实例
            const userdom = this.$refs.box;
            const myChart = this.$echarts.init(userdom,'vintage');
            const viewElem = document.body;
            var option = {
            //设置标题
            title: {
                text: '中国地图',  // 主标题名称
                textStyle: {
                    color: '#bce2e8',
                    fontStyle: 'oblique',       //斜体
                    fontFamily: 'monospace',    //字体
                },
                top: 20,
                left: 20
            },

            // 地图配置
            geo: {
                map: "china",
                //放大地图
                zoom: 1.25,
                //开启漫游
                roam: true,
                //让其文字出现在外地图上
                label: {
                    // 通常状态下的文字样式
                    normal: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                        },
                    },
                    // 鼠标放上去的样式
                    emphasis: {
                        textStyle: {
                            color: "red",
                        },
                    },
                },
                
                // 地图区域的样式设置
                itemStyle: {
                    //配置正常状态下的样式
                    normal: {
                        borderColor: "rgba(147, 235, 248, .5)", //设置地图区域边框的颜色
                        borderWidth: 1, //设置地图区域边框的宽度
                        areaColor: {    //设置地图区域的填充色 -> 渐变色
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                                },
                            ],
                            globalCoord: false, // 缺省为 false
                        },
                    },
                    // 鼠标放上去高亮的样式（在鼠标悬停状态下）
                    emphasis: {
                        areaColor: "#389BB7",
                        borderWidth: 0,
                    },
                },
            },


            series: [
                { 
                    type: "scatter",    //设置为散点类型
                    coordinateSystem: "geo",    //表示使用地理坐标系进行展示
                    symbol: "pin",  //表示使用图钉形状的标记符号
                    symbolSize: [80, 80],   //表示标记符号的尺寸为 50x50 
                    // 这里渲染标志里的内容以及样式
                    label: {  
                        show: true,
                        formatter(value) {//让他显示[113.23, 23.16, 12656.80]这个列表中的值
                            return value.data.value[2];
                        },
                        color: "#fff",
                    },
                    // 标志的样式
                    // itemStyle: {
                    //     normal: {
                    //         color: "rgba(255,0,0,.7)",
                    //         shadowBlur: 2,  //设置图表的阴影模糊大小为 2
                    //         shadowColor: "D8BC37",  //表示设置图表的阴影颜色为深黄色
                    //     },
                    // },
                    // 数据格式，其中name,value是必要的，value的前两个值是数据点的经纬度，其他的数据格式可以自定义
                    // 至于如何展示，完全是靠上面的formatter来自己定义的
                    data: [
                        { name: "广东", value: [113.23, 23.16, 12656.80] },
                        { name: "山东", value: [117.19, 36.65, 10162.79] },
                    ],
                },
                ]
            }
            //3、把配置项给实例对象
            myChart.setOption(option)

            // 设置地图大小随着窗口的改变而改变
            const resizeObserver = new ResizeObserver(() => {
                // 加个if约束，当box存在时再执行resize()，否则图表不存在时运行到这会报错。
                if(userdom){  
                    myChart.resize();
                }
            
            });
            resizeObserver.observe(viewElem);
        }
    }
}
</script>

<style lang="scss"> 
    .screen_wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .header {
            padding: 0 12px;
            display: flex;
            justify-content: space-between;
            .header_search {
            width: 180px;
            padding-right: 8px;
            .el-input__inner {
                height: 35px;
                background: transparent !important;
                border: 1px solid;
                }
            }  
        }
        .box {
            width: 80%;
            // height: calc(100%-60px);
            border: 3px solid #26273b;
            margin: 20px auto;
        }
    }
</style>