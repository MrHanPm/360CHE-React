define(function (require,exports){
	var Container = document.querySelector('#container'),
		loadingToast = document.querySelector('#loadingToast');
	loadingToast.hide = function(){
		loadingToast.style.display = 'none'
	};
	var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });
    var home = {
    	url: '/home',
    	className:'other',
    	render: function (callback) {
    		callback(null,document.querySelector('#tel_home').innerHTML);
    		loadingToast.hide();
        },
    };
    var feedback = {
    	url: '/feedback',
    	className:'feedback',
    	render: function (callback) {
    		callback(null,document.querySelector('#tel_feedback').innerHTML);
    		loadingToast.hide();
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
	 	router.push(home).push(feedback).push(filter).setDefault('/home').init();	
    });
});