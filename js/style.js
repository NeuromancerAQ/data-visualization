/**
 * Created by Administrator on 2018/5/28.
 */
$(function(){
    var video=document.getElementById('audio');
    var i = setInterval(function() {
        if(video.readyState > 0) {
            var currentTime=video.currentTime.toFixed(0);
            if(currentTime=='9'){
                $('.box').animate({
                    'borderColor':'#CC3333'
                },600)
            }
            if(currentTime=='18'){
                    $('.box').animate({
                        'borderColor':'#00fefe'
                    },600)
                }
        }
    }, 100)
});

function run1(){
    var mycharts=echarts.init($('#myecharts1')[0]);
    var scaleData = [{
        'name': 'BOSS直聘',
        'value': 10
    },
        {
            'name': '猎聘网',
            'value': 20
        },
        {
            'name': '拉勾网',
            'value': 20
        },
        {
            'name': '智联',
            'value': 27
        },
        {
            'name': '前程无忧',
            'value': 23
        }
    ];
    var rich = {
        white: {
            color: '#ddd',
            align: 'center',
            padding: [5, 0]
        }
    };
    var placeHolderStyle = {
        normal: {
            label: {
                show: true
            },
            labelLine: {
                show: false
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
        }
    };
    var data = [];
    for (var i = 0; i < scaleData.length; i++) {
        data.push({
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
                normal: {
                    borderWidth: 10,
                    shadowBlur: 30,
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                        offset: 0,
                        color: '#7777eb'
                    }, {
                        offset: 1,
                        color: '#70ffac'
                    }]),
                    shadowColor: 'rgba(142, 152, 241, 0.6)'
                }
            }
        }, {
            value: 4,
            name: '',
            itemStyle: placeHolderStyle
        });
    }
    var seriesObj = [{
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [75, 85],
        hoverAnimation: false,
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'outside',
                    color: '#ddd',
                    formatter: function(params) {
                        var percent = 0;
                        var total = 0;
                        for (var i = 0; i < scaleData.length; i++) {
                            total += scaleData[i].value;
                        }
                        percent = ((params.value / total) * 100).toFixed(0);
                        if(params.name !== '') {
                            return params.name + '\n' + '占比' + percent + '%';
                        }else {
                            return '';
                        }
                    },
                    rich: rich
                },
                labelLine: {
                    show: false
                }
            }
        },
        data: data
    }];
    var options={
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: true,
                position: 'center',
                textStyle: {
                    fontSize: '15',
                    fontWeight: 'bold'
                }
            }
        },
        avoidLabelOverlap: false,
        tooltip: {
            show: false
        },
        legend: {
            show: false
        },
        toolbox: {
            show: false
        },
        series: seriesObj
    };

    mycharts.setOption(options);
}

$(function(){
    run1()
});


function run2(){
    var mycharts=echarts.init($('#myecharts2')[0]);
    var options= {
        title: {
            x: 'center',
            text: '要求相关技能的职位数量',
            textStyle:{
                color:'rgba(255, 255, 255, 0.7)'
            },
            top:20
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['HTML','CSS','JavaScript','MySQL','Oracle','Echarts','D3','Tableau','BI','Python']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                name: 'ECharts例子个数统计',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data:  [1051,1179,3545,546,153,47,29,178,1572,3064]
            }
        ]
    };
    mycharts.setOption(options);
}

$(function(){
    run2()
});

var datainfo=[{name: "北京", value: "4984"},{name: "上海", value: "4188"},{name: "广东", value: "3304"},{name: "浙江", value: "4683"},{name: "江苏", value: "3269"}, {name: "四川", value: "3228"},{name: "湖北", value: "2146"},{name: "重庆", value: "3462"},{name: "天津", value: "2357"},{name: "福建", value: "3541"},{name: "陕西", value: "1234"},{name: "湖南", value: "2332"},{name: "安徽", value: "2230"},{name: "山东", value: "1226"},{name: "河南", value: "1023"},{name: "辽宁", value: "1322"},{name: "黑龙江", value: "897"},{name: "贵州", value: "2347"},{name: "江西", value: "235"},{name: "云南", value: "245"},{name: "河北", value: "564"},{name: "甘肃", value: "434"},{name: "山西", value: "256"},{name: "吉林", value: "423"},{name: "新疆", value: "2"},{name: "海南", value: "16"},{name: "台湾", value: "2345"},{name: "宁夏", value: "654"},{name: "广西", value: "678"},{name: "香港", value: "2364"},{name: "青海", value: "156"},{name: "西藏", value: "15"},{name: "内蒙古", value: "13"}];


