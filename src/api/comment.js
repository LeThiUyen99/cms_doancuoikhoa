import Resource from '@/api/resource'
import request from '@/utils/request'

class CommentResource extends Resource {
  constructor() {
    super('comment')
  }
  commentList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { CommentResource as default }
