<template>
<!-- 最基本的中国地图 -->
   <div class="china">
        <div class="" id="china-map"></div>
   </div>
</template>

<script  lang="ts">
// 引入echarts
import * as echarts from 'echarts';
// 引入地图类的echarts实现是需要额外引入地图数据
// import mapChina from "echarts/map/json/china.json"; 
// 引入中国地图数据,这里导入啥后面的geo的map就写啥
import 'echarts/map/js/china.js'
// import 'echarts/map/js/world.js'

//引入中国地图站点
// import stationsChina from "@/assets/json/stationsChina.json";


import { defineComponent, ref, reactive, toRefs,onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'China',
  setup() {
    const data = reactive({})
    onMounted(() => {
        initMap()
    });
    onUnmounted(() => {
    });
    //绘制地图
    function initMap() {
        // 初始化echarts实例
        var chinaChart = echarts.init(document.getElementById('china-map')!); //班列开行量的柱状图
        var series = getChinaSeries();
        var option = {
            //全局提示框
            tooltip: {
                formatter (params, ticket, callback) {
                    // params.data 就是series配置项中的data数据遍历
                    let localValue,perf,downloadSpeep,usability,point
                    if (params.data) {
                        localValue = params.data.value
                        perf = params.data.perf
                        downloadSpeep = params.data.downloadSpeep
                        usability = params.data.usability
                        point = params.data.point
                    } else { // 为了防止没有定义数据的时候报错写的
                        localValue = 0
                        perf = 0
                        downloadSpeep = 0
                        usability = 0
                        point = 0
                    }
                    let htmlStr = `
                        <div style='font-size:18px;'> ${params.name}</div>
                        <p style='text-align:left;margin-top:-10px;'>
                            区域对应数据value：${localValue}<br/>
                            性能perf：${perf}<br/>
                            下载速度downloadSpeep：${downloadSpeep}<br/>
                            可用性usability：${usability}<br/>
                            监测点数point：${point}<br/>
                        </p>
                        `
                    return htmlStr
                    // backgroundColor:"#ff7f50",//提示标签背景颜色
                    // textStyle:{color:"#fff"} //提示标签字体颜色
                }
            },
            // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
            visualMap: { // 左下角的颜色区域
                type: 'piecewise', // 定义为分段型 visualMap
                min: 0,
                max: 1000,
                itemWidth: 40,
                bottom: 60,
                left: 20,
                pieces: [ // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
                    {gt: 900, lte: 1000, label: '非常好', color: '#6ad86e'}, // (900, 1000]
                    {gt: 500, lte: 900, label: '正常', color: '#9adcfa'}, // (500, 900]
                    {gt: 310, lte: 500, label: '警告', color: '#ffeb3b'}, // (310, 500]
                    {gt: 200, lte: 300, label: '较差', color: '#ff9800'}, // (200, 300]
                    {gt: 10, lte: 200, label: '非常差', color: 'orangered'}, // (10, 200]
                    {value: 0, label: '无数据', color: '#999'} // [0]
                ]
            },
                // geo配置详解： https://echarts.baidu.com/option.html#geo
            geo: { // 地理坐标系组件用于地图的绘制
                map: 'china', // // 上面引入的数据名，表示中国地图,跟导入的import china from "echarts/map/json/china.json"; 是一样的
                // roam: true, // 是否开启鼠标缩放和平移漫游
                center:[102.04066, 36.06732],
                zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
                roam: true, //地图移动缩放
                //地图上可看见的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                label: {
                    // show: true,
                    // color: "#F2D50E",
                    emphasis: { //鼠标放在地图上的高亮
                        show: true,
                        color: "#F2D50E", //区域文字颜色
                    }
                },
                //地图区域的多边形 图形样式。
                itemStyle: {
                    borderColor: '#47DDE1', //不同区域分界线颜色
                    borderWidth: 0.5, //描边线宽。为0时无描边
                    areaColor: { //地图区域的颜色
                        type: "radial", //径向渐变,前三个参数分别是圆心 x, y 和半径r
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [ //线性渐变
                        {
                            offset: 0,
                            color: "rgba(175,238,238, 0)" // 0% 处的颜色,每块区域中间位置颜色
                        },
                        {
                            offset: 1,
                            color: "rgba(47,79,79, .1)" // 100% 处的颜色,每块区域两边位置颜色
                        }
                        ],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: "rgba(128, 217, 248, 1)",
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10,
                    //鼠标移上去的高亮状态下的多边形和标签样式。就是移动到那个地图上
                    emphasis: { 
                        areaColor: "#389BB7", //地图颜色
                        borderWidth: 0
                    }
                },
            },
            series: [
            {
                // name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
                // type: 'map',
                // geoIndex: 0,
                // label: {
                //     show: true
                // },
                // // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
                // data: [{
                //     'name': '北京',
                //     'value': 599,
                //     'perf': '0.501s', // 性能
                //     'downloadSpeep': '1.221MB/s', // 下载速度
                //     'usability': '100%', // 可用性
                //     'point': '250' // 监测点
                // }, {
                //     'name': '上海',
                //     'value': 142
                // }, {
                //     'name': '黑龙江',
                //     'value': 44
                // }, {
                //     'name': '新疆',
                //     'value': 999,
                //     'perf': '0.501s', // 性能
                //     'downloadSpeep': '1.221MB/s', // 下载速度
                //     'usability': '100%', // 可用性
                //     'point': '250' // 监测点
                // }, {
                //     'name': '深圳',
                //     'value': 92
                // }, {
                //     'name': '湖北',
                //     'value': 810
                // }, {
                //     'name': '四川',
                //     'value': 453
                // }]
            }
            ]
            
        }
        chinaChart.setOption(option, true); // 初始化地图
        window.addEventListener("resize", function() { //监听 resize 事件重绘地图
            chinaChart.resize();
        });
    }
    function getChinaSeries() {

    }
    return {
        ...toRefs(data),
        getChinaSeries
    };
  },
 });
</script>

<style lang="scss" scoped>
$multiple: 2.31;
.china {
    #china-map {
        // width: 1920px;
        // height: 750px;
        // height: 100%;
        height: calc(100vh - 5.9rem);
        width: 100%;
        // height: calc(100% - 74px / #{$multiple});
        // background: burlywood;
    }
}

</style>
