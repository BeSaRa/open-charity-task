"use strict";
(function(){
    function ThemeScripts(){
        var self = this;
            self.bodyClass = [];
            self.classObject = {
                hasScroll : 'has-scroll'  // this class added to the body when the page has scroll at lest 1 px from Y
            };
        /**
         * play slider for our member section
         */
        self.playMemberSlider = function(){
            var membersList = $('#members-list');
                membersList.length &&
                membersList.owlCarousel({
                    loop:true,
                    margin:10,
                    nav:false,
                    items:5,
                    autoplay:true,
                    autoplayTimeout:7000
                });
        };
        /**
         * play slider for blog post
         */
        self.playBlogSlider = function(){
            var blogList = $('#blog-list');
            blogList.length &&
            blogList.owlCarousel({
                    loop:true,
                    margin:10,
                    nav:true,
                    items:4 ,
                    dots:false ,
                    autoplay:true
                });
        };
        /**
         * to remove from body class if exists
         * @param cls
         */
        self.removeBodyClass = function(cls){
            var pos = self.bodyClass.indexOf(cls);
            if(pos != -1 )
                self.bodyClass.splice(pos,1) && $('body').removeClass(cls);
        };
        /**
         * function to add to body class if not exists
         * @param cls
         */
        self.addBodyClass = function(cls){
            // more ensure
            (self.bodyClass.indexOf(cls) == -1 ?  self.bodyClass.push(cls) : false) ? $('body').addClass(cls) : null;
        };
        /**
         * check if the nav needs to changes or not
         * @param value
         */
        self.changeNav = function(value){
            var hasScroll = self.classObject.hasScroll;
            if( value && self.bodyClass.indexOf(hasScroll) == -1 ){
                self.addBodyClass(hasScroll);
            }

            if(!value && self.bodyClass.indexOf(hasScroll) != -1){
                self.removeBodyClass(hasScroll);
            }
        };
        /**
         * check nav
         */
        self.checkNav = function(){
            var scroll = window.scrollY;
            if( scroll > 0){
                self.changeNav(true);
            }else{
                self.changeNav(false);
            }
        };
        self.checkWindowResize = function(){
            $(window).on('resize scroll',self.checkNav);
        };
        /**
         * init the theme scripts
         */
        self.init = function(){
            self.playBlogSlider();
            self.checkWindowResize();
            self.playMemberSlider();
        };
    }

    // create the object and init

    (new ThemeScripts()).init();

})();