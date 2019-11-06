<template>
  <div class="bottom-bar">
    <div class="check-button">
      <check-button :isChecked="isSelectAll" @click.native="selectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="caculate">
      去计算{{caculateLength}}
    </div>
  </div>
</template> 

<script>
import CheckButton from "./CheckButton"

export default {
  components:{
    CheckButton,
  },
  props:{},
  computed: {
    totalPrice() {
      return '￥'+this.$store.state.cartList.filter(item => item.checked == true).reduce((preValue,item) => {
        return preValue + item.count * item.price
      },0).toFixed(2)
    },
    caculateLength() {
      return this.$store.state.cartList.filter(item => item.checked == true).length;
    },
    isSelectAll() {
      if(this.$store.state.cartList.length == 0) return false
      return !(this.$store.state.cartList.find(item => !item.checked));
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
    }
  },
  methods: {
    selectAll() {
      console.log("hahha"); 
      if(this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>
<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  line-height: 40px;
  display: flex;
}
.check-button {
  display: flex;
  align-items: center;
  margin-left: 5px;

}
.price {
  margin-left: 8px;
  flex:1;
}
.caculate {
  width: 80px;
  background-color: pink;
}
</style>