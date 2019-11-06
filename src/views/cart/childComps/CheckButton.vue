<template> 
    <div class="check-button" :class="{check:checked}">
      <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked: {
      type: Boolean,
      default() {
        return true  
      }
    }
  },
  computed: {
    checked() {
      return this.isChecked
    }
  },
}
</script>
<style scoped>
 .check-button {
   border-radius: 50%;
   border: 2px solid #ccc;
   width: 18px;
   height: 18px;
 }
 .check{
    border-color: red;
    background-color: red;
 }
</style>