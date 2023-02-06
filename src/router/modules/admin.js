
import Layout from '@/layout'

const adminRouter = {
  path: '/Admin',
  component: Layout,
  redirect: '/admin/lists',
  name: 'Admin',
  meta: {
    title: 'manage_account',
    icon: 'account',
    isShow: [0]
  },
  roles: ['Admin'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/admin/List'),
      name: 'manage_account',
      meta: { title: 'manage_account', isShow: [0] }
    }
    // {
    //   path: 'lists_1',
    //   component: () => import('@/views/admin/List'),
    //   name: 'manage_account_1',
    //   meta: { title: 'manage_account_1', isShow: [1] }
    // }
  ]
}
export default adminRouter
