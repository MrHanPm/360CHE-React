define(function (require,exports){
	var Container = document.querySelector('#container'),
		loadingToast = document.querySelector('#loadingToast');
	loadingToast.hide = function(){
		loadingToast.style.display = 'none'
	};


	// 上拉刷新
	HTMLElement.prototype.pull = function(options){
		var defaults = {
			"tips":null,
			"height":60,
			"ajaxurl":null,
			"callback":null,
			"data":{}
		};

		var me = this,start = null,d = null,disabled = false;tips = '';
		function move(e){
			if(start && !disabled){
				d = e.targetTouches[0].pageY - start;
				if(d > 5){
					e.preventDefault();
					tips.innerHTML = '\u4e0b\u62c9\u5237\u65b0';
					me.style[exports.transform] = 'translate3d(0,'+ d +'px,0)';
				}else{
					d = null;
				}
			}	
		};
		function removeTranstion(){
			me.style[$.transition] = 'none';
			me.removeEventListener('transitionend',removeTranstion);
		};
		document.addEventListener('touchstart',function(e){
			if(me.scrollTop != 0) return;
			start = e.targetTouches[0].pageY;
			document.addEventListener('touchmove',move);
		});
		document.addEventListener('touchend',function(e){
			if(d){
				me.style[exports.transition] = exports.CSSTransform + ' .2s ease-out';
				me.style[exports.transform] = 'translate3d(0,60px,0)';
				tips.innerHTML= '\u5237\u65b0\u4e2d';
				disabled = true;
				$.ajax({
					url:ajaxurl,
					data:data,
					dataType:'json',
					success:function(res){
						callback(res);
						me.style[$.transform] = 'translate3d(0,0,0)';	
						start = null;
						d = null;
						disabled = false;
						document.removeEventListener('touchmove',move);
						me.addEventListener('transitionend',removeTranstion);
					}
				});
			}
		})
	};
	

	function saas(){

	};
	saas.prototype = {
		init:function(){			// 初始化

		},
		save:function(){			// 保存状态

		},
		recovery:function(){		// 恢复状态

		},
		template:function(){		// 模板

		},
		router:function(){			// 路由

		},
		request:function(){			// 数据请求

		},
		render:function(){			// 数据渲染

		},
		"loading":{
			show:function(){
				loadingToast.style.display = 'block'
			},
			hide:function(){
				loadingToast.style.display = 'none'
			}
		},
		change:function(){			// 变更

		},
		upgrade:function(){			// 更新

		}
	};

	// 首页
	function homeFlipview(){
		!homeFlipview.index && (homeFlipview.index = 0);
		var sass_flipview = document.querySelector('#sass_flipview'),sass_tabs = document.querySelector('#sass_tabs');
		var container = sass_flipview.firstElementChild;
		sass_flipview.addEventListener('changed',function(){
			sass_tabs.dataset['current'] = this.index;	
			container.style.height = container.children[this.index].offsetHeight + 'px';
			homeFlipview.index = this.index;
			to_filter.classList[this.index ? 'add' : 'remove']('hidden');
		});
		sass_tabs.children.forEach(function(item,index){
			item.addEventListener('click', function(){
				sass_tabs.dataset['current'] = index;
				sass_flipview.index = index;	
			});	
		});	
		container.style.height = container.children[homeFlipview.index].offsetHeight + 'px';
		sass_flipview.setAttribute('data-initial-index', homeFlipview.index);
		sass_tabs.classList.add('disabled-trs');
		sass_tabs.dataset['current'] = homeFlipview.index;
		!sass_flipview.refresh && exports.FlipView('#sass_flipview');
		sass_tabs.classList.remove('disabled-trs');
		if(homeFlipview.top){
			Container.querySelector('.wrapper').scrollTop = homeFlipview.top;
		}
		document.querySelector('.weui_pull').pull();
	};
	

	var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });
    var home = {
    	url: '/home',
    	className:'sass-home',
    	render: function (callback) {
    		callback(null,home.saveContent || document.querySelector('#tel_home').innerHTML);
    		//callback(null,document.querySelector('#tel_home').innerHTML);
    		loadingToast.hide();
    		setTimeout(homeFlipview,200);
        },
    };
    var detail = {
    	url: '/detail',
    	className:'sass-detail',
    	render: function (callback) {
    		var wrapper = Container.querySelector('.wrapper');
    		wrapper && (homeFlipview.top = wrapper.scrollTop);
    		callback(null,document.querySelector('#tel_detail').innerHTML);
    		loadingToast.hide();
    		Container.firstElementChild && (home.saveContent = Container.firstElementChild.innerHTML);
        },
    };
    var filter = {
    	url:'/filter',
    	className:'sass-filter',
    	render:function(callback){
    		var tel = document.querySelector('#tel_filter');
			document.title = tel.dataset['title'];
    		callback(null,tel.innerHTML);		
    		loadingToast.hide();
    	}
    }
    window.addEventListener('load',function(){
	 	router.push(home).push(detail).push(filter).setDefault('/home').init();	
    });
});