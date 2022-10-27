<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" disable-resize-watcher app>
       <v-list-item two-line>
          <v-list-item-avatar color="deep-purple darken-2">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">    {{ $auth.user.firstName }} </v-list-item-title>
            <v-list-item-subtitle class="font-weight-bold"> {{ $auth.user.lastName  }}  </v-list-item-subtitle>
          </v-list-item-content>
      </v-list-item>
      <v-divider class="mb-0"></v-divider>
      <v-list>
        <v-list-item-group color="deep-purple darken-2">
          <v-list-item v-for="(item, i) in menus" :key="i" :to="item.to" router exact>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" class="text-subtitle-1 font-weight-bold"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group color="deep-purple darken-2">
          <v-list-item :to="{ name : 'account-setting' }">
            <v-list-item-icon>
              <v-icon> mdi-account-cog </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-1 font-weight-bold"> ตั้งค่าผู้ใช้งาน </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon> mdi-logout-variant </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-1 font-weight-bold"> ออกจากระบบ </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="deep-purple darken-2" fixed app dark>
      <v-app-bar-nav-icon large @click.stop="drawer = !drawer" />
      <v-toolbar-title class="subtitle-1 font-weight-bold"> {{ title }} </v-toolbar-title>
      <v-spacer />
      <v-btn icon dark router to="/notification">
        <v-badge color="warning" :content="notification" overlap v-if="notification">
          <v-icon> mdi-bell </v-icon>
        </v-badge>
        <v-icon v-else> mdi-bell </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer class="justify-center" color="deep-purple darken-2" dark fixed>
      <v-row justify="center" no-gutters>
        <v-btn v-for="link in links" :key="link.name" color="white" text rounded class="my-2 mx-4" icon :to="link.to">
          <v-icon> {{ link.icon }} </v-icon>
        </v-btn>
      </v-row>
    </v-footer>
  </v-app>
</template>


<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      title: null,
      drawer: false,
      menus: [
        { icon: 'mdi-view-dashboard', to: '/dashboard', name: "dashboard", title: 'แผงควบคุม' },
        { icon: 'mdi-notebook-plus-outline', to: '/record', name: "record", title: 'บันทึกกิจกรรม' },
        { icon: 'mdi-clock-time-eight', to: '/activity', name: "activity", title: 'กิจกรรม' },
        { icon: 'mdi-chart-bar', to: '/report', name: "report", title: 'สรุปผล' },
        { icon: 'mdi-seal', to: '/recommend', name: "recommend", title: 'แนะนำ' }
      ],
      links: [
        { icon: 'mdi-view-dashboard', to: '/dashboard', name: "dashboard", title: 'แผงควบคุม' },
        { icon: 'mdi-notebook-plus-outline', to: '/record', name: "record", title: 'บันทึกกิจกรรม' },
        { icon: 'mdi-clock-time-eight', to: '/activity', name: "activity", title: 'กิจกรรม' },
        { icon: 'mdi-chart-bar', to: '/report', name: "report", title: 'สรุปผล' },
        { icon: 'mdi-seal', to: '/recommend', name: "recommend", title: 'แนะนำ' }
      ],
      items: [
        { name: "dashboard",    title: 'แผงควบคุม'},
        { name: "record",       title: 'บันทึกกิจกรรม' },
        { name: "activity",     title: 'กิจกรรม' },
        { name: "report",       title: 'สรุปผล' },
        { name: "recommend",    title: 'แนะนำ'  },
        { name: "recommend-id", title: 'แนะนำ'  },
        { name: "notification", title: 'แจ้งเตือน' },
        { name: "account-setting", title: 'ตั้งค่าผู้ใช้งาน' },
        { name: "record-create",   title: 'สร้างกิจกรรม' },
        { name: "record-edit-id",  title: 'แก้ไขกิจกรรม' },
        { name: "record-target-date",      title: 'กำหนดเป้าหมาย' },
        { name: "record-target-history",   title: 'ประวัติเป้าหมาย' },
        { name: "activity-target-date",    title: 'กำหนดเป้าหมาย' },
        { name: "activity-target-history", title: 'ประวัติเป้าหมาย' },
        { name: "activity-category-id",    title: 'บันทึกกิจกรรม'  }
      ],
      notification: null
    }
  },
  created () {
    this.title = this.items.find(item => item.name == this.$route.name).title
  },
  watch: {
    $route () {
      this.title = this.items.find(item => item.name == this.$route.name).title
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>
