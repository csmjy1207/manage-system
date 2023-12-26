<template>
    <div class="login">
        <div class="loginPage">
            <h3 class="loginTitle">登录页面</h3>
            <el-form ref="rulesForm" :model="rulesForm" :rules="rules"  label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input style="width: 80%" type="text" v-model="rulesForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input style="width: 80%" type="password" v-model="rulesForm.password"></el-input>
                </el-form-item>
                <el-form-item label-width="180px">
                    <el-button class="login_btn" type="primary" @click="onSubmit('rulesForm')">登录</el-button>
                    <el-button class="rest_btn" @click="resetForm('rulesForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { userLogin } from '@/api'
    export default {
        data() {
            return {
                rulesForm: {
                    username: '',
                    password: ''
                },
                rules:{
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            username: this.rulesForm.username,
                            password: this.rulesForm.password
                        }
                        userLogin(data).then((res)=>{
                            console.log(res);
                            if(res.status === 200) {
                                this.$message.success(res.data);
                                // 存储用户名和密码 用来处理判断用户是否登录
                                sessionStorage.setItem('username', data.username);
                                // 跳转首页
                                this.$router.push({
                                    path: '/home',
                                })
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scope>
.login {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(#222428,#b7c4d7,#282c31);
    // background: url('@/assets/banner_login.jpg') 100% 100% no-repeat;
    // background-attachment: fixed;
    .loginPage {
        width: 480px;
        height: 300px;
        background: #d8d8e4;
        background-image: linear-gradient(180deg,#3d4046,#ebbb8e);
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -240px;
        margin-top: -150px;
        border-radius: 20px;
        .loginTitle {
            text-align: center;
        }
        .el-form-item {
            margin-bottom: 30px;
        }
        .el-form-item__label {
            color: #fff;
        }
        .login_btn {
            background: #d29460;
            border: none;

        }
        .rest_btn {
            background: #deb087;
            color: #fff;
            border: none;
        }
    }
}
 
</style>