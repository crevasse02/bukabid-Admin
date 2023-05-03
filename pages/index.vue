<template>
  <div>
    <!-- carousel -->
    <v-carousel
      hide-delimiter-background
      :show-arrows="false"
      height="40vh"
      align="center"
      style="border-radius: 10px"
      cycle
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>

    <!-- event -->
    <br />
    <div v-if="userData && userData.id_mst_user_role != '4' && userData.id_mst_user_role != '1'" class="d-flex justify-center">
      <v-card
        width="40%"
        class="d-flex justify-space-between align-center pa-3"
        elevation="1"
      >
        <div class="d-flex">
          <v-icon class="pr-3" color="#194185">mdi-wallet-bifold-outline</v-icon>
          <v-card-text class="pa-0">
            Total saldo tersisa <br />
            <b>2</b>
          </v-card-text>
        </div>
        <v-btn @click="userData.id_mst_user_role == '2' ? $router.push('/transaksi/saldo/bidder'):$router.push('/transaksi/saldo/balailelang')" depressed dark style="border-radius: 10px" color="#1849A9"
          >Isi Saldo</v-btn
        >
      </v-card>
    </div>
    <div class="d-flex align-center">
      <h4>Lelang Hari Ini</h4>
      <v-spacer />
      <div>
        <NuxtLink
          to="/lelang/today"
          style="color: #2e90fa; text-decoration: none"
        >
          Lihat Semua</NuxtLink
        >
      </div>
    </div>
    <p class="text--secondary">
      Hanya 3 lelang ditampilkan, ketuk 'Lihat Semua' untuk melihat yang lain
    </p>
    <v-row v-if="listLelangToday">
      <v-col
        v-for="item in listLelangToday.data_event"
        :key="item.id"
        cols="12"
        sm="4"
      >
        <v-card :to="'/lelang/today?event=' + item.id" outlined class="pa-2">
          <div class="d-flex align-center">
            <div style="width: 95%">
              <v-list class="pa-0">
                <v-list-item class="pa-0">
                  <v-avatar>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                    ></v-img>
                  </v-avatar>
                  <v-list-item-content class="ml-2">
                    <h4>{{ item.nama_group }}</h4>
                    <div>Medan, Sumatera</div>
                  </v-list-item-content>
                </v-list-item>
                <div>
                  <h5 style="color: #e31b54">
                    {{
                      moment
                        .utc(item.tanggal_mulai)
                        .add(utc, 'h')
                        .format('HH:mm')
                    }}
                    18:00 WIB
                  </h5>
                </div>
              </v-list>
              <div class="d-flex align-center">
                <div>
                  <v-avatar v-if="item.photo_1" class="mx-1" tile>
                    <v-img :src="getImage(item.photo_1)"></v-img>
                  </v-avatar>
                  <v-avatar v-if="item.photo_2" class="mx-1" tile>
                    <v-img :src="getImage(item.photo_2)"></v-img>
                  </v-avatar>
                  <v-avatar v-if="item.photo_3" class="mx-1" tile>
                    <v-img :src="getImage(item.photo_3)"></v-img>
                  </v-avatar>
                  <v-avatar v-if="item.photo_4" class="mx-1" tile>
                    <v-img :src="getImage(item.photo_4)"></v-img>
                  </v-avatar>
                  <v-avatar v-if="item.photo_5" class="mx-1" tile>
                    <v-img :src="getImage(item.photo_5)"></v-img>
                  </v-avatar>
                </div>
              </div>
            </div>
            <v-spacer />
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="mt-2 d-flex justify-space-between">
      <h4 class="my-3">Jadwal Lelang Mendatang</h4>
    </div>
    <div v-if="listTanggalMendatang.length != 0">
      <v-sheet class="mx-auto" width="100%">
        <v-slide-group show-arrows>
          <v-slide-item v-for="item in listTanggalMendatang" :key="item.tanggal">
            <v-card
              :style="pickListLelangMendatang == item.tanggal ? 'background:#194185' : ''"
              @click="pickListLelangMendatang = item.tanggal"
              class="px-2 py-1 mx-1 my-1" elevation="0"
            >
              <center :style="pickListLelangMendatang == item.tanggal ? 'color:#fff' : 'color:#194185'"><b>{{ item.day_string }}</b> <br> {{ item.day }}</center>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
    <br />
    <v-row v-if="listEventMendatang.length != 0">
      <template v-for="item in listEventMendatang">
        <v-col
          :key="item.id"
          v-if="item.tanggal == pickListLelangMendatang"
          cols="12"
          sm="4"
        >
          <v-card :to="'/event/' + item.id" outlined class="pa-2">
            <div class="d-flex align-center">
              <div style="width: 95%">
                <v-list class="pa-0">
                  <v-list-item class="pa-0">
                    <v-avatar>
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                      ></v-img>
                    </v-avatar>
                    <v-list-item-content class="ml-2">
                      <h4>{{ item.nama_group }}</h4>
                      <div>Medan, Sumatera</div>
                    </v-list-item-content>
                  </v-list-item>
                  <div>
                    <h5 style="color: #e31b54">
                      {{
                        moment
                          .utc(item.tanggal_mulai)
                          .add(utc, 'h')
                          .format('HH:mm')
                      }}
                      18:00 WIB
                    </h5>
                  </div>
                </v-list>
                <div class="d-flex align-center">
                  <div>
                    <v-avatar v-if="item.photo_1" class="mx-1" tile>
                      <v-img :src="getImage(item.photo_1)"></v-img>
                    </v-avatar>
                    <v-avatar v-if="item.photo_2" class="mx-1" tile>
                      <v-img :src="getImage(item.photo_2)"></v-img>
                    </v-avatar>
                    <v-avatar v-if="item.photo_3" class="mx-1" tile>
                      <v-img :src="getImage(item.photo_3)"></v-img>
                    </v-avatar>
                    <v-avatar v-if="item.photo_4" class="mx-1" tile>
                      <v-img :src="getImage(item.photo_4)"></v-img>
                    </v-avatar>
                    <v-avatar v-if="item.photo_5" class="mx-1" tile>
                      <v-img :src="getImage(item.photo_5)"></v-img>
                    </v-avatar>
                  </div>
                </div>
              </div>
              <v-spacer />
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <!-- <v-tabs
      background-color="white"
      dark
      v-model="tabs"
      next-icon="fi-rr-angle-right"
      prev-icon="fi-rr-angle-left"
      show-arrows
      class="active"
    >
      <v-tabs-slider class="d-none"></v-tabs-slider>
      <v-tab v-for="i in 20" :key="i" :href="'#tab-' + i">
        <div>
          Item <br />
          {{ i }}
        </div>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <center>
        <div class="py-4">Minggu, 15 Februari 2023</div>
      </center>
      <v-tab-item
        v-for="i in 20"
        :key="i"
        :value="`tab-${i}`"
        :style="
          $vuetify.breakpoint.xs
            ? 'height: 200px; overflow-y: scroll'
            : 'height: 69vh; overflow-y: scroll'"
      >
        <div v-for="i in 4" :key="i">
          <v-row>
            <v-col cols="12" md="3" sm="3" v-for="i in 4" :key="i">
              <v-card
                class="my-2 d-flex align-center"
                style="border-radius: 10px"
                v-for="i in 3"
                :key="i"
                outlined
              >
                <div>
                  <div class="pt-3 px-5 d-flex align-center">
                    <v-avatar>
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                      ></v-img>
                    </v-avatar>
                    <div class="ml-3">
                      <h4>FIF Group Cabang Bekasi</h4>
                      <div class="d-flex justify-space-between">
                        <v-card-text class="pa-0"
                          >Bekasi, Jawa Barat</v-card-text
                        >
                      </div>
                    </div>
                  </div>
                  <div class="d-flex py-3 px-5" style="flex-wrap: wrap">
                    <div class="pa-2" v-for="i in 5" :key="i">
                      <v-avatar tile>
                        <v-img
                          style="border-radius: 5px"
                          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                        ></v-img>
                      </v-avatar>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-tab-item>
    </v-tabs-items> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DashboardPage',
  layout: 'default',

  data: () => ({
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
    tabs: null,
    listLelangComingSoon: [],
    listLelangToday: [],
    listLelangMendatang: [],
    pickListLelangMendatang:null,
    listTanggalMendatang:[],
    listEventMendatang:[]
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      prevUrl: 'prevUrl',
      guest: 'auth/guest',
      user: 'auth/user',
      utc: 'timezone/utc',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    test() {
      console.log(this.user)
    },
    async getLelangComingSoon() {
      var params = new URLSearchParams()

      //   params.append("id_parent_group", 69);
      // params.append("id_group", 69);
      params.append('berlangsung', 2)
      //   params.append("limit", 100);

      var request = {
        params: params,
      }
      await this.$axios
        .get('/iklan/v3/list_iklan_event_lelang_public', request)
        .then((response) => {
          let { data } = response.data
          this.listLelangComingSoon = data
          this.olahTanggalComingSoon()
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getLelangToday() {
      var params = new URLSearchParams()

      //   params.append("id_parent_group", 69);
      // params.append("id_group", 69);
      params.append('berlangsung', 1)
      //   params.append("limit", 100);

      var request = {
        params: params,
      }
      await this.$axios
        .get('/iklan/v3/list_iklan_event_lelang_public', request)
        .then((response) => {
          let { data } = response.data
          this.listLelangToday = data
          console.log('listLelangToday', this.listLelangToday)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async olahTanggalComingSoon() {
      this.listLelangMendatang = this.listLelangComingSoon.data_group_date.year_group
      console.log('listLelangComingSoon', this.listLelangMendatang)
      var listTanggal = []
      for (let i = 0; i < this.listLelangMendatang.length; i++) {
        for (let j = 0; j < this.listLelangMendatang[i].month_group.length; j++) {
          for (let k = 0; k < this.listLelangMendatang[i].month_group[j].day_group.length; k++) {
            for (let l = 0; l < this.listLelangMendatang[i].month_group[j].day_group[k].hour_group.length; l++) {
              for (let m = 0; m < this.listLelangMendatang[i].month_group[j].day_group[k].hour_group[l].minute_group.length; m++) {
                for (let n = 0; n < this.listLelangMendatang[i].month_group[j].day_group[k].hour_group[l].minute_group[m].data_event.length; n++) {
                  this.listLelangMendatang[i].month_group[j].day_group[k].hour_group[l].minute_group[m].data_event[n].tanggal = this.listLelangMendatang[i].year + '-' + this.listLelangMendatang[i].month_group[j].month + '-' + this.listLelangMendatang[i].month_group[j].day_group[k].day
                  this.listEventMendatang.push(this.listLelangMendatang[i].month_group[j].day_group[k].hour_group[l].minute_group[m].data_event[n])
                  if (!listTanggal.includes(this.listLelangMendatang[i].month_group[j].day_group[k].hour_group[l].minute_group[m].data_event[n].tanggal)) {
                    var dataTanggal = {
                      year: this.listLelangMendatang[i].year,
                      month: this.listLelangMendatang[i].month_group[j].month,
                      day: this.listLelangMendatang[i].month_group[j].day_group[k].day,
                      day_string: this.listLelangMendatang[i].month_group[j].day_group[k].string,
                      tanggal:this.listLelangMendatang[i].month_group[j].day_group[k].hour_group[l].minute_group[m].data_event[n].tanggal
                    }
                    this.listTanggalMendatang.push(dataTanggal)
                    listTanggal.push(this.listLelangMendatang[i].month_group[j].day_group[k].hour_group[l].minute_group[m].data_event[n].tanggal)
                  }
                  console.log('this.listEventMendatang', this.listEventMendatang)
                  console.log('eventnya nih jing', this.listLelangMendatang[i].month_group[j].day_group[k].hour_group[l].minute_group[m].data_event[n].tanggal)
                  console.log('lis tanggal', this.listTanggalMendatang)
                }
              }
            }
          }
        }
      }
      for (let x = 0; x < this.listEventMendatang.length; x++) {
        if (x == 0) {
          this.pickListLelangMendatang = this.listEventMendatang[x].tanggal
        }
      }
    },
    async getBid() {
      await this.$fire.firestore
        .collection('lelang')
        .doc('live_extra')
        .collection('1')
        .orderBy('BidOpen', 'desc')
        .onSnapshot((querySnapshot) => {
          this.liveBid = []
          let bidder = []
          querySnapshot.forEach((doc) => {
            bidder.push(doc.data())
            // this.minBid = bidder[0].Bid
            // this.penawaran = Number(this.minBid) + Number(this.iklan.kelipatan)
            // this.bid = this.penawaran
          })
          this.liveBid = bidder
          console.log(this.liveBid)
        })
    },
    toLelang(item) {
      this.$router.push('/detail-event/' + item.id)
    },
  },
  async created() {
    this.userData = this.$cookies.get('user')
    this.getLelangComingSoon()
    this.getLelangToday()
    // await this.getBid();
    // console.log('inii data yuser', this.user)
  },
}
</script>

<style>
.v-carousel__controls__item.v-btn.v-btn--icon {
  background-color: #c2c2c2;
  width: 10px;
  height: 10px;
}

.v-carousel__controls__item.v-btn.v-btn--icon.v-btn--active {
  background-color: #0b4a6f;
}

.v-carousel__controls__item.v-btn.v-btn--icon:hover {
  background-color: #0b4a6f;
}

.v-btn__content .v-icon {
  display: none;
}
.v-slide-group__next .v-icon {
  color: #0b4a6f;
}
.v-slide-group__prev .v-icon {
  color: #0b4a6f;
}
.active .v-tab--active {
  color: white !important;
  background-color: #194185 !important;
}
.v-tab:hover {
  background-color: #809ac74e !important;
  border-radius: 20px;
}
.v-tab {
  color: #194185 !important;
  border-radius: 20px;
}
</style>
