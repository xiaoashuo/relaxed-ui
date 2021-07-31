<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirm-loading="submitLoading"
    :ok-text="isCreateForm?'保存':'更新'"
    @ok="handleSubmit"
    @cancel="handleClose"
  >
    <a-spin :spinning="submitLoading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="isUpdateForm" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-decorator="['remarks', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import PopUpFormMixin from '@/mixins/PopUpFormMixin'
  import { addObj,putObj } from '@/api/templategroup'


  export default {
    name: "templateForm",
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
          create: addObj,
          update: putObj
        },
      }
    },
    methods:{

    },
    created () {


    }
  }
</script>
