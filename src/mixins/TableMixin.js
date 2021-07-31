
import { littleCamelToUnderline } from '@/utils/strUtil'

export  default {
  data(){
    return{
      //主键默认id
      rowKey: 'id',
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 数据加载动画
      loading: false,
      //数据源
      dataSource: [],
      // 筛选参数字段
      filters: {},
      // 默认排序字段
      sortField: null,
      // 升序 asc/降序 desc
      sortOrder: null,
      // 表格展示
      tableShow: true,
      //分页
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        }
      },
      // 延迟加载，created时不主动加载数据
      lazyLoad: false,
      // 获取分页数据的方法
      getPage: function () {
      },
      //删除对像 根据主键
      delObj: function() {

      },


    }
  },
  created(){
    this.initDefaultSort()
    !this.lazyLoad && this.reloadTable()
  },
  methods:{
    /**
     * 默认排序规则
     */
    initDefaultSort () {
      this.sortField = littleCamelToUnderline(this.rowKey)
      this.sortOrder = 'desc'
    },
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param bool
     */
    reloadTable (bool = true) {
      bool && (this.pagination.current = 1)
      this.loadData()
    },
    /**
     * 合并查询参数，分页参数，排序参数，过滤参数
     * @returns {{current: number, size: number} & {sortOrders: null, sortFields: null}}
     */
    pageParams: function () {
      return Object.assign(this.queryParam, {
        current: this.pagination.current,
        size: this.pagination.pageSize
      }, {
        sortFields: this.sortField,
        sortOrders: this.sortOrder
      }, { ...this.filters })
    },
    // 加载数据方法 必须为 Promise 对象
    loadData ()  {
      this.loading=true
      const params = this.pageParams()
      console.log('loadData request parameters:', params)
      this.getPage(params).then(res=>{
        console.log(res)
        if (res.code === 200) {
          const page = res.data
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (page.records.length === 0 && this.pagination.current > 1) {
            this.pagination.current--
            this.loadData()
            return
          }
          this.dataSource = page.records
          this.pagination.total = page.total
          this.onPageLoadSuccess(page)
        }else{
          this.$message.warning(res.message || 'error request')
        }
      }).catch((e)=>{
        // 未被 axios拦截器处理过，则在这里继续处理
        !e.resolved && this.$message.error(e.message || 'error request')
      })
        .finally(()=>{
        this.loading = false
      })
    },

    /**
     * 分页查询成功回调
     * @param page
     */
    onPageLoadSuccess (page) {

    },
    /**
     * 分页、排序、筛选变化时进行数据更新
     * @param pagination
     * @param filters
     * @param sorter
     */
    handleTableChange (pagination, filters, sorter) {
      this.filters = filters
      if (sorter && sorter.field) {
        if (sorter.order) {
          this.sortField = sorter.field
          this.sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc'
        } else {
          this.initDefaultSort()
        }
      }
      this.pagination = pagination
      this.loadData()
    },
    // 展开/关闭 搜索条件
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 清空搜索条件
    resetSearchForm () {
      this.queryParam = {}
    },
    // 删除
    handleDel (record) {
      this.delObj(record[this.rowKey]).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.reloadTable()
        } else {
          this.$message.error(res.message)
        }
      }).catch((e) => {
        // 未被 axios拦截器处理过，则在这里继续处理
        !e.resolved && this.$message.error(e.message || 'error request')
      })
    },

  }
}