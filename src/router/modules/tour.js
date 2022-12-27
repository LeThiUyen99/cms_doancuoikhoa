
import Layout from '@/layout'

const tourRouter = {
  path: '/Tour',
  component: Layout,
  redirect: '/tour/lists',
  name: 'Tour',
  meta: {
    title: 'manage_travel',
    icon: 'account'
  },
  roles: ['Tour'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/tour/List'),
      name: 'manage_travel',
      meta: { title: 'manage_travel' }
    }
  ]
}
export default tourRouter
