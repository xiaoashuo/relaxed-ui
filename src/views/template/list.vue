<template>
  <div>
    <a-card v-show="tableShow" :bordered="false">
      <!--            搜索条件-->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="id">
                <a-input v-model="queryParam.id" placeholder="请输入id"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="模板组">
                <a-input v-model="queryParam.name" placeholder="请输入模板组"></a-input>
              </a-form-item>
            </a-col>

            <a-button type="primary" @click="reloadTable(true)"
            >查询
            </a-button
            >
            <a-button
              style="margin-left: 8px"
              @click="resetSearchForm()"
            >重置
            </a-button
            >

          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      </div>
      <!-- 表格数据-->
      <a-table
        ref="table"
        :columns="columns"
        :row-key="rowKey"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >


                <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical"/>
            <a @click="handleDel(record)">删除</a>
          </template>
        </span>
        <span slot="templateAction" slot-scope="text, record">
          <template>
            <a @click="handleTemplateEdit(record)">模板编辑</a>
            <a-divider type="vertical"/>
            <a @click="handleProperty(record)">属性配置</a>
          </template>
        </span>
      </a-table>
      <!--新建表单-->
      <form-page ref="createModal"/>
      <template-property-model ref="propertyModel"/>
    </a-card>
    <a-card v-show="!tableShow">
      <slot slot="title">
        <div style="position:relative;height:32px;line-height:32px;padding:0 1%">
          {{ cardTitle }}
          <div style="position:absolute;right:1%;top:0"><a-button @click="backToPage(false)">返回上级</a-button></div>
        </div>
      </slot>
      <template-info ref="templateInfo"/>
    </a-card>

  </div>
</template>

<script>
  import TableMixin from '@/mixins/TableMixin'
  import { STable, Ellipsis } from '@/components'
  import { getAllTemplateGroup } from '@/api/templategroup'
  import templatePropertyModel from '@/views/template/templatePropertyModel'
  import templateInfo from '@/views/template/templateInfo'
  import FormPage from './form'

  const columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: '模板组名称',
      dataIndex: 'name'
    },
    {
      title: '备注',
      dataIndex: 'remarks'
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true
    },
    {
      title: '模板组操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    },
    {
      title: '模板操作',
      dataIndex: 'templateAction',
      width: '180px',
      scopedSlots: { customRender: 'templateAction' }
    }

  ]


  export default {
    name: 'templateList',
    components: {
      STable,
      Ellipsis,
      FormPage,
      templatePropertyModel,
      templateInfo

    },
    mixins:[TableMixin],
    data() {
      return {
        columns:columns,
        getPage: getAllTemplateGroup,
        cardTitle: ''
      }
    },

    created() {

    },
    computed: {},
    methods: {
      handleAdd() {
        this.$refs.createModal.add({ title: '新建模板组' })
      },
      handleEdit(record) {
        this.$refs.createModal.edit(record, { title: '编辑模板组' })
      },


      handleDel(record) {
        this.$message.info(`删除成功`)
      },
      handleProperty(records) {
        this.$refs.propertyModel.add({ title: '模板属性', groupInfo: records })
      },
      handleTemplateEdit(records){
        this.switchPage()
        this.cardTitle='编辑模板组 -'+records.name;
        this.$refs.templateInfo.show(records.id, records.name)
      }


    }
  }
</script>
