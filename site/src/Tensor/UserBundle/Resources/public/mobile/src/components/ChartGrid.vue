<template>
  <g>
    <g class="gridX" ref="gridX" :style="styleX"></g>
    <g class="gridY" ref="gridY" :style="styleY"></g>
  </g>
</template>

<script>

import * as d3 from 'd3'

export default {
  props: {
    ticks: {
      type: String,
      validator (v) {
        return ['x', 'y'].indexOf(v) > -1
      }
    },
    layout: Object,
    scale: Object
  },
  computed: {
    styleX () { return { transform: 'translate(0,' + this.layout.height + 'px)'} },
    styleY () { return {} }
  },
  mounted () {
    this.drawGrid()
  },
  methods: {

    drawGrid () {
      var t = d3.transition(500)
      var xN = 10, yN = 5
      // var xN = this.ticks.x.numberOfTicks, yN = this.ticks.y.numberOfTicks
      var x = this.scale.x, y = this.scale.y, h = this.layout.height, w = this.layout.width
      var $gridX = d3.select(this.$refs.gridX)
      var $gridY = d3.select(this.$refs.gridY)

      var gridGenerator = {
        x: d3.axisBottom(x).ticks(xN).tickSize(-h, 0, 0).tickFormat(''),
        y: d3.axisLeft(y).ticks(yN).tickSize(-w, 0, 0).tickFormat('')
      }
      $gridX.transition(t).call(gridGenerator.x)
      $gridY.transition(t).call(gridGenerator.y)
    }

  },
  watch: {
    scale: {
      deep: true,
      handler (val, oldVal) {
        this.drawGrid()
      }
    }
  }
}

</script>

<style>
.gridX line,
.gridY line {
  stroke: lightgrey;
  stroke-opacity: 0.7;
  shape-rendering: crispEdges;
}

.gridX path,
.gridY path {
  stroke-width: 0;
}
</style>
