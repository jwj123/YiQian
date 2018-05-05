<template>
  <page-view :navbar="navConfig">
    <mu-icon-menu :icon="'\ue5d4'" slot="rightButton">
      <!--预览按钮-->
      <mu-menu-item :to="'/public/'+id" title="预览"></mu-menu-item>
      <!--保存按钮-->
      <mu-menu-item @click="save" title="保存"></mu-menu-item>
    </mu-icon-menu>
    <template slot="content">
      <div class="edit-area">
        <div class="edit-area-inner">
          <!--动态编辑表单组件 可以对删除,编辑,移动表单项事件进行监听 -->
          <dynamic-form 
          :form="formData"
          status="edit"
          @deleteItem="deleteItem"
          @editItem="editItem"
          @moveUp="moveUp"
          @moveDown="moveDown">
          </dynamic-form>
        </div>
      </div>
      <!--浮动按钮-->
      <div class="add-button">
        <mu-float-button 
        :icon="'\ue145'" 
        @click.stop.prevent="chooseItem">
        </mu-float-button>
      </div>
      <select-popup
      ref="popup"
      :config="selectPopup" 
      @add="addItem" />
      <select-dialog
      ref="dialog"
      :config="editDialog" 
      @update="updateForm" />

    </template>
  </page-view>
</template>

<style lang="stylus" scoped>
.edit-area
  width: 100%;
  padding: 20px 10px 10px 10px;
  .edit-area-inner
    width: 100%;
    border-radius: 5px;
    border: 1px dashed #78909c;
    min-height: 300px;
    padding: 10px;
  .edit-area-empty
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      padding-top: 60px;
.add-button
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 999999;

</style>

<script>
  import DynamicForm from '@/components/common/DynamicForm.vue';
  import SelectPopup from './SelectPopup.vue';
  import SelectDialog from './SelectDialog.vue';
  import axios from 'axios';
  import bus from '@/scripts/bus';

  export default {
    components: { DynamicForm, SelectPopup, SelectDialog },
    data() {
      return {
        id: this.$route.params.id,
        editDialog: {
          title: '编辑表单项',
          open: false,
          id: null,
          index: -1,
          target: null,
        },
        selectPopup: {
          open: false,
        },
        formData: null,
        navConfig: {
          title: '编辑表单',
        },
        template: DynamicForm.defaultTemplate,
        open: false,
      };
    },
    // 在组件加载完成之后请求后端数据
    mounted() {
      axios.get(`/form/get/${this.id}`)
      .then((response) => {
        const res = response.data;
        if (res.message !== 'ok') {
          throw new Error(res.message);
        }
        const data = res.data;
        if (data) delete data._id;
        this.formData = res.data;
      })
      .catch((err) => {
        bus.$emit('alert', err);
      });
    },
    methods: {
      save() {
        axios.post(`/form/save/${this.id}`, this.formData)
        .then((response) => {
          const res = response.data;
          if (res.message !== 'ok') throw new Error(res.message);
          bus.$emit('alert', '保存成功');
        })
        .catch((err) => {
          bus.$emit('alert', err);
        });
      },

      move(targetId, targetIndex, forceId, forceIndex) {
        return axios.post(`/question/${targetId}/${forceId}`, { targetIndex, forceIndex });
      },
      // 表单项向上移动
      moveUp(index) {
        if (index === 0 || this.formData.items.length === 0) return;
        const targetId = this.formData.items[index]._id;
        const forceId = this.formData.items[index - 1]._id;
        this.move(targetId, index - 1, forceId, index)
        .then(() => {
          const item = this.formData.items.splice(index, 1);
          this.formData.items.splice(index - 1, 0, item[0]);
        })
        .catch((err) => {
          console.error(err);
          bus.$emit('alert', '移动失败!');
        });
      },
      // 表单项向下移动
      moveDown(index) {
        const items = this.formData.items;
        if (index === items.length - 1 || items.length === 0) return;
        const targetId = items[index]._id;
        const forceId = items[index + 1]._id;
        this.move(targetId, index + 1, forceId, index)
        .then(() => {
          const item = items.splice(index, 1);
          items.splice(index + 1, 0, item[0]);
        })
        .catch((err) => {
          console.error(err);
          bus.$emit('alert', '移动失败');
        });
      },
      chooseItem() {
        this.$refs.popup.operatePopup(true);
      },
      // 添加表单项方法
      addItem(type) {
        this.$refs.dialog.addItem(type);
      },
      // 编辑表单项方法
      editItem(index, id) {
        this.$refs.dialog.openDialog(index, this.formData.items[index], id);
      },
      // 删除表单项方法
      deleteItem(index) {
        const id = this.formData.items[index]._id;
        axios.delete(`/question/${id}`)
        .then(() => {
          this.formData.items.splice(index, 1);
        })
        .catch((err) => {
          console.error(err);
          bus.$emit('alert', '删除失败');
        });
      },

      // 创建或者修改表单项
      updateForm(target) {
        const index = this.editDialog.index;
        const itemId = this.editDialog.id;
        // 创建一个表单项
        if (index === -1 && target !== null) {
          target.form_id = this.id;
          target.index = this.formData.items.length;
          axios.post('/question', { data: target })
          .then((response) => {
            target._id = response.data.data.id;
            this.formData.items.push(target);
          })
          .catch((err) => {
            console.error(err);
            bus.$emit('alert', '创建表单项失败');
          });
        } else if (index !== -1 && target !== null && itemId != null) {
          axios.post(`/question/${itemId}`, { data: target })
          .then(() => {
            this.formData.items.splice(index, 1, target);
          })
          .catch((err) => {
            console.error(err);
            bus.$emit('alert', '修改表单项失败');
          });
        }
        this.$refs.dialog.operateDialog(false);
      },
    },
  };
</script>
