/*---��ͼ---*/
var myChart=echarts.init(document.getElementById('center_map'));
var uploadedDataURL = "js/shanghai.json";
myChart.showLoading();
$.getJSON(uploadedDataURL, function(geoJson) {
    echarts.registerMap('shanghai', geoJson);
    myChart.hideLoading();
    var geoCoordMap = {
        '������': [121.490317, 31.222771],
        '�����': [121.43752, 31.179973],
        '������': [121.4222, 31.218123],
        '������': [121.448224, 31.229003],
        '������': [121.392499, 31.241701],
        'բ����': [121.465689, 31.25318],
        '�����': [121.491832, 31.26097],
        '������': [121.522797, 31.270755],
        '������': [121.375972, 31.111658],
        '��ɽ��': [121.489934, 31.398896],
        '�ζ���': [121.250333, 31.383524],
        '�ֶ�����': [121.567706, 31.245944],
        '��ɽ��': [121.330736, 30.724697],
        '�ɽ���': [121.223543, 31.03047],
        '������': [121.113021, 31.151209],
        '������': [121.458472, 30.912345],
        '������': [121.397516, 31.626946],
    }
    var data = [{
        name: '������',
        value: 219
    }, {
        name: '�����',
        value: 568
    }, {
        name: '������',
        value: 412
    }, {
        name: '������',
        value: 667
    }, {
        name: '������',
        value: 389
    }, {
        name: 'բ����',
        value: 352
    }, {
        name: '�����',
        value: 329
    }, {
        name: '������',
        value: 532
    }, {
        name: '������',
        value: 299
    }, {
        name: '��ɽ��',
        value: 468
    }, {
        name: '�ζ���',
        value: 230
    }, {
        name: '�ֶ�����',
        value: 752
    }, {
        name: '��ɽ��',
        value: 35
    }, {
        name: '�ɽ���',
        value: 415
    }, {
        name: '������',
        value: 329
    }, {
        name: '������',
        value: 20
    }, {
        name: '������',
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
            text: '�Ϻ�����������ֲ�',
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
                //����ҵ���Լ���չҪ��ʾ������
                var res = "";
                var name = params.name;
                var value = params.value;
                res = "<span style='color:#fff;'>" + name + "</span><br/>���ݣ�" + value;
                return res;
            }
        },
        visualMap: {
            show: true,
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['��', '��'], // �ı���Ĭ��Ϊ��ֵ�ı�
            calculable: true,
            seriesIndex: [1],
            dimension: 0,
            inRange: {
                color: ['#98F5FF', '#1E90FF', '#0000CD'] // ���Ϻ�

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
            roam: true, //�Ƿ���������
            layoutCenter: ['50%', '50%'], //��ͼλ��
            layoutSize: "95%",
            itemStyle: {
                normal: {
                    color: 'rgba(51, 69, 89, .5)', //��ͼ����ɫ
                    borderColor: 'rgba(100,149,237,1)' //ʡ�б߽���
                },
                emphasis: {
                    color: 'rgba(37, 43, 61, .5)' //��������
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
            aspectScale: 0.75, //�����
            showLegendSymbol: false, // ����legendʱ��ʾ
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
            name: 'ǰ����',
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

    var counts = option.series[0].data.length; //��ȡ��������Բ������
    var dataIndex = 0;
    //��Բ������ʾ���Զ������ֲ���ʾ
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
/*--------��ͼ----------*/
var myecharts=echarts.init(document.getElementById('box3_right_t'));//ȡ�鲢��ʼ��
var options={
    title : {
        text: '�����ݸ���ҵ�ֲ�',
        x:'center',
        textStyle:{
            color:'white'
        }
    },

    color:['#996699','pink','#0099CC','#339933','#66CCCC','#FFCC00','#666699','#0099CC',],
    series : [
        {
            name: '������Դ',
            type: 'pie',
            radius : '50%',

            data:[
                {value:584, name:'�ɷ�����ҵ(15.21%)'},
                {value:303, name:'����(7.89%)'},
                {value:200, name:'����(5.21%)'},
                {value:118, name:'����(3.07%)'},
                {value:260, name:'���й�˾(6.77%)'},
                {value:29, name:'��ҵ��λ(0.75%)'},
                {value:98, name:'���̶���(2.55%)'},
                {value:1900, name:'��Ӫ(49.48%)'},
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
myecharts.setOption(options);//����������
/*----�״�ͼ----*/
var box4_heatmap=echarts.init(document.getElementById("box3_left_b"));
var options={

    title: {
        text: '��ְӰ������',
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
            { name: '��������', max: 1,min:-1,color:'green'},
            { name: 'ѧ��', max: 1,min:-1,color:'green'},
            { name: '���Է���', max: 1,min:-1,color:'green'},
            { name: '����', max: 1,min:-1,color:'green'},
            { name: '����', max: 1,min:-1,color:'green'},
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
/*-----����ͼ-----*/
var myecharts=echarts.init(document.getElementById('box3_right_b'));//ȡ�鲢��ʼ��
var options=  {
    textStyle:{
        color:'white'
    },
    title : {
        text: '�������˲�ȱ�ڷ���',
        textStyle:{
            color:'white'
        }
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['��λ����','��ְ����'],
        right:0,
        textStyle:{
            color:'white'
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['2014��','2015��','2016��','2017��','2018��','2019��'],
            axisLabel:{
                color:"white",
                rotate:"45"
            },
            name:'ʱ��',
        }
    ],
    yAxis : [
        {
            type : 'value',
            name:'�˿�����(��)',
            yxisLabel:{
                color:"white",
            },

        }
    ],
    series : [
        {
            name:'��λ����',
            type:'bar',
            data:[2.0, 4.3, 25, 80, 120, 162 ],
            itemStyle:{
                color:'blue'
            }

        },
        {
            name:'��ְ����',
            type:'bar',
            data:[1.2, 3.1, 15, 45, 68, 80 ],

        }
    ]
};
myecharts.setOption(options);//����������
/*----����ͼ---*/
var myecharts=echarts.init(document.getElementById('box3_left_t'));
var options= {
    textStyle:{
        color:'white'
    },
    title: {
        text: '�����ݹ�����������',
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
            data : ['�޾���','1-3��','3-5��','5-10��','10������']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name:'(k/��)',
        }
    ],
    series : [
        {
            name:'н��',
            type:'line',
            stack: '����',
//                areaStyle: {normal: {}},
            data:[11, 13, 20, 23, 25]
        },

    ]
};
myecharts.setOption(options)
/*������ͼ*/
var box4_pict=echarts.init(document.getElementById("center_pie"));
var options={
    title : {
        text:'��λ����ǰ����',
        x:'center',
        top:'4%',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // ������ָʾ���������ᴥ����Ч
            type : 'shadow'        // Ĭ��Ϊֱ�ߣ���ѡΪ��'line' | 'shadow'
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
        data: ['Java����','�����ݿ���','���ݷ���ʦ','���ӻ�����ʦ','�����ܼ�'],
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
