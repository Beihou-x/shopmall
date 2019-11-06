<template>
  <div class="detail-nav">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index"
            :class="{titleItem: index === currentIndex}"
            @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
  components:{
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index);
    }
  },

}
</script>
<style scoped>
  .detail-nav {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
  .back img{
    vertical-align: middle;
    line-height: 44px;
  }
 .title{
   display: flex;
 }
 .title div {
   flex: 1;
   font-size: 14px;
 }
  .titleItem {
    color: deeppink;
  }
</style>