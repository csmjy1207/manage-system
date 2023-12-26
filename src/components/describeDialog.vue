<template>
    <el-dialog
        class="describe_dialog"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <!-- 显示内容区域 -->
        <slot name="message"></slot>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">Close</el-button>
        </span>
    </el-dialog>
</template>


<script>
export default {
    props: {
        dialogTitle: {
            type: String,
            default: '查看'
        },
        dialogVisible: {
            type: Boolean,
            default: false
        },

    },
    methods: {
        handleClose() {
            this.$emit('handleClose')
      }
    }
}
    
</script>

<style lang="scss">
.describe_dialog {
    .el-dialog__header {
        background: #6e56cb;
        // border-radius: 20px 20px 0 0;
        .el-dialog__title {
            color: #fff;
        }
    }
    .el-dialog__body {
        line-height: 26px;
    }
    .dialog-footer {
        .el-button {
            background: #26273b;
            color: #fff;
        }
    }
}

</style>