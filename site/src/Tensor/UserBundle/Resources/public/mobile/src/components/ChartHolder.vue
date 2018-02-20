<template>
  <Provider :mapDispatchToProps="mapDispatchToProps" :mapStateToProps="mapStateToProps" :store="store">
    <template slot-scope="{actions, title, chartData}">
      <Chart
         :title="title"
         :layout="layout"
         :chartData="chartData"
         :axes="axes"
      />
    </template>
  </Provider>
</template>

<script>

import { bindActionCreators } from 'redux'
import Provider from 'vuejs-redux'
import * as Actions from '../actions'

import Chart from '../components/Chart.vue'

export default {
  inject: ['store'],
  components: {
    Provider,
    Chart
  },
  data () {
    return {
      layout: {
        width: 800,
        height: 250,
        marginTop: 65,
        marginRight: 35,
        marginBottom: 70,
        marginLeft: 70
      },
      axes: ['left', 'bottom']
    }
  },
  methods: {
    mapStateToProps (state) {
      console.log('############# StateToProps #############', state)
      return {chartData: state.charts.main.data, title: state.charts.main.title}
    },
    mapDispatchToProps (dispatch) {
      console.log('############# DispatchToProps #############')
      return {actions: bindActionCreators(Actions, dispatch)}
    }
  }
}

</script>

<style>
  svg {
    background-color: #eee;
    width: 100%;
  }
  section {
    margin-bottom: 1.5rem;
  }
  section.content {
    padding: 0 1.5rem;
  }
</style>
