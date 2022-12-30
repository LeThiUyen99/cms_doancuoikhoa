
import Layout from '@/layout'

const adminRouter = {
  path: '/Admin',
  component: Layout,
  redirect: '/admin/lists',
  name: 'Admin',
  meta: {
    title: 'manage_account',
    icon: 'account'
  },
  roles: ['Admin'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/admin/List'),
      name: 'manage_account',
      meta: { title: 'manage_account' }
    }
  ]
}
export default adminRouter
