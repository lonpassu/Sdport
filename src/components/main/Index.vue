<template>
  <div class="main">
    <div class="center">
      <Middle></Middle>
    </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent, ref, reactive, toRefs,onMounted, onUnmounted } from 'vue';
import Middle from './middle/Index.vue';
export default defineComponent({
    name: "Main",
    setup() {
        const data = reactive({});
        onMounted(() => {
        });
        onUnmounted(() => {
        });
        return {
            ...toRefs(data)
        };
    },
    components: { Middle }
});
</script>

<style lang="scss" scoped>
$multiple:2.31;//2.25
.main {
  width: 100%;
  // height: calc(100vh - 115px / #{$multiple});
  height: calc(100vh - 2.5rem);
  .center {
    width: 100%;
    height: 100%;
  }
}
</style>
