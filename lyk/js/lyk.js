/*---地图---*/
var myChart=echarts.init(document.getElementById('center_map'));
var uploadedDataURL = "js/shanghai.json";
myChart.showLoading();
$.getJSON(uploadedDataURL, function(geoJson) {
    echarts.registerMap('shanghai', geoJson);
    myChart.hideLoading();
    var geoCoordMap = {
        '黄浦区': [121.490317, 31.222771],
        '徐汇区': [121.43752, 31.179973],
        '长宁区': [121.4222, 31.218123],
        '静安区': [121.448224, 31.229003],
        '普陀区': [121.392499, 31.241701],
        '闸北区': [121.465689, 31.25318],
        '虹口区': [121.491832, 31.26097],
        '杨浦区': [121.522797, 31.270755],
        '闵行区': [121.375972, 31.111658],
        '宝山区': [121.489934, 31.398896],
        '嘉定区': [121.250333, 31.383524],
        '浦东新区': [121.567706, 31.245944],
        '金山区': [121.330736, 30.724697],
        '松江区': [121.223543, 31.03047],
        '青浦区': [121.113021, 31.151209],
        '奉贤区': [121.458472, 30.912345],
        '崇明县': [121.397516, 31.626946],
    }
    var data = [{
        name: '黄浦区',
        value: 219
    }, {
        name: '徐汇区',
        value: 568
    }, {
        name: '长宁区',
        value: 412
    }, {
        name: '静安区',
        value: 667
    }, {
        name: '普陀区',
        value: 389
    }, {
        name: '闸北区',
        value: 352
    }, {
        name: '虹口区',
        value: 329
    }, {
        name: '杨浦区',
        value: 532
    }, {
        name: '闵行区',
        value: 299
    }, {
        name: '宝山区',
        value: 468
    }, {
        name: '嘉定区',
        value: 230
    }, {
        name: '浦东新区',
        value: 752
    }, {
        name: '金山区',
        value: 35
    }, {
        name: '松江区',
        value: 415
    }, {
        name: '青浦区',
        value: 329
    }, {
        name: '奉贤区',
        value: 20
    }, {
        name: '崇明县',
        value: 399
    }, ];
    var max = 1000,
        min = 0; // todo
    var maxSize4Pin = 100,
        minSize4Pin = 0;

    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };


    option = {

        title: {
            text: '上海大数据区域分布',
            x: 'left',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',

            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function(params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value;
                res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                return res;
            }
        },
        visualMap: {
            show: true,
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            dimension: 0,
            inRange: {
                color: ['#98F5FF', '#1E90FF', '#0000CD'] // 黑紫黑

            },
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'shanghai',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true, //是否允许缩放
            layoutCenter: ['50%', '50%'], //地图位置
            layoutSize: "95%",
            itemStyle: {
                normal: {
                    color: 'rgba(51, 69, 89, .5)', //地图背景色
                    borderColor: 'rgba(100,149,237,1)' //省市边界线
                },
                emphasis: {
                    color: 'rgba(37, 43, 61, .5)' //悬浮背景
                }
            }
        },
        series: [{
            name: 'credit_pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
                return val[2] / 30;
            },

            itemStyle: {
                normal: {
                    color: '#05C3F9'
                }
            }
        }, {
            type: 'map',
            map: 'shanghai',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        }, {
            name: '前五名',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function(a, b) {
                return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function(val) {
                return val[2] / 30;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#eac736',
                    shadowBlur: 10,
                    shadowColor: '#05C3F9'
                }
            },
            zlevel: 1
        },

        ]
    };
    myChart.setOption(option);

    var counts = option.series[0].data.length; //获取所有闪动圆环数量
    var dataIndex = 0;
    //让圆环的提示框自动触发轮播显示
    function autoHoverTip() {
        for (var i = 0; i < counts; i++) {
            (function(i) {
                ts = setTimeout(function() {
                    myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 1,
                        dataIndex: i
                    });
                }, 5000 * i);
            })(i);
        }
    }

    setTimeout(function() {
        autoHoverTip();
        tv = setInterval(autoHoverTip, counts * 1000);
    }, 500);
});
/*--------饼图----------*/
var myecharts=echarts.init(document.getElementById('box3_right_t'));//取块并初始化
var options={
    title : {
        text: '大数据各行业分布',
        x:'center',
        textStyle:{
            color:'white'
        }
    },

    color:['#996699','pink','#0099CC','#339933','#66CCCC','#FFCC00','#666699','#0099CC',],
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '50%',

            data:[
                {value:584, name:'股份制企业(15.21%)'},
                {value:303, name:'国企(7.89%)'},
                {value:200, name:'合资(5.21%)'},
                {value:118, name:'其他(3.07%)'},
                {value:260, name:'上市公司(6.77%)'},
                {value:29, name:'事业单位(0.75%)'},
                {value:98, name:'外商独资(2.55%)'},
                {value:1900, name:'民营(49.48%)'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myecharts.setOption(options);//设置配置项
/*----雷达图----*/
var box4_heatmap=echarts.init(document.getElementById("box3_left_b"));
var options={

    title: {
        text: '求职影响因素',
        textStyle:{
            color:'white'
        }
    },
    tooltip: {},
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [2, 2]
            }

        },
        indicator: [
            { name: '工作经验', max: 1,min:-1,color:'green'},
            { name: '学历', max: 1,min:-1,color:'green'},
            { name: '面试发挥', max: 1,min:-1,color:'green'},
            { name: '技术', max: 1,min:-1,color:'green'},
            { name: '其他', max: 1,min:-1,color:'green'},
        ],
        axisLine: {
            lineStyle: {
                color: '#449cff'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#449cff'
            }
        },

    },
    series: [{
        type: 'radar',
        // areaStyle: {normal: {}},
        lineStyle:{
            color:'green'
        },
        data : [
            {
                value :[0.7,0.45,0.5,0.8,0.3],
            },

        ]
    }]
};
box4_heatmap.setOption(options);
/*-----柱形图-----*/
var myecharts=echarts.init(document.getElementById('box3_right_b'));//取块并初始化
var options=  {
    textStyle:{
        color:'white'
    },
    title : {
        text: '大数据人才缺口分析',
        textStyle:{
            color:'white'
        }
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['岗位需求','求职人数'],
        right:0,
        textStyle:{
            color:'white'
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['2014年','2015年','2016年','2017年','2018年','2019年'],
            axisLabel:{
                color:"white",
                rotate:"45"
            },
            name:'时间',
        }
    ],
    yAxis : [
        {
            type : 'value',
            name:'人口数量(万)',
            yxisLabel:{
                color:"white",
            },

        }
    ],
    series : [
        {
            name:'岗位需求',
            type:'bar',
            data:[2.0, 4.3, 25, 80, 120, 162 ],
            itemStyle:{
                color:'blue'
            }

        },
        {
            name:'求职人数',
            type:'bar',
            data:[1.2, 3.1, 15, 45, 68, 80 ],

        }
    ]
};
myecharts.setOption(options);//设置配置项
/*----折线图---*/
var myecharts=echarts.init(document.getElementById('box3_left_t'));
var options= {
    textStyle:{
        color:'white'
    },
    title: {
        text: '大数据工资增长趋势',
        textStyle:{
            color:'white'
        }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },


    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['无经验','1-3年','3-5年','5-10年','10年以上']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name:'(k/月)',
        }
    ],
    series : [
        {
            name:'薪资',
            type:'line',
            stack: '总量',
//                areaStyle: {normal: {}},
            data:[11, 13, 20, 23, 25]
        },

    ]
};
myecharts.setOption(options)
/*象形柱图*/
var box4_pict=echarts.init(document.getElementById("center_pie"));
var options={
    title : {
        text:'岗位数量前五名',
        x:'center',
        top:'4%',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b0}: {c0}<br />'
    },
    grid: {
        top:'18%',
        left: '6%',
        right: '6%',
        bottom: '5%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        },
        formatter: function (params) {
            return params[0].name + ': ' + params[0].value;
        }
    },
    xAxis: {
        data: ['Java开发','大数据开发','数据分析师','可视化工程师','技术总监'],
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {
            textStyle: {
                color: 'white'
            }
        }
    },
    yAxis: {
        splitLine: {show: false},
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {show: false}
    },
    color: ['#98F5FF'],
    series: [{
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '-130%',
        // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',

        itemStyle: {
            color:'blue',
            normal: {
                opacity: 0.5
            },
            emphasis: {
                opacity: 1
            }
        },
        data: [123,90,69,60, 25],
        z: 10
    }, {
        name: 'glyph',
        type: 'pictorialBar',
        barGap: '-100%',
        symbolPosition: 'end',
        symbolSize: 50,
        symbolOffset: [0, '-120%'],
        data: [{
            value: 123,
            symbol:'image://img/da.png',
            symbolSize: [40, 40]
        }, {
            value: 90,
            symbol:'image://img/nis.png',
            symbolSize: [40,40]
        },
            {
                value: 69,
                symbol:'image://img/bieke.png',
                symbolSize: [65, 40]
            },
            {
                value: 60,
                symbol:'image://img/nis.png',
                symbolSize: [35, 40]
            }, {
                value: 25,
                symbol:'image://img/changan.png',
                symbolSize: [45, 40]
            }, ]
    }]
};
box4_pict.setOption(options);
