<template>
  <div class="container-cliente">
    <div class="cliente-left">
      <MenuComponent />
    </div>
    <div class="cliente-right">
        <div v-if="!created">
          <div v-show="p1" class="cliente-form" id="form-p1">
              <h1>
                <img src="./../assets/person.png"/>
                Novo cliente
              </h1>
              <label>Nome</label>
              <input v-model="novoCliente.nome" maxlength="100"  type="text" required placeholder="Alexandre Souza"/>
              <label>CPF <i>*</i></label>
              <input v-model="novoCliente.cpf" maxlength="14" type="text" required placeholder="999.999.999-99"/>
              <label>RG</label>
              <input v-model="novoCliente.rg" type="text" required placeholder="999.999.99"/>
              <label>UF</label>
              <select v-model="novoCliente.uf" required>
                <option v-for="(estado, i) in estadosBr" v-bind:key="i" :value="estado.sigla">
                  {{estado.sigla}} - {{estado.extenso}}
                </option>
              </select>
              <label>Órgão Expedição</label>
              <select v-model="novoCliente.orgaoExpedicao" required>
                <option v-for="(org, i) in orgaosEmissores" v-bind:key="i" :value="org.sigla">
                  {{org.sigla}} - {{org.extenso}}
                </option>
              </select>
              <label>Data Expedição</label>
              <input v-model="novoCliente.dataExpedicao" type="datetime-local" required/>
              <label>Data de nascimento <i>*</i></label>
              <input v-model="novoCliente.dataNascimento" type="datetime-local" required/>
              <label>Sexo</label>
              <select v-model="novoCliente.sexo">
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
              <label>Estado Civil</label>
              <select v-model="novoCliente.estadoCivil" required>
                <option v-for="(estadoCivil, i) in estadosCivis" v-bind:key="i" :value="estadoCivil.value">
                  {{estadoCivil.label}}
                </option>
              </select>
              <button @click="step()">Avançar</button>
          </div>
          <div v-show="p2" class="cliente-form" id="form-p2">
            <h1>
                <img src="./../assets/pin.png"/>
                Endereço cliente
            </h1>
            <label>CEP</label>
            <input v-model="novoCliente.endereco.cep" maxlength="9" type="text" placeholder="Ex: 00000-000"/>
            <label>Logradouro</label>
            <input v-model="novoCliente.endereco.logradouro" type="text" placeholder="Ex: Av Paulista"/>
            <label>Numero</label>
            <input v-model="novoCliente.endereco.numero" type="text" placeholder="Ex: 1000"/>
            <label>Complemento</label>
            <input v-model="novoCliente.endereco.complemento" type="text" placeholder="Ex: De encontro com a Rua Augusta"/>
            <label>Bairro</label>
            <input v-model="novoCliente.endereco.bairro" type="text" placeholder="Ex: Bela Vista"/>
            <label>Cidade</label>
            <input v-model="novoCliente.endereco.cidade" type="text" placeholder="Ex: São Paulo"/>
            <label>UF</label>
            <select v-model="novoCliente.endereco.uf" required>
                <option v-for="(estado, i) in estadosBr" v-bind:key="i" :value="estado.sigla">
                  {{estado.sigla}} - {{estado.extenso}}
                </option>
              </select>
            <button @click="postNovoCliente()">Adicionar</button>
            <button class="back-btn" @click="step()">Voltar</button>
          </div>
        </div>
        <div v-else class="cliente-done">
          <img src="./../assets/check.png"/>
          <p>
            Sua solicitação foi cadastrada!
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
  </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue'
import { estadosBr, estadosCivis, orgaosEmissores, dataToBackEnd } from './../utils'
import axios from 'axios'

export default {
  data () {
    return {
      estadosBr,
      estadosCivis,
      orgaosEmissores,
      dataToBackEnd,
      p1: true,
      p2: false,
      created: false,
      novoCliente: {
        clientId: '',
        nome: '',
        cpf: '',
        rg: '',
        uf: '',
        orgaoExpedicao: '',
        dataExpedicao: '',
        dataNascimento: '',
        sexo: '',
        estadoCivil: '',
        endereco: {
          enderecoId: '',
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: ''
        }
      }
    }
  },
  components: {
    MenuComponent
  },
  methods: {
    step () {
      if (!this.novoCliente.cpf || !this.novoCliente.dataNascimento) return alert('Opa, não se esqueça de preencher o campo CPF e Data de Nascimento! ')
      this.p1 = !this.p1
      this.p2 = !this.p2
    },
    async getLista () {
      axios.get('https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Listar').then(({ data: res }) => {
        this.novoCliente.clientId = res[res.length - 1].clienteId + 1
        this.novoCliente.endereco.enderecoId = res[res.length - 1].endereco.enderecoId + 1
      })
    },
    async postNovoCliente () {
      try {
        axios.post('https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Adicionar', {
          ...this.novoCliente,
          cpf: dataToBackEnd(this.novoCliente.cpf),
          rg: dataToBackEnd(this.novoCliente.rg),
          endereco: {
            ...this.novoCliente.endereco,
            cep: dataToBackEnd(this.novoCliente.endereco.cep)
          }
        }).then(() => {
          this.created = !this.created
        })
      } catch (err) {
        console.error(err)
      }
    }
  },
  beforeMount () {
    this.getLista()
  }
}
</script>

<style lang="scss" scoped>
i {
  color: red;
}

.container-cliente {
  width: 100%;
  height: 100vh;
  display: flex;
}

.cliente-left {
  width: 12vw;
  max-width: 180px;
  min-width: 80px;
  height: 100%;
  border-right: 1px solid #dee2e6;
  background-color: white;
}

.cliente-right {
  width: 100%;
  height: 99vh;
  background-color: #f6f6f6;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  display: flex;
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

.cliente-form{
    width: 500px;
    padding: 12px;
    padding: 20px;
    margin-top: 20px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #dee2e6;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    flex-direction: column;
    display: flex;
    input, button, select, option {
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
    label {
        font-weight: bold;
        text-align: left;
        margin: 1px 0px;
    }
    .back-btn{
        border: 0px;
        background-color: transparent;
        color: #cc1b50;
        &:hover{
          background-color: unset;
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
</style>
