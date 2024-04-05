<!-- This is the eharts example page -->

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(() => {
    var app = {};

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    // The code you provided generates an array of 10 timestamps, each 2 seconds apart.
    const categories = (function () {
        let now = new Date();
        let res = [];
        let len = 10;
        while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(+now - 2000);
        }
        return res;
    })();
    // The code you provided generates an array of numbers from 0 to 9.
    const categories2 = (function () {
        let res = [];
        let len = 10;
        while (len--) {
            res.push(10 - len - 1);
        }
        return res;
    })();
    // The code you provided generates an array of 10 random numbers, each ranging from 0 to 1000.
    const data = (function () {
        let res = [];
        let len = 10;
        while (len--) {
            res.push(Math.round(Math.random() * 1000));
        }
        return res;
    })();
    // The code you provided generates an array of 10 random numbers, each ranging from 5 to 15.
    const data2 = (function () {
        let res = [];
        let len = 0;
        while (len < 10) {
            res.push(+(Math.random() * 10 + 5).toFixed(1));
            len++;
        }
        return res;
    })();
    option = {
        title: {
            text: 'Dynamic Data'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {},
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: categories
            },
            {
                type: 'category',
                boundaryGap: true,
                data: categories2
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Price',
                max: 30,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: 'Order',
                max: 1200,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: 'Dynamic Bar',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data
            },
            {
                name: 'Dynamic Line',
                type: 'line',
                data: data2
            }
        ]
    };
    app.count = 11;

    // Update the chart every 2 seconds
    setInterval(function () {
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
        
        // The shift method removes the first item from an array
        // The push method adds a new item to the end of an array
        data.shift();
        data.push(Math.round(Math.random() * 1000));

        data2.shift();
        data2.push(+(Math.random() * 10 + 5).toFixed(1));

        categories.shift();
        categories.push(axisData);

        categories2.shift();
        categories2.push(app.count++);
        
        myChart.setOption({
            xAxis: [
                {
                    data: categories
                },
                {
                    data: categories2
                }
            ],
            series: [
                {
                    data: data
                },
                {
                    data: data2
                }
            ]
        });
    }, 2100);

    option && myChart.setOption(option);
})

</script>

<template>
    <h1>This is the chart page</h1>

    <div id="main" style="width: 600px;height:400px;"></div>
</template>