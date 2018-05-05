<template>
  <canvas ref="pieChart"></canvas>
</template>

<script>
  import Chart from 'chart.js';
  import colorSelect from '@/scripts/colorSelect';

  export default {
    props: ['data', 'labels', 'title', 'index'],
    data() {
      return {
        chart: null,
        dataOptions: {
          labels: this.labels,
          datasets: [
            {
              data: this.data,
              backgroundColor: colorSelect(3, 1),
            },
          ],
        },
        options: {
          layout: {
            padding: 20,
          },
          title: {
            display: true,
            text: this.title,
            fontSize: 18,
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      };
    },
    mounted() {
      const ctx = this.$refs.pieChart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: this.dataOptions,
        options: this.options,
      });
    },
    beforeDestroy() {
      this.chart.destroy();
    },
    methods: {
      update() {
        this.chart.update();
      },
    },
  };

</script>
