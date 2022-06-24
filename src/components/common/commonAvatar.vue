<template>
  <div>
    <div class="avatar_box">
      <img
        v-if="!isText"
        class="avatar"
        :style="{ width: sizeStr + 'px', height: sizeStr + 'px' }"
        :src="src"
        alt=""
      />
      <div
        v-if="isText"
        class="avatar"
        :style="{
          width: sizeStr + 'px',
          height: sizeStr + 'px',
          fontSize: sizeStr / 2 + 'px',
          backgroundColor: color,
          lineHeight: sizeStr + 'px'
        }"
      >
        {{ text.split('')[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonAvatar',
  props: {
    size: {
      type: String,
      default: '40'
    },
    text: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: require('@/assets/images/1.png')
    }
  },
  data() {
    return {
      isText: true,
      sizeStr: '40'
    };
  },
  computed: {
    color: () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
  },
  watch: {
    src: {
        handler: function (newVal, oldVal) {
            console.log(newVal, oldVal, 'src');
            if (newVal === '' || newVal === null) {
                this.isText = true
            }else {
                this.isText = false
            }
            console.log(this.isText, '1')
        },
        immediate: true,
        deep: true
    },
    text: {
        handler: function (newVal, oldVal) {
             console.log(newVal, oldVal, 'text');
            if (newVal === '' || newVal === null) {
                this.isText = false
            }else {
                this.isText = true
            }
            console.log(this.isText, '')
        },
        immediate: true,
        deep: true
    },
    size: {
        handler: function (newVal, oldVal) {
             if (newVal === '' || newVal === null) {
                this.sizeStr = '40'
            }else {
                this.sizeStr = newVal
            }
        }
    }
  }
};
</script>

<style>
@import url('../../assets/css/commonAvatar.css');
</style>
