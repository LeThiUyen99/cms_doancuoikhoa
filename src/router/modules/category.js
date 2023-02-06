
import Layout from '@/layout'

const categoriesRouter = {
  path: '/Category',
  component: Layout,
  redirect: '/category/lists',
  name: 'Category',
  meta: {
    title: 'manage_category',
    icon: 'list',
    isShow: [1]
  },
  roles: ['Category'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/category/List'),
      name: 'manage_category',
      meta: { title: 'manage_category', isShow: [1] }
    }
  ]
}
export default categoriesRouter
