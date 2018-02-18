<template>
  <div class="flash-box">
    <div
      v-for="(card, id) in cards"
      :key="id"
      :class="card.cardClass"
      @click="dismiss(card.id)">

      <div class="flash-card-icon"><i class="icon3-flash"></i></div>
      <div class="flash-card-text">{{card.note}}</div>

    </div>
  </div>
</template>

<script>

export default {
  created () {
    console.log('FLASH BOX CREATED')
    this.$parent.$on('new-flash-card', this.addCard)
  },
  data () {
    return {
      lastId: 0,
      cards: [],
      indexes: []
    }
  },
  methods: {
    updateIndexes () {
      let idxs = []
      for (var i = 0; i < this.cards.length; i++) idxs[ this.cards[i].id ] = i
      this.indexes = idxs
    },
    slideUp (id, type) {
      let card = this.cards[this.indexes[id]]
      if ('object' === typeof card) {
        card.cardClass = 'flash-card ' + type
      }
    },
    slideRight (id) {
      let card = this.cards[this.indexes[id]]
      if ('object' === typeof card) {
        card.cardClass += ' way-to-the-right'
        console.log(card.cardClass)
      }
    },
    addCard (type, note) {
      let that = this
      let id = this.lastId++
      note += ' #' + id
      let cardClass = 'flash-card way-below ' + type
      this.cards.push({id, cardClass, note})
      this.updateIndexes()
      setTimeout(function () { that.slideUp(id, type) }, 100)
      setTimeout(function () { that.dismiss(id) }, 10000)
    },
    remove (id) {
      let card = this.cards[this.indexes[id]]
      if ('object' === typeof card) {
        this.cards.splice(this.indexes[id], 1)
        this.updateIndexes()
      }
    },
    dismiss (id) {
      this.slideRight(id)
      let that = this
      setTimeout(function () { that.remove(id) }, 500)
    }
  }
}
</script>

<style lang="scss">

.flash-box{
   position: fixed;
   top: 0;
   right: 2rem;
   z-index: 30000000;
}

.flash-card {
   position: relative;
   top: 0;
   left: 0;
   border-radius: 0.25rem;
   border: 1px solid rgba(0, 0, 0, 0.15);
   box-shadow: 0.75rem 1rem 0 rgba(0, 0, 0, 0.15);
   width: 16rem;
   overflow: hidden;
   margin-top: 1rem;
   opacity: 1;

  -moz-transition: all 0.5s ease 0s;
  -o-transition: all 0.5s ease 0s;
  -webkit-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;

  &.way-below{
    top: 20rem;
    opacity: 0;
  }
  &.way-to-the-right{
    left: 20rem;
    opacity: 0;
  }

  .flash-card-icon{
    border-radius: 0.25rem 0.25rem 0 0;
    text-align: center;
    color: #ffffff;
    font-size: 5rem;

    line-height: 0.5rem;
    height: 0.5rem;
    min-height: 0.5rem;
  }
  .flash-card-text{
    border-radius: 0 0 0.25rem 0.25rem;
    background-color: #F7F7F7;
    font-family: 'Raleway', Helvetica, Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.13rem;
    padding: 1.6rem;
  }

  i.icon3-flash,
  i.icon3-flash:before{
    line-height: 9rem;
    display: inline-block;
  }

  &.danger {
    background-color: #F52519;
    i.icon3-flash:before{
      content: "!"; /* icon3-exclamation-circle  */
    }
  }
  &.success {
    background-color: #4897B6;
    i.icon3-flash:before{
      content: "✔"; /* icon3-check-circle  */
    }
  }
}

</style>
