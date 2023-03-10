
import Layout from '@/layout'

const tagRouter = {
  path: '/Tag',
  component: Layout,
  redirect: '/tag/lists',
  name: 'Tag',
  meta: {
    title: 'manage_tag',
    icon: 'tag',
    isShow: [1]
  },
  roles: ['Tag'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/tag/List'),
      name: 'manage_tag',
      meta: { title: 'manage_tag', isShow: [1] }
    }
  ]
}
export default tagRouter
