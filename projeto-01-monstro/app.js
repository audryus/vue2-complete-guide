new Vue({
  el: '#app',
  data: {
    logs: [],
    running: false,
    playerLife: 100,
    monsterLife: 100,
  },
  watch: {
    hasResult(value) {
      if (value) {
        this.running = false
      }
    },
  },
  computed: {
    hasResult() {
      return this.playerLife == 0  || this.monsterLife == 0
    }
  },
  methods: {
    startGame() {
      this.running = true
      this.playerLife = 100
      this.monsterLife = 100
      this.logs = []
    },
    attack(isSpecial) {
      this.hurt('monsterLife', 5, 10, isSpecial, 'Player', 'Monster', 'player')
      if (this.monsterLife > 0)
        this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'monster')
    },
    hurt(prop, min, max, isSpecial, source, target, cls) {
      const plus = isSpecial ? 5 : 0
      const hurt = this.getRandom(min + plus, max + plus)
      this[prop] = Math.max(this[prop] - hurt, 0)
      this.registerLog(`${source} damaged ${target} with ${hurt}.`, cls)
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min
      return Math.round(value)
    },
    healAndHurt() {
      this.heal(10, 15)
      this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'monster')
    },
    heal(min, max) {
      const heal = this.getRandom(min, max)
      this.playerLife = Math.min(this.playerLife + heal, 100)
      this.registerLog(`Player healed by ${heal}.`, 'heal')
    },
    registerLog(text, cls) {
      this.logs.unshift({text, cls})
    },
  },
});
