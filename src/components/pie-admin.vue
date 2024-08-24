<script setup>
import { reactive } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'



ChartJS.register(ArcElement, Tooltip, Legend)


const chartdata = reactive({
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }
  ]
})

const chartOptions = {
    responsive: true,
     maintainAspectRatio: false
}
</script>

<template>
    <Pie
        id="pie-id"
        :options="chartOptions"
        :data="chartdata"
     />
</template>