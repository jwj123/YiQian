<template>
  <page-view :navbar="navConfig">
    <template slot="content">
    <mu-list>
      <mu-list-item title="头像">
        <mu-avatar v-if="info.avatar" 
        slot="rightAvatar" 
        :src="info.avatar"
        backgroundColor="blueGrey400" >
        </mu-avatar>
        <mu-avatar v-else 
        slot="rightAvatar" 
        :icon="'\ue3f4'"
        backgroundColor="blueGrey400">
        </mu-avatar>
      </mu-list-item>
      <mu-divider />
      <mu-list-item  title="昵称" @click="open('nickname')" @close="close">
        <div class="user-info-item text-overflow">{{info.nickname}}</div>  
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="出生年月" @click="open('birthday')">
        <div class="user-info-item text-overflow">{{info.birthday}}</div> 
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="性别" @click="open('sex')">
        <div class="user-info-item text-overflow">{{sex}}</div> 
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="学历" @click="open('qualification')">
        <div class="user-info-item text-overflow">{{info.qualification}}</div> 
      </mu-list-item>
      <mu-divider />
      <mu-list-item title="职业" @click="open('work')">
        <div class="user-info-item text-overflow">{{info.work}}</div> 
      </mu-list-item>
      <mu-divider />
    </mu-list>
    <mu-dialog :open="dialog.nickname.open" title="修改昵称">
      <mu-text-field v-model="info.nickname" fullWidth />
      <mu-flat-button slot="actions" @click="close('nickname')" primary label="取消" />
      <mu-flat-button slot="actions" @click="update('nickname')" primary label="确定" />
    </mu-dialog>
    <mu-date-picker 
    @change="update('birthday')"
    :value="info.birthday"
    v-model="info.birthday" 
    :maxDate="dialog.birthday.maxDate"
    v-show="false"
    ref="datePicker">
    </mu-date-picker>
    <mu-dialog :open="dialog.sex.open" title="修改性别(你确定你能?)">
      <mu-flexbox>
        <mu-flexbox-item>
          <mu-radio name="sex" nativeValue="male" label="男" v-model="info.sex"  />
        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-radio name="sex" nativeValue="female" label="女" v-model="info.sex" />
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flat-button slot="actions" @click="close('sex')" primary label="取消" />
      <mu-flat-button slot="actions" @click="update('sex')" primary label="确定" />
    </mu-dialog>
     <mu-dialog :open="dialog.qualification.open" title="修改学历">
      <mu-text-field v-model="info.qualification" fullWidth />
      <mu-flat-button slot="actions" @click="close('qualification')" primary label="取消" />
      <mu-flat-button slot="actions" @click="update('qualification')" primary label="确定" />
    </mu-dialog>
    <mu-dialog :open="dialog.work.open" title="修改职业">
      <mu-text-field v-model="info.work" fullWidth />
      <mu-flat-button slot="actions" @click="close('work')" primary label="取消" />
      <mu-flat-button slot="actions" @click="update('work')" primary label="确定" />
    </mu-dialog>
    </template>
  </page-view>
</template>

<style lang="stylus" scoped>
.user-info-item
  max-width: 150px;
  position: absolute;
  top: 0;
  right: 12px;
  height: 100%;
  text-align: right;
  color: #757575;
  line-height: 48px;

</style>

<script>
  import axios from 'axios';
  import bus from '@/scripts/bus';

  export default {
    computed: {
      sex() {
        if (this.info.sex === 'male') {
          return '男';
        } else if (this.info.sex === 'female') {
          return '女';
        }
        return this.info.sex;
      },
    },
    data() {
      const now = new Date();
      const month = (now.getMonth() + 1).toString().replace(/^\d$/, '0$&');
      const date = (now.getDate()).toString().replace(/^\d$/, '0$&');
      const maxDate = `${now.getFullYear()}-${month}-${date}`;
      return {
        navConfig: {
          title: '个人信息',
        },
        dialog: {
          nickname: {
            open: false,
          },
          avatar: {
            open: false,
          },
          birthday: {
            open: false,
            maxDate,
          },
          sex: {
            open: false,
          },
          work: {
            open: false,
          },
          qualification: {
            open: false,
          },
        },
        info: {
          avatar: '',
          nickname: '',
          birthday: '',
          sex: '',
          qualification: '',
          work: '',
        },
      };
    },
    mounted() {
      axios.get('/user/center')
      .then((response) => {
        this.info = response.data.data;
      })
      .catch((err) => {
        bus.$emit('alert', err.message);
      });
    },
    methods: {
      open(type) {
        if (type === 'birthday') this.modifyBirth();
        this.dialog[type].open = true;
      },
      modifyBirth() {
        this.$refs.datePicker.openDialog();
      },
      update(prop) {
        if (!this.info[prop]) {
          bus.$emit('alert', '不能为空');
          return;
        }
        axios.post(`/user/center/${prop}`, { [prop]: this.info[prop] })
        .then(() => {
          bus.$emit('alert', '修改成功');
          this.close(prop);
        })
        .catch((err) => {
          bus.$emit('alert', err.message);
        });
      },
      close(type) {
        this.dialog[type].open = false;
      },
    },
  };
</script>
