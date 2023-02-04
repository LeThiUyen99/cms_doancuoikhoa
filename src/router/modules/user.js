
import Layout from '@/layout'

const userRouter = {
  path: '/User',
  component: Layout,
  redirect: '/user/lists',
  name: 'User',
  meta: {
    title: 'manage_user',
    icon: 'account'
  },
  roles: ['User'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/custom/List'),
      name: 'manage_user',
      meta: { title: 'manage_user' }
    }
  ]
}
export default userRouter
