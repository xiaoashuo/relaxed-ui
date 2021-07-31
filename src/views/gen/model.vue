<template>
  <a-modal
    :title="title"
    width="60%"
    :visible="visible"
    @cancel="handleClose"


  >

    <template slot="footer">
      <a-button @click="handleClose">
        取消
      </a-button>
      <a-button @click="previewCode" v-if="previewBtn">
        预览
      </a-button>
      <a-button type="primary" @click="generateCode">
        生成
      </a-button>
    </template>

    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="模板组">
            <a-select
              v-decorator="[
          'templateGroupId',
          {initialValue: defaultTemplateGroupId, rules: [{ required: true, message: 'Please select your template group!' }] },
        ]"
              @change="handleSelectTemplate">

              <a-select-option :value="group.value" :key="group.value" v-for="group in templateGroups">
                {{group.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="生成文件选择模板">
            <div :style="{ borderBottom: '1px solid #E9E9E9' }">
              <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                Check All
              </a-checkbox>
            </div>
            <br/>

            <a-checkbox-group v-decorator="['templateFileIds',{initialValue: checkedList}]"
                              style="width: 100%" @change="onChange">
              <a-row>
                <template v-for="temp in templateInfos">
                  <a-col :span="10">
                    <a-checkbox :value="temp.id">
                      {{temp.title}}
                    </a-checkbox>
                  </a-col>
                </template>

              </a-row>

            </a-checkbox-group>
          </a-form-item>

        </a-col>

        <a-col :span="16">

          <a-divider>系统属性</a-divider>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表前缀">
            <a-input v-decorator="['tablePrefix']" placeholder="填写则会将表名的前缀截取,再生成类名"/>
          </a-form-item>

          <a-divider orientation="left">自定义属性</a-divider>

          <a-row>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"
                         v-for="templateProp in templateProperties" :label="templateProp.title">
              <a-input v-decorator="['customProperties.'+templateProp.propKey,{initialValue: templateProp.defaultValue,rules:[
                                        { required: templateProp.required===1, message: templateProp.title+'不能为空' }
                                    ]}]" :placeholder="'请输入'+templateProp.title"/>
            </a-form-item>

          </a-row>

        </a-col>
      </a-row>


    </a-form>
     <preview-code-model ref="previewModal"/>
  </a-modal>
</template>

<script>
  import PopUpFormMixin from '@/mixins/PopUpFormMixin'
  import {getAllTemplateGroupSelect} from '@/api/templategroup';
  import {  getTemplateInfosByGid, getTemplatePropertiesByGid,previewCode,generateCode} from  '@/api/template'

  import Template from "@/views/template/list";
  import previewCodeModel from '@/views/gen/previewModel'


  export default {
    name:"genModel",
    components: {Template,previewCodeModel},
    mixins: [PopUpFormMixin],
    data() {


      return {
        //验证规则
        validateRules: {
          name: {rules: [{required: true, min: 2, message: '数据源名称必须大于两位！'}]},
          username: {rules: [{required: true, min: 3, message: '用户名最少需要3位！'}]},
          url: {rules: [{required: true, min: 5, message: 'url必须大于5位！'}]},
        },
        indeterminate: true,
        checkAll: false,
        checkedList: [],
        //模板分组
        templateGroups: [],
        //默认选择模板分组
        defaultTemplateGroupId: '3',
        //模板信息
        templateInfos: [],
        //模板信息ids
        templateInfoIds: [],
        //模板属性
        templateProperties: [],
        labelCol: {
          xs: {span: 24},
          sm: {span: 7}
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 13}
        },
        previewBtn: false,
        model:{},
        generateType: 'generate'


      }
    },
    computed: {},
    created() {
      this.showTemplateGroup();
      this.showTemplateInfos(this.defaultTemplateGroupId)
      this.showTemplateProperties(this.defaultTemplateGroupId)
    },
    methods: {

      showPreModel(records){
        this.previewBtn=true
        this.model=records.model
        this.show(records)
      },
      showGenModel(records){
        this.previewBtn=false
        this.model=records.model
        this.show(records)

      },

      generateCode(){
        console.log("生成代码",this.model.tableNames)

        this.form.validateFields((errors, values) => {
          if (!errors){
            //判断是多生成还是单生成
            console.log(values)
            let queryParam=this.form.getFieldsValue();
            queryParam.tableNames=this.model.tableNames;
            console.log(queryParam)
            generateCode(this.model.dsName,queryParam).then(fileBlob=>{
              console.log(fileBlob)
              const blob = new Blob([fileBlob]);
              const fileName='Relaxed-CodeGen.zip';
              //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
              //IE10以上支持blob但是依然不支持download
              let eLink = document.createElement("a");
              console.log("a元素",eLink)
              if ('download' in eLink){
                eLink.download=fileName;
                eLink.style.display='none'
                eLink.href=URL.createObjectURL(blob);
                document.body.appendChild(eLink);
                eLink.click(); //执行下载
                URL.revokeObjectURL(eLink.href)//释放url
                document.body.removeChild(eLink);
              }else{
                navigator.msSaveBlob(blob,fileName)
              }
            }).catch(err=>{
              console.log(err)
              this.$message.error("下载文件失败")
            })

          }else{
            this.$message.error("please check yours param")
          }
        })
      },
      //预览代码
      previewCode() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.submitLoading = true
            let queryParam=this.form.getFieldsValue();
            queryParam.tableName=this.model.tableName;
            previewCode(this.model.dsName,queryParam).then(res=>{
              this.$refs.previewModal.show(res.data)
            }).catch(err=>{
              this.$message.error("please check yours params")
            }).finally(()=>{
              this.submitLoading = false
            })
          }
        })
      },
      //展示模板分组
      showTemplateGroup() {
        getAllTemplateGroupSelect().then(res => {
          console.log(res)
          this.templateGroups = res.data;
        })
      },
      //根据模板组id展示模板信息
      showTemplateInfos(templateGroupId) {
        getTemplateInfosByGid(templateGroupId).then(res => {
          console.log("模板信息", res)
          this.templateInfos = res.data;
          this.templateInfoIds = this.templateInfos.map(e => e.id);
          console.log("模板信息ids", this.templateInfoIds)
        })
      },
      //根据群组id展示模板属性
      showTemplateProperties(templateGroupId) {
        getTemplatePropertiesByGid(templateGroupId).then(res => {
          console.log("模板属性", res)
          this.templateProperties = res.data;
        })
      },
      onChange(checkedList) {
        console.log(checkedList)
        this.indeterminate = !!checkedList.length && checkedList.length < this.templateInfos.length;
        this.checkAll = checkedList.length === this.templateInfos.length;
      },
      onCheckAllChange(e) {
        console.log("选择全部", e)
        this.indeterminate = false;
        this.checkAll = e.target.checked;
        this.checkedList = e.target.checked ? this.templateInfoIds : [];
        let data = {"templateFileIds": this.checkedList}
        this.form.setFieldsValue(data)

      },
      handleSelectTemplate(value) {
        this.showTemplateInfos(value)
        this.showTemplateProperties(value)
      }
    }


  }
</script>
