<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="name || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" @click="$router.push('/category')" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" :class="{active:activeIndex === index }" @click="changeTypeSearch(item.type, index)" v-for="(item,index) in typeList"
      :key="index">{{item.name}}</div>

    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { searchGoods } from '@/api/search'
export default {
  name: 'ListIndex',
  components: {
    GoodsItem
  },
  async created () {
    const res = await searchGoods(this.type, this.name, this.categoryId)
    this.goodsList = res.data.list.data
  },
  data () {
    return {
      type: 'all',
      goodsList: [],
      typeList: [{ name: '综合', type: 'all' }, { name: '销量', type: 'sales' }, { name: '价格', type: 'price' }],
      activeIndex: 0
    }
  },
  methods: {
    async changeTypeSearch (type, index) {
      this.activeIndex = index
      this.type = type
      const res = await searchGoods(this.type, this.name, this.categoryId)
      this.goodsList = res.data.list.data
    }
  },
  computed: {
    name () {
      return this.$route.query.search
    },
    categoryId () {
      return this.$route.query.categoryId
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
    .active {
      color: #002fa7;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
