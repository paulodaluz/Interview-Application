<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Criar novo usuário</h4>
        <p class="category">Preencha todos os campos</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-95">
            <md-field>
              <label>Nome de usuário</label>
              <md-input v-model="username" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-95">
            <md-field>
              <label>Senha</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-95">
            <md-field>
              <label>Nome Completo</label>
              <md-input v-model="fullname" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-30">
              <md-checkbox v-model="write" true-value=true false-value=false>Permissão de Escrita</md-checkbox>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-30">
              <md-checkbox v-model="read" true-value=true false-value=false>Permissão de Leitura</md-checkbox>
          </div>
        </div>
      </md-card-content>

      <md-card-actions>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="addUser">Criar Usuário</md-button>
          </div>
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="userSaved">O usuário{{ lastUser }} foi salvo com sucesso!</md-snackbar>
    <md-snackbar :md-active.sync="error">{{ erro }}</md-snackbar>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      username: "",
      password: "",
      fullname: "",
      write: false,
      read: false,
      userSaved: null,
      lastUser: null,
      error: null,
      erro: null
    };
  },
  methods: {
    
    async addUser() {
      await axios({
        method: 'post', 
        url: 'http://localhost:3001/user', 
        data: {
          username: this.username,
          password: this.password,
          fullname: this.fullname,
          write: this.write,
          read: this.read
        }
      })
      .then(response => {
        this.lastUser = response.data.username;
        this.userSaved = true;
        this.clearForm();
        this.error = false
      })
      .catch(error => {
          this.error = true;
          this.erro = error.response.data[0].msg;
      })
    },
    clearForm () {
        this.username = null
        this.password = null
        this.fullname = null
        this.write = false
        this.read = false
      }
  }
};
</script>
<style></style>
