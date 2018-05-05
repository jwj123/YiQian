<template>
  <canvas ref="barchart"></canvas>
</template>

<script>
  import Chart from 'chart.js';
  import colorSelect from '@/scripts/colorSelect';

  export default {
    props: ['data', 'labels', 'title'],
    data() {
      return {
        chart: null,
        dataOptions: {
          labels: this.labels,
          datasets: [
            {
              backgroundColor: colorSelect(6, 1),
              borderColor: colorSelect(6, 0),
              borderWidth: 1,
              data: this.data,
            },
          ],
        },
        options: {
          layout: {
            padding: 10,
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: this.title,
            fontSize: 18,
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
            yAxes: [{
              barThickness: 30,
              gridLines: {
                display: false,
              },
            }],
          },
        },
      };
    },
    mounted() {
      const chart = this.$refs.barchart;
      chart.height = (this.labels && this.labels.length) ? (this.labels.length * 50) : 300;
      const ctx = chart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'horizontalBar',
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
