export default {
  data() {
    return {
      fruta: '',
      frutas: ['banana', 'maca', 'laranja']
    }
  },
  methods: {
    add() {
      this.frutas.push(this.fruta)
      this.fruta = ''
    }
  }
}