<template>
  <div>
    <div class="icon-profile">
      <img src="../assets/user.png" alt="">
    </div>
    <nav>
      <router-link to="/home">Clientes</router-link>
      <router-link to="/">Sair</router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>

.icon-profile {
  background-color: #ffffff;
  img {
    width: 50px;
    padding: 16px;
  }
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

    &.router-link-exact-active {
      font-weight: 500;
      color: #ab0538;
    }
  }
}
</style>
