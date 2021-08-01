<template>

      <a-row >

     <a-col :span="16">
      <split-pane
        @resize="resize"
        :min-percent="minPercent"
        :default-percent="defaultPercent"
        :style="splitPaneStyle"
        split="vertical">

         <template slot="paneL">
           <div class="left-pane">
             <a-directory-tree  default-expand-all @select="onSelect" @expand="onExpand">
               <a-tree-node key="0" title="parent 0">
                 <a-tree-node key="0-1" title="leaf 0-0" is-leaf />
                 <a-tree-node key="0-2" title="leaf 0-1" is-leaf />
               </a-tree-node>
               <a-tree-node key="1" title="parent 1">
                 <a-tree-node key="1-1" title="leaf 1-0" is-leaf />
                 <a-tree-node key="1-2" title="leaf 1-1" is-leaf />
               </a-tree-node>
             </a-directory-tree>
           </div>



         </template>


        <template slot="paneR" style="padding: 0" >
        <div ref="paneR"  class="right-pane">

              <div id="codeEditor">
                <codemirror v-model="content" :options="cmOptions" style="line-height: 1.5" />
              </div>

        </div>
        </template>

      </split-pane>
     </a-col>
       <a-col :span="8" >
         <div class="codeTips" >
        <code-tips ref="codeTips"  />
         </div>
       </a-col>
      </a-row>

</template>

<script>

  // codemirror`
  import { codemirror } from 'vue-codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/dracula.css'
  import 'codemirror/mode/velocity/velocity.js'
  // 全屏插件
  import 'codemirror/addon/display/fullscreen.js'
  import 'codemirror/addon/display/fullscreen.css'
  import splitPane from 'vue-splitpane'
  import codeTips from '@/views/template/codeTips'


  export default {
    name: 'TemplateInfo',
    components:{
      splitPane,
      codeTips,
      codemirror
    },
    data(){
      return{
        // 模板组ID
        templateGroupId: null,
        // ========== split样式 ==============
        splitPaneStyle: {
          height: '630px'
        },
        defaultPercent: 23,
        minPercent: 15,
        defaultInnerPercent:50,
        innerMinPercent: 15,
        //code editor
        content: '',
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'velocity',
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
              this.saveTemplateContent()
            }
          }
          // more codemirror options, 更多 codemirror 的高级配置...
        }

      }
    },
    methods:{
      show(templateGroupId, cardTitle){
        this.templateGroupId = templateGroupId
        this.$refs.codeTips.init(templateGroupId)
      },
      resize(val) {

        if (val > 1) {
          this.leftHtml = '<'
          this.defaultPercent = 30
        } else {
          this.leftHtml = '>'
          this.defaultPercent = 0
        }
      },
      saveTemplateContent(){

      },
      onSelect(keys, event) {
        console.log('Trigger Select', keys, event);
      },
      onExpand() {
        console.log('Trigger Expand');
      },
    }
  }
</script>

<style scoped>
  .codeTips{
    overflow-y: auto;
    height: 100%;
    border: none;
    position: relative;
    box-sizing: border-box;
  }
  .right-pane {
    overflow-y: auto;
    height: 100%;
    border: none;
    position: relative;
    box-sizing: border-box;
  }

  .left-pane {
    overflow: auto;
    height: 100%;
    border: none;
    position: relative;
    box-sizing: border-box;
  }
  #codeEditor >>> .CodeMirror {
    min-height: 500px !important;
    height: 100% !important;
  }
  #codeEditor >>> .CodeMirror-scroll {
    min-height: 500px !important;
  }

 .ant-pro-global-footer{
   margin:0;
   padding: 0;
 }
  .ant-pro-basicLayout-content{
    margin: 0;
  }
  .ant-layout-footer{
    height: 0 !important;;
    margin: 0 !important;;
    padding: 0 !important;;

  }
  .ant-layout-footer ,.ant-pro-global-footer{
    height: 0 !important;;
    margin: 0 !important;;
    padding: 0 !important;;
}
</style>