<template>
    <div class="componente">
        <h2>As Informações de Usuário</h2>
        <p>Vários detalhes...</p>
        <p>Nome do Usuario: <strong>{{ inverterNome() }} </strong></p>
        <p>Idade do Usuario <strong>{{idade}}</strong></p>
        <button @click="reiniciarNome">Reiniciar Nome</button>
        <button @click="reiniciarFn()">Reiniciar Nome do Pai</button>
    </div>
</template>

<script>
    import barramento from '@/barramento'

    export default {
        props: {
            idade: {
                type: Number
            },
            nome: {
                type: [String, Number],
                //required: true,
                // default: function() {
                //     return Array(10).fill(0).join(',')
                // },
                default: 'No name',
            },
            reiniciarFn: {
                type: Function
            }
        },
        data() {
            return {
                otherName: this.nome
            }
        },
        methods:{
            inverterNome() {
                if (typeof this.nome === 'string')
                    return this.nome.split('').reverse().join('')
                return this.nome
            },
            reiniciarNome() {
                // this.nome = 'Pedro'
                this.$emit('nomeMudou', 'Pedro')
            }
        },
        created() {
            barramento.quandoIdadeMudar(idade => {
                this.idade = idade
            } )
        }
    }
</script>

<style scoped>
    .componente {
        flex: 1;
        background-color: #ec485f;
        color: #fff;
    }
</style>
