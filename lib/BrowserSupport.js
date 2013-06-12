var BrowserSupport = (function (){

	//Private Variables
	var _private = {
		otSupported: {"Safari":5, "Firefox": 11,"Chrome":18, "Android": 1.6,"IE":8},

		IsSafari : function() {
			return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) && (!_private.IsChrome());
		},

		IsIE : function() {
			var UA = navigator.userAgent.toLowerCase();
			if (UA.indexOf('msie') > -1) {
				return true;
			}else{
				return false;
			}
		},

		IsFirefox : function() {
			var UA = navigator.userAgent.toLowerCase();
			if (UA.indexOf('firefox') > -1) {
				return true;
			}else{
				return false;
			}
		},

		IsOpera : function() {
			if( window.opera ){
				return true;
			}
			return false;
		},

		IsChrome : function() {
			return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
		},

		iOSversion : function() {
		  if (/iP(hone|od|ad)/.test(navigator.platform)) {
			// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
		  }
		},

		DetectBrowserVersion : function() {
			var UA = navigator.userAgent.toLowerCase();
			 
			var index;
			var browserVersion = 0;
			if ( _private.IsIE() ) {
				index = UA.indexOf('msie');
				browserVersion = "" + parseFloat('' + UA.substring(index + 5));
			}
			else if ( _private.IsChrome() ) {
				index = UA.indexOf('chrome');
				browserVersion = "" + parseFloat('' + UA.substring(index + 7));
			}
			else if ( _private.IsFirefox() ) {
				index = UA.indexOf('firefox');
				browserVersion = "" + parseFloat('' + UA.substring(index + 8));
			}
			else if ( _private.IsSafari() ) {
				index = UA.indexOf('safari');
				browserVersion = "" + parseFloat('' + UA.substring(index + 7));
			}else if( _private.IsOpera() ){
				browserVersion = window.opera.version();
			}
			
			return parseInt(browserVersion,10);
		},
		IsMobile : function() {
			return (_private.Android() || _private.BlackBerry() || _private.iOS() || _private.Opera() || _private.Windows());
		},
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod|Safari/i)&&(!_private.IsChrome());
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		}
		
	};
	//Public functions
	return { 

		GetBrowser: function (){

			/*
			 *	Mobile
			 */
			if( _private.IsMobile() ){

				if( _private.Android() ){
					return "Android";
				}

				if( _private.BlackBerry() ){
					return "BlackBerry";
				}

				if( _private.iOS() ){
					return "iOS";
				}

				if( _private.Opera() ){
					return "Opera";
				}

				if( _private.Windows() ){
					return "WindowsMobile";
				}	
			}

			/*
			 *	Desktops
			 */

			// Is this a version of IE?
			if(_private.IsIE()){
				return "IE";
			}
			// Is this a version of Chrome?
			if(_private.IsChrome()){
				return "Chrome";
			}
			// Is this a version of Safari?
			if(_private.IsSafari()){
				return "Safari";
			}
			// Is this a version of Mozilla?
			if(_private.IsFirefox()){
				//Is it Firefox?
				if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
					return "Firefox";
				}
				// If not then it must be another Mozilla
				else{
				}
			}
			// Is this a version of Opera?
			if(_private.IsOpera()){
				return "Opera";
			}
			return undefined;
		},
		IsSupported: function(){
			if( _private.IsSafari() ){
				if( _private.iOS() ){
					return true;
				}else{
					if( _private.DetectBrowserVersion() >= _private.otSupported["Safari"] ){
						return true;
					}else{
						return false;
					}
				}
			}else if( _private.IsIE() ){
				if( _private.DetectBrowserVersion() >= _private.otSupported["IE"] ){
						return true;
					}else{
						return false;
				}
			}else if( _private.IsFirefox() ){
				if( _private.DetectBrowserVersion() >= _private.otSupported["Firefox"] ){
						return true;
					}else{
						return false;
				}
			}else if( _private.IsOpera() ){
				if( _private.DetectBrowserVersion() >= _private.otSupported["Opera"] ){
						return true;
					}else{
						return false;
				}
			}else if( _private.IsChrome() ){
				if( _private.DetectBrowserVersion() >= _private.otSupported["Chrome"] ){
						return true;
					}else{
						return false;
				}
			}
			return true;
		},
		BrowserVersion: function(){
			return _private.DetectBrowserVersion();
		}
	}
});
