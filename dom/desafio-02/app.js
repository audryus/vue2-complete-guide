new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods: {
        alerta() {
            alert('Alerta do Button')
        },
        armazena(event) {
            this.valor = event.target.value
        }
    }
})