<template>
<div>
<page-view  v-if="!isSuccess" :navbar="navConfig">
  <template slot="content">
  <div class="questionare" >
    <mu-paper class="questionare-inner" :zDepth="1">
      <!--通过表单数据进行渲染-->
      <dynamic-form :form="form">
      </dynamic-form>
      <mu-raised-button label="提交" @click="answer" fullWidth primary />
    </mu-paper>
   </div>
   <mu-popup popupClass="qrcode" position="top" :open="open" @close="close">
     <p style="margin-bottom: 0; margin-top: 30px; font-size: 18px; text-align: center;">
       将二维码分享给你的朋友吧
      </p>
      <!--二维码显示-->
     <img :src="src" alt="二维码">
   </mu-popup>
   </template>
</page-view>
<page-view v-if="isSuccess" :navbar="navConfig">
  <template slot="content">
    <mu-flexbox class="thanks" orient="vertical" align="center" justify="center">
      <mu-flexbox-item class="title">谢谢您的参与!</mu-flexbox-item>
      <mu-flexbox-item>
        <mu-avatar :icon="'\ue87d'" color="#f44336" backgroundColor="#fff" :size="50" :iconSize="30"/>
      </mu-flexbox-item>
    </mu-flexbox>
  </template>
</page-view>
</div>
</template>

<style lang="stylus">
.questionare
  width: 100%;
  padding: 10px;
  &-inner
    width: 100%;
    padding: 20px 8px;
.qrcode
  margin-top: 100px;
.thanks
  text-align: center;
  padding: 50px 0;
  .title
      font-size: 20px;
      text-align: center;


</style>

  
<script>
  import DynamicForm from '@/components/common/DynamicForm.vue';
  import axios from 'axios';
  import jsonp from 'jsonp';

  class Answer {
    constructor(formID, content, position) {
      this.submit_time = Date.now();
      this.browser = {
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        platform: navigator.platform,
        userAgent: navigator.userAgent,
      };
      this.content = content;
      this.position = position;
      this.form_id = formID;
    }
  }
  export default {
    components: { DynamicForm },
    data() {
      return {
        isSuccess: false,
        position: '',
        open: true,
        form: null,
        src: `http://qr.topscan.com/api.php?text=${window.location.href}`,
        id: window.location.pathname.substring(1),
        navConfig: {
          title: '',
        },
        items: [],
      };
    },
    mounted() {
      axios.get(`/public/${this.id}`)
      .then((response) => {
        const data = response.data.data;
        data.items.forEach((item) => {
          if (item.type === 'select-multi') {
            item.value = [];
          } else {
            item.value = '';
          }
        });
        this.navConfig.title = data.title;
        this.form = data;
      })
      .catch((err) => {
        alert(err.message);
      });

      this.getPosition((status, address) => {
        if (status) {
          this.position = address;
        }
      });
    },
    methods: {
      getPosition(callback) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lag = position.coords.longitude;
            jsonp(`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${lat},${lag}&output=json&ak=T0iQPIUMFy8S7rNt8qRfCdOiR5Ag3Qig`, null, (err, data) => {
              const result = data;
              console.log(result);
              if (result.status === 0) {
                callback(true, result.result.addressComponent);
              } else {
                callback(false);
              }
            });
          });
        } else {
          alert('您的浏览器不支持GPS定位,请升级或更换你的浏览器');
        }
      },
      close() {
        this.open = false;
      },
      answer() {
        const content = [];
        this.form.items.forEach((item) => {
          content.push({
            id: item._id,
            title: item.label,
            type: item.type,
            value: item.value,
          });
        });
        const answer = new Answer(this.id, content, this.position);
        axios.post('/answer', answer)
        .then(() => {
          this.isSuccess = true;
        })
        .catch(() => {
          alert('提交失败');
        });
      },
    },
  };
</script>