function run3(){
    var mycharts=echarts.init($('#myecharts3')[0]);
    var curIndx = 0;
    var options1={
        title: {
            text: datainfo[curIndx].name +''+ datainfo[curIndx].value,
            textStyle: {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 40
            },
            bottom: 20,
            left: 20
        },
        series: [
            {
                name: '职位数量',
                type: 'map',
                //boeder颜色
                itemStyle: {
                    normal: {
                        color:'rgba(255,255,255,0.5)',
                        areaColor: 'rgba(12,21,100,0.5)',
                        borderColor: '#3fdaff',
                        borderWidth: 2,
                        shadowColor: 'rgba(63, 218, 255, 0.5)',
                        shadowBlur: 30
                    },
                    emphasis: {
                        areaColor:'blue',
                        color:'white'
                    }
                },
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true,
                        color:'#999'
                    },
                    emphasis: {
                        show: true,
                        color:'white'
                    }
                },
                data:(function() {
                    var res = [];
                    var len = -1;
                    while (len++ < datainfo.length - 1) {
                        res.push({
                            name: datainfo[len].name,
                            value: datainfo[len].value,
                            selected: ifSelecte(len)
                        });
                    }
                    return res;
                })()
            }
        ]
    };
  var options2={
      title: {
          text: datainfo[curIndx].name +''+ datainfo[curIndx].value,
          textStyle: {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 40
          },
          bottom: 20,
          left: 20
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data:['职位数量']
      },
      series: [
          {
              name: '投诉数量',
              type: 'map',
              //boeder颜色
              itemStyle: {
                  normal: {
                      color:'rgba(213,10,61,0.5)',
                      areaColor: 'rgba(255,102,102,0.5)',
                      borderColor: 'rgba(204,0,51,0.5)',
                      borderWidth: 2,
                      shadowColor: 'rgba(255,102,102,0.5)',
                      shadowBlur: 30
                  },
                  emphasis: {
                      areaColor:'red',
                      color:'white'
                  }
              },
              mapType: 'china',
              roam: false,
              label: {
                  normal: {
                      show: true,
                      color:'#999'
                  },
                  emphasis: {
                      show: true,
                      color:'white'
                  }
              },
              data: (function() {
                  var res = [];
                  var len = -1;
                  while (len++ < datainfo.length - 1) {
                      res.push({
                          name: datainfo[len].name,
                          value: datainfo[len].value,
                          selected: ifSelecte(len)
                      });
                  }
                  return res;
              })()
          }
      ]
  };

    mycharts.setOption(options1);
    var video=document.getElementById('audio');
    var i = setInterval(function() {
        if(video.readyState > 0) {
            var currentTime=video.currentTime.toFixed(0);
            if(currentTime=='9'){
                mycharts.setOption(options2);
            }
            if(currentTime=='18'){
                mycharts.setOption(options1);
            }
        }
    }, 100);

    setInterval(function() {
        curIndx = (curIndx + 1) % datainfo.length;
        mycharts.setOption({
            title: {
                text: datainfo[curIndx].name +''+ datainfo[curIndx].value,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: 40
                },
                bottom: 20,
                left: 20
            },
            series: [{
                data: (function() {
                    var res = [];
                    var len = -1;
                    while (len++ < datainfo.length - 1) {
                        res.push({
                            name: datainfo[len].name,
                            value: datainfo[len].value,
                            selected: ifSelecte(len)
                        });
                    }
                    return res;
                })()
            }]
        });
    }, 1000);
    var flag = false;
    function ifSelecte(num) {
        if (num == curIndx) {
            flag = true
        } else {
            flag = false
        }
        return flag;
    }

}

$(function(){
    run3();
});

