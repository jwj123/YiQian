<template>
  <page-view :navbar="navConfig">
    <template slot="content">
      <mu-tabs :value="currentTab" @change="handleTabChange" lineClass="tab-line">
        <mu-tab class="tab-item" value="data" title="数据">
        </mu-tab>
        <mu-tab class="tab-item" value="chart" title="报表" @active="chartActive">
        </mu-tab>
      </mu-tabs>
      <!--数据表格页面-->
      <div v-show="currentTab === 'data'">
        <mu-table :showCheckbox="false" class="data-table">
          <mu-thead>
            <mu-tr>
              <mu-th>ID</mu-th>
              <mu-th v-for="(item, index) in tableData.questionList" :key="index">
                {{item.label}}
              </mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="(items, index) in tableData.answerList" :key="index">
              <mu-td>{{index + 1}}</mu-td>
              <mu-td v-for="(item, index) in items" :key="index">{{item}}</mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
      </div>
      <!--报表页面-->
      <div v-show="currentTab === 'chart'" class="chart">
        <mu-paper class="chart-item" v-for="(item, index) in list" :zDepth="1" :key="item">
         <!--柱状图组件 -->
          <bar-chart v-if="item.type === 'chart'" :data="item.data" :labels="item.labels" :title="item.title" />
          <!--饼图组件-->
          <pie-chart v-if="item.type === 'pie'" :data="item.data" :labels="item.labels" :title="item.title" />
        </mu-paper>
      </div>
    </template>
  </page-view>
</template>

<style lang="stylus">
  .data-table .mu-table
    width: auto;
  .tab-line
    background-color: #2196f3;

</style>

<style lang="stylus" scoped>
.tab-item
  background-color: #fff;
  color: #000;
  border-color: #fff;
.chart
  padding: 0 10px;
  .chart-item
    margin-top: 10px;
    margin-bottom: 10px;
  

</style>

<script>
  import BarChart from '@/components/common/BarChart.vue';
  import PieChart from '@/components/common/PieChart.vue';
  import axios from 'axios';
  import bus from '@/scripts/bus';

  export default {
    components: { BarChart, PieChart },
    data() {
      return {
        id: this.$route.params.id,
        isFirst: true,
        list: [],
        navConfig: {
          title: '数据统计',
        },
        currentTab: 'data',
        tableData: {
          questionList: [],
          answerList: [],
        },
      };
    },

    mounted() {
      // 请求表格数据
      axios.get(`/statistics/data/${this.id}`)
      .then((response) => {
        const result = response.data.data;
        this.tableData.questionList = result.qlist;
        result.alist.forEach((answer) => {
          const answerArr = [];
          if (answer.content) {
            answer.content.forEach((item) => {
              if (item.value instanceof Array) {
                const arrstr = item.value.join('|');
                answerArr.push(arrstr);
              } else {
                answerArr.push(item.value);
              }
            });
          }
          this.tableData.answerList.push(answerArr);
        });
      });
    },
    methods: {
      handleTabChange(val) {
        this.currentTab = val;
      },
      chartActive() {
        if (this.isFirst) {
          this.isFirst = false;
          // 请求报表数据
          axios.get(`/statistics/${this.id}`)
          .then((response) => {
            const result = response.data.data;
            if (result) {
              this.list = result;
            }
          })
          .catch((err) => {
            bus.$emit('获取统计数据失败!');
            console.error(err);
          });
        }
      },
    },
  };
</script>
