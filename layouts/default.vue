<template>
  <v-app>
    <alert />
    <!-- <v-main>
      <v-container  fluid>
        <AppBar />
        <SideBar />
        <Nuxt />
      </v-container>
    </v-main> -->
    <!-- <v-app-bar
      dense
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      style="z-index:100"
      color="white"
      elevation="5">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="32px" item>
              <v-img src="/img/profile.png" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="OnLogout"
          >
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar> -->
    <!-- <v-content>
      <v-container>
        <Nuxt />
      </v-container>
    </v-content> -->
    <v-main>
      <AppBar :drawer="drawer" @drawerAction="drawerOff" />

      <v-container fluid>
        <Nuxt />
      </v-container>
      <v-navigation-drawer
        v-model="drawer"
        :style="`margin-top: ${$vuetify.application.top}px`"
        app
      >
        <AppDrawer @drawerAction="drawerOff" />
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ "@/components/Alert.vue"),
    AppDrawer: () =>
      import(/* webpackChunkName: "app-drawer" */ "@/components/AppDrawer.vue"),
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ "@/components/AppBar.vue"),
  },
  computed: {},
  data: () => ({
    drawer: true,
  }),
  methods: {
    drawerOff() {
      this.drawer = !this.drawer;
    },
  },
  created() {},
};
</script>
