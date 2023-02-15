<template>
  <el-row class="chat-container">
    <vue-advanced-chat
      height="calc(100vh - 50px)"
      :current-user-id="0"
      :rooms="JSON.stringify(rooms)"
      :rooms-loaded="true"
      :messages="JSON.stringify(messages)"
      :messages-loaded="messagesLoaded"
      :show-audio="JSON.stringify(false)"
      :show-reaction-emojis="JSON.stringify(false)"
      :show-files="JSON.stringify(false)"
      message-actions="[]"
      @send-message="sendMessage($event.detail[0])"
      @fetch-messages="fetchMessages($event.detail[0])"
    />
  </el-row>
</template>

<script>
import { register } from 'vue-advanced-chat'
import io from 'socket.io-client'
import { getAcountInfo, getToken } from '@/utils/auth'
import MessageResource from '@/api/message'
import { convertDate, convertDateTime } from '@/utils/convert'
import { isEmpty } from '@/utils/validate'

const messageResource = new MessageResource()

register()
export default {
  name: 'List',
  data() {
    return {
      socket: {},
      room_id: '',
      rooms: [],
      messages: [],
      messagesLoaded: false,
      admin: getAcountInfo()
    }
  },
  watch: {
    room_id(current_room, old_room) {
      if (isEmpty(old_room)) {
        this.socket.emit('join', { room: current_room })
      } else {
        this.socket.emit('change_room', { room: current_room, old_room })
      }
    }
  },
  created() {
    this.socket = io(process.env.VUE_APP_BASE_SOCKET, { auth: { token: getToken() }})
    messageResource.list_room().then((res) => {
      this.rooms = res?.data?.list
    })
    this.socket.on('receive_message', (data) => {
      this.messages = [
        ...this.messages,
        {
          _id: this.messages.length,
          content: data.content,
          senderId: '' + data.type,
          type: 0,
          timestamp: convertDateTime(data.created_at),
          date: convertDate(data.created_at)
        }
      ]
    })
  },

  methods: {
    fetchMessages(value) {
      if (isEmpty(value?.room?.roomId)) {
        this.messages = []
        this.messagesLoaded = true
      } else {
        this.room_id = value.room.roomId
        messageResource.list_message({ room: value.room.roomId }).then((res) => {
          this.messages = res?.data?.list.map(v => ({
            ...v,
            _id: v.id,
            senderId: '' + v.type,
            timestamp: convertDateTime(v.created_at),
            date: convertDate(v.created_at)
          }))
        }).finally(() => { this.messagesLoaded = true })
      }
    },

    sendMessage(message) {
      this.socket.emit('send_message', { content: message.content, sender_id: this.admin.id, room: this.room_id, type: 0 })
    }

  }
}
</script>

<style scoped>

</style>
