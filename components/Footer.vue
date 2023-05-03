<template>
  <div>
    <v-card color="#F5FEFF">
      <v-container>
        <v-row>
          <v-col cols="6" sm="2">
            <h2 v-if="!$vuetify.breakpoint.xs">SiMotor</h2>
            <h3 v-else>SiMotor</h3>
            <a href="/tentang?tab=about" target="_blank">
              <div class="black--text" :style="$vuetify.breakpoint.xs ? 'font-size:14px':''">Tentang SiMotor</div></a
            >
            <a href="https://blog.simotor.id/" target="_blank">
              <div class="black--text" :style="$vuetify.breakpoint.xs ? 'font-size:14px':''">Blog</div></a
            >

            <a href="/tentang?tab=faq" target="_blank">
              <div class="black--text" :style="$vuetify.breakpoint.xs ? 'font-size:14px':''">FAQ</div></a
            >
            <h2 v-if="!$vuetify.breakpoint.xs">Ikuti Kami</h2>
            <h3 class="pt-2" v-else>Ikuti Kami</h3>
            <br />
            <v-row justify="space-around">
              <a
                href="https://www.facebook.com/OfficialSiMotor/"
                target="_blank"
              >
                <v-icon large color="blue">mdi-facebook</v-icon>
              </a>
              <a href="https://www.instagram.com/simotor.id/" target="_blank">
                <v-icon large color="purple">mdi-instagram</v-icon>
              </a>
              <a
                href="https://www.youtube.com/channel/UCBExlB0xnMoTDT8LwVKg9oA"
                target="_blank"
              >
                <v-icon large color="red">mdi-youtube</v-icon>
              </a>
              <a
                v-if="$vuetify.breakpoint.xs"
                href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
                target="_blank"
              >
                <br/>
                <v-img src="/img/playstore.png" width="120"></v-img>
              </a>
            </v-row>
          </v-col>

          <v-col cols="6" sm="4">
            <h2 v-if="!$vuetify.breakpoint.xs">Bantuan dan Panduan</h2>
            <h3 v-else>Bantuan dan Panduan</h3>
            <a href="/tentang?tab=bantuan" target="_blank">
              <div class="black--text" :style="$vuetify.breakpoint.xs ? 'font-size:14px':''">Bantuan SiMotor</div>
            </a>
            <a href="/tentang?tab=ketentuan" target="_blank">
              <div class="black--text" :style="$vuetify.breakpoint.xs ? 'font-size:14px':''">Ketentuan Penggunaan</div>
            </a>
            <a href="/tentang?tab=kebijakan" target="_blank">
              <div class="black--text" :style="$vuetify.breakpoint.xs ? 'font-size:14px':''">Kebijakan Privasi</div>
            </a>
            <a href="/tentang?tab=panduanpembeli" target="_blank">
              <div class="black--text" :style="$vuetify.breakpoint.xs ? 'font-size:14px':''">Panduan Penggunaan</div>
            </a>
            <a href="/tentang?tab=kodeetik" target="_blank">
              <div class="black--text" :style="$vuetify.breakpoint.xs ? 'font-size:14px':''">Kode Etik Pengguna</div>
            </a>
          </v-col>

          <v-col cols="12" sm="2"> </v-col>

          <v-spacer></v-spacer>

          <v-col v-if="!$vuetify.breakpoint.xs" cols="12" sm="2" align="center">
            <v-img src="/img/simotor-logo.webp" width="250"></v-img>
            <a
              href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
              target="_blank"
            >
              <br v-if="!$vuetify.breakpoint.xs" />
              <v-img src="/img/playstore.png" width="150"></v-img>
            </a>
          </v-col>
        </v-row>
      </v-container>
      <v-card-text class="text-center pt-5">
        <strong
          >&copy; {{ new Date().getFullYear() }} — Digital Nayaka
          Abhinaya</strong
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(VueGeolocation)

export default {
  name: 'App',
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ '@/components/Alert.vue'),
  },
  data: () => ({
    mounted: false,
    notif: '',
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      timezone: 'timezone/region',
      utc: 'timezone/utc',
    }),
  },
  methods: {
    ...mapActions({
      setAuth: 'auth/set',
      setAlert: 'alert/set',
      setTimezone: 'timezone/set',
    }),
    async oneSignal() {
      await this.$OneSignal.push(() => {
        this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
          if (isEnabled) {
            // console.log('Push notifications are enabled!')

            this.$OneSignal.getUserId().then((userId) => {
              // console.log('OneSignal User ID:', userId)
              this.notif = userId + '[web]'
            })
          } else {
            // console.log('Push notifications are not enabled yet.')
          }
        })
      })
    },
    async geolocation() {
      await this.$getLocation({
        enableHighAccuracy: true,
      })
    },
  },
  created() {
    let utc = this.moment().utcOffset() / 60 - 7

    if (utc == 0) {
      this.setTimezone({
        utc: utc,
        region: 'WIB',
      })
    }
    if (utc == 1) {
      this.setTimezone({
        utc: utc,
        region: 'WITA',
      })
    }
    if (utc == 2) {
      this.setTimezone({
        utc: utc,
        region: 'WIT',
      })
    }
  },
  async mounted() {
    this.mounted = true
    await this.oneSignal()
    // await this.geolocation()
  },
}
</script>

<style>
a:link {
  text-decoration: none;
}
</style>
