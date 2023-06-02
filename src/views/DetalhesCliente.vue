<template>
    <div class="container-detalhes-cliente">
    <div class="detalhes-cliente-left">
      <MenuComponent />
    </div>
    <div v-if="!updated" class="detalhes-cliente-right">
        <div class="float-back-btn" @click="back()">
            <img src="./../assets/arrow.png">
            <label>Voltar</label>
        </div>
        <div class="detalhes-cliente">
            <h1>
                <img src="./../assets/person.png">
                Detalhes cliente
            </h1>
            <div>
                <label>Nome</label>
                <input v-model="cliente.nome" type="text" required placeholder="Alexandre Souza"/>
            </div>
            <div>
                <label>CPF</label>
                <input v-model="cliente.cpf" type="text" required placeholder="999.999.999-99"/>
            </div>
            <div>
                <label>RG</label>
                <input v-model="cliente.rg" type="text" required placeholder="999.999.99"/>
            </div>
            <div>
                <label>UF</label>
                <select v-model="cliente.uf" required>
                    <option v-for="(estado, i) in estadosBr" v-bind:key="i" :value="estado.sigla">
                        {{estado.sigla}} - {{estado.extenso}}
                    </option>
                </select>
            </div>
            <div>
                <label>Órgão Expedição</label>
                <select v-model="cliente.orgaoExpedicao" required>
                    <option v-for="(org, i) in orgaosEmissores" v-bind:key="i" :value="org.sigla">
                        {{org.sigla}} - {{org.extenso}}
                    </option>
                </select>
            </div>
            <div>
                <label>Data Expedição</label>
                <input v-model="cliente.dataExpedicao" type="datetime-local" required/>
            </div>
            <div>
                <label>Data de nascimento</label>
                <input v-model="cliente.dataNascimento" type="datetime-local" required/>
            </div>
            <div>
                <label>Sexo</label>
                <select v-model="cliente.sexo">
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
            <div>
                <label>Estado Civil</label>
                <select v-model="cliente.estadoCivil" required>
                    <option v-for="(estadoCivil, i) in estadosCivis" v-bind:key="i" :value="estadoCivil.value">
                        {{estadoCivil.label}}
                    </option>
                </select>
            </div>
        </div>
        <div class="detalhes-cliente">
             <h1>
                <img class="filtered" src="./../assets/pencil.png">
                Endereço cliente
            </h1>
            <div>
                <label>CEP</label>
                <input v-model="cliente.endereco.cep" type="text" placeholder="Ex: 00000-000"/>
            </div>
            <div>
                <label>Logradouro</label>
                <input v-model="cliente.endereco.logradouro" type="text" placeholder="Ex: Av Paulista"/>
            </div>
            <div>
                <label>Numero</label>
                <input v-model="cliente.endereco.numero" type="text" placeholder="Ex: 1000"/>
            </div>
            <div>
                <label>Complemento</label>
                <input v-model="cliente.endereco.complemento" type="text" placeholder="Ex: De encontro com a Rua Augusta"/>
            </div>
            <div>
                <label>Bairro</label>
                <input v-model="cliente.endereco.bairro" type="text" placeholder="Ex: Bela Vista"/>
            </div>
            <div>
                <label>Cidade</label>
                <input v-model="cliente.endereco.cidade" type="text" placeholder="Ex: São Paulo"/>
            </div>
            <div>
                <label>UF</label>
                <select v-model="cliente.endereco.uf" required>
                    <option v-for="(estado, i) in estadosBr" v-bind:key="i" :value="estado.sigla">
                        {{estado.sigla}} - {{estado.extenso}}
                    </option>
                </select>
            </div>

        </div>
        <div class="detalhes-actions">
            <button @click="delCliente()">Excluir</button>
            <button @click="putCliente()">Atualizar</button>
        </div>
    </div>
    <div v-else class="cliente-done">
        <img src="./../assets/check.png"/>
        <p>
            Sua solicitação foi Atualizada!
            <br/>
            retorne para página de Clientes para conferir =)
            <br/>
            <router-link to="/home">
                <img src="./../assets/arrow.png"/>
                Ir a página de clientes
            </router-link>
        </p>
    </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue'
