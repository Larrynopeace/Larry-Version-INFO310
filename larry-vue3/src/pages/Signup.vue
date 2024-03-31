<!-- This is the Signup page (converted from ts to js) -->
<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { ElNotification } from 'element-plus'
import { store } from '@/store/store'
import { useRouter } from 'vue-router'

const formSize = ref('default')
const ruleFormRef = ref(null)
const ruleForm = reactive({
    username: '',
    password: '',
    email: '',
})

const rules = reactive({
    username: [
        { required: true, message: 'Please input username', trigger: 'blur' },
        { min: 1, max: 5, message: 'Length should be 1 to 5', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 1, max: 5, message: 'Length should be 1 to 5', trigger: 'blur' },
    ],
    email: [
        { required: true, message: 'Please input email', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email', trigger: ['blur', 'change'] },
    ],
})

// Get router
const router = useRouter()

const submitForm = async (formEl) => {
    // User object to send to server
    const user = {
        username: ruleForm.username,
        password: ruleForm.password,
        email: ruleForm.email
    }
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            // Check user in console
            console.log('@@@User in form:', user)
            // Send user to server
            axios.post('http://localhost:3000/user/create', user)
                .then((response) => {
                    console.log('@@@response:', response)

                    // Show success message
                    ElNotification({
                        title: 'Success',
                        message: 'This is a success message',
                        type: 'success',
                    })
                })
                .catch((error) => {
                    // Show error message
                    ElNotification({
                        title: 'Error',
                        message: 'This is an error message',
                        type: 'error',
                    })
                    console.log('@@@error:', error)
                })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

// A method pushes to route /login
const pushToSignup = () => {
    router.push('/login')
}


</script>

<template>
    <div class="form-container">
        <h3>This is the signup page</h3>
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <!-- username -->
            <el-form-item label="Username" prop="username">
                <el-input v-model="ruleForm.username" />
            </el-form-item>

            <!-- password -->
            <el-form-item label="Password" prop="password">
                <el-input v-model="ruleForm.password" />
            </el-form-item>

            <!-- email -->
            <el-form-item label="Email" prop="email">
                <el-input v-model="ruleForm.email" />
            </el-form-item>

            <!-- Submit buttons -->
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    Submit
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                <el-button type="info" @click="pushToSignup">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
