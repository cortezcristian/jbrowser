/**
* jBrowser - Embeddable Browser Front End mock for jQuery 
* Released under GPL v3 License
* @author Cristian Ariel Cortez  
* @copyright (c) 2011 - 2013 Cristian Ariel Cortez - cortez[dot]cristian[at]gmail[dot]com - http://cortezcristian.com.ar/
* @date 14/09/2011
* @requires jQuery v1.4 or above
*
*/

/**
*  HTML markup example:
* <div class="browser">
* 	<ul class="browser-nav-bar">
* 		<li><a class="browser-prev-btn" href="#"><img src="./img/browser-prev-btn.png" alt="Browser" height="32" width="32" /></a></li>
* 		<li><a class="browser-next-btn" href="#"><img src="./img/browser-next-btn.png" alt="Browser" height="32" width="32" /></a></li>
* 		<li><a class="browser-refresh-btn" href="#"><img src="./img/browser-refresh-btn.png" alt="Browser" height="32" width="32" /></a></li>
* 		<li><input type="text" class="browser-url" name="browser-url" value="http://localhost/"></li>
* 		<li><a class="browser-go-btn" href="#"><img src="./img/browser-go-btn.png" alt="Browser" height="32" width="32" /></a></li>
* 	</ul>
* 	<iframe class="browser-page-container" src="./browser/index.html" width="100%" height="450" frameborder="0" align="center" scrolling="no" allowtransparency="false"></iframe>
* </div>
*
*/

;(function($){	

	$.fn.jbrowser = function(obj){
		
		/**
		* Configuration Object
		*/
		var o = $.extend({			
			afterEnd: function(instObject){ 
				
			},
			beforeStart:function(instObject){
				
			},
			onResize:function(instObject){
				
			},
			index:0,
			his: [],//pass the array where you want to save the history
			btnBack: '.browser-prev-btn',
			btnNext: '.browser-next-btn',
			btnReload: '.browser-refresh-btn',
			btnGo: '.browser-go-btn',
			inputURL : '.browser-url',
			pageOutput: '.browser-page-container',
			pages: {
				'http://localhost/':'./slides/index.html',
				'http://localhost/index.html':'./slides/index.html',
				'http://www.ruby-lang.org':'http://www.ruby-lang.org',
				'http://rubular.com/':'http://rubular.com/',
				'http://nodeshow.com/':'http://nodeshow.com/',
				'http://cortezcristian.com/rosario-startup-weekend/':'http://cortezcristian.com/rosario-startup-weekend/',
				'http://cortezcristian.com/':'http://cortezcristian.com/',
                'http://cortezcristian.com/curso-node-js/material/slides/episodio1.html':'http://cortezcristian.com/curso-node-js/material/slides/episodio1.html',
				'http://www.ruby-doc.org/core/classes/Regexp.html':'http://www.ruby-doc.org/core/classes/Regexp.html',
				'http://www.zenspider.com/Languages/Ruby/QuickRef.html':'http://www.zenspider.com/Languages/Ruby/QuickRef.html'
			},
			page404: './browser/error404.html',
			history: [],
			debug: true
		}, obj || {});
		
		/**
		* Function Debuger to show logs in Firebug
		*/
		function debuger(){
			if(o.debug)
				try{console.log.apply('',arguments);} catch(e) {}
		}
		

		/**
		* Loads an url
		*/
		function loadWebPage(url){
			o.his.push({"url":url,"src":url});
			$(o.pageOutput).attr('src', url);
			o.index = o.his.length-1;
		}

		/**
		* Loads an url from list
		*/
		function loadWebPageFromList(url){
			var compUrl = url || '', lastUrl = o.page404;
			$.each(o.pages, function(i,v){
				if(compUrl==i){
					lastUrl = v; 
				}
			});
			o.his.push({"url":compUrl,"src":lastUrl});
			$(o.pageOutput).attr('src', lastUrl)
			o.index = o.his.length-1;
			debuger("GO>"+o.index)
		}
		
		/**
		* Loads an url from list
		*/
		function loadWebPageFromIndex(i){
                        $(o.pageOutput).attr('src', o.his[i].src);
			$(o.inputURL).val(o.his[i].url);
			debuger('FI>'+o.his[i])
			o.index = i;
		}

		return this.each(function() {
			var curIns = $(this); //current Instance

			/**
			* Initialize fisrt page in the history  
			*/
			
			o.his.push({"src":$(o.pageOutput).attr('src'),"url":$(o.inputURL).val()});

			curIns.find(o.inputURL).keydown(function(e) {
				var key = e.charCode || e.keyCode || 0, valueUrl;
				switch(key){
					case 13://enter
						valueUrl = $(this).val();
						if(valueUrl){
							o.history[o.history.length] = valueUrl;
							loadWebPageFromList(valueUrl);
						}
					break;
					default:
					break;
				}
								
			});
			
			/**
			* Go to website
			*/	
			curIns.find(o.btnGo).click(function(e){
				e.preventDefault();
				loadWebPageFromList($(o.inputURL).val());
			});
		
			/**
			* Reload current page
			*/	
			curIns.find(o.btnReload).click(function(e){
				e.preventDefault();
				$(o.pageOutput).attr('src',$(o.pageOutput).attr('src'));
			});

			/**
			* Back button
			*/	
			curIns.find(o.btnBack).click(function(e){
				e.preventDefault();
				debuger("Back>"+(o.index-1))
				if(o.index > 0){
					loadWebPageFromIndex(o.index-1);	
				}
			});

			/**
			* Next button
			*/	
			curIns.find(o.btnNext).click(function(e){
				e.preventDefault();
				if(o.index < o.his.length-1){
					loadWebPageFromIndex(o.index+1);	
				}
			});

			$(window).resize(function() {
				//debuger(curIns)
				o.onResize(curIns);
					
			});
			
			o.afterEnd(curIns);
		});//close return
	}
})(jQuery);
