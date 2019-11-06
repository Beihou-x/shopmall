<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
         v-for="(item,index) in cartList" 
         :key="index" 
         :item-info="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem"
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    cartList() {
      return this.$store.state.cartList
    }
  },
  activated() {
    this.$refs.scroll.refresh()
  },

}
</script>
<style scoped>
  .content {
    position: absolute;
    top: 44px;
    left: 0;
    width: 100vw;
    bottom: 49px;
    overflow: hidden;
  }
</style>