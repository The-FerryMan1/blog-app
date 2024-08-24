<script setup>
import { onMounted, reactive } from 'vue';
import { Line } from 'vue-chartjs'
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)



const chartdata = reactive({
    labels: [ 'January', 'February', 'March' ],
    datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
})

const chartOptions = {
    responsive: true,
    
    
}
</script>



<template>
    <Line
        id="areaChart-id"
        :options="chartOptions"
        :data="chartdata"
    />
</template>