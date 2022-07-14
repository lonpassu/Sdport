<template>
    <div class="middle">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="**省" name="shandong"></el-tab-pane>
        <el-tab-pane label="中国地图" name="china"><China></China></el-tab-pane>
        <el-tab-pane label="世界地图" name="world"><World></World></el-tab-pane>
    </el-tabs>
    </div>
</template>

<script  lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { defineComponent, ref, reactive, toRefs,onMounted, onUnmounted } from 'vue';
import China from './china/Index.vue';
import World from './world/Index.vue';
export default defineComponent({
    name: "Middle",
    setup() {
        const data = reactive({});
        const activeName = ref("china");
        const handleClick = (tab: TabsPaneContext, event: Event) => {
            console.log(tab, event);
        };
        onMounted(() => {
        });
        onUnmounted(() => {
        });
        return {
            ...toRefs(data),
            activeName,
            handleClick
        };
    },
    components: { China, World }
});
</script>

<style lang="scss" scoped>
$multiple: 2.31;
.middle {
  width: 100%;
  // height: 100%;
  height: calc(100vh - 2.5rem);
  :deep .el-tabs {
    width: 100%;
    height: 2.2rem;
    margin-top: 0.5rem;
    .el-tabs__header {
      width: 25%;
      margin-left: 37%;
      border-radius: calc(2.5rem / #{$multiple});
      border: 2px solid #7bbff3;
      .el-tabs__nav {
          width:100%;
        .el-tabs__item{
          width:33%;
          height: 2rem;
          line-height: 1.9rem;
          text-align: center;
          font-size: 1rem;
          font-weight: bold;
          color: #7bbff3;
          padding: 0;
        }
        .el-tabs__item:nth-of-type(3) {
          width:34%;
        }
        .el-tabs__active-bar {
          height: 2rem;
          background-color: #7bbff3;
          z-index: 0;
          border-radius: calc(1.6rem / #{$multiple});
          // border-top-left-radius: calc(1.6rem / #{$multiple});
          // border-bottom-left-radius: calc(1.6rem / #{$multiple});
          // border-top-right-radius: calc(1.6rem / #{$multiple});
          // border-bottom-right-radius: calc(1.6rem / #{$multiple});
        }
        .is-active {
          color: #0b152e;
        }
      }
      .el-tabs__nav-wrap::after {
        height: 0;
      }
    }
  }
}
</style>
