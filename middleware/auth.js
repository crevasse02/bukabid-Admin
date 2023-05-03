export default function ({ app, route, redirect }) {
  if (route.path == '/login' || route.path == '/register') {
    if (app.$cookies.get('user') != null) {
      return redirect('/')
    }
  }

  if (route.path == '/seller/add' || 
    route.path == '/garage/add-unit' || 
    route.path == '/harga-pasar' || 
    route.path == '/ticket' || 
    route.path == '/message' || 
    route.path == '/refund' || 
    route.path == '/detail-transaksi/ticket/:id' || 
    route.path == '/add-unit' || 
    route.path == '/add-ads' || 
    route.path == '/account/profile/umum' || 
    route.path == '/detail-transaksi/unit/:id' ||
    route.path == '/account/profile/penjual' || 
    route.path == '/account/profile/notifikasi' || 
    route.path == '/account/profile/report' || 
    route.path == '/account/profile/list-subs' || 
    route.path == '/account/profile/add-subscription' || 
    route.path == '/account/profile/transaksitb' || 
    route.path == '/account/profile/rekening' || 
    route.path == '/account/profile/aktivitas' || 
    route.path == '/account/profile/iklan-garasi' || 
    route.path == '/account/profile/favorit' || 
    route.path == '/account/profile/ulasan' || 
    route.path == '/messages') {
    if (app.$cookies.get('user') == null) {
      app.$cookies.set('prevUrl', route.path)
      return redirect('/login')
    }
  }
}
