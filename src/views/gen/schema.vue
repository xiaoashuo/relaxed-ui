<template>
  <div>
    <a-card  >
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="数据源">
              <a-select
                v-model="dsName"
                placeholder="请选择"
                style="width: 120px"
              >
                <a-select-option key="master" value="master">master</a-select-option>
                <a-select-option :value="dbData.value" v-for="dbData in dbSelectData" :key="dbData.name">{{dbData.name}}</a-select-option>

              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="21">
            <a-button
              style="margin-top: 5px"
              @click="ddlGenerateCode"
            >生成</a-button
            >
          </a-col>





        </a-row>
      </a-form>

    </a-card>
    <a-alert message="Ctrl+S保存代码区域内容,一次只允许提交一个ddl语句哦" type="success" />


    <div id="codeEditor">
      <codemirror v-model="content" :options="cmOptions" style="line-height: 1.5"></codemirror>
    </div>
    <generate-model ref="generateModel"/>
  </div>

</template>

<script>
  // codemirror`
  import { codemirror } from 'vue-codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/dracula.css'
  import 'codemirror/mode/sql/sql.js'
  import { getDbSelectData } from '@/api/datasource'
  import {getAllTemplateGroupSelect} from '@/api/templategroup'
  import {getTemplateInfosByGid} from '@/api/template'
  import GenerateModel from '@/views/gen/schemaModel'
  export default {
    name: 'schema',
    components:{
      codemirror,
      GenerateModel

    },
    data(){
      return{
        dsName: 'master',
        dbSelectData: [],


        content: '',
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'sql',
          theme: 'dracula',
          lineNumbers: true,
          line: true,
          extraKeys: {
            // 全屏
            F11: function(cm) {
              cm.setOption('fullScreen', !cm.getOption('fullScreen'))
            },
            // 保存
            'Ctrl-S': () => {
               console.log("代码编辑区",this.content)
            }
          },
          //括号匹配
          matchBrackets: true,

          // more codemirror options, 更多 codemirror 的高级配置...
        }
      }
    },
    computed:{

    },
    methods:{


      ddlGenerateCode(){
        if (this.content==null||this.content==""){
          this.$message.error("代码区域内容不能为空")
          return
        }
        let mdl={}
        mdl.dsName=this.dsName;
        mdl.code=this.content;
        this.$refs.generateModel.showPreModel({title:'预览代码',model: mdl})
      }


    },
    created() {
      getDbSelectData().then(res=>{
        console.log(res)
        this.dbSelectData=res.data;
      })

    },
  }
</script>

<style scoped>

</style>