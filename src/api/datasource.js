import request from '@/utils/request'
const api = {
  dbList: '/tool/database/page',
  dbAdd: '/tool/database',
  dbPut: '/tool/database',
  dbDel: '/tool/database',
  dbSelectData:'/tool/database/select/data',
  dbTableList: 'tool/gen/table/info/page',
}

export function getDbList (parameter) {
  return request({
    url: api.dbList,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取数据库下拉数据
 * @param parameter
 */
export function getDbSelectData () {
  return request({
    url: api.dbSelectData,
    method: 'get'
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveDataSource (parameter) {
  return request({
    url: api.dbAdd,
    method:  'post' ,
    data: parameter
  })
}


export function putDataSource (parameter) {
  return request({
    url: api.dbPut,
    method:  'put',
    data: parameter
  })
}


export function delDataSource (id) {
  return request({
    url: `${api.dbPut}/${id}`,
    method:  'delete'
  })
}

export function getTableList (dsName,parameter) {
  return request({
    url: api.dbTableList,
    method: 'get',
    params: parameter,
    headers:{'dsName': dsName}
  })
}