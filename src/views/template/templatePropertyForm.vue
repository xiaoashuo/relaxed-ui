<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirm-loading="submitLoading"
    :ok-text="isCreateForm?'新建':'更新'"
    @ok="handleSubmit"
    @cancel="handleClose"
  >
    <a-spin :spinning="submitLoading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="isUpdateForm" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="组id">
          <a-input v-decorator="['groupId'  ]" disabled />
        </a-form-item>
        <a-form-item label="标题">
          <a-input v-decorator="['title', {rules: [{required: true, message: '请输入标题！'}]}]" />
        </a-form-item>
        <a-form-item label="属性键">
          <a-input v-decorator="['propKey', {rules: [{required: true,  message: '请输入属性键'}]}]" />
        </a-form-item>
        <a-form-item label="默认值">
          <a-input v-decorator="['defaultValue', {rules: [{required: true, message: '请输入默认值！'}]}]" />
        </a-form-item>
        <a-form-item label="是否必填">
          <a-input v-decorator="['required', {rules: [{required: true,  message: '必填项不能为空 1 必填 0 不必填！'}]}]" />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-decorator="['remarks', {rules: [{required: true, message: '描述信息不能为空！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import PopUpFormMixin from '@/mixins/PopUpFormMixin'
  import { addTemplateProperty,editTemplateProperty } from '@/api/template'


  export default {
    name: "templatePropertyForm",
    mixins:[PopUpFormMixin],
    data () {

      return {
        formLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 7 }
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 13 }
          }
        },
        reqFunctions: {
          create: addTemplateProperty,
          update: editTemplateProperty
        },
      }
    },
    methods:{
      createdFormCallback(attribute) {
        if (this.isCreateForm) {
          this.fillFormData({ groupId: attribute.groupId })
        }
      }
    },
    created () {


    }
  }
</script>
