<template>
  <div style="height: 100vh; width: 100vw">
    <v-row dense no-gutters>
      <v-col cols="12" sm="7 " align="center">
        <div
          v-if="!$vuetify.breakpoint.xs"
          class="d-flex align-center pa-16"
          style="
            height: 100vh;
            background: url('/img/bg_login.webp') no-repeat;
            background-size: cover;
          "
        >
          <v-card outlined class="ma-10 pa-10 styleCard">
            <h1 style="font-size: 51px" class="white--text text-left">
              Lelang barang-barang eksklusif dan dapatkan harga yang
              menguntungkan di aplikasi SiLelang
            </h1>
          </v-card>
        </div>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="12" sm="5">
        <!-- login -->
        <center
          style="width: 60%"
          :class="$vuetify.breakpoint.xs ? 'pt-15' : ''"
          v-if="otpView == false && methodView == false"
        >
          <v-img src="/img/login_avatar.webp"> </v-img>
          <v-card-title style="text-align: center" class="d-block">
            <span style="font-weight: 700; font-size: 24px">Masuk</span>
          </v-card-title>
          <v-card-subtitle class="text--secondary"
            >Masuk menggunakan nomor telepon kamu</v-card-subtitle
          >
          <v-form ref="form" v-model="validLogin" lazy-validation>
            <v-text-field
              v-model="phone"
              dense
              class="inputRadius"
              :rules="phoneRules"
              label="Nomor Telepon"
              outlined
              @keydown.enter.prevent="loginCheck"
            ></v-text-field>

            <v-btn
              color="#1849A9"
              @click="loginCheck()"
              width="100%"
              depressed
              class="white--text"
              :disabled="!validLogin || phone == ''"
              >Masuk</v-btn
            >
          </v-form>

          <v-divider class="mt-6"></v-divider>
          <v-card-subtitle class="text--secondary"
            >Belum punya akun?</v-card-subtitle
          >
          <NuxtLink
            to="/register"
            style="color: #194185; text-decoration: none; font-weight: 600"
          >
            Daftar Akun</NuxtLink
          >
        </center>

        <!-- metode pilih  -->
        <center style="width: 90%" v-else-if="methodView == true">
          <h3 class="text-center">Pilih metode verifikasi</h3>
          <v-card-subtitle class="text--secondary">
            Pilih salah satu metode dibawah ini untuk mendapatkan kode
            verifikasi
          </v-card-subtitle>

          <br />

          <v-row justify="center">
            <v-col cols="12" sm="5">
              <v-card rounded="lg" @click="waMethod">
                <v-list>
                  <v-list-item>
                    <v-list-item-icon style="width: 10%">
                      <v-icon color="#20929D" large>mdi-whatsapp</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="text-left">
                      <v-list-item-title class="teal--text">
                        WhatsApp ke
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        +62 {{ phone }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12" sm="5">
              <v-card rounded="lg" @click="smsMethod">
                <v-list>
                  <v-list-item>
                    <v-list-item-icon style="width: 10%">
                      <v-icon color="#20929D" large>mdi-message-text</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="text-left">
                      <v-list-item-title class="teal--text">
                        SMS ke
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        +62 {{ phone }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>

          <br />

          <v-card-text class="text--secondary" @click="changeNumber()">
            Bukan nomor Anda?
            <a style="color: #194185">Ubah sekarang</a>
          </v-card-text>
        </center>

        <!-- otp  -->
        <center style="width: 60%" v-else>
          <v-card-title
            style="text-align: center; font-weight: 600"
            class="d-block"
          >
            Verifikasi Kode OTP
          </v-card-title>
          <v-card-subtitle class="text--secondary"
            >Masukan kode verifikasi yang kami kirimkan ke nomor +62
            {{ phone }} melalui Whatsapp</v-card-subtitle
          >
          <div class="d-flex justify-center">
              <v-otp-input
                ref="otpInput"
                input-classes="inputOtp"
                separator=" "
                :num-inputs="6"
                :should-auto-focus="true"
                :is-input-num="true"
                @on-complete="handleOnComplete"
              />
          </div>
          <br />
          <v-btn
            color="#20929D"
            class="white--text"
            width="100%"
            @click="handleOnComplete()"
            >Verifikasi</v-btn
          >
          <v-card-text style="color: #194185">
            Kirim Ulang
            <countdown
              v-if="countDown"
              ref="countdown"
              :time="60 * 1000"
              @end="countDown = !countDown"
            >
              <template slot-scope="props">
                {{ props.seconds }} Detik.
              </template>
            </countdown>
            <a v-else @click="resendOtp"><b> Klik disini</b></a>
          </v-card-text>
          <v-card-text class="text--secondary" @click="changeNumber()">
            Bukan nomor Anda?
            <a style="color: #194185">Ubah sekarang</a>
          </v-card-text>
        </center>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
import OtpInput from "@bachdgvn/vue-otp-input";

Vue.component("v-otp-input", OtpInput);
export default {
  layout: "full",
  name: "LoginPage",
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ "@/components/AppBar.vue"),
  },
  data: () => ({
    phone: "",
    phoneRules: [
      (v) => !!v || "Nomor HP wajib diisi (Min 10, Max 13)",
      (v) => (v && v.length >= 10) || "Nomor HP wajib diisi (Min 10, Max 13)",
    ],
    validLogin: false,
    methodView: false,
    otpView: false,
    methodType: "",
    countDown: "",
    otp: "",
  }),
  computed: {
    ...mapGetters({
      user: "auth/user",
      prevUrl: "prevUrl",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
    }),
    handleOnComplete(value) {
      this.otp = this.$refs.otpInput.otp.toString().replace(/\,/g,"")
      console.log(this.otp)
      this.loginToDashboard();
    },
    changeNumber() {
      this.methodView = false;
      this.otpView = false;
      this.phone = "";
    },
    async loginCheck() {
      let formData = new FormData();

      formData.append("nomor_hp", this.phone);

      await this.$axios
        .post("/user/v3/user/logincheck", formData)
        .then(() => {
          this.methodView = true;
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
    async loginToDashboard() {
      let formData = new FormData();

      formData.append("nomor_hp", this.phone);
      formData.append("id_token", this.otp);
      // formData.append("id_one_signal", this.$root.$children[0].notif);

      await this.$axios
        .post("/user/v3/user/login", formData)
        .then((response) => {
          let { data } = response.data;
          this.setAuth(data[0]);
          this.$cookies.set("user", JSON.stringify(data[0]));
          this.setAlert({
            status: true,
            color: "success",
            text: "Selamat Datang " + this.user.nama,
          });
          if (this.$cookies.get("prevUrl") != null) {
            this.$router.push(this.$cookies.get("prevUrl"));
            this.$cookies.set("prevUrl", null);
          } else {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
    async waMethod() {
      let formData = new FormData();
      formData.set("nomor_hp", this.phone);
      await this.$axios
        .post("/user/v3/user/otpwarequest", formData)
        .then(() => {
          this.methodType = "wa";
          this.methodView = false;
          this.otpView = true;
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
    async smsMethod() {
      let formData = new FormData();
      formData.set("nomor_hp", this.phone);
      await this.$axios
        .post("/user/v3/user/otprequest", formData)
        .then(() => {
          this.methodType = "sms";
          this.methodView = false;
          this.otpView = true;
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
    async resendOtp() {
      if (this.methodType == "sms") {
        await this.smsMethod();
      } else {
        await this.waMethod();
      }
      this.countDown = !this.countDown;
    },
  },
  async created() {},
};
</script>

<style>
.styleCard {
  background: transparent !important;
  border-width: 2px !important;
  border-style: solid !important;
  border-image: linear-gradient(to left, #98f9ff, #cbbcfa) 1 !important;
  border-radius: 50em !important;
}
.inputOtp {
  width: 40px !important;
  height: 40px !important;
  padding: 5px !important;
  margin: 0 10px !important;
  font-size: 20px !important;
  border-bottom: 2px solid #305f72 !important;
  text-align: center !important;
}

@media only screen and (max-width: 600px) {
  .inputOtp {
    width: 30px !important;
    height: 30px !important;
    padding: 5px !important;
    margin: 0 10px !important;
    font-size: 15px !important;
    border-bottom: 2px solid #305f72 !important;
    text-align: center !important;
  }
}
</style>
