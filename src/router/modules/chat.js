
import Layout from '@/layout'

const chatRouter = {
  path: '/Chat',
  component: Layout,
  redirect: '/chat/lists',
  name: 'Chat',
  meta: {
    title: 'manage_chat',
    icon: 'chat',
    isShow: [1]
  },
  roles: ['Chat'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/chat/List'),
      name: 'manage_chat',
      meta: { title: 'manage_chat', isShow: [1] }
    }
  ]
}
export default chatRouter
