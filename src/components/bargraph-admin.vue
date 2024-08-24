<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { onMounted, reactive } from 'vue';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const chartdata = reactive({
    labels: [ 'January', 'February', 'March','burat' ],
    datasets: [ { 
        label: ['login per day'],
        backgroundColor: [
      'red',
      'blue',
      'green',
      'yellow',
      
    ],
        data: [40, 20, 12,5] 
    },
    { 
        label: ['burat'],
        backgroundColor: [
      'red',
      'blue',
      'green',
      'yellow',
      
    ],
        data: [30, 14, 10,4] 
    },
    { 
        label: ['tite'],
        backgroundColor: [
      'red',
      'blue',
      'green',
      'yellow',
      
    ],
        data: [40, 20, 12,5] 
    },
 ]
})

const chartOptions = {
    responsive: true,
    
}
</script>



<template>
    <Bar
        id="barChart-id"
        :options="chartOptions"
        :data="chartdata"
    />
</template>