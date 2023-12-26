<template>
    <div class="bg instruct_wrap">
        <div class="header">
            <h1 class="warp_title"> instruct 页面</h1>
        </div>
        <div class="instruct_box">
            <div class="instruct_item" v-for="item in instructData" :key="item.id">
                <span class="name">{{ item.name }}  <el-tag type="warning">{{item.dateTime}}</el-tag></span> 
                <div class="details" v-html="item.details"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { instructData } from '@/api'
    export default {
        data() {
            return {
                instructData: []
            }
        },
        created() {
            instructData().then(res=>{
                let {code, data} = res.data;
                if(code=== 200) {
                    this.instructData = data.list;
                    console.log(this.instructData);
                }
                
            })
        }
    }
</script>
<style lang="scss" scoped>
    .instruct_wrap {
        height: 100vh;
    }
    .instruct_box {
        width: 100%;
        height: calc(100% - 70px);
        // background-color: #fff;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        .instruct_item {
            width: 30%;
            line-height: 50px;
            margin-bottom: 20px;
            background: #e0daf6;
            // color: #ddd;
            padding: 0 1%;
            border-radius: 16px;
            &:not(:nth-child(3n)) {
                margin-right: calc(6% / 3);
            }
        }
    }
</style>