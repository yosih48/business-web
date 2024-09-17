<template>
  <v-container>
      <v-layout align-center justify-center v-if="!isLoading">
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  name="email"
                  label="email"
                  type="email"
                  v-model="login.email"
                ></v-text-field>
                <v-text-field
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  id="password"
                  name="password"
                  label="Password"
                  v-model="login.password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-subtitle >
            
              <router-link 
     
         class=""
            style="text-decoration: none"
       to="" @click="sendEmail">

       <p @click="sendEmail">שכחתי סיסמה</p>
       </router-link>
            </v-card-subtitle>
          
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="success" @click="userLogin"> התחבר</v-btn>
              <v-spacer></v-spacer>
              <v-row>
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      הירשם
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form ref="form" lazy-validation>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="user name"
                                v-model="user.usernamea"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                :rules="emailRules"
                                label="Email*"
                                v-model="user.emaila"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                :type="show1 ? 'text' : 'password'"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show1 = !show1"
                                :rules="[rules.required, rules.min]"
                                label="Password*"
                                v-model="user.passworda"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                :type="show2 ? 'text' : 'password'"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                @click:append="show2 = !show2"
                                label="Confirm Password*"
                                v-model="confirmPassword"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="
                          register();
                          dialog = false;
                        "
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card-actions>
          </v-card>
       
       

        </v-flex>
      </v-layout>
      <v-layout v-if="isLoading" align-center justify-center>
            <v-progress-circular
 
   indeterminate
   color="primary"
></v-progress-circular>

      </v-layout>
  </v-container>
</template>

<script>
// import firebase from "firebase";
// import { db } from '../main.js';
export default {
  name: 'HelloWorld',

  data() {
    return {
      isLoading: false,
      show1: false,
      show2: false,
      emailRules: [
        (v) => !!v || "חובה",
        (v) => /.+@.+\..+/.test(v) || " יש להזין כתובת אימייל חוקית ",
      ],
      rules: {
        required: (value) => !!value || "חובה.",
        min: (v) => v.length >= 4 || "מינימום 4 תווים",
      },
      dialog: false,

      login:{
     
        email: "",
        password: "",

      },
      user: {   
        usernamea: "",
      emaila: "",
      passworda: "",
      },

      confirmPassword: "",
   
      id: null,
    };
  },

  methods: {
        async someMethod() {
      // Using Firestore
      const docRef = doc(this.$db, "collection", "document");
      const docSnap = await getDoc(docRef);

      // Using Auth
      const user = this.$auth.currentUser;
    },

    sendEmail() {
        firebase
        .auth()
        .sendPasswordResetEmail(this.login.email)
        .then(() => {
            alert('Check your registered email to reset the password!')
            this.login = {   
              email: ''
            }
        }).catch((error) => {
          alert(error)
        })
    },
        userLogin() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.login.email, this.login.password)
          .then(() => {
            console.log("logged in");
 

        
        
            //           let clientData = {
            //   // id: data.id,
            //   name: this.login.email,
            //   // admin: data.admin,

            //   // token: data.newToken
            // };
            // localStorage.setItem("user", JSON.stringify(clientData));

            // this.checkLocal(JSON.parse(localStorage.user));
            // // console.log(this.clientInfo)
            this.$router.push('/fixtures')
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  }
  }







</script>
