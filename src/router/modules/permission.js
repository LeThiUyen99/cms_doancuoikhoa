
import Layout from '@/layout'

const permissionRouter = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/lists',
  name: 'Permission',
  meta: {
    title: 'manage_permission',
    icon: 'permission'
  },
  roles: ['Permission'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/permissions/List'),
      name: 'manage_permission',
      meta: { title: 'manage_permission' }
    }
  ]
}
export default permissionRouter
