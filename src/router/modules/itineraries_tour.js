
import Layout from '@/layout'

const itinerariesTourRouter = {
  path: '/Itineraries',
  component: Layout,
  redirect: '/itineraries/lists',
  name: 'Itineraries',
  meta: {
    title: 'itineraries_tour',
    icon: 'itinerary'
  },
  roles: ['Itineraries'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/itineraries/List'),
      name: 'itineraries_tour',
      meta: { title: 'itineraries_tour' }
    }
  ]
}
export default itinerariesTourRouter
