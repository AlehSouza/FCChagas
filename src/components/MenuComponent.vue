<template>
  <div class="menu">
    <div class="icon-profile">
      <div class="icon-profile-image" :src="user.img" alt="Usuário" v-bind:style="{ backgroundImage: 'url('+ user.img +')' }"/>
      <label for="">{{ user.name }}</label>
      <span for="">{{ user.email }}</span>
    </div>
    <nav>
      <router-link to="/home">
        <img src="./../assets/clientes.png"/>
        Clientes
      </router-link>
      <router-link class="logout" to="/">
        <img src="./../assets/sair.png"/>
        Sair
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style lang="scss" scoped>
.icon-profile {
  border-bottom: 1px solid #dee2e6;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  .icon-profile-image {
    width: 30px;
    height: 30px;
    border: 4px solid #ab0538;
    background-size: cover;
    border-radius: 50%;
    padding: 16px;
    margin: 25px;
    margin-bottom: 5px;
  }
  label {
    font-weight: bold;
  }
  span {
    font-size: 12px;
    font-weight: 500;
    padding-top: 0px;
    padding: 12px;
  }
}

.logout {
  background-color: #ab0538;
  color: white
}

nav {
  flex-direction: column;
  display: flex;
  a {
    text-align: left;
    font-weight: bold;
    padding: 12px;
    color: #000;
    text-decoration: none;
    font-weight: 400;
    align-items: center;
    display: flex;
    img {
      width: 20px;
      margin-right: 10px;
    }
    &.router-link-exact-active {
      font-weight: 500;
      color: #ab0538;
    }
  }
}
</style>
