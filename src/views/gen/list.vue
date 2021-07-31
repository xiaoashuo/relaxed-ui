<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!--            搜索条件-->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="数据源">
                <a-select
                  v-model="dsName"
                  placeholder="请选择"

                >
                  <a-select-option key="master" value="master">master</a-select-option>
                  <a-select-option :value="dbData.value" v-for="dbData in dbSelectData" :key="dbData.name">{{dbData.name}}</a-select-option>

                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="名称">
                <a-input v-model="queryParam.tableName" placeholder="" />
              </a-form-item>
            </a-col>
            <a-button type="primary" @click="$refs.table.refresh(true)"
            >查询</a-button
            >
            <a-button
              style="margin-left: 8px"
              @click="$refs.table.refresh()"
            >重置</a-button
            >


          </a-row>
        </a-form>
      </div>

      <div class="table-operator">

        <a-button type="primary" icon="download" @click="handleMultipartGen">批量生成</a-button>
      </div>
      <!-- 表格数据-->
      <s-table
        ref="table"
        size="default"
        :rowKey="rowKey"
        :columns="columns"
        :data="loadData"
        :rowSelection="rowSelection"
        showPagination="auto"
      >



        <span slot="action" slot-scope="text, record">
          <template>


            <a @click="preGenCode(record)">生成</a>

          </template>
        </span>
      </s-table>
      <!--新建表单-->
      <generate-model
        ref="generateModel"
      />


    </a-card>
  </page-header-wrapper>
</template>

<script>
  import moment from 'moment'
  import {Ellipsis, STable} from '@/components'
  import {getDbSelectData, getTableList} from '@/api/datasource'



  import GenerateModel from './model'



  const columns = [
    {
      title: '表名称',
      dataIndex: 'tableName',
    },
    {
      title: '存储引擎',
      dataIndex: 'engine',
    },
    {
      title: '表备注',
      dataIndex: 'tableComment',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' },
    },
  ]



  export default {
    name: 'codeGen',
    components: {
      STable,
      Ellipsis,
      GenerateModel,
    },
    data() {
      this.columns = columns
      return {
        rowKey: 'tableName',

        // 查询参数
        queryParam: {

        },
        dsName: 'master',
        dbSelectData: [],
        // 加载数据方法 必须为 Promise 对象
        loadData: (parameter) => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)

          return getTableList(this.dsName,requestParameters).then((res) => {
            return res.data
          })
        },
        selectedRowKeys: [],
        selectedRows: [],

      }
    },
    created() {
      getDbSelectData().then(res=>{
        console.log(res)
        this.dbSelectData=res.data;
      })
    },
    watch:{
      dsName(){
        this.$refs.table.refresh()
      }
    },
    computed:{
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    },
    methods: {
      handleMultipartGen(){
        let tableNames=this.selectedRowKeys;
        console.log(tableNames)
        if (tableNames&&tableNames.length>0){
          console.log(this.dsName)
          let mdl={}
           mdl.dsName=this.dsName;
           mdl.tableNames=tableNames;
          this.$refs.generateModel.showGenModel({title:'批量生成代码',model: mdl})
        }else{
          this.$message.error("请至少选择一项")
        }
      },
      //生成代码
      preGenCode(record) {

        let mdl = { ...record }
        mdl.dsName=this.dsName;
        mdl.tableNames=[record.tableName]
        this.$refs.generateModel.showPreModel({title:'预览代码',model: mdl})

      },



      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },


      resetSearchForm() {
        this.queryParam = {
          date: moment(new Date()),
        }
        console.log(this.queryParam)
      },


    },
  }
</script>
