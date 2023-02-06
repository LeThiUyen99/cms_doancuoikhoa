<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" /> -->
        <sidebar-item v-for="route in menus" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import AdminResource from '@/api/admin'
import { getAcountInfo } from '@/utils/auth'
const adminResource = new AdminResource()
// import store from '@/store'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      menus: [],
      account: {}
    }
  },
  created() {
    this.createMenus()
    this.requestAccount()
  },
  methods: {
    requestAccount() {
      const acc = getAcountInfo()
      const id = acc.id
      adminResource.detailAdmin(id).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.account = { ...data.data }
        }
      })
    },
    async createMenus() {
      // const { roles } = await store.dispatch('user/getInfo')
      // console.log('....................list roles:', roles)
      // console.log('.......................permission : ', JSON.stringify(this.permission_routes))
      // for (const role of roles) {
      //   const path = `/${role}`
      //   const menu = this.permission_routes.find(router => router.path === path)
      //   // console.log('..........................tim menu', menu)
      //   if (menu) {
      //     this.menus.push(menu)
      //   }
      // }
      // if (account.role === 1) {
      //   this.$route.meta.isShow = false
      // }
      // console.log(this.permission_routes)

      adminResource.detailAdmin().then(res => {
        if (res.error_code === 0) {
          this.menus = this.permission_routes.filter((v) => {
            if (res.data.data.role === 1) {
              v.children = v.children?.filter((e) => e?.meta?.isShow?.includes(1))
              if (v?.meta?.isShow?.includes(1)) return v
            } else if (res.data.data.role === 0) {
              v.children = v.children?.filter((e) => e?.meta?.isShow?.includes(0))
              if (v?.meta?.isShow?.includes(0)) return v
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
