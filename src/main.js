import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPoeHBjqNEYksEnN0rlkgdbtxj-_0X0-A",
  authDomain: "businesses-239b9.firebaseapp.com",
  projectId: "businesses-239b9",
  storageBucket: "businesses-239b9.appspot.com",
  messagingSenderId: "964516205695",
  appId: "1:964516205695:web:4e446876b4557676561b4a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Create Vue app
const app = createApp(App);

// Make Firebase services available in all components
app.config.globalProperties.$auth = auth;
app.config.globalProperties.$db = db;

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
