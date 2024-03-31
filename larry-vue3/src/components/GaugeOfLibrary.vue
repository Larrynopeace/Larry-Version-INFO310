<!-- This is the Guage of library -->

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

// This is the test data for the library
let testData = [
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:10",
        "numberOfPeople": 10
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:12",
        "numberOfPeople": 15
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:14",
        "numberOfPeople": 20
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:16",
        "numberOfPeople": 25
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:18",
        "numberOfPeople": 30
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:20",
        "numberOfPeople": 35
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:22",
        "numberOfPeople": 40
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:24",
        "numberOfPeople": 45
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:26",
        "numberOfPeople": 50
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:28",
        "numberOfPeople": 55
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:30",
        "numberOfPeople": 60
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:32",
        "numberOfPeople": 65
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:34",
        "numberOfPeople": 70
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:36",
        "numberOfPeople": 75
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:38",
        "numberOfPeople": 80
    },
    {
        "areaId": "unique_area_identifier",
        "areaName": "Library",
        "timestamp": "2024-03-04T13:10:40",
        "numberOfPeople": 85
    },
];
// The first scene of the graph, split the first data from the testData
let firstScene = [];
firstScene.push(testData.shift());
// Get the numberOfPeople from the first data item
let firstSceneNumber = firstScene[0].numberOfPeople;

const props = defineProps({
    id: String
})

onMounted(() => {

    var ROOT_PATH = 'https://echarts.apache.org/examples';

    var chartDom = document.getElementById(props.id);
    var myChart = echarts.init(chartDom);
    var option;

    var _panelImageURL = ROOT_PATH + '/data/asset/img/custom-gauge-panel.png';
    var _animationDuration = 1000;
    var _animationDurationUpdate = 1000;
    var _animationEasingUpdate = 'quarticInOut';
    var _valOnRadianMax = 200;
    var _outerRadius = 200;
    var _innerRadius = 170;
    var _pointerInnerRadius = 40;
    var _insidePanelRadius = 140;
    var _currentDataIndex = 0;
    function renderItem(params, api) {
        var valOnRadian = api.value(1);
        var coords = api.coord([api.value(0), valOnRadian]);
        var polarEndRadian = coords[3];
        var imageStyle = {
            image: _panelImageURL,
            x: params.coordSys.cx - _outerRadius,
            y: params.coordSys.cy - _outerRadius,
            width: _outerRadius * 2,
            height: _outerRadius * 2
        };
        return {
            type: 'group',
            children: [
                {
                    type: 'image',
                    style: imageStyle,
                    clipPath: {
                        type: 'sector',
                        shape: {
                            cx: params.coordSys.cx,
                            cy: params.coordSys.cy,
                            r: _outerRadius,
                            r0: _innerRadius,
                            startAngle: 0,
                            endAngle: -polarEndRadian,
                            transition: 'endAngle',
                            enterFrom: { endAngle: 0 }
                        }
                    }
                },
                {
                    type: 'image',
                    style: imageStyle,
                    clipPath: {
                        type: 'polygon',
                        shape: {
                            points: makePionterPoints(params, polarEndRadian)
                        },
                        extra: {
                            polarEndRadian: polarEndRadian,
                            transition: 'polarEndRadian',
                            enterFrom: { polarEndRadian: 0 }
                        },
                        during: function (apiDuring) {
                            apiDuring.setShape(
                                'points',
                                makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
                            );
                        }
                    }
                },
                {
                    type: 'circle',
                    shape: {
                        cx: params.coordSys.cx,
                        cy: params.coordSys.cy,
                        r: _insidePanelRadius
                    },
                    style: {
                        fill: '#fff',
                        shadowBlur: 25,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: 'rgba(76,107,167,0.4)'
                    }
                },
                {
                    type: 'text',
                    extra: {
                        valOnRadian: valOnRadian,
                        transition: 'valOnRadian',
                        enterFrom: { valOnRadian: 0 }
                    },
                    style: {
                        text: makeText(valOnRadian),
                        fontSize: 50,
                        fontWeight: 700,
                        x: params.coordSys.cx,
                        y: params.coordSys.cy,
                        fill: 'rgb(0,50,190)',
                        align: 'center',
                        verticalAlign: 'middle',
                        enterFrom: { opacity: 0 }
                    },
                    during: function (apiDuring) {
                        apiDuring.setStyle(
                            'text',
                            makeText(apiDuring.getExtra('valOnRadian'))
                        );
                    }
                }
            ]
        };
    }
    function convertToPolarPoint(renderItemParams, radius, radian) {
        return [
            Math.cos(radian) * radius + renderItemParams.coordSys.cx,
            -Math.sin(radian) * radius + renderItemParams.coordSys.cy
        ];
    }
    function makePionterPoints(renderItemParams, polarEndRadian) {
        return [
            convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
            convertToPolarPoint(
                renderItemParams,
                _outerRadius,
                polarEndRadian + Math.PI * 0.03
            ),
            convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
        ];
    }
    function makeText(valOnRadian) {
        // Validate additive animation calc.
        if (valOnRadian < -10) {
            alert('illegal during val: ' + valOnRadian);
        }
        return ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + '%';
    }
    option = {
        animationEasing: _animationEasingUpdate,
        animationDuration: _animationDuration,
        animationDurationUpdate: _animationDurationUpdate,
        animationEasingUpdate: _animationEasingUpdate,
        // This is the first scene of the graph
        dataset: {
            //source: [[1, 156]]
            source: [[1, firstSceneNumber]]
        },
        tooltip: {},
        angleAxis: {
            type: 'value',
            startAngle: 0,
            show: false,
            min: 0,
            max: _valOnRadianMax
        },
        radiusAxis: {
            type: 'value',
            show: false
        },
        polar: {},
        series: [
            {
                type: 'custom',
                coordinateSystem: 'polar',
                renderItem: renderItem
            }
        ]
    };

    // The following code is used to update the data of the chart every 3 seconds
    /* setInterval(function () {
        var nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]];
        myChart.setOption({
            dataset: {
                source: nextSource
            }
        });
    }, 3000); */

    setInterval(function () {
    // Get the numberOfPeople from the current data item
    var numberOfPeople = testData[_currentDataIndex].numberOfPeople;

    // Prepare the nextSource data
    var nextSource = [[1, numberOfPeople]];

    // Update the chart data
    myChart.setOption({
        dataset: {
            source: nextSource
        }
    });

    // Increment _currentDataIndex
    _currentDataIndex++;

    // If _currentDataIndex exceeds the length of testData, reset it to 0
    if (_currentDataIndex >= testData.length) {
        _currentDataIndex = 0;
    }
}, 3000);



    option && myChart.setOption(option);
})

</script>

<template>
    <div class="gauge-container">
        <h3>Library</h3>
        <div :id="props.id" style="width: 400px;height:400px;"></div>
    </div>
</template>

<style scoped>
.gauge-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>