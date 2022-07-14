<template>
    <div>
        <h1>About界面</h1>
    </div>
</template>

<script  lang="ts">
import { defineComponent, ref, reactive, toRefs,onMounted, onUnmounted } from 'vue';
export default defineComponent({
  name: '',
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
