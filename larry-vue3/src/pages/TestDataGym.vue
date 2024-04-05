<!-- This is the chart of the test data of gym  -->

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import { defineProps } from 'vue'

// Define the propss
const props = defineProps({
  title: String
})

// This is the first scene of the graph
let testData = [
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:10",
        "numberOfPeople": 10
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:12",
        "numberOfPeople": 15
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:14",
        "numberOfPeople": 20
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:16",
        "numberOfPeople": 25
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:18",
        "numberOfPeople": 30
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:20",
        "numberOfPeople": 35
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:22",
        "numberOfPeople": 40
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:24",
        "numberOfPeople": 45
    },
];

// This is the fowllowing updating scenes of the graph
let updatedTestData = [
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:26",
        "numberOfPeople": 50
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:28",
        "numberOfPeople": 55
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:30",
        "numberOfPeople": 60
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:32",
        "numberOfPeople": 65
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:34",
        "numberOfPeople": 70
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:36",
        "numberOfPeople": 75
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:38",
        "numberOfPeople": 80
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Gym",
        "timestamp": "2024-03-04T13:10:40",
        "numberOfPeople": 85
    },
];

// Extracting timestamps, areaNames, and numberOfPeople from testData
const timestamps = testData.map(entry => entry.timestamp);
const areaNames = testData.map(entry => entry.areaName);
const numberOfPeople = testData.map(entry => entry.numberOfPeople);

onMounted(() => {

    var app = {};

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    // Format timestamps for display (HH:mm:ss)
    const formattedTimestamps = timestamps.map(timestamp => {
        const date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    });

    option = {
        // Adjust the following values to increase space on the left, right, bottom, and top sides
        grid: {
            left: '10%', // adjust this value to increase space on the left side
            right: '10%', // adjust this value to increase space on the right side
            bottom: '10%', // adjust this value to increase space at the bottom
            top: '10%', // adjust this value to increase space at the top
            containLabel: true
        },

        title: {
            //text: 'Test Dynamic Data'
            text: props.title
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
                data: formattedTimestamps
            },
            {
                type: 'category',
                boundaryGap: true,
                data: areaNames,
                axisLabel: {
                    margin: 1 // Adjust this value to increase space between ticks and labels
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Number of People',
                max: 180,
                //max: Math.max(...numberOfPeople) + 10, // Adjust max value based on testData
                min: 0,
                boundaryGap: [0.2, 0.2],
                /* axisLabel: {
                    margin: 10 // Adjust this value to increase space between ticks and labels
                } */
            }
        ],
        series: [
            {
                name: 'Number of People (Bar)',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 0,
                data: numberOfPeople
            },
            {
                name: 'Number of People (Line)',
                type: 'line',
                data: numberOfPeople
            }
        ]
    };

    app.count = 11;

    // The following is the update function, dynamically updating the chart
    setInterval(function () {
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

        // object that will be pushed to the testData array, just for stimulation
        /* let newEntry = {
            "areaId": "unique_area_identifier",
            "areaName": "Library",
            "timestamp": "2024-03-04T14:10:30",
            "numberOfPeople": Math.round(Math.random() * 100)
        }; */

        let newEntry = updatedTestData.shift();

        testData.shift();
        testData.push(newEntry);

        myChart.setOption({
            xAxis: [
                {
                    data: testData.map(entry => {
                        const date = new Date(entry.timestamp);
                        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                    })
                },
                {
                    data: testData.map(entry => entry.areaName)
                }
            ],
            series: [
                {
                    name: 'Number of People (Bar)',
                    data: testData.map(entry => entry.numberOfPeople)
                },
                {
                    name: 'Number of People (Line)',
                    data: testData.map(entry => entry.numberOfPeople)
                }
            ]
        });
    }, 2100);

    option && myChart.setOption(option);

})

</script>

<template>
    <h1>This is the test data page</h1>

    <div id="main" style="width: 700px;height:500px;"></div>
</template>