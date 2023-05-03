<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :disabled="item.disabled">
          <v-card flat :to="item.to" :style="`color: ${item.color}`">
            <b>{{ item.text }}</b>
          </v-card>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <div style="float: right">
          <v-tabs v-model="tabManajemen" color="#1849A9">
            <v-tab>Aktif</v-tab>
            <v-tab>Diblokir</v-tab>
          </v-tabs>
        </div>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tabManajemen">
      <v-tab-item>
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="12"
            :style="
              $vuetify.breakpoint.xs
                ? ' border-bottom: 1px solid #0000000D'
                : ''
            "
          >
            <div>
              <v-card-text class="py-0"><h3>Pengguna Aktif</h3></v-card-text>

              <div class="pa-4 d-flex align-center">
                <v-btn class="mr-3" color="#98A2B3" text depressed>
                  <v-icon>mdi-filter-outline</v-icon> filter</v-btn
                >
                <v-text-field
                  outlined
                  hide-details
                  dense
                  label="Cari"
                  prepend-inner-icon="mdi-magnify"
                >
                </v-text-field>

                <v-btn
                  v-if="bankSelected.length > 0"
                  color="#B42318"
                  class="ml-3"
                  depressed
                  dark
                  ><v-icon small class="pr-2">mdi-trash-can-outline</v-icon>
                  Hapus</v-btn
                >
              </div>

              <v-data-table
                :headers="headersBank"
                show-select
                v-model="bankSelected"
                :items="bankData"
                hide-default-footer
                :loading="false"
                loading-text="Sedang Memuat Data...Mohon Tunggu"
              >
                <template v-slot:[`item.aksi`]="{ item }">
                  <v-btn small icon @click="selectHo(item.id, item.no_telp)">
                    <v-icon color="#101828">mdi-trash-can-outline</v-icon>
                  </v-btn>
                  <v-btn small icon @click="selectForDelete(item.id)">
                    <v-icon color="#101828">mdi-lock</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </div>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="12"
            :style="
              $vuetify.breakpoint.xs
                ? ' border-bottom: 1px solid #0000000D'
                : ''
            "
          >
            <div>
              <v-card-text class="py-0"><h3>Pengguna Diblokir</h3></v-card-text>
              <div class="pa-4 d-flex align-center">
                <v-btn class="mr-3" color="#98A2B3" text depressed>
                  <v-icon>mdi-filter-outline</v-icon> filter</v-btn
                >
                <v-text-field
                  outlined
                  hide-details
                  dense
                  label="Cari"
                  prepend-inner-icon="mdi-magnify"
                >
                </v-text-field>

                <v-btn
                  v-if="bankSelected.length > 0"
                  color="#B42318"
                  class="ml-3"
                  depressed
                  dark
                  ><v-icon small class="pr-2">mdi-trash-can-outline</v-icon>
                  Hapus</v-btn
                >
              </div>

              <v-data-table
                :headers="headersBank"
                show-select
                v-model="bankSelected"
                :items="bankData"
                hide-default-footer
                :loading="false"
                loading-text="Sedang Memuat Data...Mohon Tunggu"
              >
                <template v-slot:[`item.aksi`]="{ item }">
                  <v-btn small icon @click="selectHo(item.id, item.no_telp)">
                    <v-icon color="#101828">mdi-trash-can-outline</v-icon>
                  </v-btn>
                  <v-btn small icon @click="selectForDelete(item.id)">
                    <v-icon color="#101828">mdi-lock-open</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </div>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      items: [
        {
          text: 'Beranda',
          disabled: false,
          link: true,
          to: '/',
          color: '#98A2B3',
        },
        {
          text: 'Akun Bank',
          disabled: false,
          link: true,
          to: '',
          color: '#194185',
        },
      ],
      headersBank: [
        { text: 'Bank', value: 'nama_user', sortable: true },
        { text: 'Nama Pemilik', value: 'no_telp', sortable: true },
        { text: 'No Rekening', value: 'no_rek', sortable: true },
        { text: 'Cabang', value: 'cabang', sortable: true },
        { text: 'Jenis', value: 'jenis', sortable: true },
        { text: 'Tindakan', value: 'aksi', sortable: false },
      ],
      bankData: [],
      bankSelected: [],
      bankList: [],
      dialogAccBank: false,

      accBankUserDetail: {
        accBranch: '',
        accName: '',
        accNumber: '',
        telpNumber: '',
        bankId: '',
        isRepay: false,
        isDeposit: false,
      },

      accNameRules: [(v) => !!v || 'Nama Pemilik wajib diisi'],
      accNumberRules: [(v) => !!v || 'Nomor Rekening wajib diisi'],
      tabManajemen: null,
      telpNumberRules: [(v) => !!v || 'Nomor Telepon wajib diisi'],
      isAccValid: false,
    }
  },
  methods: {
    async getBankList() {
      await this.$axios
        .get('/master/v3/mst_bank')
        .then((response) => {
          this.bankList = response.data.data
          console.log('bankkk', this.bankList)
        })
        .catch((error) => {
          let responses = error.response.data.data

          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
  },
  async created() {
    await this.getBankList()
  },
}
</script>

<style>
</style>