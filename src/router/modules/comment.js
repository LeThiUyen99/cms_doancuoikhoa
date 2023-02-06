
import Layout from '@/layout'

const commentRouter = {
  path: '/Comment',
  component: Layout,
  redirect: '/comment/lists',
  name: 'Comment',
  meta: {
    title: 'manage_comment',
    icon: 'comment',
    isShow: [1]
  },
  roles: ['Comment'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/comment/List'),
      name: 'manage_comment',
      meta: { title: 'manage_comment', isShow: [1] }
    }
  ]
}
export default commentRouter
