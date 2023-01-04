
import Layout from '@/layout'

const blogRouter = {
  path: '/Blog',
  component: Layout,
  redirect: '/blog/lists',
  name: 'Blog',
  meta: {
    title: 'manage_blog',
    icon: 'account'
  },
  roles: ['Blog'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/blog/List'),
      name: 'manage_blog',
      meta: { title: 'manage_blog' }
    }
  ]
}
export default blogRouter
