<template>
    <div class="home">
      <Header></Header>
      <Main></Main>
    </div>
</template>

<script  lang="ts">
import { defineComponent, ref, reactive, toRefs,onMounted, onUnmounted } from 'vue';
import Header from '../components/header/Index.vue';
import Main from '../components/main/Index.vue';
export default defineComponent({
    name: "",
    setup() {
        const data = reactive({
        });
        onMounted(() => {
        });
        onUnmounted(() => {
        });
        return {
            ...toRefs(data)
        };
    },
    components: { Header, Main }
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100vh - 0px); //vh，是指css中相对长度单位，表示相对视口高度，1vh = 1% * 视口高度，vh就是当前屏幕可见高度的1%
  background: rgba(1, 17, 60, 1);
  overflow: hidden;
  color: #ffffff;
}
</style>
