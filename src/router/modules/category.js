
import Layout from '@/layout'

const categoriesRouter = {
  path: '/Category',
  component: Layout,
  redirect: '/category/lists',
  name: 'Category',
  meta: {
    title: 'manage_category',
    icon: 'list'
  },
  roles: ['Category'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/category/List'),
      name: 'manage_category',
      meta: { title: 'manage_category' }
    }
  ]
}
export default categoriesRouter
