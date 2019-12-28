<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"                            @tabClick="tabClick" 
                ref="tabControl1"
                class="tab-control"
                v-show="isFixed" >
      </tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad.once="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"                            @tabClick="tabClick" 
                    ref="tabControl" >
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template> 

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/utils";

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0,
      itemImgListener:null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 请求navigitation导航数据
    this.getHomeMultidata(),
      // 请求商品数据
      this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
  },
  mounted() {
    // 监听item中图片的加载
    const refresh = debounce(this.$refs.scroll.refresh,10)
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // 获取tabcontrol的offsetTop值
      
  },
  methods: {
    // 事件监听
    // 防抖函数
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position) {
      // 判断backtop是否显示
     this.isShowBackTop = (-position.y) > 1000;
    //  判断tabcontrol是否吸顶
    this.isFixed = this.tabOffsetTop < -position.y;
    },
    loadMore() {
      this.getHomeGoodsData(this.currentType);
    },
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop; 
    }
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    // 保存离开时的y位置信息
    this.saveY = this.$refs.scroll.scroll.y
    // 离开时取消图片加载的事件监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
};
</script>
<style scoped>

.home-nav {
  background-color: deeppink;
  color: #fff;
}
.content {
  overflow: hidden;
  position:absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>