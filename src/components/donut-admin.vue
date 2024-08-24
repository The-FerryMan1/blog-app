<script setup>
import { reactive } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'



ChartJS.register(ArcElement, Tooltip, Legend)


const chartdata = reactive({
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
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
    <Doughnut
        id="pie-id"
        :options="chartOptions"
        :data="chartdata"
     />
</template>