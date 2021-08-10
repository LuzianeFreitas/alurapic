<template>
    <button @click="disparaAcao()" class="botao" :class="estiloDobotao" :type="tipo">{{ rotulo }}</button>
</template>

<script>
export default {
    props: {
        tipo: {
            type: String,
            required: true
        },
        rotulo: {
            type: String,
            required: true
        },
        confirmacao: Boolean,
        estilo: String
    },
    methods: {
        disparaAcao() {
            if(this.confirmacao) {
                if(confirm('Confirma operação?')) {
                    this.$emit('botaoAtivado')
                }
                return;    
            }
            this.$emit('botaoAtivado');  
        }
    },

    computed: {
        estiloDobotao() {
            if(this.estilo == 'padrao' || !this.estilo) return 'botao-padrao';
            if(this.estilo == 'perigo') return 'botao-perigo';
        }
    }
    
    
}
</script>

<style scoped>
    .botao {
        display: inline-block;
        padding: 5px;
        border-radius: 3px;
        border: 1px solid;
        font-size: 1rem;

        margin-bottom: 1rem;
        margin-top: 0.5rem;

        cursor: pointer;
    }

    .botao-perigo {
        background: #f23c05;
        color: white;
    }

    .botao-padrao {
        background: darkcyan;
        color: white;
    }
</style>