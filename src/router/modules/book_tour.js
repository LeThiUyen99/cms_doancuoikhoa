
import Layout from '@/layout'

const bookTourRouter = {
  path: '/Book',
  component: Layout,
  redirect: '/book_tour/lists',
  name: 'Book',
  meta: {
    title: 'manage_book_tour',
    icon: 'orders'
  },
  roles: ['Book'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/book_tour/List'),
      name: 'manage_book_tour',
      meta: { title: 'manage_book_tour' }
    }
  ]
}
export default bookTourRouter
