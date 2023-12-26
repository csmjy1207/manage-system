<template>
    <div class="NavMenu">
        <el-row>
            <el-col class="menu" :span="4">
                <el-menu
                    :default-active="toIndex"
                    background-color="#24283b"
                    text-color="#c0c3ce"
                    active-text-color="#fff"
                    class="el-menu-vertical-demo"
                    @select="handleSelect"
                >
                    <el-menu-item v-for="(item, index) in itemList" :index="item.path" :key="index">
                    <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
  </template>
  
  <script>
  export default {
    name: "NavMenu",
    data() {
      return {
        itemList: [    // 水平一级菜单栏的菜单
          { path: '/home', title: '首页' },
          { path: '/watchTest', title: '计算属性和侦听器Watch' },
          { path: '/template', title: '模板语法Template' },
          { path: '/declaration', title: '生命周期Declaration' },
          { path: '/instruct', title: '指令instruct' },
          { path: '/slot', title: '插槽Slot' },
          { path: '/largeScreen', title: '大屏large screen' },
        ],
      };
    },
    computed: {
      toIndex(){  // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
        return '/' + this.$route.path.split('/')[1];
      },
    },
    methods: {
      handleSelect(path){  // 切换菜单栏
        console.log(path);
        this.$router.push({
          path: path
        });
      },
    },
  
  };
  </script>

  <style lang="scss" scoped>
    .NavMenu {
        height: 100vh;
        overflow: hidden;
        .menu {
            background: #24283b;
            height: 100%;
            height: 100vh;
            color: #fff;
            .el-menu-vertical-demo {
                height: 100%;
                border: none;
                .el-menu-item {
                    &.is-active {
                        background-image: linear-gradient(135deg, #c850c0, #4158d0);
                    }
                }
            }
        }
    }
  </style>