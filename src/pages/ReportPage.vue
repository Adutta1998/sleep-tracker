<template>
  <!-- <Bar id="my-chart-id" :options="chartOptions" :data="chartData" /> -->
  <div class="page-container">
    <div class="card-dark">
      <h3>Filters</h3>
      <div class="filters">
        <div class="form-field">
          <label for="filter_date">Filter by Days:</label>
          <select name="days" id="days" v-model="days" @change="fetchSleepData">
            <option value="1" selected>1 Day</option>
            <option value="5">5 Days</option>
            <option value="10">10 Days</option>
            <option value="20">20 Days</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
    </div>
    <div class="card-dark w-full">
      <h3>
        Sleep Data for the Last {{ days }} Day(s)
      </h3>
      <div class="data">
        {{ sleepData.length }} entries found
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
    <div class="card-dark w-full">
      <h3>Sleep Data</h3>
      <table class="w-full" border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Sleep Time</th>
            <th>Wake Time</th>
            <th>Sleep Quality</th>
            <th>Mood in the Morning</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in sleepData" :key="entry.id">
            <td>{{ entry.entry_date }}</td>
            <td>{{ entry.sleep_time }}</td>
            <td>{{ entry.wake_time }}</td>
            <td>{{ entry.sleep_quality }}</td>
            <td>{{ entry.mood_morning }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import supabase from '../supabaseClient.js'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

let days = ref('1')
const sleepData = ref([])
const chartData = ref({
  labels: [],
  datasets: []
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Sleep and Mood Chart'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
})
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const fetchSleepData = async () => {
  const { data, error } = await supabase
    .from('sleep_tracker')
    .select('*')
    .order('entry_date', { ascending: false })
    .limit(days.value === 'all' ? undefined : parseInt(days.value))

  if (error) {
    console.error('Error fetching sleep data:', error)
  } else {
    sleepData.value = data
    console.log(data);

  }
}
onBeforeMount(async () => {
  await fetchSleepData()
  drawChart()
})

const drawChart = () => {

  chartData.value = {
    labels: sleepData.value.map(entry => entry.entry_date),
    datasets: [
      {
        label: 'Sleep Quality',
        data: sleepData.value.map(entry => entry.sleep_quality ?? 2),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Sleep Duration (hours)',
        data: sleepData.value.map(entry => {
          const sleepTime = new Date(`1970-01-01T${entry.sleep_time}`);
          const wakeTime = new Date(`1970-01-01T${entry.wake_time}`);
          return (wakeTime - sleepTime) / (1000 * 60 * 60); // Convert milliseconds to hours
        }),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Mood in the Morning',
        data: sleepData.value.map(entry => {
          if (entry["mood_morning"]?.includes('happy')) return 5;
          if (entry["mood_morning"]?.includes('Sleepy')) return 3;
          if (entry["mood_morning"]?.includes('Neutral')) return 4;
          if (entry["mood_morning"]?.includes('Tired')) return 2;
          return 1;
        }),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      }
    ],
  }
}
watch(sleepData, (newData) => {
  if (newData.length > 0) {
    drawChart()
  }
})
</script>

<style scoped>
.form-field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

input[type="time"],
input[type="date"],
input[type="text"],
input[type="number"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

/* table style like material design principle */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #333030;
}

td {
  background-color: #383838;
}
</style>