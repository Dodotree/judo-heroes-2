<template>
  <section id="chart">
      <svg xmlns="http://www.w3.org/2000/svg" :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
        <text class="chartTitle" fill="#F27839" opacity="1" transform="" y="0" :x="layout.marginLeft" dy="2.5em">
          {{title}}
        </text>
        <g class="d3__stage" :style="stageStyle">
          <ChartAxes
            v-for="(axis, index) in myAxes"
            :key="index"
            :axis="axis"
            :layout="layout"
            :scale="scale"
            />
          <ChartGrid
            :ticks="ticks"
            :layout="layout"
            :scale="scale"
            />
          <g ref="d3__stage"></g>
        </g>
      </svg>
  </section>
</template>

<script>

import * as d3 from 'd3'
import {difference, uniq} from 'lodash'

import ChartAxes from '../components/ChartAxes.vue'
import ChartGrid from '../components/ChartGrid.vue'

export default {
  components: {
    ChartAxes,
    ChartGrid
  },
  props: {
    axes: {
      type: Array,
      default () {
        return ['left', 'bottom']
      },
      validate (v) {
        return !difference(v, ['left', 'right', 'top', 'bottom']).length
      }
    },
    title: String,
    layout: Object,
    chartData: Array,
    rawChartData: Array
  },
  data () {
    return {
      myAxes: uniq(this.axes),
      ticks: ['x', 'y'],
      scale: {
        x: this.getScaleX(),
        y: this.getScaleY(),
        color: d3.scaleOrdinal()
          .range(['#159078', '#999999'])
          .domain(['Current', 'Previous'])
      }
    }
  },
  computed: {
    viewBox () {
      var outerWidth = this.layout.width + this.layout.marginLeft + this.layout.marginRight,
        outerHeight = this.layout.height + this.layout.marginTop + this.layout.marginBottom
      return '0 0 ' + outerWidth + ' ' + outerHeight
    },
    stageStyle () { return {
        'transform': 'translate(' + this.layout.marginLeft + 'px,' + this.layout.marginTop + 'px)'
      }
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    // Get x-axis scale
    getScaleX () {
      return d3.scaleTime()
        .range([0, this.layout.width])
        .domain(this.chartData[0].domain)
    },

    // Get y-axis scale
    getScaleY () {
      return d3.scaleLinear()
        .range([this.layout.height, 0])
        .domain([
          0,
          d3.max(this.chartData, d => d3.max(d.values, e => e.value))
        ])
    },

    // Draw chart
    draw () {
      // Define transition
      var t = d3.transition().duration(500)

      // Define scale
      var scale = this.scale

      // Define stage
      var stage = d3.select(this.$refs.d3__stage)

      // Draw lines
      // Plotter
      var lineD = d3.line().x(d => scale.x(d.timestamp)).y(d => scale.y(d.value))
      var lineFN = d => lineD(d.values.filter(e => typeof e.value !== typeof null))

      var line = stage.selectAll('.line').data(this.chartData)
      line.exit().remove()
      line = line.enter().append('path')
        .attr('d', lineFN)
        .merge(line)
        .attr('class', 'line')
        .transition(t)
        .attr('d', lineFN)
        .style('fill', 'none')
        .style('stroke', d => scale.color(d.id))
        .style('stroke-width', 2)

      // Draw area
      // Plotter
      var areaD = d3.area() .x(d => scale.x(d.timestamp)).y0(scale.y(0)).y1(d => scale.y(d.value))
      var areaFN = d => areaD(d.values.filter(e => typeof e.value !== typeof null))
      var area = stage.selectAll('.area').data(this.chartData)
      area.exit().remove()
      area = area.enter()
        .append('path')
        .attr('d', areaFN)
        .style('fill', d => scale.color(d.id))
        .style('fill-opacity', 0.25)
        .style('stroke', 'none')
        .merge(area)
        .attr('class', 'area')
        .transition(t)
        .attr('d', areaFN)

      // Draw point series
      // Update
      var $points = stage.selectAll('.series').data(this.chartData)
      $points.exit().remove();

      // Enter
      var $points = $points.enter()
        .append('g')
        .attr('class', 'series')
        .merge($points)
        .style('stroke', d => scale.color(d.id));

      // Draw points
      // Update
      var $point = $points.selectAll('.point').data(d => d.values.filter(e => typeof e.value !== typeof null))
      $point.exit().remove();

      // Enter
      var $point = $point
        .enter()
        .append('circle')
        .attr('class', 'point')
        .attr('cx', d => scale.x(d.timestamp))
        .attr('cy', d => scale.y(d.value))
        .attr('r', 4)
        .style('fill', '#fff')
        .style('stroke-width', 2)
        .merge($point)
        .transition(t)
        .attr('cx', d => scale.x(d.timestamp))
        .attr('cy', d => scale.y(d.value))

    }
  },
  watch: {
    // Watch for layout changes
    layout: {
      deep: true,
      handler: function(val, oldVal) {
        this.scale.x = this.getScaleX();
        this.scale.y = this.getScaleY();
        this.draw();
      }
    },
    chartData: {
      deep: true,
      handler: function(val, oldVal) {
        this.scale.x = this.getScaleX();
        this.scale.y = this.getScaleY();
        this.draw();
      }
    }
  }
}

</script>

<style>
  .chartTitle {
    font-family: Tahoma, sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
  }
</style>
