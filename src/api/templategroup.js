import request from '@/utils/request'
const api = {
  List: '/tool/database/page',
  Add: '/tool/tpl/group',
  Put: '/tool/tpl/group/update',
  Del: '/tool/tpl/group/remove/',

  templateGroupSelectAll:'/tool/tpl/group/all',
  templateGroupList: '/tool/tpl/group/page',
}
export function addObj (obj) {
  return request({
    url: api.Add,
    method: 'post',
    data: obj
  })
}
export function putObj (obj) {
  return request({
    url: api.Put,
    method: 'put',
    data: obj
  })
}
export function delObj (id) {
  return request({
    url: api.Del+id,
    method: 'delete',
    data: obj
  })
}


/**
 * 得到所有的模板分组 下拉
 */
export function getAllTemplateGroupSelect () {
  return request({
    url: api.templateGroupSelectAll,
    method: 'get'
  })
}

/**
 * 得到所有模板组
 */
export function getAllTemplateGroup (parameter) {
  return request({
    url: api.templateGroupList,
    method: 'get',
    params: parameter
  })
}