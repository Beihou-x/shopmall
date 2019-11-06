<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  props:{},
  data(){
    return {
    }
  },
  computed:{
    cartListLength() {
      return this.$store.state.cartList.length
    }
  },
}
</script>
<style scoped>
  .nav-bar {
    background-color: deeppink;
    color:#fff;
    font-weight: 700;
    position: relative;
    z-index: 1;
    width: 100%;
  }
</style>