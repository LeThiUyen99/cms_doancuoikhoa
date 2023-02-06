
import Layout from '@/layout'

const userRouter = {
  path: '/User',
  component: Layout,
  redirect: '/user/lists',
  name: 'User',
  meta: {
    title: 'manage_user',
    icon: 'account',
    isShow: [0]
  },
  roles: ['User'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/custom/List'),
      name: 'manage_user',
      meta: { title: 'manage_user', isShow: [0] }
    }
  ]
}
export default userRouter
