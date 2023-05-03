<template>
  <v-list dense class="selected_list">
    <div class="d-flex align-center">
      <v-card-text class="d-flex">
        <v-avatar size="40">
          <v-img src="/img/silelang_logo.webp"></v-img>
        </v-avatar>
        <v-img
          class="ml-3"
          max-height="100"
          max-width="100"
          contain
          src="/img/SiLelang.webp"
        ></v-img>
      </v-card-text>
      <v-btn
        depressed
        icon
        @click="$emit('drawerAction')"
        color="#667085"
        style="background-color: #f2f4f7; border-radius: 5px 0px 0px 5px"
      >
        <i class="fi-rr-angle-small-left d-flex align-center"></i>
      </v-btn>
    </div>
    <!-- <template v-for="item in menus">
      <v-list-item :key="item.title" link :to="item.title" class="my-3">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template> -->
    <template v-for="item in menus">
      <v-row v-if="item.heading" :key="item.heading" align="center">
        <v-col cols="6">
          <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
        </v-col>
        <v-col cols="6" class="text-center">
          <a href="#!" class="body-2 black--text">EDIT</a>
        </v-col>
      </v-row>
      <v-list-group
        v-else-if="item.children"
        :key="item.text"
        v-model="item.model"
        :append-icon="item['icon-alt']"
        link
        :to="item.title"
      >
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group>
          <v-list-item
            v-for="child in item.children"
            :key="child.text"
            link
            :to="child.title"
            class="pl-16"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
      <v-list-item-group v-else :key="item.title">
        <v-list-item link :to="item.title">
          <v-list-item-action>
            <v-icon size="25">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="pl-0">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="item.text == 'Beranda'"></v-divider>
      </v-list-item-group>
    </template>
    <v-btn v-if="userData && userData.id_mst_user_role == 1" width="100%" depressed @click="$cookies.remove('user'), $router.push('/login')">
      Logout</v-btn
    >
  </v-list>
</template>
<script>
// import axios from "axios";
export default {
  name: 'appdrawer',
  data: () => ({
    menus: [],
  }),
  async created() {
    this.userData = this.$cookies.get('user')
    await this.getPermission()
    // console.log(this.menus)
  },
  methods: {
    getPermission() {
      this.menus.push({
        icon: 'fi-rr-home',
        text: 'Beranda',
        title: '/',
      })
      this.menus.push({
        icon: 'fi-rr-user',
        text: 'User Data',
        title: '/userdata',
      })
    },
  },
}
</script>

<style>
.selected_list .v-list-item--active {
  background-color: none;
  border-right: 5px solid #194185;
  border-top-left-radius: 10px;
  color: #194185;
}
.selected_list .v-list-item--active .v-list-item__content .v-list-item__title {
  font-weight: 700;
}
</style>
