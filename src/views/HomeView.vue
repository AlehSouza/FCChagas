<template>
  <div class="container-home">
    <div class="home-left">
      <MenuComponent />
    </div>
    <div class="home-right">
      <div class="container-header">
        <router-link to="/novo-cliente">
          <button>
            Adicionar novo
          </button>
        </router-link>
      </div>
      <div class="home-right">
        <div class="container-loading" v-if="loading">
          <SpinnerComponent />
        </div>
        <div v-else class="container-customers">
          <div class="container-customers-search">
            <input v-model="search" type="text" placeholder="Digite Nome ou CPF para buscar um cliente "/>
            <button @click="searchCliente()">
              <img src="./../assets/lupa.png">
            </button>
          </div>
          <div
            class="item-customer"
            v-for="(customer, i) in customers"
            :key="i"
          >
            <div class="item-customer-header">
              <div>
                <label>
                  <span>{{ customer.clienteId }}</span> - {{ customer.nome }}
                </label>
              </div>
              <div>
                <router-link :to="{ path: '/detalhes-cliente/'+ customer.clienteId }">
                  <button>
                    <img src="./../assets/pencil.png" alt="">
                  </button>
                </router-link>
                <button class="del" @click="delCliente(customer.clienteId, customer.nome)">
                  <img src="./../assets/trash.png" alt="">
                </button>
              </div>
            </div>
            <div class="item-customer-body">
              <table>
                <thead>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>RG</th>
                  <th>Data de Nascimento</th>
                  <th>Data de Expedição</th>
                  <th>Orgão De Expedição</th>
                  <th>Estado</th>
                  <th>Estado Civil</th>
                  <th>Sexo</th>
                </thead>
                <tbody>
                  <td>{{customer.nome}}</td>
                  <td>{{applyCPFValueMask(customer.cpf)}}</td>
                  <td>{{customer.rg}}</td>
                  <td>{{applyDateValueMask(customer.dataNascimento)}}</td>
                  <td>{{applyDateValueMask(customer.dataExpedicao)}}</td>
                  <td>{{customer.orgaoExpedicao}}</td>
                  <td>{{customer.uf}}</td>
                  <td>{{customer.estadoCivil}}</td>
                  <td>{{customer.sexo}}</td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { applyDateValueMask, applyCPFValueMask } from './../utils'
import axios from 'axios'
import dataToBackEnd from '@/utils/dataToBackend'

export default {
  data () {
    return {
      loading: true,
      customers: [],
      search: '',
      applyDateValueMask,
      applyCPFValueMask
    }
  },
  components: {
    MenuComponent,
    SpinnerComponent
  },
  methods: {
    async getClientes () {
      try {
        axios
          .get(
            'https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Listar'
          )
          .then(({ data: res }) => {
            this.customers = res
          })
        setTimeout(() => {
          this.loading = !this.loading
        }, 1000)
      } catch (err) {
        console.error(err)
      }
    },
    async delCliente (id, name) {
      if (confirm('Tem certeza que deseja excluir o cliente ' + name + '?') === true) {
        try {
          axios.delete('https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Excluir/' + id).then(() => {
            this.updated = !this.updated
            this.loading = !this.loading
            this.getClientes()
          })
        } catch (err) {
          console.error(err)
        }
      }
    },
    searchCliente () {
      if (this.search === '') return
      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i].cpf === dataToBackEnd(this.search) || this.customers[i].nome === this.search) {
          this.$router.push('/detalhes-cliente/' + this.customers[i].clienteId)
          return
        }
      }
      alert('Nenhum dado foi encontrado! verifique novamente sua pesquisa')
    }
  },
  beforeMount () {
    this.getClientes()
  }
}
</script>

<style lang="scss" scoped>
.container-loading {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
}

.container-header {
  background-color: white;
  border-bottom: 1px solid #dee2e6;
  padding: 8px 20px;
  z-index: 0;
  justify-content: flex-end;
  display: flex;

  a{
    color: white;
    text-decoration: none;
    button {
      color: white;
      margin: 8px 0px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 5px;
      padding: 12px;
      outline: none;
      background-color: #ab0538;
      border: 2px solid #ab0538;
      cursor: pointer;
      &:hover {
        background-color: #cc1b50;
      }
  }
  }
}

.container-home {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.home-left {
  width: 12vw;
  max-width: 180px;
  min-width: 80px;
  height: 100%;
  border-right: 1px solid #dee2e6;
  background-color: white;
}

.home-right {
  width: 100%;
  height: 99.5vh;
  background-color: #f6f6f6;
  border-bottom: 5px solid #ab0538;
  flex-direction: column;
  overflow: auto;
  display: flex;
}

.container-customers {
  width: 75%;
  min-width: 900px;
  height: 100%;
  max-width: 1270px;
  margin: 25px auto;
  flex-direction: column;
  display: flex;
}

.container-customers-search{
  overflow: hidden;
  min-width: 900px;
  border-radius: 8px;
  border: 2px solid #dee2e6;
  margin-bottom: 25px;
  width: 100%;
  display: flex;
  input {
    width: 100%;
    padding: 16px;
  }
  button {
    background-color: #ab0538;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    img {
      width: 20px;
      margin: 0 8px;
    }
  }
  input, button{
      font-size: 14px;
      font-weight: 500;
      outline: none;
      border: 0px;
  }
}

.item-customer {
  width: auto;
  min-width: 900px;
  margin-bottom: 25px;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid #dee2e6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  flex-direction: column;
  display: flex;
  div {
    div{
      label {
        span {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        font-weight: bold;
        text-transform: capitalize;
      }
    }
  }

  .item-customer-header {
    text-align: left;
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid #dee2e6;
    justify-content: space-between;
    align-items: center;
    display: flex;
    div {
      display: flex;
      button {
        width: 30px;
        height: 30px;
        margin-left: 12px;
        font-size: 14px;
        border-radius: 5px;
        padding: 8px 12px;
        outline: none;
        color: white;
        border: 1px solid #dee2e6;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        display: flex;
        img {
          width: 12px;
          height: 12px;
        }
        &:hover {
          filter: contrast(0.5);
        }
      }
      .del {
        background-color: #ab0538;
      }
    }
  }

  .item-customer-body {
    table {
      width: 100%;
      border-spacing: 0ch;
      th {
        width: 11.1%;
        padding: 12px;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 1px solid #dee2e6;
      }
      td {
        width: 11.1%;
        padding: 12px;
        &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5){
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      }
    }
  }
}
</style>
