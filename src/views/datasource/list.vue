<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!--            搜索条件-->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="名称">
                <a-input v-model="queryParam.name" placeholder="" />
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
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      </div>
      <!-- 表格数据-->
      <s-table
        ref="table"
        size="default"
        :rowKey="rowKey"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >



        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleDel(record)">删除</a>
          </template>
        </span>
      </s-table>
      <!--新建表单-->
      <form-page
        ref="form"
      />
      <!--            <step-by-step-modal ref="modal" @ok="handleOk"/>-->
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import moment from 'moment'
  import { STable, Ellipsis } from '@/components'
  import {  saveDataSource,putDataSource,delDataSource,getDbList } from '@/api/datasource'


  import FormPage from './form'

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: 'url',
      dataIndex: 'url'
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
    name: 'dataSourceList',
    components: {
      STable,
      FormPage,
    },
    data() {
      this.columns = columns
      return {
        rowKey: 'id',
        // create model
        visible: false,
        confirmLoading: false,
        mdl: null,
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: (parameter) => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return getDbList(requestParameters).then((res) => {
            return res.data
          })
        },
      }
    },

    methods: {
      handleAdd() {
        this.$refs.form.add({title:'新增数据源'})
      },
      handleEdit(record) {
        this.$refs.form.edit(record,{title:'修改数据源'})
      },


      openNetLazyLoading(delay=1000){
        return  new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, delay)
        })
      },

      handleDel(record) {
        delDataSource(record.id).then(res=>{
          if (res.code&&res.code!==200){
            this.$message.error(res.message);
          }else{
            // 刷新表格
            this.$refs.table.refresh()
            this.$message.info(`删除成功`)
          }
        }).catch(err=>{
          this.$message.info('网络异常')
          this.confirmLoading = false
        })
      },


      resetSearchForm() {
        this.queryParam = {
          date: moment(new Date()),
        }
      },
    },
  }
</script>
