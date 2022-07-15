<template>
   <div class="china">
        <div class="" id="china-map"></div>
   </div>
</template>

<script  lang="ts">
// 引入echarts

import * as echarts from 'echarts';
// 引入地图数据,这里导入啥后面的geo的map就写啥
// import 'echarts/map/js/china.js' //引入中国地图
// import 'echarts/map/js/world.js'
import chinaMap from "echarts/map/json/china.json"; //引入中国地图的 Geojson 数据

//引入中国地图站点
import stationsChina from "../../../../assets/json/stationsChina.json"

import { defineComponent, ref, reactive, toRefs,onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'China',
  setup() {
    const data = reactive({
    })
    // 建设状态
    const BUILD_STATE = {
    TESTING: 3, // 测试
    RUNNING: 2, // 运行
    PLANNING: 1 // 计划
    };
    // 班次类型
    const TYPE = {
        INSIDE: 1, // 管内
        OUTSIDE: 2, // 管外
        CROSSSIDE: 3 // 过境
    };
    // 国内图标点
    const OUTSIDE_DATA = stationsChina.filter(item => item.type === TYPE.OUTSIDE);
    onMounted(() => {
        initMap()
    });
    onUnmounted(() => {
    });
    //绘制地图
    function initMap() {
        // 初始化echarts实例
        var chinaChart = echarts.init(document.getElementById('china-map')!); //班列开行量的柱状图
        // 注册地图，这一步需要地图数据,也可以直接用js，更方便
        echarts.registerMap('china', chinaMap);
        // 地图默认中心
        var defaultCenter = [ 102.04066, 36.06732 ]
        // 仓库列表（定位）
        var warehouseList = [
            { name: "北京", value: [116.352963,40.409079], quantity: 159.5, unit: '吨'},
            { name: "黄岛港站", value: [120.204859,36.019426], "buildState": 2, "type": 2 ,"size":60},
            { name: "胶州中心站", value: [119.972449,36.310622], "buildState": 2, "type": 2 ,"size":30},
            { name: "潍坊站", value: [119.052797,36.713251], "buildState": 2, "type": 2 ,"size":30},
            { name: "济南站", value: [117.126399,36.656554], "buildState": 2, "type": 2 ,"size":60},
            { name: "聊城站", value: [115.991588,36.462759], "buildState": 2, "type": 2 ,"size":30},
            { name: "广平站", value: [114.1826440000,36.4827390000], "buildState": 2, "type": 2 ,"size":60},
                
            { name: "临沂站", value: [118.3635370000,35.1106720000], "buildState": 2, "type": 2 ,"size":30},
            { name: "徐州站", value: [117.2905740000,34.2126660000], "buildState": 2, "type": 2 ,"size":60},
            { name: "莆田站", value: [113.8302560000,34.7590160000], "buildState": 2, "type": 2 ,"size":30},
            { name: "郑州站", value: [113.6314160000,34.7534400000], "buildState": 2, "type": 2 ,"size":30},
            { name: "巩义站", value: [113.0284280000,34.7540980000], "buildState": 2, "type": 2 ,"size":30},
            { name: "洛阳站", value: [112.4594240000,34.6242640000], "buildState": 2, "type": 2 ,"size":60},
            { name: "新筑站", value: [109.0493300000,34.3888970000], "buildState": 2, "type": 2 ,"size":60},
            { name: "西安站", value: [108.9464650000,34.3472690000], "buildState": 2, "type": 2 ,"size":30},

            { name: "漯河站", value: [114.043709,33.570226], "buildState": 1, "type": 2 ,"size":30},
            { name: "驻马店站", value: [114.043712,32.975162], "buildState": 2, "type": 2 ,"size":60},
                
            { name: "衡水站", value: [115.698201,37.750136], "buildState": 2, "type": 2 ,"size":30},
            { name: "石家庄站", value: [114.5215290000,38.0483120000], "buildState": 2, "type": 2 ,"size":60},
            { name: "娘子关站", value: [113.8911490000,37.9734740000], "buildState": 2, "type": 2 ,"size":30},
            { name: "晋中站", value: [112.7595950000,37.6928390000], "buildState": 2, "type": 2 ,"size":30},
            { name: "靖边站", value: [108.8006000000,37.6050630000], "buildState": 2, "type": 2 ,"size":30},
            { name: "银川站", value: [106.2384960000,38.4924620000], "buildState": 2, "type": 2 ,"size":60},
            { name: "中宁站", value: [105.6915370000,37.4974210000], "buildState": 2, "type": 2 ,"size":60},
            { name: "嘉峪关站", value: [98.2962000000,39.7779610000], "buildState": 2, "type": 2 ,"size":30},
            { name: "哈密东站", value: [93.5212160000,42.8258240000], "buildState": 2, "type": 2 ,"size":30},
            { name: "乌鲁木齐西站", value: [87.6244400000,43.8307630000], "buildState": 2, "type": 2 ,"size":60},
            { name: "阿拉山口站", value: [82.573443,45.170625], "buildState": 2, "type": 2 ,"size":60},
            { name: "二连浩特站", value: [111.9583670000,43.6488000000], "buildState": 2, "type": 3 ,"size":60},
            { name: "张家口站", value: [114.8891720000,40.7576570000], "buildState": 2, "type": 3 ,"size":30},

            { name: "朱保站", value: [118.1843610000,35.1547620000], "buildState": 2, "type": 2 ,"size":30},
            { name: "兖州站", value: [116.8475870000,35.5620820000], "buildState": 2, "type": 2 ,"size":60},
            { name: "菏泽站", value: [115.4875490000,35.2394080000], "buildState": 2, "type": 2 ,"size":30},
            { name: "新乡站", value: [113.857856,35.299599], "buildState": 2, "type": 2 ,"size":60},
            { name: "盘古寺站", value: [113.5614330000,35.2395020000], "buildState": 2, "type": 2 ,"size":30},
            { name: "侯马站", value: [111.3783940000,35.6253650000], "buildState": 2, "type": 2 ,"size":60}
        ]
        // 需要高亮的省
        // 需要高亮的省
        let highlightAreaList = ["黄岛港站","胶州中心站","即墨站","福山站","枣庄西站", "临清站","曹县站","阳谷站","王木匠站","平原站","农中站", "晏城北站"]
        var option = {
            //全局提示框
            tooltip: {
                trigger: "item", //trigger触发器，item监控项
                enterable: true,//鼠标是否可进入提示框
                formatter: function(params) {
                    console.log(params)
                    return "<p style='font-size: 0.8rem'>"+ params.name +"<p>"
                }
            },
            // geo配置详解： https://echarts.baidu.com/option.html#geo
            geo: { // 地理坐标系组件用于地图的绘制
                map: 'china', // // 上面引入的数据名，表示中国地图,跟导入的import china from "echarts/map/json/china.json"; 是一样的
                // roam: true, // 是否开启鼠标缩放和平移漫游
                center: defaultCenter,
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
                //在地图中对特定的区域配置样式。
                regions: [
                    {
                        name: ["黄岛港站","胶州中心站","即墨站","福山站","枣庄西站", "临清站","曹县站","阳谷站","王木匠站","平原站","农中站", "晏城北站"],
                        itemStyle: {
                            areaColor: 'red',
                            label: {
                                show:true,
                                normal: { //文字字体的风格normal正常
                                        show: true,
                                        color: "yellow", //文字的颜色。
                                }
                            }
                        },
                    }
                ],
                //地图区域的多边形 图形样式。
                itemStyle: {
                    normal: {
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
                    },
                    emphasis: { 
                        areaColor: "#389BB7", //地图颜色
                        borderWidth: 0
                    }
                },
            },
            series: [
                {
                type: 'scatter', //散点（气泡）图
                coordinateSystem: 'geo', //该系列使用的坐标系,可选：cartesian2d二维的直角坐标系;polar极坐标系;geo地理坐标系
                // symbol: "circle",//标记的图形的形状
                //这个是漩涡效果
                // symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAADzUlEQVRogdXaS2hcVRjA8V9vTNugSaC+FlZaDLVZFKlNpCCCaVZqXfmqiPWFUHBR6kIoWB9Qscu6KIJQfNCgUaSLUswuZlEX1aTV0kVrG4taFwptiVXaJkRcfGeSyWMmM5NkJvOHYeDOPef87zln7j3n++6y99+4Yp5k2Iiu9L0eq3EzWjGCf3ERZ/ETvsWP+G8+Dd80j7Kb8BK24TL6MYCP8CuuCvFWNGONuLAOvIpV+BKf4kQlApXIb8FbuCc1/CCGi5w/kj4X8R0+TsfbsB2H8Qv2ihEpmayMc9fgCA7iENbhXcXFizGcyq9L9R3EUawttYJS5Z/GD2J4N+ATjJXuWZSxVN8GDOJ7PFNKwbmmTQP241E8lipfLK6JkTiKz/EQXsd4oQLFen45enEfOi2ueD6DeECMRG/ymJVC8g3iTtCER8QfrpqMiNFegZ7kM4NC8vvRgidwfTHsSuAGnsKtyWcGs8lvw1YhPrpoaqUxmjy2Cq8pTJdfjQPi7lLtqVKIEeFzAHfn/zBd/gN8qMIn3iJyQnhNmT758l24H/uq51QW+4RfV+5AvvwevKd2f9C5uC789uQO5OQ7xWO6pwZS5dAjPDuYlH/Bwj7yF4vcUuJFQj7Ds2JxVA8cEr5ZbiNxSeWrw2ozLHw3ZmJ93l9bn7Lpx5ZM7IiGaixTLoPozNAu9pb1xM9Yn+Eu9TPfcwzjzkxshC/XWKZcLqE5Q6Parx7LZUySH1Nkt7JEacHVTEyZVTWWKZdmSf4PEYOpJ9biz0zcJtfX1qVs7sXZDCelVVod0YGTGY6hu8Yy5dKNY5mIUN2ufuZ9G27D8UxEpHpF0LMe2C58x3Obkc/wivmFvKtBI14WvhM7qUGct/R7/3nhOcTUDfhevImVNZAqhZUmgwSYKj8gUi67q+tUMrtFKmgiATF9ju8SQ3LE0go8bcJrIsoxwfSI2e/Yia9ELmkp0Cp8duK3/B9mC7T2ok/kimq92lyePPqE1xQKhbh3iWzeYREjrwUr8DWuJJ8ZFJIfF3mha+Kqqz2FWlO7N/CcAqmdYmmdURHcOS2SaZ1Fzl1IOlJ7p1P7BXd5c2UDx8Uf5W18IxJeTQuiOJOmVH8f3kntFkymUXoqsxebRe+fEpnvxgolp9OY6jslEmmb8UUpBctJIl/A49ghArPnRA+1lVFHPm2ip8+l+naI9M2FUiuoZCHWnz4doseO4690bAhnxLsH/+BvsVm+RWTQ21O5btwhevhJFUbsli3AWx8NIlj7cPpuN/nWR4u4gNxbH2fEEmRAPOqLzum5+B9nIMnomdFBYQAAAABJRU5ErkJggg==',
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAASvUlEQVR4Xu2df6wc1XXHv2fXe9fmZwK4scE7z8bYO2tkDBG/ilqlFYikbYhIqVp+tBWBJG2jNKI0RTIqkDQlpUmTKE2IlJTEbRIaIgISNFEhJHWFWiUFAobwvLu2sf1mTLD5ZQdj7L373pxqn5+pRd+z3867986dmTP/eu758Tnn6zcze38Q5BICQmBGAiRshIAQmJmACES6QwgcgYAIRNpDCIhApAeEQDoC8hckHTcZVRICIpCSFFrSTEdABJKOm4wqCQERSEkKLWmmIyACScdNRpWEgAikJIWWNNMREIGk4yajSkJABOK40JsDtUonOKdWSU5LUF0M8EIwnczgt4FwPAHHMmMvwLuJ6KWEeWeFKKoCW8fn6W5rK37uOORSuxOBWCh/d1ltTTJB7yfgQgArACwk4BgGqobcMTMmiLCPgJcT8DYCPUlIftiMxn9syIeYASACMdAG3Ya6HMQfYdAFAE4wYHKuJt4A8HSFK/+0Mj6wbq7GyjxeBJKi+t1g/sVAciMznUfEJzNQSWHG1RBmYDcxngDwlTDWD7hyXAQ/IpBZVnE9MH9RoO4l4DcBHDvLYT7e1mPCUzReuTl8/sB6HwP0KSYRyFGq0Q3UJxn0QYAXF/CR9HUCHh0Hbjoz0qM+NaYvsYhApqnEtoVY1Fug7gdwLoCaL8WyGcfgMaxCvK451v9Lm37yZlsEcljFNjfmXTpBlS8DOKOAfy1m25t7CbizGem1sx1Q5PtEIAA6Qf1jANYCvKjIxR4yt9fA+GIY61uHHFeo20stkHagbiXgRgAnFqqqBpMhYA8TPh+O6U8ZNJsbU6UUSHsJVlOl/hDAp+amUhkHSqBdXMG14fbeQxmH4tR96QTSDeqPMPjiEr9jzK3BGE+HsT57bkbyM7o0AukE6iYGbhtM+chPebyNdJwZD7ZifYW3ERoKrPACGV2I4+YtUI8x0DLETMz8H4HXmegTrbHe54oKpdAC6TbUlUwYzEWaX9QC+pAXgf+jGfUHj62FuworkO6Iuo8Zv1u4inmbEO0Mo95gtkGhrsIJZPBIVV2gBmsmlhaqUvlIps9Ea4v0yFUogWwaUVcnwD+DyzE9xFfNFOmRqzAC6TRqd4PoKvl864dsCBQ3o17gRzTpoyiEQNqBGiVgVXoMMtISgd1hpE+yZNuJ2dwLpB3Uf0EHp6LL5SeB/WGkc/vbU64F0gnULz1Z4upna3oSFQETzUjP8yScocLIrUA6gdoH+VV8qGJnfXMY6dz1W+4CHhS5E6geAJV1wcX/8ATyJpLcCaQbqD0s09OH70yPRuRJJLkSSCdQ2wGMeFRrCSUdAQ4j7fNOMG9mlRuByKfcdJ3o7SjGeBhr79f750IgnUD9DMA7vS22BJaWQC+MtNcTSb0XSKehHgLh3WkrIOO8J+D17yReC6QdqE/T5GYKchWaANFYONbzcnKptwLZ3MDyhFTX4IbPhe6xvCeXMH19Vdz7oG95eCuQTqB2A3ibb8AkHjsEBr+2H6jpU9c8hxfteEhn1UuBdBpqAwhr0qUko/JLgF4Io55XO814J5DOSP0rYP6z/BZZIp8LAWbc04r1YNmCF5dXAnl2MYJaTW2V9w4veiOrIJKq0qtXbMHGrAI43K9XAukE9RjgJT6AkRiyIzDYpK4Z9bzYBtYbgRw8ZgCl3gc2u5b0zzMz/qUV62uzjswbgXQCNTg2bEHWQMS/NwQGa0iOIUBnGZEXAmkH9UcIfEmWIMS3lwS2hZE+PcvIMhfI6JL6GdUKb5LNFrJsA399M/B3rUjfnFWEmQukE6htsodVVuX33y8DuhXpelaRZiqQzhJ1DSr4dlbJi998EGDgJ61IX5RFtNkKJKi/IKc6ZVH23PmcCDPa9CEzgXSD+R9iJF/LXakk4EwIMPCDVqTf69p5ZgLpNOovgnih64TFX24J6DCDd5FMBLIxqN9QAX8ht6WSwDMhwIx1rVhf59J5JgLpBOplACe7TFR8FYLAvjDSx7nMxLlA2iP1G4m5sCcSuSxeGX1VCLevHNN/7Sp35wLpBOoXAGQvXVcVLp6fV8JIn+IqLacCWQ/MX3xwzpVTv65gih83BIj1+c0Yj7vw5rRRu4H6JgN/5CIx8VFgAozHwlhf4CJDpwLpBOoVALk+L8JFUcTHUQn0w0g72ZvZmUC2n4LFB46ZfP+QSwjMmQABdzQjbX1LKGcCaQfq+wT8zpzJiAEhMPkS62bVoUuB7CXA6Tds6aRiE6hrvWzZTgw2NLd2ORHIs6cjmDeuxqxlIYZLSYCA7zcjfZnN5J0IpB2odQRkvr7YJkix7Z4Ag3a1LG/u4EQgnYaKQGi4Rygei0zAxdmHbgQSqD6AXB7iWOQGK0RuzOeFcf8JW7lYF0h3WW0NT9AGWwmI3dIT+G4Y6SttUbAukE6gvgfgClsJiN1yE2BgZyvS1ub2ORBI/SWAnU0uK3e7lDL7JIx01VbmDgSiEpmcaKt8YneSQII14Q79jA0aVgWydRlG9MTkybRyCQFrBBj4RCvSn7ThwKpANi+pXT9RobtsBC42hcAhAsT0SDPuXWqDiFWBdAI12PPqGhuBi00hcBiBsTDSVs44tCuQEfUUGGdLKYWAZQLW1qrbFYhs7WO5L8T8FAFrX7LsCiRQBwBktq+qtE95CISRttLLVoweKksnkE+85WnRbDNNQJeuinqPmI7CtkDYdMBiTwhMRyBhvnNV3P+oaTrWBLLhNKycX1Vd0wGLPSEwA4H7wkj/nmk61gQy2qi/r0r8gOmAxZ4QmI4AMz/aivvvMk3HmkA6Qf0GyP67pusl9mYgwIyft2J9lmlA1gTSHql9npj+wnTAYk8IzEBgexjpZabp2BNIQ32HCNbm6ZsGIfZyToDppTDu/YrpLKwJpBvUfsSgi00HLPaEwHQECHitGekTTdOxJpB2oJ4k4BzTAYs9ITADgQNhpBeYpmNNIN1AbWFguemAxZ4QmP4rFsZbsa6ZpmNNIJ0R1QVjpemAxZ4QmIFAL4z0fNN07AmkoTaAsMZ0wGJPCMxAwMqMXnsCCdR/A8jkbGtpoVIS2BNG+u2mM7cpkIcBWFnlZRqC2CsEgZ2hhd1NrAmkHajvkWz3U4jOy0MSBGxpRnqF6VitCaTTqN8F4utNByz2hMAMBH4WRvpc03TsCSRQNwH4e9MBiz0hMMNn3ntasb7KNB1rAmmfjtU0rqzsVWQagtgrAAHGLWGs/9Z0JtYEMgi0EyhZMGW6YmJvWgKc4IrWDn2/aTxWBdIN1AQDFdNBiz0h8P8IVCkMt/WML9CzKpBOoPYDMP7rprSHEHgrAQ190lkRdpsmY1cgsu2P6XqJvekJcBhpK08qdgUSqMcAnCdVFQI2CRCwp2nhV/RBzFYF0m6ozxLh4zbhiG0hQIT/aY7pC22QsCqQ7qkIeZ5q2whcbAqBQwQIuK0Z6b+xQcSqQORTr42Sic23Euj19DvW7MKLNsi4EIhsP2qjcmJzkgABSTPPJ0y1AxUTsETqKQQsEXg1jPTJlmzbfUkfBL2pUft6QnSdrQTEbukJ/FsY6ffZomD9Eau7EqfxAbXDVgJit9wEkmryrlXbxh+1RcG6QKZe1N8AYHzHCVtQxG5OCDDGQwsbNRyevSuByPLbnPRczsK0spuic4GMNmofqBJ9I2fwJVzPCTDTna24Z/zIA+cCmXrMkqnvnjdczsLjZqQVAeM243byiDUlkOcAnG4zGbFdHgIMvNqy+Hn3EElnAmmPqJuJcXt5SiiZWiVAuC8cM39gzltjdiaQgeN2Q/WJMM8qODFeCgInar1s8U5st52sW4EEapSAVbaTEvsFJ0DYG47pE1xk6VQgm4L5H06QfNVFYuKjuASYYWUHk+mIORXI1Mu6BmB8F+7itoNk9hYC42Fkfhf3mSg7F0i3oe5nwvul7EIgDQEC/1cz6v96mrFpxjgXyCDIbqAStryaMQ0MGeM9Ad5f0Sedsx17XEWaiUDaQe0RAl3iKknxUxACjM1hrJ2eOZOJQKbeRRLba+IL0haSxhQBZnp3K+790CWQzATSHlFPEssZhi6LnWdfzHi+FWvnC+8yE4j8Fclzu7qPnRhXNWN9j2vP2QqkUVsPot9wnbT4yx0B69PavfnM+9ZAOoGagOzfm7uOdRlwtcK/umJ7/6cufR7ylelfkKnHrAcBXJZF8uIzFwSsHIwz28wzF8gg0HagegSo2QYt95WGgA4jXc8yWy8EsqlR+0JCdEOWIMS3hwQY/xDG+q+yjMwLgUw+ajVUDJL9s7JsBs987wgj3cg6Jm8EMvU+Mlg+Wc0aivjPnEBS6ekVK3dha9aR+CWQEXULGFY2Ic4atPifPQECfa0Z9f5k9iPs3emVQCZf2BvqaSKcZS9lsew1AcYzYazX+BKjdwKZ+qr1KgFv9wWSxOGMwJ7Q0kE4aTPwUiCjS3BStaJ2ysKqtGXN5biJqtaLV+zESz5F76VADj5q1a6tEH1D1o341C72YqmAP7Yy6n/Jnod0lr0VyCCdjYH6VgX4w3SpyajcEGA8HMb6PT7G67VABsC6I+opZpztIzyJyQiBOIx0YMSSBSPeC2SQcyeovwTwKRbyF5PZEtgXRvq4bEM4svdcCOSgSJQcoeBzJw0fWxJaPDpt+HCmH5EbgUyKpKH6kJ0ZTdU+UzthpHPRe7kI8vBKdgIla9kzbe25O68qfeKKLXht7pbsW8idQKYet+QoBfu9YcXDRIXPOXN7f4MV4xaM5lIgIhILneDCJOPyMNYPuHBlykduBSIiMdUCbuwQ8Z83x/pfduPNnJdcC0REYq4RbFoi4g81x/p32fRhy3buBSIisdUaZuxSBVc2t+vvmrHm3kohBCIicd84s/FIRL/dHOv9+2zu9fWewghkSiTyCdibTqv+WhjtHxz/neurUAIZVKIbqAmWfbYybcqEsXpVrJ/NNAhDzgsnkCmRjLOsbTfUIsOZ6dd0sPo5xMON8vfuQgpkgFsODHXfdBPH6+PPHMXr7j3b81hYgUy9kxwAkOnGY/ZK549lApJmDiYepiFWaIFMimSk/iKYF6aBI2NmQcDhibOziMb4LYUXyJRI1oNZdpE33D4MbGxF+kzDZr0yVwqBTL24f5qBtV7Rz3cwD4eRn8tkTWItjUAO/iVR14DxbZMAy2iLGetasb6uDLmXSiCDgm5aWjs7SWhw1oS8vA/f4QzCbeGY/tTwQ/M5onQCGZRpPTB/UaCeJ+CkfJYtg6gZ4yBcHUb63gy8Z+aylAI5RLsbqK0MLMuMfn4cv4EqvTPc1uvmJ2QzkZZaIJMv7w31UyZcYAZnEa3Qy7V5vTOWb8Uvi5jd0XIqvUAGgNoj6m5iXH00WCX8904Y6VYJ834zZRHIFIp2o/7xCvEdMofrIBAC/aAZ9d5bZnEc5CDXmwRGl+D8akX9J4AFJcaSgHB7OKZvLTED+QtypOK3g/pOAr+jbA1CwH7i5D0r4/FHy5b7TPnKX5AZyHQD9SQD55SlUQi068Reb/miXdhXlpxnk6cI5AiUuoG6h4E/mA3IPN9DhA3NMV2a/wyGqZUI5Ci02iP1G4n5MwU+XPTeMNK/P0zTlOleEcgsqt1dipAT9TgAr3cin0Uqh98yAaK14Vjvs0OOK9XtIpAhyt0NVMRA5md3DxHyTLfu6ye4aPUO/YwBW4U2IQIZsrztEfUTYlw45DCfbn81jPTJPgXkcywikBTV6TbqdzHxYLp33vg9Hkb6/BQpl3ZI3grsTaE2NWofSCr0VTBq3gQ1cyBMRHc1x3ofzkGsXoUoAplDObYsR2O8r9oAjp2DGdtDe9UE16/Yoe+27aiI9kUgBqraGVFPwc+DRp9/PdLLzgX6BtIspQkRiKGyd4P6PzL4o/68l/CPw6h/iaH0SmtGBGKw9JuWLLggqUz8KOPfS8YJuKUZ6TsMplZaUyIQC6XvBJPvJaEF00cz+Uryhl696mW8cLQb5d9nR0AEMjtOQ9/VCdS3AFzj8JHriTDS5w0dqAw4IgERiMUG2dhQl1cI/2p5fUkC0JfCqHeDxVRKa1oE4qD0nRG1DYylxl0R9lLCFzfj/mCemFwWCIhALECdzmQnUA8CuMyUOwI6zZKvFzfF8kh2RCAuKE/56Cyt/ykS/iIANQe3DMZ3wlgP3m/kskxABGIZ8HTm20H9BQIvSuH6AFD94zDaX6rN21JwMjZEBGIM5XCGNgbqMxXgI7OcpjI4MevhVqRLv8vIcJTnfrcIZO4M52ShG6hvMtNvgfgEYHLi46AmDGAcmFwf3g4jfdGcnMjg1AREIKnRycAyEBCBlKHKkmNqAiKQ1OhkYBkIiEDKUGXJMTUBEUhqdDKwDAREIGWosuSYmoAIJDU6GVgGAiKQMlRZckxNQASSGp0MLAMBEUgZqiw5piYgAkmNTgaWgcD/Aqi7qgVtgXhwAAAAAElFTkSuQmCC',
                symbolSize: changeFontSize(0.18), //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高
                colorBy: "series",
                label: {
                  show:true,
                  normal: { //文字字体的风格normal正常
                        show: true,
                        position: 'top',
                        color: "rgba(255, 255, 255, 1)", //文字的颜色。
                        // color: "yellow", //文字的颜色。
                        fontWeight: "bold", //文字字体的粗细
                        fontSize: changeFontSize(0.14),
                        // distance: changeFontSize(0.1), //距离图形元素的距离
                        formatter: function(params) {
                            return params.name 
                            // return params.name + " " + params.data.quantity + params.data.unit
                        },
                  }
                },
                emphasis: {
                  show: false,
                  focus: 'item',
                  itemStyle:{
                    color: 'rgb(252, 1, 26)'
                  }
                },
                // tooltip:{
                //   formatter: function(params) {
                //     return params.name + " " + params.data.quantity + params.data.unit
                //   }
                // },
                // symbol: 'image://data:image/png;base64,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',
                // symbolRotate: 35,
                data: warehouseList
              },
            ]
            
        }
        chinaChart.setOption(option, true); // 初始化地图
        window.addEventListener("resize", function() { //监听 resize 事件重绘地图
            chinaChart.resize();
        });
    }
    // 让echras图表大小随屏幕改变而改变
    function changeFontSize(res) {
      let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
      if(!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    }
    return {
        ...toRefs(data),
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
