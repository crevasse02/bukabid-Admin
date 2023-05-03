<template>
  <client-only>
    <div>
      <div v-if="dataUser">
        <div v-if="dataUser.id_mst_user_role !== 1" class="d-flex align-center">
          <v-btn
            v-if="drawer == false"
            depressed
            @click="$emit('drawerAction')"
            icon
            color="#667085"
            style="background-color: #f2f4f7; border-radius: 0px 5px 5px 0px"
          >
            <i class="fi-rr-angle-small-right d-flex align-center"></i>
          </v-btn>
          <v-card
            flat
            class="d-flex align-center ma-3"
            style="border-bottom: 1px solid #f2f4f7; border-radius: 0px"
            width="100%"
          >
            <v-card-text
              style="color: #194185; font-weight: 700; font-size: 16px"
              >Hai, {{ dataUser.nama }}</v-card-text
            >
            <v-spacer></v-spacer>
            <v-badge dot bordered color="error" overlap>
              <v-icon color="#194185">fi fi-rr-bell</v-icon>
            </v-badge>

            <v-menu offset-y rounded="lg">
              <template v-slot:activator="{ on }">
                <v-btn icon large v-on="on">
                  <v-avatar size="32px" item>
                    <v-img src="/img/profile.png" />
                  </v-avatar>
                </v-btn>
              </template>
              <v-list >
                <v-list-item
                  dense
                  v-for="(item, i) in items"
                  :two-line="item.title == 'profile' ? true : false"
                  :key="i"
                  :to="item.to"
                  :style="
                    i !== items.length - 1
                      ? 'border-bottom: 1px solid #e4e7ec;'
                      : ''
                  "
                  @click="item.title == 'Logout' ? logout() : ''"
                >
                  <v-list-item-avatar v-if="item.title == 'profile'">
                    <v-img src="/img/profile.png" />
                  </v-list-item-avatar>
                  <v-icon color="#B42318" v-if="item.title == 'Logout'"
                    >mdi-logout</v-icon
                  >
                  <v-list-item-content>
                    <v-list-item-title
                      :style="item.title == 'Logout' ? 'color:#B42318' : ''"
                      >{{
                        item.title == 'profile' ? user.nama : item.title
                      }}</v-list-item-title
                    >
                    <v-list-item-subtitle v-if="item.title == 'profile'">{{
                      user.mst_user_subrole ? user.mst_user_subrole : user.nomor_hp
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action v-if="item.title !== 'Logout'">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-divider></v-divider>
          </v-card>
        </div>
        <div
          v-else-if="dataUser.id_verifikasi_dokument_ktp !== 2"
          class="d-flex align-center"
          :style="$vuetify.breakpoint.xs ? 'flex-wrap:wrap;' : ''"
        >
          <v-btn
            v-if="drawer == false"
            depressed
            @click="$emit('drawerAction')"
            icon
            color="#667085"
            style="background-color: #f2f4f7; border-radius: 0px 5px 5px 0px"
          >
            <i class="fi-rr-angle-small-right d-flex align-center"></i>
          </v-btn>
          <v-card
            class="d-flex align-center ma-3"
            style="
              background: url('/img/upgrade_banner.webp');
              background-size: cover;
            "
            width="100%"
          >
            <v-card-text style="color: #194185; font-weight: 700"
              >Tingkatkan akunmu untuk akses lebih banyak!</v-card-text
            >
            <v-spacer></v-spacer>
            <v-btn
              style="
                border-radius: 10px;
                text-transform: capitalize;
                font-weight: 600;
              "
              color="#194185"
              class="mx-4"
              dark
              to="/upgrade"
              >Tingkatkan</v-btn
            >
          </v-card>
        </div>
        <div
          v-else
          class="d-flex align-center"
          :style="$vuetify.breakpoint.xs ? 'flex-wrap:wrap;' : ''"
        >
          <v-btn
            v-if="drawer == false"
            depressed
            @click="$emit('drawerAction')"
            icon
            color="#667085"
            style="background-color: #f2f4f7; border-radius: 0px 5px 5px 0px"
          >
            <i class="fi-rr-angle-small-right d-flex align-center"></i>
          </v-btn>
          <v-card
            class="d-flex align-center ma-3"
            style="
              background: url('/img/upgrade_banner.webp');
              background-size: cover;
            "
            width="100%"
          >
            <v-card-text style="color: #194185; font-weight: 700"
              >Akunmu telah ditingkatkan! Dan sedang kami verifikasi. Mohon
              tunggu</v-card-text
            >
            <v-spacer></v-spacer>
            <v-btn
              style="
                border-radius: 10px;
                text-transform: capitalize;
                font-weight: 600;
              "
              color="#194185"
              class="mx-4"
              dark
              @click="checkStatus()"
              >Cek Status</v-btn
            >
          </v-card>
        </div>
      </div>
      <div
        v-else
        class="d-flex align-center"
        :style="$vuetify.breakpoint.xs ? 'flex-wrap:wrap;' : ''"
      >
        <v-btn
          v-if="drawer == false"
          depressed
          @click="$emit('drawerAction')"
          icon
          color="#667085"
          style="background-color: #f2f4f7; border-radius: 0px 5px 5px 0px"
        >
          <i class="fi-rr-angle-small-right d-flex align-center"></i>
        </v-btn>
        <v-card
          class="d-flex align-center ma-3"
          style="
            background: url('/img/upgrade_banner.webp');
            background-size: cover;
          "
          width="100%"
        >
          <v-card-text style="color: #194185; font-weight: 700"
            >Ayo masuk ke akunmu untuk akses lebih banyak!</v-card-text
          >
          <v-spacer></v-spacer>
          <v-btn
            style="
              border-radius: 10px;
              text-transform: capitalize;
              font-weight: 600;
            "
            color="#194185"
            class="mx-4"
            dark
            to="/login"
            >Masuk</v-btn
          >
        </v-card>
      </div>
      <v-dialog v-model="dialogRefresh" persistent width="400px">
        <v-card class="pt-5">
          <center>
            <v-icon
              size="60"
              color="#1849A9"
              v-if="isUpgrade.id_mst_verifikasi_doc == 4"
            >
              fi-rr-triangle-warning</v-icon
            >
            <v-icon size="60" color="#1849A9" v-else>fi-rr-badge-check</v-icon>

            <v-card-text
              class="pa-3"
              v-if="isUpgrade.id_mst_verifikasi_doc == 4"
              >Akun anda telah ditolak, silahkan klik dibawah untuk
              melanjutkan!</v-card-text
            >
            <v-card-text class="pa-3" v-else
              >Akun anda telah terverifikasi, silahkan klik dibawah untuk
              melanjutkan!</v-card-text
            >
            <center>
              <div class="pb-10 pt-3">
                <v-card-actions>
                  <v-btn
                    color="#1849A9"
                    depressed
                    width="100%"
                    class="white--text"
                    @click="$router.go(0)"
                    >Muat Ulang</v-btn
                  >
                </v-card-actions>
              </div>
            </center>
          </center>
        </v-card>
      </v-dialog>
    </div>
  </client-only>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['drawer'],
  computed: {
    ...mapGetters({
      user: 'auth/user',
      prevUrl: 'prevUrl',
    }),
  },
  data: () => ({
    dataUser: [],
    isUpgrade: '',
    dialogRefresh: false,
    items: [],
  }),
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    async checkStatus() {
      let formData = new FormData()

      formData.append('nomor_hp', this.dataUser.nomor_hp)

      await this.$axios
        .post('/user/v3/user/logincheck', formData)
        .then((response) => {
          // console.log(response)
          this.isUpgrade = response.data.data
          var tempUser = this.$cookies.get('user')
          if (
            this.isUpgrade.id_mst_verifikasi_doc ==
            tempUser.id_verifikasi_dokument_ktp
          ) {
            this.setAlert({
              status: true,
              color: 'warning',
              text: 'Akun anda masih dalam proses verifikasi, mohon tunggu!',
            })
          } else {
            tempUser.id_verifikasi_dokument_ktp =
              this.isUpgrade.id_mst_verifikasi_doc
            tempUser.id_mst_user_role = this.isUpgrade.id_mst_user_role
            tempUser.id_mst_user_subrole = this.isUpgrade.id_mst_user_subrole
            tempUser.id_company = this.isUpgrade.id_company
            tempUser.id_branch = this.isUpgrade.id_branch
            tempUser.id_group = this.isUpgrade.id_group
            this.$cookies.set('user', tempUser)
            this.dialogRefresh = true
          }
        })
        .catch((error) => {
          // console.log(error)
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
    logout() {
      this.$cookies.remove('user')
      this.$router.push('/login')
    },
    permissionMenu() {
      this.items.push({
        title: 'profile',
        to: '/profile',
      })
      if (this.user.id_mst_user_role == '2') {
        this.items.push({
          title: 'Dompet',
          to: '#',
        })
        this.items.push({
          title: 'Alamat Saya',
          to: '#',
        })
        this.items.push({
          title: 'Rekening Bank',
          to: '#',
        })
      }
      this.items.push({
        title: 'Bantuan',
        to: '#',
      })
      this.items.push({
        title: 'Tentang Aplikasi',
        to: '#',
      })
      this.items.push({
        title: 'Logout',
      })
    },
  },
  async created() {
    this.dataUser = this.$cookies.get('user')
    await this.permissionMenu()
    // console.log('user bar', this.dataUser)
  },
}
</script>

<style></style>
