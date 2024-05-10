<!-- This is the login page -->
<script setup>
import { reactive, ref } from 'vue'
//import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
import { store } from '../store/store'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'

/* interface RuleForm {
    username: string
    password: string
}
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: '',
    password: '',
}) */

const formSize = ref('default')
const ruleFormRef = ref(null)
const ruleForm = reactive({
    username: '',
    password: '',
})

/* const rules = reactive<FormRules<RuleForm>>({ */
const rules = reactive({
    username: [
        { required: true, message: 'Please input username', trigger: 'blur' },
        { min: 1, max: 5, message: 'Length should be 1 to 5', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 1, max: 5, message: 'Length should be 1 to 5', trigger: 'blur' },
    ],
})

// Get pinia store
const userStore = store()

// Get router
const router = useRouter()


/* const submitForm = async (formEl: FormInstance | undefined) => { */
// formEl is a reference to the form instance
const submitForm = async (formEl) => {
    // User object to send to server
    const user = {
        username: ruleForm.username,
        password: ruleForm.password
    }
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            // Check user in console
            console.log('@@@User in form:', user)

            // Show loading
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            
            // Send user to server
            //axios.post('http://localhost:3000/user/login', user)
            axios.post('https://larry-version-info310-backend.onrender.com/user/login', user)
                .then((response) => {
                    console.log('@@@response:', response)
                    // Set token and user info in store - outdated method
                    /* userStore.setUserInfo(response.data.user) */

                    // Set user info in pinia store (userAndBuilding is an object that contains user and building arrays)
                    userStore.setToken(response.data.token)
                    userStore.setUserInfoWithBuilding(response.data.user)
                    userStore.setOriginalAndFavourite()

                    router.push('/home')

                    // Close loading
                    loading.close()

                    // Send email to user after login
                    /* axios.post('http://localhost:3000/send-email', { email: '2501990530@qq.com' })
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        }); */

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

/* const resetForm = (formEl: FormInstance | undefined) => { */
const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

/* const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
})) */

// A method pushes to route /signup
const pushToSignup = () => {
    router.push('/signup')
}

</script>

<template>
    <div class="form-container">
        <h3>This is the login page</h3>
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

            <!-- Submit buttons -->
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    Login
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                <el-button type="info" @click="pushToSignup">Signup</el-button>
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