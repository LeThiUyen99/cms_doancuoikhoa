
import Layout from '@/layout'

const tourRouter = {
  path: '/Tour',
  component: Layout,
  redirect: '/tour/lists',
  name: 'Tour',
  meta: {
    title: 'manage_tour',
    icon: 'tour',
    isShow: [1]
  },
  roles: ['Tour'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/tour/List'),
      name: 'manage_tour',
      meta: { title: 'manage_tour', isShow: [1] }
    }
  ]
}
export default tourRouter
