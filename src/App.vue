<template>
  <div id="app">
    <navigation></navigation>
    <app-nav></app-nav>  <!--네비게이션의 템플릿(nav)가 들어온다.-->
    <router-view></router-view>
    <app-header class = "header">
      <button type="button" class="btn btn-outline-primary btn-sm" style="float:left; padding:10px;">
        <router-link to="/">홈</router-link>
      </button>
      <div v-show="isLogged">
      <button type="button" class="btn btn-outline-primary btn-sm" style="float:right; padding:5px;" @click.postevent="logOut">
        <router-link to="/">로그아웃</router-link>
      </button>
      </div>
      <div v-show="!isLogged">
        <button type="button" class="btn btn-outline-primary btn-sm" style="float:right; padding:5px;">
          <router-link to="/login">고객 로그인</router-link>
        </button>
        <button type="button" class="btn btn-outline-primary btn-sm" style="float:right; padding:5px;">
          <router-link to="/login_em">직원 로그인</router-link>
        </button>
      </div>

        <br/>
          <ul class="nav justify-content-center">
            <li class="nav-item" v-show="isLogged && getAuthLevel == 4">
              <a class="nav-link active"><router-link to="/reservation">예약</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><router-link to="/question">질문게시판</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><router-link to="/review">후기게시판</router-link></a>
            </li>
            <li class="nav-item" v-show="isLogged && getAuthLevel == 4">
              <a class="nav-link"><router-link to="/log">수리기록</router-link></a>
            </li>
            <li class="nav-item" v-show="isLogged && getAuthLevel < 2">
              <a class="nav-link"><router-link to="/log_em">총 수리기록</router-link></a>
            </li>
            <li class="nav-item" v-show="isLogged && getAuthLevel < 2">
              <a class="nav-link"><router-link to="/receipt">접수</router-link></a>
            </li>
            <li class="nav-item" v-show="isLogged && getAuthLevel == 4">
              <a class="nav-link"><router-link to="/car_info">차량</router-link></a>
            </li>
            <li class="nav-item" v-show="isLogged && getAuthLevel < 2">
              <a class="nav-link"><router-link to="/comment">댓글 현황</router-link></a>
            </li>
            <li class="nav-item" v-show="isLogged && getAuthLevel < 2">
              <a class="nav-link"><router-link to="/reserv_em">예약 현황</router-link></a>
            </li>
          </ul>
    </app-header>
    <div class="footer">
      연락처 : 010-8763-8915<br/>
      Made by 권정훈, 박광석 최유진<br/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    isLogged () {
      console.log(this.$store.getters.isLogged)
      return this.$store.getters.isLogged
    },
    getAuthLevel() {
      return this.$store.getters.getAuthLevel
    }
  },
  methods: {
    logOut(data){
        console.log(data)
        this.$store.commit('logOut', {
            id: '',
            password: ''
        })
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header{
  position : fixed;
  left : 0;
  top : 0;
  width: 100%;
  background-color: white;
  color: balck;
  text-align: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  margin-bottom: 50px;
  margin-top: 3px;
}
.footer {
  position : fixed;
  left : 0;
  bottom : 0;
  width : 100%;
  background-color: #2c3e50;
  color : white;
  text-align: center;
  margin-top: 30px;
}
.nav-itme{
  color: #42b983;
}
</style>
