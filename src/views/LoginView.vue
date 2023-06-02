<template>
  <div class="home">
    <div class="form">
      <img
        src="./../assets/user.png"
        alt="Usuário"
      />
      <label for="">Nome</label>
      <input v-model="email" type="text" placeholder="Usuário"/>
      <label for="">Senha</label>
      <input v-model="pass" type="password" placeholder="***********"/>
      <button @click="login()">Entrar</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import users from './../login/index'

export default {
  name: 'LoginView',

  data () {
    return {
      users,
      email: '',
      pass: ''
    }
  },

  components: {
    // HelloWorld
  },

  methods: {
    async login () {
      try {
        for (let i = 0; i < users.length; i++) {
          if (this.email.toLowerCase() === users[i].email.toLowerCase() && this.pass === users[i].pass) {
            console.log(users[i])
            localStorage.setItem('user', JSON.stringify(users[i]))
            this.$router.push('/home')
            return
          }
        }
        alert('Usuário ou senha incorretos, entre em contato com o administrador do sistema')
      } catch (err) {
        console.error(err)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 98vh;
  border-top: 8px solid #ab0538;
  background-image: url('../assets/logo.png');
  background-repeat: no-repeat;
  background-position: 40px 40px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.form {
  margin-top: -50px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;

  img {
    width: 160px;
    margin-bottom: 20px;
  }

  label {
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    text-align: left;
  }

  input, button {
    width: 280px;
    margin: 8px 0px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    border: 2px solid #dee2e6;
    padding: 12px;
    outline: none;
  }

  input:focus{
    border: 2px solid #ab0538;
  }

  button {
    width: 100%;
    cursor: pointer;
    color: white;
    background-color: #ab0538;
    border: 2px solid #ab0538;

    &:hover{
      background-color: #cc1b50;
    }
  }
}
</style>
