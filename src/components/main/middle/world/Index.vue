<template>
   <div>世界地图</div>
</template>

<script  lang="ts">
import { defineComponent, ref, reactive, toRefs,onMounted, onUnmounted } from 'vue';
export default defineComponent({
  name: 'World',
  setup() {
    const data = reactive({})
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

<style scoped>

</style>
