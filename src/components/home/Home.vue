<template>
  <div class="container">
    <input
      type="search"
      class="filtro"
      v-on:input="filtro = $event.target.value"
      placeholder="filtre por parte do título"
    />
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.id">
        <painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
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

export default {
  components: {
    Painel,
    ImagemResponsiva,
    Botao
  },

  data() {
    return {
      fotos: [],
      filtro: "",
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
    
      alert('Remover' + foto.titulo);

    }
  },
  created() {
    // buscando os dados na api
    let promisse = this.$http.get("http://localhost:3000/v1/fotos");
    promisse
      .then((res) => res.json())
      .then(
        (fotos) => (this.fotos = fotos),
        (err) => console.log(err)
      );
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
