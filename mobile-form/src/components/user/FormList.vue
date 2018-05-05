<template>
  <list-view
  :isServer="true"
  :canLoadMore="canLoadMore&&!isNodata"
  :loadConfig="loadConfig"
  :refreshConfig="refreshConfig"
  @triggerLoad="loadMore" 
  @triggerRefresh="triggerRefresh">
    <!--工具栏-->
    <mu-appbar slot="navbar" title="我的问卷">
      <mu-icon-menu :icon="icons.more_vert" slot="right">
        <mu-menu-item to="/form/new" title="新建问卷"></mu-menu-item>
        <mu-menu-item title="批量删除"></mu-menu-item>
      </mu-icon-menu>
    </mu-appbar>
    <mu-flexbox
    v-if="isNodata"
    justify="center" 
    align="center"
    slot="empty"
    class="list-empty">
      <mu-avatar :size="50" :icon="'\ue814'" backgroundColor="#fff" color="grey400" />
      <p>没有问卷记录,快去创建吧!</p>
    </mu-flexbox>
    <!--问卷列表主体-->
    <template v-if="list&&list.length>0" slot="list">
      <mu-list>
        <list-transition>
          <list-item-transition v-for="(item, index) in list" :key="item">
            <mu-list-item
            :describeText="itemStatus(item.status, 'text')"
            :title="item.title" >

              <mu-avatar :icon="icons.note" slot="leftAvatar" 
              :backgroundColor="itemStatus(item.status, 'color')" />
              <mu-icon-menu v-if="item.status!==3" slot="right" :icon="icons.more_vert">
                <mu-menu-item @click="publicForm(item._id, index)" v-if="canPublic(item.status)" 
                :leftIcon="icons.share" title="发布"></mu-menu-item>
                <mu-menu-item @click="stopForm(item._id, index)" v-else-if="item.status === 1" 
                :leftIcon="icons.pause" title="暂停"></mu-menu-item>
                <mu-menu-item :leftIcon="icons.edit" title="编辑" :to="'/form/edit/'+item._id"></mu-menu-item>
                <mu-menu-item :leftIcon="icons.chart" title="数据" :to="'/form/chart/'+item._id"></mu-menu-item>
                <mu-menu-item :leftIcon="icons.delete" title="删除" @click="deleteForm(item._id, index)"></mu-menu-item>
              </mu-icon-menu>
            </mu-list-item>
          </list-item-transition>
        </list-transition>
      </mu-list>
    </template>
    
  </list-view>
</template>
<style lang="stylus" scoped>
  .list-empty
    width: 100%;
    height: 100%;
    text-align: center;

</style>
<script>
  import ListTransition from '../common/ListTransition.vue';
  import ListItemTransition from '../common/ListItemTransition.vue';
  import axios from 'axios';
  import bus from '@/scripts/bus';

  export default {
    components: { ListTransition, ListItemTransition },
    computed: {
      isNodata() {
        return this.list.length === 0;
      },
    },
    data() {
      return {
        list: [],
        canLoadMore: true,
        loadConfig: {
          url: '/user/form',
          data: {
            pageSize: 10,
            start: 0,
          },
        },
        refreshConfig: {
          url: '/user/form',
          data: {
            pageSize: 10,
            start: 0,
          },
        },
        icons: {
          more_vert: '\ue5d4',
          note: '\ue06f',
          share: '\ue80d',
          edit: '\ue3c9',
          chart: '\ue24b',
          delete: '\ue872',
          pause: '\ue036',
        },
        statusData: [
          {
            color: 'grey400',
            text: '还未发布',
          },
          {
            color: 'lightBlue400',
            text: '正在搜集数据',
          },
          {
            color: 'lightGreen400',
            text: '已结束',
          },
          {
            color: 'red400',
            text: '状态有误',
          },
        ],
      };
    },
    methods: {
      // 该问卷的状态
      itemStatus(status, prop) {
        const obj = this.statusData[status] || {};
        return obj[prop] || this.statusData[3][prop];
      },
      deleteForm(id, index) {
        axios.delete(`/form/${id}`)
        .then((data) => {
          if (data.data.message === 'ok') {
            this.list.splice(index, 1);
          }
        })
        .catch((err) => {
          console.error(err);
          bus.$emit('alert', '请求错误');
        });
      },
      // 是否可以发布
      canPublic(status) {
        return status === 0 || status === 2;
      },
      publicForm(id, index) {
        axios.post(`/form/public/${id}`)
        .then(() => {
          this.list[index].status = 1;
          bus.$emit('alert', '发布成功');
          window.location.href = `/${id}`;
        })
        .catch((err) => {
          console.error(err);
          bus.$emit('alert', '发布失败');
        });
      },
      stopForm(id, index) {
        axios.post(`/form/stop/${id}`)
        .then(() => {
          this.list[index].status = 2;
          bus.$emit('alert', '已暂停搜集!');
        })
        .catch((err) => {
          console.error(err);
          bus.$emit('alert', '停止搜集失败!');
        });
      },
      // 加载更多
      loadMore(response) {
        const data = response.data;
        const configData = this.loadConfig.data;
        if (data.length < configData.pageSize) {
          this.canLoadMore = false;
        }
        if (data.length > 0) {
          this.list = this.list.concat(data);
        }
        configData.start += configData.pageSize;
        bus.$emit('alert', '加载成功');
      },
      // 触发更新
      triggerRefresh(response) {
        const data = response.data;
        this.list = data;
        if (data.length < this.loadConfig.data.pageSize) this.canLoadMore = false;
        bus.$emit('alert', '刷新成功');
      },
    },
  };
</script>
