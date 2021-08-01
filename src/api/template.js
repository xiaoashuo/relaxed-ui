import request from '@/utils/request'
const api = {
  previewCode: '/tool/gen/preview/code',
  ddlPreviewCode: '/tool/gen/ddl/preview/code',
  generateCode: 'tool/gen/code',
  ddlGenerateCode: 'tool/gen/ddl/code',
  templateInfos: '/tool/tpl/info/list',
  templatePropertyList: '/tool/tpl/property/list',
  templatePropertyPage: '/tool/tpl/property/page',
  deleteTemplateProperty: '/tool/tpl/property/remove',
  addTemplateProperty: '/tool/tpl/property',
  editTemplateProperty: '/tool/tpl/property/update',

}



/**
 * 获取模板信息 根据群组id
 * @param parameter
 */
export function getTemplateInfosByGid (parameter) {
  return request({
    url: `${api.templateInfos}/${parameter}`,
    method: 'get',
  })
}

/**
 * 获取模板属性列表
 * @param parameter
 */
export function getTemplatePropertiesByGid (parameter) {
  return request({
    url: `${api.templatePropertyList}/${parameter}`,
    method: 'get',
  })
}

/**
 * 分页获取模板属性
 * @param parameter
 * @returns {AxiosPromise}
 */
export function getTemplatePropertyPage (parameter) {
  return request({
    url: api.templatePropertyPage,
    method: 'get',
    params: parameter
  })
}

/**
 * 删除模板属性 根据主键id
 * @param id
 * @returns {AxiosPromise}
 */
export function delTemplateProperty(id) {
  return request({
    url: `${api.deleteTemplateProperty}/${id}`,
    method:  'delete'
  })
}

/**
 * 添加模板属性
 * @param parameter
 * @returns {AxiosPromise}
 */
export function addTemplateProperty(parameter) {
  return request({
    url: api.addTemplateProperty,
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑模板属性
 * @param parameter
 * @returns {AxiosPromise}
 */
export function editTemplateProperty(parameter) {
  return request({
    url: api.editTemplateProperty,
    method:'put',
    data: parameter
  })
}



/**
 * {
  "customProperties": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "tableName": "string",
  "tablePrefix": "string",
  "templateFileIds": [
    0
  ],
  "templateGroupId": 0
}
 * @param parameter
 */
export function previewCode (dsName,parameter) {
  return request({
    url: api.previewCode,
    method:  'post' ,
    data: parameter,
    headers:{'dsName': dsName,"Content-Type":"application/json"}
  })
}



export function generateCode(dsName,parameter) {
  return request({
    url: api.generateCode,
    method:  'post' ,
    data: parameter,
    responseType: 'blob',
    headers:{'dsName': dsName,"Content-Type":"application/json"}
  })
}

export function ddlPreviewCode (dsName,parameter) {
  return request({
    url: api.ddlPreviewCode,
    method:  'post' ,
    data: parameter,
    headers:{'dsName': dsName,"Content-Type":"application/json"}
  })
}


export function ddlGenerateCode (dsName,parameter) {
  return request({
    url: api.ddlGenerateCode,
    method:  'post' ,
    data: parameter,
    responseType: 'blob',
    headers:{'dsName': dsName,"Content-Type":"application/json"}
  })
}