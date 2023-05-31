<template>
  <div class="container-home">
    <div class="home-left">
        <MenuComponent/>
    </div>
    <div class="home-right">
      asd
    </div>
  </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue'

export default {
  data () {
    return {

    }
  },

  components: {
    MenuComponent
  }
}
</script>

<style lang="scss" scoped>
.container-home {
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
}

.home-left {
  width: 140px;
  height: 100%;
  border-right: 1px solid #dee2e6;
}
.home-right {
  width: 100%;
  height: 100%;
}
</style>
