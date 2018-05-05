<template>
  <mu-dialog
  scrollable
  :open="config.open" 
  @close="close" 
  :title="config.title">
    <template v-if="config.target !== null">
      <select-panel
      v-if="config.target.type.match(/^select-.*$/ig)"
      :target="config.target" />
      <textfield-panel
      v-if="config.target.type.match(/^text-.*$/ig)"
      :target="config.target" />
    </template>
  <mu-flat-button 
  primary 
  label="关闭" 
  @click="close" 
  slot="actions"/>
  <mu-flat-button 
  primary 
  label="确定" 
  @click="updateItem()" 
  slot="actions"/>
  </mu-dialog>
</template>

<script>
  import SelectPanel from '../edit-panel/SelectPanel.vue';
  import TextfieldPanel from '../edit-panel/TextFieldPanel.vue';
  import { deepClone } from '@/scripts/utils.js';
  import DynamicForm from '@/components/common/DynamicForm.vue';

  const template = DynamicForm.defaultTemplate;

  export default {
    components: { SelectPanel, TextfieldPanel },
    props: ['config'],
    methods: {
      addItem(type) {
        this.config.target = deepClone(template[type]);
        this.operateDialog(true);
      },
      operateDialog(status) {
        if (!status) {
          this.config.index = -1;
          this.config.target = null;
        }
        this.config.open = status;
      },
      close() {
        this.operateDialog(false);
      },
      openDialog(index, target, id) {
        this.config.index = index;
        this.config.id = id;
        this.config.target = deepClone(target);
        this.operateDialog(true);
      },
      updateItem() {
        this.$emit('update', this.config.target);
      },
    },
  };
</script>
