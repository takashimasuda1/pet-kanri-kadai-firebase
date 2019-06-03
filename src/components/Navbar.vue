 <template>
  <nav>
      <div class="nav-wrapper green">
        <div class="container">
          <router-link to="/" class="brand-logo">里親募集 | ジモティー</router-link>    
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li v-if="isLoggedIn"><span class="email black-text">{{currentUser}}</span></li>
            <li v-if="isLoggedIn"><router-link to="/">親里募集中リスト</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/login">ログイン</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/register">登録する</router-link></li>
             <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">ログアウト</button></li>
             
          </ul>
          <ul class="side-nav" id="mobile-demo">
            <li v-if="isLoggedIn"><router-link to="/">親里募集中リスト</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/login">ログイン</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/register">登録する</router-link></li>
            <li><a href="#" class="divider"></a></li>
             <li v-if="isLoggedIn"><button v-on:click="logout" class="btn">ログアウト</button></li>
           
          </ul>
        </div>
      </div>
    </nav>
  </template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>