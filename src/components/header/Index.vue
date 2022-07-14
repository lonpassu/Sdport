<template>
    <div class="header">
        <p>山东港口集团多式联运信息平台</p>
    </div>
</template>

<script  lang="ts">
import { defineComponent, ref, reactive, toRefs,onMounted, onUnmounted } from 'vue';
export default defineComponent({
  name: 'Header',
  setup() {
    const data = reactive({
    })
    onMounted(() => {
    });
    onUnmounted(() => {
    });
    return {
        ...toRefs(data)
    };
  },
 });
</script>

<style lang="scss" scoped>
$multiple:2.31;
.header {
    width: 100%;
    height: 2.5rem;
    line-height: 2.3rem;
    font-size: 1.4rem;
    text-align: center;
    background-image: url('../../assets/images/heade_B.png');
    background-position: center center;
    background-size: cover; //此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。
    background-repeat: no-repeat; //background-image 不会重复
    p {
      text-shadow:3px 3px 3px rgba(0,0,0,0.50);
    }
}
</style>
