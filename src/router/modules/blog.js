
import Layout from '@/layout'

const blogRouter = {
  path: '/Blog',
  component: Layout,
  redirect: '/blog/lists',
  name: 'Blog',
  meta: {
    title: 'manage_blog',
    icon: 'blog',
    isShow: [1]
  },
  roles: ['Blog'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/blog/List'),
      name: 'manage_blog',
      meta: { title: 'manage_blog', isShow: [1] }
    }
  ]
}
export default blogRouter
