import Vue from 'vue';
import Vuex from 'vuex';

// 安装vuex
Vue.use(Vuex)

// 创建store对象
const store = new Vuex.Store({
  state:{
    cartList: []
  },
  mutations:{
    addCount(state,payload){
      payload.count +=1
    },
    addToCart(state,payload) {
      payload.checked = false;
      state.cartList.push(payload);
    }
  },
  actions: {
    addCart(context, payload) {
      // const oldProduct = null;
      // for (let item of context.state.cartList) {
      //   if (item.iid == payload.iid) {
      //     oldProduct = item
      //   }
      // }
      return new Promise((resolve,reject) => {
        // 查找之前购物车数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid == payload.iid);
        if (oldProduct) {
          context.commit('addCount', oldProduct);
          resolve('当前商品数量+1')
        } else {
          payload.count = 1;
          context.commit('addToCart', payload);
          resolve('添加到购物车成功');
        }
      })
    }
  }
})

export default store