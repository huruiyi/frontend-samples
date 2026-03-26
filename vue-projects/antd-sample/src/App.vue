<template>
  <div id="app">
    <div class="page-shell">
      <header class="page-header">
        <img class="brand-logo" src="./assets/logo.png" alt="Vue logo">
        <HelloWorld msg="Ant Design Vue Form Demo" />
        <p class="page-desc">A cleaner form layout demo with better spacing and visual hierarchy.</p>
      </header>

      <section class="form-card">
        <h2 class="card-title">Basic Information</h2>
        <p v-if="isMobile" class="mobile-tip">Mobile mode enabled: form layout is forced to vertical for readability.</p>

        <a-form :layout="effectiveFormLayout" class="demo-form">
          <a-form-item v-if="!isMobile"
                       label="Form Layout"
                       :label-col="formItemLayout.labelCol"
                       :wrapper-col="formItemLayout.wrapperCol">
            <a-radio-group :value="formLayout" @change="handleFormLayoutChange">
              <a-radio-button value="horizontal">Horizontal</a-radio-button>
              <a-radio-button value="vertical">Vertical</a-radio-button>
              <a-radio-button value="inline">Inline</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item
              label="Success Action"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-radio-group :value="submitSuccessBehavior" @change="handleSubmitBehaviorChange">
              <a-radio-button value="keep">Keep Input</a-radio-button>
              <a-radio-button value="clear">Clear Input</a-radio-button>
            </a-radio-group>
            <p class="field-tip">After a successful submit, current setting is: {{ submitSuccessBehaviorText }}.</p>
          </a-form-item>

          <a-form-item
              label="Field A"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              :validate-status="errors.fieldA ? 'error' : ''"
              :help="errors.fieldA"
          >
            <a-input
                v-model="formValues.fieldA"
                placeholder="Please enter field A"
                @blur="validateField('fieldA')"
                @input="clearFieldError('fieldA')"
            />
          </a-form-item>

          <a-form-item
              label="Field B"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              :validate-status="errors.fieldB ? 'error' : ''"
              :help="errors.fieldB"
          >
            <a-input
                v-model="formValues.fieldB"
                placeholder="Please enter field B"
                @blur="validateField('fieldB')"
                @input="clearFieldError('fieldB')"
            />
          </a-form-item>

          <a-form-item :wrapper-col="buttonItemLayout.wrapperCol" class="action-row">
            <a-button type="primary" class="submit-btn" :loading="isSubmitting" @click="handleSubmit">Submit</a-button>
            <a-button class="reset-btn" :disabled="isSubmitting" @click="handleReset">Reset</a-button>
          </a-form-item>

          <a-form-item v-if="submitMessage" :wrapper-col="buttonItemLayout.wrapperCol" class="result-item">
            <p class="submit-result" :class="{ success: submitStatus === 'success', error: submitStatus === 'error' }">
              {{ submitMessage }}
            </p>
          </a-form-item>
        </a-form>
      </section>
    </div>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name : 'app',
  components : {
    HelloWorld
  },
  data() {
    return {
      formLayout : 'horizontal',
      isMobile : false,
      isSubmitting : false,
      formValues : {
        fieldA : '',
        fieldB : '',
      },
      errors : {
        fieldA : '',
        fieldB : '',
      },
      submitStatus : '',
      submitMessage : '',
      submitSuccessBehavior : 'keep',
    };
  },
  mounted() {
    this.updateViewportState();
    window.addEventListener('resize', this.updateViewportState);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateViewportState);
  },
  computed : {
    effectiveFormLayout() {
      return this.isMobile ? 'vertical' : this.formLayout;
    },
    formItemLayout() {
      const { effectiveFormLayout } = this;
      return effectiveFormLayout === 'horizontal' ? {
        labelCol : { span : 5 },
        wrapperCol : { span : 15 },
      } : {};
    },
    buttonItemLayout() {
      const { effectiveFormLayout } = this;
      return effectiveFormLayout === 'horizontal' ? {
        wrapperCol : { span : 15, offset : 5 },
      } : {};
    },
    submitSuccessBehaviorText() {
      return this.submitSuccessBehavior === 'clear' ? 'clear field values' : 'keep field values';
    },
  },
  methods : {
    updateViewportState() {
      this.isMobile = window.innerWidth < 768;
    },
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmitBehaviorChange(e) {
      this.submitSuccessBehavior = e.target.value;
    },
    clearFieldError(fieldName) {
      if (!this.errors[fieldName]) {
        return;
      }
      this.errors[fieldName] = '';
    },
    validateField(fieldName) {
      const value = (this.formValues[fieldName] || '').trim();
      this.errors[fieldName] = value ? '' : 'This field is required.';
      return !this.errors[fieldName];
    },
    validateForm() {
      const validA = this.validateField('fieldA');
      const validB = this.validateField('fieldB');
      return validA && validB;
    },
    mockSubmit(payload) {
      return new Promise((resolve, reject) => {
        window.setTimeout(() => {
          // Deterministic failure path for demo: include "fail" in any field value.
          const shouldFail = [ payload.fieldA, payload.fieldB ].some(item => item.toLowerCase().includes('fail'));
          if (shouldFail) {
            reject(new Error('Mock API rejected the payload. Remove "fail" and retry.'));
            return;
          }
          resolve();
        }, 900);
      });
    },
    async handleSubmit() {
      this.submitMessage = '';
      this.submitStatus = '';
      if (!this.validateForm()) {
        this.submitStatus = 'error';
        this.submitMessage = 'Please complete the required fields before submitting.';
        return;
      }

      this.isSubmitting = true;
      try {
        await this.mockSubmit({
          fieldA : this.formValues.fieldA.trim(),
          fieldB : this.formValues.fieldB.trim(),
        });
        if (this.submitSuccessBehavior === 'clear') {
          this.formValues.fieldA = '';
          this.formValues.fieldB = '';
        }
        this.submitStatus = 'success';
        this.submitMessage = 'Submitted successfully.';
      } catch (error) {
        this.submitStatus = 'error';
        this.submitMessage = error.message;
      } finally {
        this.isSubmitting = false;
      }
    },
    handleReset() {
      this.formValues.fieldA = '';
      this.formValues.fieldB = '';
      this.errors.fieldA = '';
      this.errors.fieldB = '';
      this.submitStatus = '';
      this.submitMessage = '';
    },
  },
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  padding: 40px 16px;
  background: linear-gradient(180deg, #f5f8ff 0%, #f0f2f5 100%);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1f2d3d;
}

