var chartOptions = {
	pie:function(t,v,index){		// 饼图
		var colors = ['0,138,244','255,0,0','251,153,0','0,185,44'];
		var c = colors[index];
		return {
			"title":{
				"text":t,
				"x":"center",
				"bottom":'0',
				"textStyle":{
					"color":'rgb(' + c + ')',
					"fontWeight":400,
					"fontSize":16
				}
			},
			"color":['rgba('+ c +',.6)'],
	    	"series": [
		        {
		            "type":'pie',
					"hoverAnimation":false,
		            "center":['50%','40%'],
		            "radius": ['80%', '75%'],
		            "label": {
		            	"normal": {
		                    "position": 'center',
		                    formatter:function(params){
		                    	return params.value + '\u6761' // 条
		                    },
		                    "textStyle": {
	                    		"fontSize": '24',
	                    		"color":'rgb(' + c + ')'
                        	}
		                }
                  	},
		            "data":[{"value":v}]
		        }
		    ]
		}	
	},
	cicle:function(d){  	// 饼图
		return {
			"color":['#ff9c38','#9cda35','#25a6ff','#ffc20d','#3acee8'],
	    	"series" : [
		        {
		            "type": 'pie',
		            "hoverAnimation":false,
		            "center": ['45%', '50%'],
		            "radius": ['40%', '50%'],
		            "data":d
		        }
		    ]
		}
	},
	funnel:function(ele,data){
		var w = ele.offsetWidth,h = ele.offsetHeight,div = document.createElement('div'),canvas = document.createElement('canvas'),color = ['#f90000','#fb9900','#008af4'];
		ele.style.cssText = '-webkit-tap-highlight-color: transparent; -webkit-user-select: none; background-color: transparent;';
		div.style.cssText = 'position: relative; overflow: hidden; width:'+ w +'px; height:'+ h +'px;'
		canvas.width = w*2;
		canvas.height = h*2;
		canvas.style.cssText = 'position: absolute; left: 0px; top: 0px; width: '+ w +'px; height:'+ h +'px; -webkit-user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);'
		div.appendChild(canvas);
		ele.appendChild(div);
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		var bg = new Image();
		var x = (w*2-310)/2,y = (h*2-336)/2;
		bg.onload = function(){
			ctx.drawImage(bg,0,0,310,336,x,y,310,336);
		};
		bg.src = 'http://static.360che.com/wap/images/wechat/saas/funnel-bg.png';
		var nx = 0,ny = 0,vy = 0;
		data.forEach(function(o,index){
			switch (index) {
				case 0:
					nx = x - 10;
					ny = y + 80;
					vy = y + 115;

					break;
				case 1:
					nx = x + 10;
					ny = y + 180;
					vy = y + 215;
					rx = x + 300;
					break;
				case 2:
					nx = x + 30;
					ny = y + 280;
					vy = y + 315;
					rx = x + 280;
					break;
			}
			ctx.textAlign = 'right';
			ctx.font = '28px Microsoft YaHei,Arial';
			ctx.fillStyle = '#666';
			ctx.fillText(o['name'],nx,ny);
			ctx.font = '24px Microsoft YaHei,Arial';
			ctx.fillStyle = color[index];
			ctx.fillText(o['value'] + '\u6761',nx,vy);
			if(o['ratio']){
				ctx.textAlign = 'left';
				ctx.fillText('\u8f6c\u5316\u7387\uff1a'+ o['ratio'] + '%',rx,ny+10);	// 转化率
			}
		});
		
	},
	line:function(d){	// 折线图
		return {
			"grid":{
				"show":false,
				"right":0,
				"top":10,
				"bottom":10
			},
		    "xAxis" : [
		        {
		            "type" : 'category',
		            "boundaryGap" : false,
		            "data" : [],
		            "axisTick":{
		            	"show":false
		            },
		            "axisLine":{
		            	"show":false
		            },
		            "splitLine":{
		            	"show":false
		            }
		        }
		    ],
		    "yAxis":[
		        {
		            "type" : 'value',
		            "boundaryGap": false,
		            "axisTick":{"show": false},
		            "axisLine":{
		            	"lineStyle":{
		            		"color":'rgba(204,204,204,.5)'
		            	}
		            },
		            "axisLabel":{
		            	"textStyle":{
		            		"color":'#999'
		            	}
		            },
		            "splitLine":{
		            	"lineStyle":{
		            		"color":'rgba(204,204,204,.5)'
		            	}
		            }
		        }
		    ],
		    "series" : [
		        {
		            "type":'line',
		            "showSymbol":false,
		            "smooth":true,
		            "areaStyle": {
		            	"normal": {
		            		"color":'rgba(87,185,255,.5)'
		            	}
		        	},
		            "lineStyle":{
		            	"normal":{
		            		"color":'#57b9ff'
		            	}
		            },
		            "data":d
		        }
		    ]
		};	
	},
	bar:function(d){	// 柱状图
		var yAxisData = [],seriesData = [];
		d.forEach(function(o,index){
			yAxisData.push(o['name']);
			var s = {"value":o['value']};
			switch (index) {
				case 0:
					s['itemStyle'] = {"normal":{"color":'#ff0000'}};
					break;
				case 1:
					s['itemStyle'] = {"normal":{"color":'#fb9900'}};
					break;
				case 2:
					s['itemStyle'] = {"normal":{"color":'#006db9'}};
					break;
			};
			seriesData.push(s);
		});
		return {
			"color":['#5ab7ff'],
			"grid":{
				"show":false,
				"right":10,
				"top":0,
				"bottom":0,
				"left":50
			},
			"xAxis": {
		        "show" :false
		    },
		    "yAxis": {
		        "type" : 'category',
		        "axisLine": {"show": false},
		        "axisTick": {"show": false},
		        "splitLine": {"show": false},
		        "axisLabel":{
		        	"margin":10
		        },
		        "data" : yAxisData,
		        "inverse":true
		    },
		    "series" : [
		        {
		            "type":'bar',
		            "label": {
		                "normal": {
		                    "show": true,
		                    "formatter": '{c}' + '\u6761',
		                    "position":'right',
		                    "textStyle":{
		                    	"color":'#666'
		                    }
		                }
		            },
		            "barMinHeight":10,
		            "barCategoryGap":10,
		            "data":seriesData
		        }
		    ]
		}
	}
};