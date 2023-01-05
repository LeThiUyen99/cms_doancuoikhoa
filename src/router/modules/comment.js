
import Layout from '@/layout'

const commentRouter = {
  path: '/Comment',
  component: Layout,
  redirect: '/comment/lists',
  name: 'Comment',
  meta: {
    title: 'manage_comment',
    icon: 'comment'
  },
  roles: ['Comment'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/comment/List'),
      name: 'manage_comment',
      meta: { title: 'manage_comment' }
    }
  ]
}
export default commentRouter
