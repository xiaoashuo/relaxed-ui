<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="submitLoading"
    @ok="handleSubmit"
    @cancel="handleClose"
  >
    <a-spin :spinning="submitLoading">
      <a-form :form="form" v-bind="this.formLayout" >
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="isUpdateForm" label="主键ID">
          <a-input v-decorator="['id']" disabled />
        </a-form-item>
        <a-form-item label="名称">
          <a-input v-decorator="['name', validateRules.name]" />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-decorator="['username',validateRules.username ]" />
        </a-form-item>
        <a-form-item label="url">
          <a-input v-decorator="['url',validateRules.url ]" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-decorator="['password',validatePassword ]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import PopUpFormMixin from '@/mixins/PopUpFormMixin'
  import {saveDataSource,putDataSource} from '@/api/datasource'


  export default {
    name: "dataSourceForm",
    mixins:[PopUpFormMixin],
    data () {
      return {
        //验证规则
        validateRules:{
          name: {rules: [{required: true, min: 2, message: '数据源名称必须大于两位！'}]},
          username: {rules: [{required: true, min: 3, message: '用户名最少需要3位！'}]},
          url: {rules: [{required: true, min: 5, message: 'url必须大于5位！'}]},
        },
        reqFunctions: {
          create: saveDataSource,
          update: putDataSource
        },

      }
    },
    computed:{
      validatePassword(){
        return this.action=="create"?{rules: [{required: true, min: 5, message: '密码必须大于5位！'}]}: {}
      }
    },
    created () {

    },


  }
</script>
