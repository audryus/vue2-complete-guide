new Vue({
  el: '#desafio',
  data: {
    name: 'My Name',
    age: 55,
    imageRef: 'https://en.wiktionary.org/wiki/playing_card#/media/File:Karty_do_gry_._Playing_card.JPG'
  },
  methods: {

    ageByThree: function() {
      return this.age * 3
    },
    random: function() {
      return Math.random()
    }

  }
})