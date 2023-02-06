
import Layout from '@/layout'

const bookTourRouter = {
  path: '/book',
  component: Layout,
  redirect: '/book/lists',
  name: 'Book',
  meta: {
    title: 'manage_book_tour',
    icon: 'orders',
    isShow: [0, 1]
  },
  roles: ['Book'],
  children: [
    {
      path: 'list',
      component: () => import('@/views/book_tour/List'),
      name: 'manage_book_tour',
      meta: { title: 'manage_book_tour', isShow: [0, 1] }
    }
  ]
}
export default bookTourRouter
