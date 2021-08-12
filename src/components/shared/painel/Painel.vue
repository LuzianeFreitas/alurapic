<template>
  <div class="painel">
    <h2 class="painel-titulo" @dblclick="visivel = !visivel">{{ titulo }}</h2>
    <transition name="painel-fade">
      <div class="painel-conteudo" v-show="visivel">
        <slot> </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["titulo"],

  data() {
    return {
      visivel: true,
    };
  },
};
</script>

<style lang="scss" scoped>
/* estilo do painel */

.painel {
  padding: 0 auto;
  border: solid 1px #F29F05;
  display: inline-block;
  margin: 5px;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;

  border-radius: 5px;

  .painel-titulo {
    text-align: center;
    background: #D96704;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 50px;
  }


  .painel-fade-enter,
  .painel-fade-leave-active {
      opacity: 0;
  }

  .painel-fade-enter-active,
  .painel-fade-leave-active {
      transition: opacity 0.4s;
  }

  .painel-conteudo {
    overflow: hidden;
  }
}
</style>
