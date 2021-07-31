<template>
  <a-modal
    :title="title"
    width="60%"
    :visible="visible"
    @cancel="handleClose"
  >

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
    </div>
    <a-table
      :columns="columns"
      :row-key="rowKey"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="handleDel(record)">删除</a>
      </template>
    </a-table>

    <template-property-form  @reload-page-table="reloadTable" ref="form"/>

  </a-modal>
</template>

<script>
  import templatePropertyForm from '@/views/template/templatePropertyForm'
  import PopUpFormMixin from '@/mixins/PopUpFormMixin'
  import TableMixin from '@/mixins/TableMixin'
  import {getTemplatePropertyPage,delTemplateProperty} from '@/api/template'
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '属性名称',
      dataIndex: 'title',
    },
    {
      title: '属性键',
      dataIndex: 'propKey',
    },
    {
      title: '默认值',
      dataIndex: 'defaultValue',
    },
    {
      title: '是否必填',
      dataIndex: 'required',
    },
    {
      title: '描述',
      dataIndex: 'remarks',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' },
    }


  ]

  export default {
    name:"templatePropertyModel",
    components:{
      templatePropertyForm
    },
    mixins: [PopUpFormMixin,TableMixin],
    data() {


      return {
        columns: columns,
        getPage: getTemplatePropertyPage,
        delObj: delTemplateProperty,
        //模板组信息
        groupInfo:{},


      }
    },
    computed: {},
    created() {

    },
    methods: {
      handleAdd(){
        this.$refs.form.add({title:'新增模板属性',groupId:this.groupInfo.id})
      },
      handleEdit(records){
        this.$refs.form.edit(records,{title:'编辑模板属性'})
      },
         add(attribute){
           this.groupInfo=attribute.groupInfo

           this.show(attribute)
           this.queryParam={
             groupId: this.groupInfo.id
           }
           console.log(attribute)
           this.loadData()


         },


    },



  }
</script>
