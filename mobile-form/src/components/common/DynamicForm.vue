<template>
  <div class="form" v-if="form">
    <p class="form-title text-overflow">{{ form.title }}</p>
    <p class="form-intro">{{ form.intro }}</p>
    <mu-list class="form-inner">
      <list-transition>
        <list-item-transition class="form-item" v-for="(item, index) in form.items" :key="item">
          <mu-divider></mu-divider>
          <div v-if="status==='edit'" class="form-item-action">
            <mu-flat-button :icon="'\ue872'" @click="deleteItem(index, item._id)" class="action-item" color="#FFF"/>
            <mu-flat-button :icon="'\ue316'" @click="moveUp(index)" class="action-item" color="#FFF"/>
            <mu-flat-button :icon="'\ue313'" @click="moveDown(index)" class="action-item" color="#FFF"/>
          </div>
          <slide-item class="form-item-inner" :slideDistance="100" :enable="slideEnable">
            <mu-list-item :disableRipple="true">
                <div v-if="status==='edit'" class="mask-layer" @click="changeItem(index, item._id)">
                </div>
                <template>

                  <p class="form-item-title">Q{{index+1}}: {{item.label}}</p>
                  
                  <mu-text-field
                  v-if="item.type==='text-one'"
                  :hintText="item.hintText"
                  v-model="item.value"
                  fullWidth>
                  </mu-text-field>

                  <mu-text-field
                  v-if="item.type==='text-multi'"
                  multiLine
                  v-model="item.value"
                  :hintText="item.hintText"
                  :rows="item.rows"
                  :rowsMax="item.maxRows"
                  fullWidth>
                  </mu-text-field>

                  <template v-if="item.type==='select-multi'">
                    <mu-flexbox justify="flex-start" orient="vertical" wrap="wrap">
                      <mu-flexbox-item v-for="(i, indx) in item.items" :key="i">
                        <mu-checkbox
                        v-model="item.value"
                        :name="'Q'+(index+1).toString()"
                        :label="i.label"
                        :nativeValue="i.label"
                        class="text-overflow">
                        </mu-checkbox>
                      </mu-flexbox-item>
                    </mu-flexbox>
                  </template>

                  <template v-if="item.type==='select-one'">
                    <mu-flexbox justify="flex-start" orient="vertical" wrap="wrap">
                      <mu-flexbox-item v-for="(i, indx) in item.items" :key="i">
                        <mu-radio :name="'Q'+(index+1).toString()"
                        v-model="item.value"
                        :label="i.label"
                        :nativeValue="i.label"
                        class="text-overflow">
                        </mu-radio>
                      </mu-flexbox-item>
                    </mu-flexbox>
                  </template>
                </template>
            </mu-list-item>
          </slide-item>
        </list-item-transition>
      </list-transition>
    </mu-list>
  </div>
</template>

<style lang="stylus" scoped>
  .form
    &-title
      font-size: 16px;
      line-height: 20px;
      text-align: center;
    &-intro
      font-size: 14px;
      text-indent: 2em;
    &-inner
      overflow: hidden;
    &-item
      position: relative;
      &-title
        font-size: 16px;
      &-action
        width: 100px;
        height: 100%;
        background-color: #ef5350;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 800;
        font-size: 25px;
        color: #fff;
        text-align: center;
        line-height: 100%;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
        background-clip: content-box;
        .action-item
          height: 33.3%
          width: 100%;
          display: table;
          span
            display: table-cell;
            vertical-align: middle;
      &-inner
        background-color: #fff;
        position: relative;
        z-index: 999;
    .mask-layer
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;

</style>

<script>
  import SlideItem from './SlideItem.vue';
  import ListTransition from './ListTransition.vue';
  import ListItemTransition from './ListItemTransition.vue';

  export default {
    props: {
      form: Object,
      status: String,
    },
    components: { SlideItem, ListTransition, ListItemTransition },
    data() {
      return {
        slideEnable: this.status === 'edit',
      };
    },
    methods: {
      changeItem(index, id) {
        this.$emit('editItem', index, id);
      },
      deleteItem(index, id) {
        this.$emit('deleteItem', index, id);
      },
      moveUp(index) {
        this.$emit('moveUp', index);
      },
      moveDown(index) {
        this.$emit('moveDown', index);
      },
    },
    defaultTemplate: {
      'text-one': {
        type: 'text-one',
        label: '标题',
        hintText: '提示文字,例如,"这里输入手机号"',
        value: '',
      },
      'text-multi': {
        type: 'text-multi',
        label: '标题',
        hintText: '提示文字, 例如,"这里输入你的留言"',
        value: '',
        rows: 3,
        maxRows: 6,
      },
      'select-multi': {
        type: 'select-multi',
        label: '标题',
        value: [],
        items: [{
          label: '选项1',
        }, {
          label: '选项2',
        }],
      },
      'select-one': {
        type: 'select-one',
        label: '标题',
        value: '',
        items: [{
          label: '选项1',
        }, {
          label: '选项2',
        }],
      },
    },
  };
</script>
