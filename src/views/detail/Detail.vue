<template>
  <div id="detail">
    <detail-nav-bar @titleClick="navClick" ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImgLoad="detailImgLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetialGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"
import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"

import { debounce } from "common/utils";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      refresh: null,
      itemImgListener: null,
      themeTopYs: [],
      getThemeTop: null,
      currentIndex: 0,
      isShowBackTop: false
    };
  },
  created() {
    // 保存传入的id数据
    this.iid = this.$route.params.id;
    // 根据id请求数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const result = res.data.result;
      // 获取头部轮播图图片
      this.topImages = result.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      );
      // 获取店铺信息
      this.shop = new Shop(result.shopInfo);
      // 获取商品详细信息
      this.detailInfo = result.detailInfo;
      // 获取商品参数信息
      this.paramInfo = new GoodsParam(
        result.itemParams.info,
        result.itemParams.rule
      );
      // 获取评论信息
      if (result.rate.list) {
        this.commentInfo = result.rate.list[0];
      }
      // 获取页面setoffTop的防抖函数
      this.getThemeTop = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      },100);
    });

    getRecommend().then(res => {
      this.recommend = res.data.data.list;
    });
  },
  mounted() {
    // dom渲染后监听图片加载防抖
    this.refresh = debounce(this.$refs.scroll.refresh, 10);
    this.itemImgListener = () => {
      this.refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  destroyed() {
    // 组件销毁后取消事件监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    detailImgLoad() {
      this.itemImgListener = () => {
        this.refresh();
      };

      this.getThemeTop();
    },
    navClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 20);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length
      for(let i = 0; i< length;i++){
        if((this.currentIndex !== i) && ((i < length-1 && positionY >=this.themeTopYs[i]  && positionY < this.themeTopYs[i+1]) || (i == length-1 && this.themeTopYs[i] <= positionY))) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      }
 
      this.isShowBackTop = positionY > 1000
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
    // 将商品添加到购物车中

      // this.$store.commit('addCart',product);
      this.$store.dispatch('addCart',product).then(res => {
        console.log(res);
        
      })
    }
  }
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content {
  /* height: calc(100% - 44px); */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>