.page-shell {
  max-width: 860px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 24px;
}

.brand-logo {
  width: 92px;
  height: 92px;
  margin-bottom: 6px;
}

.page-desc {
  margin: 10px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.form-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px 24px 8px;
  box-shadow: 0 8px 28px rgba(31, 45, 61, 0.08);
}

.card-title {
  margin: 0 0 20px;
  color: #1f2937;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
}

.demo-form {
  margin-top: 4px;
}

.mobile-tip {
  margin: 0 0 14px;
  padding: 8px 12px;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  border-radius: 8px;
  color: #1e40af;
  font-size: 13px;
}

.submit-btn {
  min-width: 120px;
}

.reset-btn {
  margin-left: 10px;
}

.field-tip {
  margin: 8px 0 0;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

.action-row {
  white-space: nowrap;
}

.result-item {
  margin-top: -4px;
}

.submit-result {
  margin: 0;
  font-size: 13px;
}

.submit-result.success {
  color: #15803d;
}

.submit-result.error {
  color: #dc2626;
}

@media (max-width: 768px) {
  #app {
    padding: 24px 12px;
  }

  .brand-logo {
    width: 78px;
    height: 78px;
  }

  .form-card {
    padding: 16px 16px 6px;
    border-radius: 10px;
  }

  .card-title {
    margin-bottom: 16px;
    font-size: 18px;
  }

  .action-row {
    white-space: normal;
  }

  .reset-btn {
    margin: 8px 0 0;
  }
}
</style>
