<template>
  <div class="app">
    <div class="container">
      <h1>📧 Vue3 邮件发送系统</h1>
      
      <div class="card">
        <form @submit.prevent="sendEmail" class="email-form">
          <div class="form-group">
            <label for="to">收件人邮箱 *</label>
            <input 
              id="to"
              v-model="emailData.to" 
              type="email" 
              placeholder="example@email.com" 
              required
              :disabled="isLoading"
            />
          </div>

          <div class="form-group">
            <label for="subject">邮件主题 *</label>
            <input 
              id="subject"
              v-model="emailData.subject" 
              type="text" 
              placeholder="邮件主题" 
              required
              :disabled="isLoading"
            />
          </div>

          <div class="form-group">
            <label for="text">纯文本内容</label>
            <textarea 
              id="text"
              v-model="emailData.text" 
              placeholder="纯文本内容..." 
              rows="4"
              :disabled="isLoading"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="html">HTML 内容（可选）</label>
            <textarea 
              id="html"
              v-model="emailData.html" 
              placeholder="<h1>HTML 内容...</h1>" 
              rows="6"
              :disabled="isLoading"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="submit-btn"
            :disabled="isLoading"
          >
            {{ isLoading ? '发送中...' : '发送邮件' }}
          </button>
        </form>

        <div v-if="message" :class="['message', message.type]">
          {{ message.text }}
        </div>
      </div>

      <div class="info-card">
        <h3>📌 使用说明</h3>
        <ol>
          <li>复制 <code>.env.example</code> 为 <code>.env</code></li>
          <li>在 <code>.env</code> 中配置你的 SMTP 邮箱信息</li>
          <li>对于 Gmail，需要使用应用专用密码</li>
          <li>运行 <code>npm install</code> 安装依赖</li>
          <li>运行 <code>npm run dev</code> 启动项目</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emailData = reactive({
  to: '',
  subject: '',
  text: '',
  html: ''
})

const isLoading = ref(false)
const message = ref(null)

const showMessage = (text, type) => {
  message.value = { text, type }
  setTimeout(() => {
    message.value = null
  }, 5000)
}

const sendEmail = async () => {
  isLoading.value = true
  message.value = null

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    const data = await response.json()

    if (data.success) {
      showMessage('✓ 邮件发送成功！', 'success')
      // 重置表单
      emailData.to = ''
      emailData.subject = ''
      emailData.text = ''
      emailData.html = ''
    } else {
      showMessage(`✗ 发送失败: ${data.error}`, 'error')
    }
  } catch (error) {
    showMessage(`✗ 网络错误: ${error.message}`, 'error')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 700px;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.email-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: #333;
  font-size: 0.95em;
}

input[type="email"],
input[type="text"],
textarea {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1em;
  transition: all 0.3s ease;
  font-family: inherit;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

textarea {
  resize: vertical;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 1.1em;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
  font-weight: 500;
  text-align: center;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.info-card h3 {
  color: #333;
  margin-bottom: 15px;
}

.info-card ol {
  padding-left: 20px;
}

.info-card li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #555;
}

code {
  background: #f4f4f4;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #d63384;
}
</style>