import { estadosCivis, estadosBr, orgaosEmissores } from '@/utils'
import axios from 'axios'
export default {
  data () {
    return {
      orgaosEmissores,
      estadosBr,
      estadosCivis,
      updated: false,
      cliente: {}
    }
  },
  components: {
    MenuComponent
  },
  methods: {
    back () {
      this.$router.back()
    },
    async getCliente () {
      try {
        await axios.get('https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/ListarPorId/' + this.$route.params.id).then((res) => {
          this.cliente = res.data
        })
      } catch (err) {
        console.error(err)
      }
    },
    async putCliente () {
      try {
        await axios.put('https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Alterar', this.cliente).then(() => {
          this.updated = !this.updated
        })
      } catch (err) {
        console.error(err)
      }
    },
    async delCliente () {
      if (confirm('Tem certeza que deseja excluir o cliente ' + this.cliente.nome + '?') === true) {
        try {
          axios.delete('https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Excluir/' + this.cliente.clienteId).then(() => {
            this.updated = !this.updated
          })
        } catch (err) {
          console.error(err)
        }
      }
    }
  },
  beforeMount () {
    this.getCliente()
  }
}
</script>

<style lang="scss" scoped>
.float-back-btn {
    border: 2px solid #ab0538;
    padding: 12px 20px;
    border-radius: 5px;
    position: absolute;
    position: absolute;
    right: 40px;
    top: 40px;
    cursor: pointer;
    text-decoration: none;
    color: #ab0538;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    img {
        width: 12px;
        height: 12px;
        transform: rotate(180deg);
        margin-right: 8px;
    }
}

.container-detalhes-cliente {
  width: 100%;
  height: 100vh;
  display: flex;
}

.detalhes-cliente-left {
  width: 12vw;
  max-width: 180px;
  min-width: 80px;
  height: 100%;
  border-right: 1px solid #dee2e6;
  background-color: white;
}

.detalhes-cliente-right {
  width: 100%;
  height: 99vh;
  padding-top: 20px;
  background-color: #f6f6f6;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  display: flex;
}

.detalhes-cliente {
    width: 700px;
    padding: 12px;
    margin: 15px auto;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 1 1 320;
    display: flex;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #dee2e6;
    div {
        width: 31%;
        margin: 1%;
        text-align: left;
        justify-content: left;
        flex-direction: column;
        display: flex;
        label {
            font-weight: 400;
        }
    }
    input, select{
        margin: 8px 0px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 8px;
        border: 2px solid #dee2e6;
        padding: 12px;
        outline: none;
    }
}

h1{
    width: 100%;
    text-align: left;
    font-size: 18px;
    padding: 20px;
    margin: 0px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #ab0538;
    color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    align-items: center;
    display: flex;
    img {
      width: 22px;
      margin-right: 12px;
    }
}

.filtered{
    filter: invert(1);
}

.detalhes-actions{
    width: 720px;
    justify-content: flex-end;
    display: flex;
    button{
        width: 120px;
        font-size: 14px;
        font-weight: 500;
        margin-left: 12px;
        border-radius: 8px;
        border: 2px solid #dee2e6;
        padding: 12px;
        outline: none;
        cursor: pointer;
        color: white;
        background-color: #ab0538;
        border: 2px solid #ab0538;
        &:hover{
            background-color: #cc1b50;
        }
        &:nth-child(1){
            font-weight: bold;
            background-color: transparent;
            border: 2px solid #c73333;
            color: #c73333;
        }
    }
}

.cliente-done{
  width: 500px;
  margin: auto;
  img {
    width: 120px
  }
  p {
    font-size: 18px;
    line-height: 30px;
    font-weight: 500;
    a{
      color: #ab0538;
      margin-top: 35px;
      text-decoration: none;
      justify-content: center;
      align-items: center;
      display: flex;
      img{
        width: 15px;
        transform: rotate(180deg);
        margin-right: 12px;
      }
    }
  }
}

@media screen and (max-width: 1175px) {
  .float-back-btn {
    display: none;
  }
  .detalhes-cliente-left {
    max-width: 40px;
    min-width: 40px;
  }
  .detalhes-cliente-right{
    padding-top: 0px;
    overflow-x: hidden;
  }
  .detalhes-cliente {
    flex: unset;
    flex-direction: column;
    width: 75vw;
    h1 {
      width: 100%;
    }
    div {
      width: 98%;
    }
  }
  .detalhes-actions {
    width: 75vw;
    padding-bottom: 24px;
  }
}

</style>
