"use strict";
(function () {
    jQuery(function($){

        function ThemeScripts() {
            var self = this;
            self.bodyClass = [];
            self.lastStatus = false; // last status for body
            self.sizeToDisplayMobileMenu = 1050; // this screen width size to display the mobile menu
            self.displayMobileMenu = false;
            self.classObject = {
                hasScroll: 'has-scroll',  // this class added to the body when the page has scroll at lest 1 px from Y
                openedMenu: 'opened-menu',
                menu : 'size-menu'
            };
            /**
             * play slider for our member section
             */
            self.playMemberSlider = function () {
                var membersList = $('#members-list');
                membersList.length &&
                membersList.owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: false,
                    items: 2,
                    autoplay: true,
                    autoplayTimeout: 7000,
                    responsive : {
                        700 : {
                            items:5
                        }
                    }
                });
            };
            /**
             * play slider for blog post
             */
            self.playBlogSlider = function () {
                var blogList = $('#blog-list');
                blogList.length &&
                blogList.owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: true,
                    items: 4,
                    dots: false,
                    autoplay: true,
                    slideBy: 'page',
                    responsive: {
                        0: {
                            items: 1,
                            nav: false,
                            dots: true,
                            loop: false
                        },
                        480: {
                            items: 2,
                            dots: true,
                            loop: false,
                            nav: false
                        },
                        768: {
                            items: 3,
                            dots: true,
                            loop: false,
                            nav: false
                        },
                        1200: {
                            items: 4,
                            dots: false,
                            loop: true
                        }
                    }
                });
            };
            /**
             * to remove from body class if exists
             * @param cls
             */
            self.removeBodyClass = function (cls) {
                var pos = self.bodyClass.indexOf(cls);
                if (pos != -1)
                    self.bodyClass.splice(pos, 1) && $('body').removeClass(cls);
            };
            /**
             * function to add to body class if not exists
             * @param cls
             */
            self.addBodyClass = function (cls) {
                // more ensure
                (self.bodyClass.indexOf(cls) == -1 ? self.bodyClass.push(cls) : false) ? $('body').addClass(cls) : null;
            };
            /**
             * check if the nav needs to changes or not
             * @param value
             */
            self.changeNav = function (value) {
                var hasScroll = self.classObject.hasScroll;
                if (value && self.bodyClass.indexOf(hasScroll) == -1) {
                    self.addBodyClass(hasScroll);
                }

                if (!value && self.bodyClass.indexOf(hasScroll) != -1) {
                    self.removeBodyClass(hasScroll);
                }
            };
            /**
             * check nav
             */
            self.checkNav = function () {
                var scroll = $(window).scrollTop();
                if (scroll > 0) {
                    self.changeNav(true);
                } else {
                    self.changeNav(false);
                }
            };
            self.checkWindowResize = function () {
                self.checkNav();
                $(window).on('resize scroll', self.checkNav);
            };
            self.prepareMobileMenu = function(){
                var mobileMenu = $('#primary-menu').children('ul') , slideMenu, menu = $('#slide-menu');
                slideMenu = mobileMenu.length && mobileMenu.clone();
                    if(!slideMenu)
                        return null;

                menu.append(slideMenu);
                return self;
            };
            self.checkWindowSize = function(size){
                return $(window).width() <= size;
            };
            self.mobileMenu = function(){
              self.displayMobileMenu ? self.addBodyClass(self.classObject.menu) : self.removeBodyClass(self.classObject.menu);
                return self;
            };
            self.checkOpenedMenu = function(){
                self.displayMobileMenu = self.checkWindowSize(self.sizeToDisplayMobileMenu);
                $(window).on('resize',function(){
                    self.displayMobileMenu = self.checkWindowSize(self.sizeToDisplayMobileMenu);
                    self.mobileMenu();
                });
                return self;
            };
            self.clickBurger = function(){
                $(".close-sidebar , #burger-menu").click(function(e){
                     e.preventDefault();
                     $('body').toggleClass(self.classObject.openedMenu);
                });
            };
            /**
             * init the theme scripts
             */
            self.init = function () {
                self.playBlogSlider();
                self.checkWindowResize();
                self.playMemberSlider();
                self.prepareMobileMenu()
                    .checkOpenedMenu()
                    .mobileMenu()
                    .clickBurger();
            };
        }

        // create the object and init

        (new ThemeScripts()).init();
    });
})();