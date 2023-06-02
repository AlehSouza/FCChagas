<template>
  <div class="menu">
    <div class="icon-profile">
      <img src="../assets/user.png" alt="Usuário">
      <label for="">Usuario</label>
    </div>
    <nav>
      <router-link to="/home">Clientes</router-link>
      <router-link class="logout" to="/">Sair</router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.icon-profile {
  border-bottom: 1px solid #dee2e6;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  img {
    width: 50px;
    padding: 16px;
  }
  label {
    padding-bottom: 12px;
    font-weight: bold;
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

    &.router-link-exact-active {
      font-weight: 500;
      color: #ab0538;
    }
  }
}
</style>
