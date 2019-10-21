<template>
  <section class="contianer">
    <el-row
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(253, 253, 253, 0.8)"
      type="flex"
      justify="space-between"
    >
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 其他代码.. -->
        <FlightsFilters :data="flightsOptions"></FlightsFilters>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班列表布局 -->
        <FlightsItem
          v-for="(item,index) in flightsItems"
          :key="index"
          :data="item"
        ></FlightsItem>

        <!-- 当没有数据时，给出提示 -->
        <div
          class="tip"
        v-if="valid">
          <el-button
           type="primary"
           v-loading.fullscreen.lock="fullscreenLoading"
           
           >
         </el-button>
         <span v-if="!fullscreenLoading"> 对不起，从{{$route.query.departCity}}到{{$route.query.destCity}}的航班</span>
        </div>
        <!-- v-if="fullscreenLoading" -->

        <!-- //判断数据是否处于加载过程中 -->

        <!--  分页代码 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSize"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="$store.state.airList.flightsList.length"
          ></el-pagination>
        </div>
      </div>

      <!--  其他代码... -->
      <FlightsAside></FlightsAside>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  // 其他代码...

  components: {
    FlightsListHead,
    FlightsFilters,
    FlightsItem,
    FlightsAside
  },
  data() {
    return {
      //判断后台是否有数据返回
      valid:true,
      flightsList: [],
      flightsOptions: {},
      flightsItems: [],
      pageSize: [10, 15, 20, 25],
      currentPageSize: 10,
      //索引从1开始
      currentPage: 1,
      //数据请求的过程中，一直处于加载状态
      fullscreenLoading: true
    };
  },
  computed: {
    change() {
      return this.$store.state.airList.flightsList;
    }
  },
  watch: {
    change(newdata, olddata) {
      this.getFlightsItems();
    },
    //监听地址栏参数的变化
    $route() {
        location.reload();
    }
  },
  mounted() {
    // location.href和this.$route的区别
    this.$axios({
      url: "/airs",
      method: "get",
      params: this.$route.query
    }).then(res => {
       this.fullscreenLoading = false;
      if (res.status == 200 && res.data.flights.length>0) {
        this.flightsList = res.data.flights;
        this.valid=false;
        this.$store.commit("airList/setFlightsList", this.flightsList);
        this.flightsOptions = res.data.options;
        this.getFlightsItems();
        //数据请求的过程中，一直处于加载状态
        //加载完毕：加载状态结束
        //有数据：显示数据
        //没有数据：提示没有数据
      }
    });
  },
  methods: {
    //赋值
    getFlightsItems() {
      this.flightsItems = this.$store.state.airList.flightsList.slice(
        (this.currentPage - 1) * this.currentPageSize,
        (this.currentPage - 1) * this.currentPageSize + this.currentPageSize
      );
    },
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.getFlightsItems();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFlightsItems();
    }
  }
};
</script>

<style scoped lang="less">

.tip {
  border:1px solid #ddd;
  text-align:center;
  padding:20px;
   /deep/.el-button {
  width:0;
  height:0;
  background: #fff;
  border:none;
}
}
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>