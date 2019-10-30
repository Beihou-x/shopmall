<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="isActive" name="item-icon-active"></slot>
    <slot v-else name="item-icon"></slot>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path: String,
    activeColor:{
      type:String,
      default: 'red'
    }
  },
  data(){
    return {
      // isActive:true,
      // path: './home'
      // flag:true
    }
  },
  watch:{},
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick() {
      if( !this.isActive) {
        this.$router.replace(this.path);
      } 
      
      // console.log(this.$route,this.$router);
      
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
  .tab-bar-item{
    flex:1;
    text-align:center;
    height:49px;
    font-size:14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: auto;
    vertical-align: middle;
  }
  
</style>