function run4(){
    var uploadedDataURL ='data1.json';
    var myChart=echarts.init($('#myecharts4')[0]);
    myChart.showLoading();

    $.getJSON(uploadedDataURL, function (data) {
        myChart.hideLoading();
        var itemStyle = {
            normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };

        var sizeFunction = function (x) {
            var y = Math.sqrt(x / 3000) + 0.5;
            return y * 40;
        };
        // Schema:
        var schema = [
            {name: 'Income', index: 0, text: '平均工资', unit: '元'},
            {name: 'LifeExpectancy', index: 1, text: '经验要求', unit: '年'},
            {name: 'Population', index: 2, text: '岗位数量', unit: ''},
            {name: 'Country', index: 3, text: '地区', unit: ''}
        ];

        option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    orient: 'vertical',
                    autoPlay: true,
                    inverse: true,
                    playInterval: 1000,
                    left: null,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    width: 55,
                    height: null,
                    label: {
                        normal: {
                            textStyle: {
                                color: '#999'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    symbol: 'none',
                    lineStyle: {
                        color: '#555'
                    },
                    checkpointStyle: {
                        color: '#bbb',
                        borderColor: '#777',
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false,
                        normal: {
                            color: '#666',
                            borderColor: '#666'
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    },
                    data: []
                },
                //backgroundColor: '#333',
                title: {
                    'text': data.timeline[0],
                    textAlign: 'center',
                    left: '75%',
                    top: '35%',
                    textStyle: {
                        fontSize: 90,
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                tooltip: {
                    padding: 5,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        return schema[3].text + '：' + value[3] + '<br>'
                            + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                            + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>';
                    }
                },
                grid: {
                    left: '12%',
                    right: '110'
                },
                xAxis: {
                    type: 'log',
                    name: '平均工资',
                    max: 50000,
                    min: 4000,
                    nameGap: 25,
                    nameLocation: 'middle',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} ￥',
                        textStyle: {
                            color: '#ccc'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '经验要求',
                    max: 10,
                    nameTextStyle: {
                        color: '#ccc',
                        fontSize: 18
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} 年',
                        textStyle: {
                            color: '#ccc'
                        }
                    }
                },
                visualMap: [
                    {
                        show: false,
                        dimension: 3,
                        categories: data.counties,
                        calculable: true,
                        precision: 0.1,
                        textGap: 30,
                        textStyle: {
                            color: '#ccc'
                        },
                        inRange: {
                            color: ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a']
                        }
                    }
                ],
                series: [
                    {
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: data.series[0],
                        symbolSize: function(val) {
                            return sizeFunction(val[2]);
                        }
                    }
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'quinticInOut'
            },
            options: []
        };

        for (var n = 0; n < data.timeline.length; n++) {
            option.baseOption.timeline.data.push(data.timeline[n]);
            option.options.push({
                title: {
                    show: true,
                    'text': data.timeline[n] + ''
                },
                series: {
                    name: data.timeline[n],
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data.series[n],
                    symbolSize: function(val) {
                        return sizeFunction(val[2]);
                    }
                }
            });
        }
        myChart.setOption(option);

    });
};

$(function(){
    run4()
});


function run5(){
    var mycharts=echarts.init($('#myecharts5')[0]);
    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 15,
            shadowColor: 'white'
        }
    };
    var placeHolderStyle = {
        normal: {
            color: 'rgba(0,0,0,0)',
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };

    var options = {
        color: ['#85b6b2', '#6d4f8d', '#cd5e7e', '#e38980', '#f7db88'],
        legend: {
            top: "0%",
            left: "5%",
            itemHeight: 10,
            itemWidth: 10,
            data: ['互联网/电子商务', '计算机/IT服务', '房地产/建筑', '通信/电信运营', '基金/证券'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: true,
            orient: "vertical"
        },
        series: [{
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['70%', '80%'],
            itemStyle: dataStyle,
            hoverAnimation: false,

            data: [{
                value: 150,
                name: '互联网/电子商务'
            }, {
                value: 50,
                name: 'invisible',
                itemStyle: placeHolderStyle
            }

            ]
        }, {
            name: 'Line 2',
            type: 'pie',
            clockWise: true,
            radius: ['60%', '70%'],
            itemStyle: dataStyle,
            hoverAnimation: false,

            data: [{
                value: 150,
                name: '计算机/IT服务'
            }, {
                value: 60,
                name: 'invisible',
                itemStyle: placeHolderStyle
            }]
        }, {
            name: 'Line 3',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: ['50%', '60%'],
            itemStyle: dataStyle,

            data: [{
                value: 80,
                name: '房地产/建筑'
            }, {
                value: 50,
                name: 'invisible',
                itemStyle: placeHolderStyle
            }]
        }, {
            name: 'Line 4',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: ['40%', '50%'],
            itemStyle: dataStyle,

            data: [{
                value: 45,
                name: '通信/电信运营'
            }, {
                value: 30,
                name: 'invisible',
                itemStyle: placeHolderStyle
            }]
        }, {
            name: 'Line 5',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: ['30%', '40%'],
            itemStyle: dataStyle,

            data: [{
                value: 30,
                name: '基金/证券'
            }, {
                value: 30,
                name: 'invisible',
                itemStyle: placeHolderStyle
            }]
        }
        ]
    };
    setInterval(function() {
        mycharts.setOption({
            series: [{
                name: 'Line 1',
                data: [{
                    value: Math.random(),
                    name: '互联网/电子商务'
                }, {
                    value: 1-Math.random()+0.33,
                    name: 'invisible',
                    itemStyle: placeHolderStyle
                }
                ]
            }, {
                name: 'Line 2',
                data: [{
                    value: Math.random(),
                    name: '计算机/IT服务'
                }, {
                    value: 1-Math.random()+0.33,
                    name: 'invisible',
                    itemStyle: placeHolderStyle
                }]
            }, {
                name: 'Line 3',
                data: [{
                    value: Math.random(),
                    name: '房地产/建筑'
                }, {
                    value: 1-Math.random()+0.33,
                    name: 'invisible',
                    itemStyle: placeHolderStyle
                }]
            }, {
                name: 'Line 4',
                data: [{
                    value: Math.random(),
                    name: '通信/电信运营'
                }, {
                    value: 1-Math.random()+0.33,
                    name: 'invisible',
                    itemStyle: placeHolderStyle
                }]
            }, {
                name: 'Line 5',
                data: [{
                    value: Math.random(),
                    name: '基金/证券'
                }, {
                    value: 1-Math.random()+0.33,
                    name: 'invisible',
                    itemStyle: placeHolderStyle
                }]
            }]
        });
    }, 1000);
    mycharts.setOption(options);
}

$(function(){
    run5()
});

$(function(){
    var n=1;
    $('#menu').click(function(){
        if(n==1){
            $('#list').animate({
                left:'0px'
            },1000);
            n=0;
        } else if(n==0){
            $('#list').animate({
                left:'-500px'
            },1000);
            n=1;
        }
    })

});


