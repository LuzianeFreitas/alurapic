<template>
  <div class="container">
    <p v-show="mensagem" class="centralizado">{{mensagem}}</p>
    <input
      type="search"
      class="filtro"
      v-on:input="filtro = $event.target.value"
      placeholder="filtre por parte do título"
    />
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">
        <painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo" />
          <router-link :to="{ name: 'altera', params: { id: foto._id}}">
            <botao
              tipo="button"
              rotulo="alterar" 
            />
          </router-link>
          <botao
            tipo="button"
            rotulo="remover" 
            :confirmacao="true" 
            @botaoAtivado="remove(foto)"
            estilo="perigo"
          />
        </painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";

import transform  from '../../directives/Transform';

import FotoService from '../domain/foto/FotoService';

export default {
  components: {
    Painel,
    ImagemResponsiva,
    Botao
  },

  directives: {
    'meu-transform': transform
  },

  data() {
    return {
      fotos: [],
      filtro: "",
      mensagem: ''
    };
  },

  computed: {
    fotosComFiltro() {
      //   Se tem filtro
      if (this.filtro) {
        //   filtrar
        // Essa expressão regular faz uma varredura buscando o item filtrado
        // e o argumento i significa insensitive (ignora maiusculo e minusculo)
        let exp = new RegExp(this.filtro.trim(), "i");
        // retornar uma lista filtrada buscando pelo titulo o que foi digitado no filtro
        return this.fotos.filter((foto) => exp.test(foto.titulo));
      } else {
        //   se não retornar todas as fotos
        return this.fotos;
      }
    },
  },

  methods: {
    remove(foto) {
      this.service
        .apaga(foto._id)
        .then(()=> {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice,1);
            this.mensagem = 'Foto removida com sucesso';
          }, err => {
            this.mensagem = err.message
          })

    }
  },
  created() {

    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(
        (fotos) => (this.fotos = fotos),
        (err) => this.mensagem = err.message);

  },
};
</script>

<style lang="scss">
.titulo {
  text-align: center;
  color: rgb(116, 109, 109);
}

.filtro {
  display: block;
  height: 25px;
  width: 35%;

  border: 1px solid #D96704;
  border-radius: 5px;

  margin: 0 auto;
}

.filtro:focus {
  outline: none;
  border-color: #D96704;
  box-shadow: 0 0 2px #D96704;
}

.lista-fotos {
  list-style: none;

  .lista-fotos-item {
    display: inline-block;
  }
}
</style>
