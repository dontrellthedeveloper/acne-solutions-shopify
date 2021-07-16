// Theme variables from shop settings
vndTheme = {};
vndTheme.$body = $('body');

// template name
var vndTpl = vndTheme.$body.data('template');

// Theme cookie currency
vndTheme.c_c = '',
// Theme shop currency
vndTheme.s_c = vndTheme.$body.data('shop-currency');
// Theme money format
vndTheme.m_f = '<span class="money">' + vndTheme.$body.data('shop-money-currency-format') + '</span>';

// Theme price format
vndTheme.p_f = 'with_zero';
vndCurrency.format = 'money_format';

if ( vndCurrency.format == 'money_with_currency_format' ) {
  vndTheme.m_f = '<span class="money">' + vndTheme.$body.data('shop-money-with-currency-format') + '</span>';
}

if ( vndTheme.p_f == 'without_zero' ) {
  vndTheme.m_f = vndTheme.m_f.replace('amount', 'amount_no_decimals');
  vndCurrency.moneyFormats[vndTheme.s_c].money_with_currency_format = vndTheme.$body.data('shop-money-with-currency-format').replace('amount', 'amount_no_decimals');
  vndCurrency.moneyFormats[vndTheme.s_c].money_format = vndTheme.$body.data('shop-money-currency-format').replace('amount', 'amount_no_decimals');
  vndCurrency.moneyFormats[vndTheme.s_c][vndCurrency.format] = vndCurrency.moneyFormats[vndTheme.s_c][vndCurrency.format].replace('amount', 'amount_no_decimals');
} else {
  vndTheme.m_f = vndTheme.m_f.replace('_no_decimals', '');
  vndCurrency.moneyFormats[vndTheme.s_c].money_with_currency_format = vndTheme.$body.data('shop-money-with-currency-format'.replace('_no_decimals', ''));
  vndCurrency.moneyFormats[vndTheme.s_c].money_format = vndTheme.$body.data('shop-money-currency-format').replace('_no_decimals', '');
  vndCurrency.moneyFormats[vndTheme.s_c][vndCurrency.format] = vndCurrency.moneyFormats[vndTheme.s_c][vndCurrency.format].replace('_no_decimals', '');
}

vndTheme.c_c = vndCurrency.cookie.read();

// Theme date texts (day, hour, minutes, second)
vndTheme.t_d = "Days";
vndTheme.t_h = "Hours";
vndTheme.t_m = "Minutes";
vndTheme.t_s = "Seconds";


// Store locations
vndTheme.s_loc = {};
vndTheme.s_loc.lat = "34.167310";
vndTheme.s_loc.lng = "-118.590290";
vndTheme.map_style = "1" || "1";
// google api key
vndTheme.gg_api_k = "AIzaSyBMHl6SCCKSBOp1EODsZLGx-VhUrFxk3Pk";


// Theme newsletter service
vndTheme.nsl_svc = "shopify-default";
// Theme enable newsletter popup
vndTheme.ebl_nsl_pp = false;
// Theme newsletter delay duration
vndTheme.nsl_dl = '6' || '5';


// Theme review
vndTheme.rvw_app = 'shopify-app';


// Enable ajax cart
vndTheme.ebl_ajx_crt = true;
// Enable ajax filter
vndTheme.enable_ajax_filter = true;
// Enable scroll to main in collection page
vndTheme.scr_tm = false;
// Enable scroll to top
vndTheme.ebl_scr_t = true;


// Search predictive
vndTheme.sch_pdtv = true;
// Predictive fields
vndTheme.pdtv_fd = "product";
// Search limit
vndTheme.sch_lmt = 5;


// Enable product image zoom in product pages
vndTheme.ebl_prd_z = true;
// Enable product images gallery in product pages
vndTheme.ebl_prd_g = true;

// Instagram access_token
vndTheme.insta_token = "";


vndTheme.lang = {
  "search": {
    "products":    "Products",
    "articles":    "Articles",
    "collections": "Collections",
    "pages":       "Pages"
  },
  "product": {
    "inStock": "In Stock",
    "outStock": "Out Of Stock",
    "addToCart": "Add to Cart",
    "preOrder": "Preorder",
    "soldOut": "Sold Out"
  },
  "newsletter": {
    "error404": "We are sorry. Something went wrong. Please contact store owner about this subscription.",
    "error429": "Too many requests detected. Please try again later.",
    "confirmation": "Thanks for subscribing",
  },
  "cart": {
    "title": "Shopping Cart",
    "set_max_available_html": "Only <span class='max-count'></span>items are in stock. Added <span class='max-count'></span>items to your cart."
  }
};

'use strict';
window.theme = window.theme || {};
vndTheme.currentTags = [];
Shopify.queryParams = {};

// Venedor Sections
vndTheme.vndSts = function vndSts() {
  $(document)
    .on('shopify:section:load', this.onLoad)
    .on('shopify:section:unload', this.onUnload)
    .on('shopify:section:select', this.onSelect)
    .on('shopify:section:deselect', this.onDeselect)
    .on('shopify:block:select', this.onBlkSelect)
    .on('shopify:block:deselect', this.onBlkDeselect);
};

vndTheme.vndSts.prototype = {
  onLoad(evt) {
    var $ts = $(evt.target); // Target Section

    // Header
    if ( $ts.attr('id') == 'shopify-section-top-bar' ) {
      vndTopbar.onLoad($ts);
    }

    if ( $ts.attr('id') == 'shopify-section-header' ) {
      vndHeader.onLoad($ts);
    }

    // Slideshow
    if ( $ts.hasClass('vs-homepage-slideshow') ) {
      slideShow.onLoad($ts);
    }

    // Parallax lookbook
    if ( $ts.hasClass('vs-parallax-lookbook') ) {
      parallaxLookbook.onLoad($ts);
    }

    // Lookbook spots
    if ( $ts.hasClass('vs-lookbook') ) {
      lookbookSection.onLoad($ts);
    }

    // Lookbook switcher
    if ( $ts.hasClass('vs-lookbook-2') ) {
      lookbookSection2.onLoad($ts);
    }

    // Product showcase
    if ( $ts.hasClass('vs-product-showcase') ) {
      productShowCase.onLoad($ts);
    }

    // Sections with sidebar
    if ( $ts.hasClass('vs-group-content') ) {
      groupContent.onLoad($ts);
    }

    //Items carousel section
    if ( $ts.hasClass('vs-initialize-slider') ) {
      vndSectionSlider.onLoad($ts);
    }

    // Collections tab section
    if ( $ts.hasClass('vs-collections-tab') ) {
      vndIstSection.onLoad($ts);
    }

    // Instagram section
    if ( $ts.hasClass('vs-instagram') ) {
      vndInstaSt.onLoad($ts);
    }

    // Map section
    if ( $ts.hasClass('vs-google-map') ) {
      mapSection.onLoad($ts);
    }

    // Products Masonry
    if ( $ts.hasClass('vs-products-masonry') ) {
      productsMasonry.onLoad($ts);
    }

    // Text with media packery
    if ( $ts.hasClass('vs-packery') ) {
      vndPkrSt.onLoad($ts);
    }

    // Recently viewed products section
    if ( $ts.hasClass('vs-product-recent') ) {
      vndPrdRcnt.onLoad($ts);
    }

    // Product Page: template-product-layout section
    if ( $ts.hasClass('products-template') ) {
      vndPrdTplSt.onLoad($ts);
    }

    // Product Page: template-product-details-tabs section
    if ( $ts.hasClass('product-details-tabs') ) {
      vndPrdDtTabsSt.onLoad($ts);
    }

    // Product Page: data-driven products recommendation section
    if ( $ts.hasClass('vs-product-recommendations') ) {
      vndPrdRecmd.onLoad($ts);
    }

    // Collection Page
    if ( $ts.hasClass('collection-layout') ) {
      collectionPage.init();
    }

    // List collections Page
    if ( $ts.hasClass('list-collections') || $ts.hasClass('collection.sub-collection') ) {
      collectionPage.init();
    }

    // Blog/Article Pages
    if ( $ts.hasClass('blog-section') ) {
      collectionPage.initSidebarMenu();
      initSlider($ts);
    }

    // Wishlist Page
    if ( $ts.attr('id') == 'shopify-section-template-wishlist' ) {
      vndHlp.wslst();
    }

    // Compare Page
    if ( $ts.attr('id') == 'shopify-section-template-compare' ) {
      vndHlp.cplst();
    }

    if ( typeof lazySizes !== 'undefined' ) {
      lazySizes.loader.checkElems();
    }
    else {
      imageLoad();
    }
  },

  onUnload(evt) {
    var $ts = $(evt.target);
    if ( evt.detail.sectionId == 'header' ) {
      vndHeader.onUnload(evt);
    }

    if ( $ts.hasClass('vs-homepage-slideshow') ) {
      slideShow.onUnload($ts);
    }
  },

  onSelect(evt) {
    var $ts = $(evt.target);
    if ( $ts.hasClass('vs-group-content') ) {
      groupContent.onLoad($ts);
    }

    //Items carousel section
    if ( $ts.hasClass('vs-initialize-slider') ) {
      vndSectionSlider.onLoad($ts);
    }

    // Collection Page
    if ( $ts.hasClass('collection-layout') ) {
      collectionPage.init();
    }
  },

  onBlkSelect(evt) {
    var $tb = $('#shopify-section-' + evt.detail.sectionId); // Target Block

    if (evt.detail.sectionId == 'header') {
      vndHeader.onBlkSelect(evt);
    }

    if ( $tb.hasClass('vs-homepage-slideshow') ) {
      slideShow.onBlkSelect(evt);
    }

    if ( $tb.hasClass('vs-packery') ) {
      vndPkrSt.onBlkSelect(evt);
    }

    //Items carousel section
    if ( $tb.hasClass('vs-initialize-slider') ) {
      vndSectionSlider.onBlkSelect(evt);
    }
  },

  onBlkDeselect(evt) {
    if (evt.detail.sectionId == 'header') {
      vndHeader.onBlkDeselect(evt);
    }
  },

  init(className, constructor) {
    if ( $(className).length < 1 ) return;
    $(className).each(function(index, container) {
      constructor(container);
    });
  },
};

///////////////////////////////////
//        Define Sections        //
///////////////////////////////////

// Topbar and Header
var vndTopbar = {
  onLoad(container) {
    if ( $(container).hasClass('initialized') ) {
      return;
    }

    $(container).addClass('initialized');

    vndHeader.initCartTouch(container);
    vndHlp.wslst();
    vndHlp.cplst();
    setTimeout(() => {
      vndHeader.initLanguageSwitcher(container);
    }, 150);
  }
}

var vndHeader = {
  stkHd: null,
  onLoad(container) {
    if ( $(container).hasClass('initialized') ) {
      return;
    }

    $(container).addClass('initialized');

    vndHeader.initCartTouch(container);
    vndHeader.initStickyHeader();
    vndHeader.initMenuPosition();
    vndHlp.wslst();
    vndHlp.cplst();

    setTimeout(() => {
      vndHeader.initLanguageSwitcher(container);
    }, 150);
  },

  onUnload: function(evt) {
    this.stkHd && this.stkHd.destroy();
  },

  initStickyHeader: function() {
    if ( $('#shopify-section-header > .container').hasClass('sticky-enable') && !vndHlp.isMobile() ){
      this.stkHd = new Waypoint.Sticky({
        element: $('#shopify-section-header'),
        stuckClass: "sticky-active",
        offset: -100
      });
    }
  },

  // Adjust if child menu overflows window
  initMenuPosition() {
    if ( vndHlp.isMobile() ) return;

    $('.dropdown-classic, .dropdown-classic .menu-grandchild').each(function() {
      const $this = $(this),
            ln = $this.offset().left + $this.outerWidth(),
            limit = $(window).width();

      if ( ln > limit ) {
        $this.parents('.dropdown-classic').addClass('position-relative');
        $this.addClass('pos-right');
      }
    });
  },

  initLanguageSwitcher(container) {
    if ( $(container).find(".weglot-container").length < 1 ) {
      return;
    }
    var $weglot = $(container).find(".weglot-container").detach();
    $weglot.find('ul').addClass('dropdown-items__picker');
    var $lang = $(container).find(".language-wrapper");
    $lang.append($weglot);
    $weglot.show();
  },

  initCartTouch(container) {
    if ( !vndHlp.isTchDvc() ) {
      return;
    }
    $(container).find('.icon-cart').on('touchstart', function(e) {
      if ( e.cancelable ) {
        e.preventDefault();
      }
      $(container).find('.cart-dropdown').toggleClass('active');
    });
  },

  onBlkSelect(evt) {
    $(evt.target).parents('.header-menu-item').addClass('js-hover');
  },

  onBlkDeselect(evt) {
    $(evt.target).parents('.header-menu-item').removeClass('js-hover');
  }
}

// slideshow with flickity
var slideShow = {
  onLoad(container) {
    var sliders = $(container).find('.flickity-carousel');
    initIframes(container);
    sliders.each( function() {
      var slider = $(this);
      var hasMultipleCells = slider.find('.slide-item').length > 1;
      var auto_play = slider.data('auto') > 0 ? slider.data('auto')*1000 : false;
      var show_nav = slider.data('nav');
      var show_dots = slider.data('dots');
      var wrap_around = slider.data('wraparound');

      var pauseOnHover = slider.data('pausehover') == null ? true : slider.data('pausehover');

      if ( !hasMultipleCells ) {
        show_nav = false;
        show_dots = false;
      }

      if ( !slider.hasClass('flickity-enabled') ) {
        slider.flickity({
          adaptiveHeight: true,
          wrapAround: wrap_around,
          autoPlay: auto_play,
          pauseAutoPlayOnHover: pauseOnHover,
          prevNextButtons: show_nav,
          pageDots: show_dots,
          imagesLoaded: true,
          lazyLoad: 2,
          on: {
            select: function (index) {
              var flkty = this;
              var playWholeVideo = $(flkty.selectedElement).find('.video-wrap').attr('data-wholeplay');
              $(flkty.selectedElement).find('video').each(function (i, video) {
                if ( playWholeVideo == 'true' && flkty.slides.length > 1 ) {
                  flkty.stopPlayer();
                  video.loop = false;
                  video.onended = function (e, i) {
                    flkty.next();
                  };
                }
              });
            },
            change: function (index) {
              var flkty = this;
              var playWholeVideo = $(nextElement).find('.video-wrap').attr('data-wholeplay');

              if ( playWholeVideo != 'true' && flkty.slides.length > 1 ) {
                var previousIndex = index === 0 ? flkty.slides.length - 1 : index - 1;
                var previousElement = flkty.slides[previousIndex].getCellElements();
                var nextElement = flkty.slides[index].getCellElements();

                $(previousElement).find('video').each(function (i, video) {
                  video.pause();
                });

                $(nextElement).find('video').each(function (i, video) {
                  if ( playWholeVideo == 'true' ) {
                    flkty.stopPlayer();
                    video.loop = false;
                    video.onended = function (e, i) {
                      flkty.next();
                    };
                  }
                  video.muted = false;
                  video.play();
                });
              }
            }
          }
        });
      }
    });
  },

  onBlkSelect(evt) {
    var crs = $(evt.target).parents('.flickity-carousel');
    var index = $(evt.target).index();
    crs.flickity( 'select', index );
  },

  onResize(container) {
    var sliders = $(container).find('.flickity-carousel');
    sliders.each( function() {
      var slider = $(this);
      slider.flickity('resize');
    });
  },

  onUnload($target) {
    var $slider = $target.find('.flickity-carousel');
    $slider.flickity('destroy');
  }
};

// Parallax Lookbook Section (with slideshow)
var parallaxLookbook = {
  calcLookbookSpots: (left, viewWidth, viewHeight, viewRatio, imgRatio) => {
    var viewRatio = viewHeight / viewWidth;
    var backImgWidth = viewWidth;

    if ( viewRatio > imgRatio ) {
      backImgWidth = viewHeight / imgRatio;
    }
    return `${ 50 + (left - 50) * backImgWidth / viewWidth }%`
  },

  calcTransformValue(pageTop, windowHeight, sectionTop, sectionHeight) {
    return 0 - sectionHeight * 0.3 / windowHeight * (sectionTop - pageTop);
  },

  calcBgPos(container) {
    var windowHeight = $(window).innerHeight();
    var pageTop = $(window).scrollTop();
    var sectionHeight = $(container).outerHeight();
    var sectionTop = $(container).offset().top;

    var transformHeight = 0 - sectionHeight * 0.3 / windowHeight * (sectionTop - pageTop);
    var parallaxHeight = sectionHeight * 1.3;

    $(container).find('.image-container').css({ 'height': parallaxHeight, 'transform': `translate3d(0px,${transformHeight}px, 0px`, "-webkit-backface-visibility": "hidden" });

    $(window).on('scroll', function() {
      pageTop = $(window).scrollTop();

      transformHeight = 0 - sectionHeight * 0.3 / windowHeight * (sectionTop - pageTop);
      parallaxHeight = sectionHeight * 1.3;

      $(container).find('.image-container').css({ 'height': parallaxHeight, 'transform': `translate3d(0px,${transformHeight}px, 0px`, "-webkit-backface-visibility": "hidden" });
      $(container).find('.lookbook-spot').css({ 'transform': `translate3d(0px,${transformHeight}px, 0px`, "-webkit-backface-visibility": "hidden" });
    });
  },

  onLoad: (container) => {
    initLookbookSpots(container);
    var imgRatio = 1 / $(container).find('.parallax-container').data('image-ratio');
    var viewWidth = $(container).outerWidth();
    var viewHeight = $(container).outerWidth();

    // Set lookbook spot position to corresponding window size
    $(container).find('.lookbook-spot').css("left", function() {
      return parallaxLookbook.calcLookbookSpots(this.dataset.left, imgRatio, viewWidth, viewHeight);
    });
    parallaxLookbook.calcBgPos(container);

    $(window).resize(function() {
      $(container).find('.lookbook-spot').css("left", function() {
        return parallaxLookbook.calcLookbookSpots(this.dataset.left, imgRatio, viewWidth, viewHeight);
      });

      parallaxLookbook.calcBgPos(container);
    });

  }
};

// Lookbook section
var lookbookSection = {
  onLoad: (container) => {
    initLookbookSpots(container);
  }
}

// Lookbook section
var lookbookSection2 = {
  onLoad: (container) => {
    initLookbookSwitch(container);
  }
}

// Product showcase
var productShowCase = {
  onLoad: (container) => {
    var pageBottom = $(window).scrollTop() + $(window).innerHeight();
    if ( $(window).width() > 767 ) {
      var actionH = $(container).outerHeight() * 2 / 3; // animate text when 2/3 of the section enters in viewport
    } else {
      var actionH = $(container).outerHeight() * 1 / 3; // animate text when 2/3 of the section enters in viewport
    }
    var sectionTop = $(container).offset().top;

    if ( pageBottom > sectionTop + actionH ) {
      $(container).find('.fade-appear').addClass('finished');
      $(container).find('.transform-appear').addClass('finished');
    } else if ( pageBottom < sectionTop + actionH / 2 ) {
      $(container).find('.fade-appear').removeClass('finished');
      $(container).find('.transform-appear').removeClass('finished');
    }

    $(window).on('scroll', function() {
      pageBottom = $(window).scrollTop() + $(window).innerHeight();

      if ( pageBottom > sectionTop + actionH ) {
        $(container).find('.fade-appear').addClass('finished');
        $(container).find('.transform-appear').addClass('finished');
      } else if ( pageBottom < sectionTop + actionH / 2 ) {
        $(container).find('.fade-appear').removeClass('finished');
        $(container).find('.transform-appear').removeClass('finished');
      }
    });
  }
};

// Section with sidebars
var groupContent = {
  onLoad(container) {
    vndSch.initBrandSearch();
    productReview();
    initCountDown('.vs-group-content');
    initSlider(container);
    initIstSection(container);
    initMobileSidebarMenu();
    if ( $(container).find('.flickity-carousel').length > 0 ) {
      slideShow.onLoad(container);
    }
  },

  onUnload($target) {
    var $slider = $target.find('.items-carousel');
    $slider.flickity('destroy');
    var $slideshow = $target.find('.flickity-carousel');
    $slideshow.flickity('destroy');
  },
};

// Section with sidebars
var vndSectionSlider = {
  onLoad(container) {
    initSlider(container);
    initCountDown(container);
  },

  onUnload($target) {
    var $slider = $target.find('.items-carousel');
    $slider.flickity('destroy');
  },

  onBlkSelect(evt) {
    const $csd = $(evt.target);
    const $crs = $csd.closest('.items-carousel');
    const index = Math.floor($csd.index() / Math.floor($crs.width() / $csd.width()));
    $crs.flickity( 'select', index );
  },
};

var productsMasonry = {
  onLoad(container) {
    initCountDown(container);
    productReview();
  }
}

// Packery Section
var vndPkrSt = {
  onLoad(container) {
    slideShow.onLoad(container);

    $(container).find('.packery-container').each(function() {
      var el = this;
      vndPkrSt.initPkr(el);

      $(window).on('resize', function() {
        slideShow.onResize(container);
        vndPkrSt.initPkr(el);
      });
    });
  },

  onBlkSelect(evt) {
    if ( $(evt.target).hasClass('slide-item') ) {
      var crs = $(evt.target).parents('.flickity-carousel');
      var index = $(evt.target).index();
      crs.flickity( 'select', index );
    }
  },

  initPkr(el) {
    $(el).isotope({
      itemSelector: '.packery-item',
      layoutMode : 'packery'
    });
  }
}

// Recently viewed products
var vndPrdRcnt = {
  onLoad(container) {
    $ctn = $(container);
    var rv = vndHlp.readCookie('vnd_recent_products');
    if(!rv) {
      $ctn.hide();
      return;
    }

    var el = $ctn.find('.recently-view-wrapper');
    var limit = parseInt(el.attr('data-numLimit'));
    var col = $(el).attr('data-numCol');
    rv = rv.split(",");
    var $cl = $ctn.find('.items-carousel');
    $.each(rv, function(i, e) {
      if(i > limit) return;

      if(e) {
        $.ajax({
          url: '/products/' + e + '?view=recent',
          dataType: "html",
          type: "GET",
          success: function(html) {
            html = '<div class="products-matrix grid-items__' + col + '" style="padding: 0 15px;">'+ html + '</div>'
            if ( $cl.length > 0 ) {
              $cl.flickity( 'append', $(html));
            } else {
              $(el).append(html);
            }
          }
        });
      }
    });
  },

  addProduct() {
    if ( $('.product-main').find('[data-product-json]').html() ) {
      var product = JSON.parse($('[data-product-json]').html());
      var rv = vndHlp.readCookie('vnd_recent_products') || "";
      var handle = product.handle;
      rv = rv.split(",");
      if ( $.inArray(handle, rv) !== -1 ) {
        rv = $.grep(rv, function(value) {
          return value != handle;
        });
      }
      rv.unshift(handle);
      if (rv.length > 30) {
        rv.pop();
      }
      vndHlp.createCookie('vnd_recent_products', rv.join(), 1);
    }
  }
}

/*** Product page sections ***/
// Product template section
var vndPrdTplSt = {
  _onReviewClick(e) {
    if ( vndTheme.rvw_app != 'shopify-app' ) {
      return;
    }
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $('.product-details-tabs').offset().top - 100
    }, 450);

    if ( !$('.tabs-nav__item.reviews').hasClass('active') ) {
      $('.tabs-nav__item.reviews a').trigger('click');
    }
  },

  onLoad(container) {
    initProductImageSlider(container);
    initThumbs(".product-layout");
    initProductImageGrid(container);
    productReview();
    initCountDown(container);
    zoomImage(".product-images");
    initProductSwatch('.product-layout');
    initProductZoomPopup();

    $('.product-main .product-review').on('click', vndPrdTplSt._onReviewClick);
  }
};

// Product details tabs section
var vndPrdDtTabsSt = {
  onLoad(container) {
    initTabs(container);
  }
};

var vndPrdRecmd = {
  onLoad($con) {
    // Look for an element with class 'product-recommendations'
    var $ctn = document.querySelector(".product-recommendations");
    if ($ctn === null) { return; }
    // Read product id from data attribute
    var productId = $ctn.dataset.productId;
    // Read limit from data attribute
    var limit = $ctn.dataset.limit;
    // Build request URL
    var requestUrl = "/recommendations/products?section_id=product-recommendations&limit="+limit+"&product_id="+productId;
    // Create request and submit it using Ajax
    var request = new XMLHttpRequest();
    request.open("GET", requestUrl);
    request.onload = function() {
      if (request.status >= 200 && request.status < 300) {
        var container = document.createElement("div");
        container.innerHTML = request.response;
        $ctn.parentElement.innerHTML = container.querySelector(".product-recommendations").innerHTML;
        initSlider($con);
      }
    };
    request.send();
  }
}

// Collections Tab section
var vndIstSection = {
  onLoad(container) {
    initIstSection(container);
    initCountDown(container);
    productReview();
  }
};

// Map section
var mapSection = {
  onLoad(container) {
    if ( !container || $(container).hasClass('map-loaded') ) return;
    var waypoint = new Waypoint({
      element: $(container),
      offset: '120%',
      handler: function(direction) {
        $(container).addClass('map-loaded');
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "https://maps.googleapis.com/maps/api/js?key=" + vndTheme.gg_api_k +"&callback=gmap_draw";
        s.setAttribute('async', '');
        s.setAttribute('defer', '');
        window.gmap_draw = function() {
          vndHlp.initMap('storeLocation');
        };
        $("head").append(s);
        waypoint.destroy();
      }
    });
  }
};

// Instagram section
var vndInstaSt = {
  onLoad(container) {
    if ( !container || $(container).hasClass('insta-loaded') ) {
      return;
    };
    const instagram = $(container).find('.instagram-images');

    var waypoint = new Waypoint({
      element: $(container),
      offset: '200%',
      handler: function(direction) {
        $(container).addClass('insta-loaded');
        vndInstaSt.getInstaImages(instagram);
        waypoint.destroy();
      }
    });
  },

  getInstaImages(instagram) {
    var hashtag = instagram.data('hashtag');
    var count = instagram.data('count');
    var grid = instagram.data('grid');
    var template = instagram.data('layout');;

    var options = {
      hashtag: hashtag,
      max: count,
      layout: grid,
      template: template
    }

    instagram.spectragram(options);
  }
};

///////////////////////////////////
//        Theme Functions        //
///////////////////////////////////

function initMobileMenu() {
  $('.header-menu-item a').on('click', function(e) {
    if ( $(e.currentTarget).attr('href') == '#') {
      e.preventDefault();
    }
  });

  if ( vndHlp.isMobile() && !vndHlp.didMblInit() ) {
    $('body').addClass('mobile-menu-init');

    $('.mobile-btn').on('click', function(e) {
      if ( e.cancelable ) {
        e.preventDefault();
      }
      $('body').addClass('mobile-menu-open');
    });

    $('.mobile-menu-overlay').on('click', function(e) {
      if ( e.cancelable ) {
        e.preventDefault();
      }
      $('body').removeClass('mobile-menu-open');
      $('body').removeClass('mobile-sidebar-open');
    });

    $('.right-expander').on('click', function(e) {
      if ( e.cancelable ) {
        e.preventDefault();
      }
      const $node = $(this).closest('.header-menu-item');
      if($node.hasClass('expanded')) {
        $node.removeClass('expanded');
        $node.find('> .sub-menu').slideUp();
      } else {
        $node.addClass('expanded');
        $node.find('> .sub-menu').slideDown();
      }
    });
  }
}

function initMobileSidebarMenu() {
  if ( vndHlp.isMobile() && !vndHlp.didMblSdbInit() ) {
    $('body').addClass('mobile-sidebar-init');
    $('.mobile-sidebar-toggler').on('click', function(e) {
      if ( e.cancelable ) {
        e.preventDefault();
      }
      $('body').toggleClass('mobile-sidebar-open');
    });
  }
}

function initStickySidebar() {
  if ( vndHlp.isMobile() ) {
    return;
  }

  const $sidebar = $('.mobile-sidebar');
  if ( $sidebar.length ) {
    if ( window.innerHeight < $sidebar.outerHeight() + 90 ) {
      const $grid = $sidebar.siblings('.large-9');
      $sidebar.removeClass('sticky-dir-up').addClass('sticky-dir-down');
      vndTheme.sidebar_sticky && vndTheme.sidebar_sticky.destroy();
      vndTheme.sidebar_sticky = new Waypoint.Inview({
        element: $grid[0],
        entered: function(direction) {
          if (direction == 'up') {
            $sidebar.removeClass('sticky-dir-up').addClass( 'sticky-dir-down' );
          } else {
            $sidebar.removeClass('sticky-dir-down').addClass( 'sticky-dir-up' );
          }
        },
        offset: {
          top: 90,
          bottom: 30
        }
      });
    } else {
      $sidebar.removeClass('sticky-dir-down').addClass('sticky-dir-ups');
    }
  }
}

function initSlider(container) {
  var slider = $(container).find('.items-carousel');
  if ( slider.length == 0 ) {
    return;
  }

  slider.each(function() {
    var autoPlay     = this.dataset.auto > 0 ? $(this).data('auto') * 1000 : false;
    var showNav      = this.dataset.nav == 'true';
    var showDots     = this.dataset.dots == 'true';
    var pauseOnHover = this.dataset.pausehover == 'true';
    var cellAlign    = this.dataset.cellalign || 'left';
    var wrapAround   = this.dataset.wraparound == 'true';
    var groupCells   = this.dataset.groupcells || '100%';

    if ( !$(this).hasClass('flickity-enabled') ) {
      $(this).flickity({
        wrapAround: wrapAround,
        autoPlay: autoPlay,
        pauseAutoPlayOnHover: pauseOnHover,
        prevNextButtons: showNav,
        pageDots: showDots,
        cellAlign: cellAlign,
        imagesLoaded: true,
        groupCells: groupCells,
        lazyLoad: 2
      });
    }
  });
}

function initProductImageSlider(container) {
  var slider = $(container).find('.items-carousel');
  if ( slider.length == 0 ) {
    return;
  }

  slider.each(function() {
    if ( $(this).hasClass('flickity-enabled') ) {
      return;
    }
    var initIndex = $(this).find('.init-img').index() || '0';
    var hasMultipleCells = slider.find('.product-img').length > 1;
    var $crs = $(this).flickity({
      wrapAround: true,
      autoPlay: false,
      prevNextButtons: hasMultipleCells,
      pageDots: false,
      imagesLoaded: true,
      lazyLoad: 2,
      draggable: false,
      initialIndex: initIndex,
      adaptiveHeight: true
    });

    var $carouselNav = $(container).find('.thumbs-container');
    if ( $carouselNav.length && !$carouselNav.hasClass('flickity-enabled') ) {
      var $carouselNavCells = $carouselNav.find('.product-thumb');

      $carouselNav.on( 'click', '.product-thumb', function( event ) {
        event.preventDefault();
        var index = $( event.currentTarget ).index();
        $crs.flickity( 'select', index );
      });
      var flkty = $crs.data('flickity');
      var navCellHeight = $carouselNavCells.height();
      var navHeight = $carouselNav.height();

      $crs.on( 'select.flickity', function() {
        // set selected nav cell
        $carouselNav.find('.is-selected').removeClass('is-selected');
        var $selected = $carouselNavCells.eq( flkty.selectedIndex )
          .addClass('is-selected');
        // scroll nav
        var scrollY = $selected.position().top +
          $carouselNav.scrollTop() - ( navHeight + navCellHeight ) / 2;
          $carouselNav.animate({
          scrollTop: scrollY
        });
      });

      $crs.on( 'change.flickity', function( event, index ) {
        $crs.find('.media-container video').each(function() {
          this.pause();
        });
        var $vid = $crs.find('.media-container.is-selected video').get(0);
        $vid && $vid.play();
      });
    }
  });
}

function initProductImageGrid(container) {
  var grid = $(container).find('.products-layout-grid');
  if ( !grid.length ) {
    return;
  }

  var $details = grid.find('.product-details-area');

  if(window.innerHeight < $details.outerHeight() + 90 ) {
    var waypoint = new Waypoint.Inview({
      element: $details,
      entered: function(direction) {
        if (direction == 'up') {
          $(this.element).removeClass('sticky-dir-up').addClass( 'sticky-dir-down' );
        }
      },
      exited: function(direction) {
        if (direction == 'down') {
          $(this.element).removeClass('sticky-dir-down').addClass( 'sticky-dir-up' );
        }
      },
      offset: {
        top: 90,
        bottom: 40
      }
    });
  }
}

function initProductZoomPopup() {
  // If product gallery is disabled, return
  if ( !vndTheme.ebl_prd_g ) {
    return;
  }

  $('.product-layout .product-img').on('click', function(e) {
    if($(e.currentTarget).hasClass('media-container')) {
      return;
    }

    var $c = $('.product-layout .product-img-area').clone();
    var $p = $c.find('.product-img');
    if ( !$p ) {
      return;
    }

    vndHlp.showLoading();

    var index = 0;
    var $p_a = [];
    $p.each(function(i, e) {
      // Media inner height
      var wh = $(window).innerHeight() - 10;
      // Media inner width
      var ww = $(window).innerWidth() - 10;

      $(e).removeAttr('style');
      $(e).children('img, model-viewer, video').css('max-height', wh);

      // Set model viewer size square
      if ( $(e).find('model-viewer').length ) {
        $(e).css( { height: wh, width: ww });
      }

      $(e).find('.product-images').removeAttr('srcset').removeAttr('data-srcset');
      $(e).find('.zoomImg').remove();

      if ( $(e).hasClass('is-selected') ) {
        index = i;
      }

      $p_a.push({
        galleryContainer: e.outerHTML
      });
    });

    $.magnificPopup.open({
      type: 'inline',
      items: $p_a,
      inline: {
        markup: '<div class="vnd-pp-content position-relative ds-flex align-center justify-center"><div class="mfp-close"></div><div class="mfp-expander"></div>'+
                  '<div class="mfp-galleryContainer"></div><div class="full-screen"></div>'+
                '</div>'
      },
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
      },
      removalDelay: 350,
      mainClass: 'mfp-appear-anm mfp-product-gallery',
      fixedContentPos: true,
      fixedBgPos: true,
      callbacks: {
        beforeOpen: () => {
          vndHlp.hideLoading();
        },
        open: function() {
          $('.mfp-expander').click( function() {
              $('body').on('click', vndHlp.entFScr('.mfp-product-gallery.mfp-wrap'));
              $('.mfp-expander').hide();
            }
          );
        },

        beforeClose: function() {
          $('body').off('click', vndHlp.entFScr);
        },

        close: function() {
          /* Close fullscreen */
          vndHlp.extFScr();
          return;
        },

        markupParse: function(template, values, item) {}
      }
    }, index);
  });
}

function initLookbookSpots(container) {
  var $container = $(container);
  if ( $container.length < 1 ) {
    return;
  }
  $container.find('.lookbook-expander').on('click', function(e) {
    e.preventDefault();
    var $parent = $(this).parent()
    $parent.addClass('active');
    this.card = $parent.find('.lookbook-card');
    if ( $parent.position().left > this.card.width() ) {
      this.card.css('right', '30px');
    } else {
      this.card.css('left', '30px');
    }

    // If card overflows parent's territory, then show at the bottom of it
    // 54 is for flickity-dots height
    if ( $parent.position().top + $parent.height() + this.card.height() > $parent.parent().outerHeight() - 54 ) {
      this.card.css('top', $parent.parent().outerHeight() - 64 - $parent.position().top - this.card.height() + 'px' );
    } else {
      this.card.css('top', '');
    }
  });

  $(window).on('click', function(e) {
    // When user clicks outside of lookbook card, hide it
    if ( $('.lookbook-spot.active').length
      && !$(e.target).hasClass('lookbook-spot')
      && !$(e.target).parents('.lookbook-spot.active').length ) {
      $('.lookbook-spot.active').removeClass('active');
    }
  });
}

function initLookbookSwitch(c) {
  var $ctn = $(c); // Container
  if ( $ctn.length < 1 ) {
    return;
  }
  $ctn.find('.lookbook-switcher').on('click', function(e) {
    e.preventDefault();
    $ctn.find('.lookbook-spot').removeClass('active'); // Initiate all other lookbook spots

    var $parent = $(this).parent(); // Lookbook spot
    $parent.addClass('active');

    var p_h = $(this).data('product'); // Switch target product handle
    var $tgt = $ctn.find('.slide-lookbook-' + p_h); // Target carousel item

    $p_c = $ctn.find('.lookbook-product .flickity-carousel'); // Products carousel
    $p_c.flickity( 'select', $tgt.index() );
  });
}

function initCountDown(container) {
  var $container = $(container);
  if ( $container.length < 0) {
    return;
  }

  if ( $container.find('.product-date').length > 0 ) {
    $container.find('.product-date').each((i,item) => {
      var date = $(item).attr('datetime');
      var html;

      if ( new Date(date) > new Date($.now()) ) {
        $(item).countdown(date, function(e) {
          html = '';
          html += '<div><span class="countdown-number">' + e.offset.totalDays + '</span><span class="countdown-text">' + vndTheme.t_d + '</span></div>';
          html += '<div><span class="countdown-number">' + e.offset.hours + '</span><span class="countdown-text">' + vndTheme.t_h + '</span></div>';
          html += '<div><span class="countdown-number">' + e.offset.minutes + '</span><span class="countdown-text">' + vndTheme.t_m + '</span></div>';
          html += '<div><span class="countdown-number">' + e.offset.seconds + '</span><span class="countdown-text">' + vndTheme.t_s + '</span></div>';

          $(item).html(html);
        });
      } else {
        $(item).parent().hide();
        $(item).parents('.product-card').removeClass('has-deal');
      }
    });
  }
}

function initSwatch() {
  $('.color-swatch').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.swatch-group').find('.color-swatch').removeClass('active');
    $(this).addClass('active');

    var $card = $(this).parents('.product-card');
    var $productImage = $card.find('.product-first-image');
    if ( $(this).data('image') ) {
      $productImage.attr('src', $(this).data('image'));
    }

    var $variantPrice = $card.find('.current-price');
    if ( $(this).data('price') ) {
      $variantPrice.html($(this).data('price'));
    }
  });
}

function initIstSection(target) {
  $(target).find('.isotope-container').each(function() {
    $grid = $(this);
    const $tablist = $grid.parent().find('.tab-list');
    const init_data = $tablist.find('.isotope-selector.active').attr("data-target");

    $(target).find('.ds-none').removeClass('ds-none');
    $grid.isotope({ filter: init_data });

    $tablist.find('.isotope-selector').on('click', function (e) {
      e.preventDefault();
      $tablist.find('.isotope-selector').removeClass('active');
      $(e.currentTarget).addClass('active');
      const data = $(e.currentTarget).attr("data-target");
      $grid.isotope({ filter: data });
    });

    $grid.parent().find('.isotope-mobile-selector').on('change', function(e) {
      e.preventDefault();
      const val = $(this).val();
      $grid.isotope({ filter: val });
    });
  });
}

function productReview() {
  if ( $('.shopify-product-reviews-badge').length > 0 && (typeof SPR != 'undefined') ) {
    // SPR.registerCallbacks();
    SPR.initRatingHandler();
    SPR.initDomEls();
    SPR.loadProducts();
    SPR.loadBadges();
  }
}

function initSizeChart() {
  $('.link-page-popup').on('click', function(e) {
    e.preventDefault();
    let url = this.href,
      delay = 0;
    const mpInstance = $.magnificPopup.instance;

    if ( mpInstance.isOpen ) {
      mpInstance.close();
      delay = 360;
    }

    setTimeout(function() {
      vndHlp.showLoading();

      $.ajax({
        url: url,
        dataType: "html",
        type: "GET",
        success: function(data) {
          vndHlp.hideLoading();
          $.magnificPopup.open({
            items: {
              src: data, // can be a HTML string, jQuery object, or CSS selector
              type: 'inline'
            },
            mainClass: 'mfp-appear-anm vnd-sizechart-pp',
            removalDelay: 350,
            fixedContentPos: true,
            fixedBgPos: true,
            callbacks: {
              open: function() {
                initSlider('.vnd-size-chart');
                initTabs('.vnd-size-chart');
              }
            },
          });
        },
        error: function() {
          vndHlp.hideLoading();
          console.log("Quick view error");
        }
      });
    }, delay);
  });
}

function quickViewInit() {
  $('.action-quickview').on("click", function(e) {
    e.preventDefault();
    let url = this.href;
    quickViewLoad(url);
  });
}

function zoomImage(target) {
  if ( !vndHlp.isTchDvc() && vndTheme.ebl_prd_z ) {
    $(target).each(function() {
      $(this).parent().zoom({ url: $(this).attr('data-zoom'), touch: false });
    });
  }
}

function initThumbs(container) {
  if ( !$(container).length ) {
    return;
  }

  var $viewport = $(container).find('.thumbs-viewport');
  if ( !$viewport.length ) {
    return;
  }

  var $thumbs_container = $(container).find('.thumbs-container');
  if ( !$(container).length ) {
    return;
  }
  $(container).find('.thumb-arrow__up').hide();

  if ( !$viewport.parent().hasClass('thumbs-bottom') ) {
    $viewport.height($('.product-images').height());
    if ( $viewport.height() >= $thumbs_container.height() ) {
      $(container).find('.thumb-arrow__down').hide();
    }

    var thumb_h = $viewport.find('.product-thumb').height();

    $('.thumb-arrow__up').on("click", function(e) {
      e.preventDefault();
      var $target = $(e.currentTarget);

      if ( $thumbs_container.position().top < thumb_h ) {
        $thumbs_container.animate({
          "top": "+=" + thumb_h
        }, 200, function() {
          $target.parent().find('.thumb-arrow__down').show();
          if ( $thumbs_container.position().top >= 0 ) {
            $target.hide();
          }
        });
      }
    });

    $('.thumb-arrow__down').on("click", function(e) {
      e.preventDefault();
      var $target = $(e.currentTarget);
      $thumbs_container.animate({
        "top": "-=" + thumb_h
      }, 200, function() {
        $target.parent().find('.thumb-arrow__up').show();
        if (($viewport.offset().top + $viewport.height()) >= ($thumbs_container.offset().top + $thumbs_container.height()) ) {
          $target.hide();
        }
      });
    });
  } else {
    const hasMultipleCells = $thumbs_container.find('.product-thumb').length > 1;
    $thumbs_container.flickity({
      sync: $('.product-img-area .items-carousel')[0],
      contain: true,
      pageDots: false,
      prevNextButtons: hasMultipleCells
    });
  }
}

function quickViewLoad(url) {
  $.ajax({
    url: url,
    dataType: "html",
    type: "GET",
    beforeSend: () => {
      vndHlp.showLoading();
    },
    success: function(data) {
      vndHlp.hideLoading();
      $.magnificPopup.open({
        items: {
          src: '<div class="product-quick-view vnd-pp-content">' + data + '</div>', // can be a HTML string, jQuery object, or CSS selector
          type: 'inline'
        },
        mainClass: 'mfp-appear-anm vnd-qv-pp',
        removalDelay: 350,
        fixedContentPos: true,
        fixedBgPos: true,
        callbacks: {
          open: function() {
            initProductImageSlider('.mfp-content');
            initCountDown('.mfp-content');
            productReview();
            zoomImage(".product-images");
            initThumbs(".product-quick-view");
            initProductSwatch('.product-quick-view');
            vndHlp.wslst();
            vndHlp.cplst();
            initSizeChart();
          },
          afterClose: function() {
            vndHlp.wslst();
            vndHlp.cplst();
          }
        },
      });
    },
    error: function() {
      vndHlp.hideLoading();
      console.log("Quick view error");
    }
  })
}

function initProductSwatch(container) {
  if ( !container ) {
    return;
  }
  var $container = $(container);
  if ( $container.find('[data-product-json]').html() ) {
    var product = JSON.parse($('[data-product-json]').html());

    new Shopify.OptionSelectors('product-actual-select', {
      product: product,
      onVariantSelected: selectSwatchCallback,
      enableHistoryState: true
    });

    $('.qty-control').each(function() {
      const $qty = $(this);
      if ( $qty.hasClass('qty-initialized') ) {
        return;
      }
      $qty.addClass('qty-initialized');

      $qty.on('click', '.reduce', function(e) {
        e.preventDefault();

        $qty.find('.quantity').val(function(i, ov) {
          if ( parseInt(ov) > 1 ) {
            return --ov;
          } else {
            return ov;
          }
        });
      });

      $qty.on('click', '.increase', function(e) {
        e.preventDefault();
        $qty.find('.quantity').val(function(i, ov) {
          return ++ov;
        });
      });
    });
  }

  $container.on('click', '.product-single-option .option-label', function(e) {
    e.preventDefault();
    $(this).parent().find('.option-label').removeClass('active');
    $(this).addClass('active');

    const optionIndex = $(this).parent().attr('data-option-index') - 1,
          optionValue = $(this).attr('data-value');
    $(this)
    .closest('form')
    .find('.single-option-selector')
    .eq(optionIndex)
    .val(optionValue)
    .trigger('change');
  });

  $container.on('change', '.product-single-option .option-selector', function() {
    const optionIndex = $(this).attr('data-option-index') - 1,
          optionValue = $(this).val();
    $(this)
    .closest('form')
    .find('.single-option-selector')
    .eq(optionIndex)
    .val(optionValue)
    .trigger('change');
  });
}

function selectSwatchCallback(variant, selector) {
  var $container = typeof selector == 'undefined' ? $('.product-details-area') : $(selector.variantIdField).closest('.product-details-area');
  $container.addClass('product-disabled');
  $container.find('.notify').hide();

  if ( variant ) {
    $container.find('.current-price').first().html(vndCurrency.formatMoney(variant.price, vndTheme.m_f));
    const $old = $container.find('.old-price').first();
    $old.html(vndCurrency.formatMoney(variant.compare_at_price, vndTheme.m_f));
    if ( variant.compare_at_price > 0 ) {
      $old.show();
    } else {
      $old.hide();
    }

    vndHlp.formatCurrency();

    if ( variant.sku ) {
      $container.find('.product-sku .sku').first().html(variant.sku);
      $container.find('.product-sku').show();
    } else {
      $container.find('.product-sku').hide();
    }

    if ( variant.featured_image ) {
      var src = Shopify.Image.removeProtocol(variant.featured_image.src);
      $container.find(".thumbs-container img").filter('[src="' + src.replace('.jpg', '_100x.jpg') + '"]').trigger("click");
    }

    const $btn = $container.find('.btn-add-cart'),
          $btn_t = $container.find('.btn-add-cart .add-cart__text');
    if ( variant.available ) {
      const stock = parseInt(selector.variantIdField.selectedOptions[0].dataset.quantity);
      $container.find('.product-details__text .in-stock').first().html( stock + ' ' + vndTheme.lang.product.inStock);
      $btn.addClass('btn-anm-cart');
      const str = ( stock < 1 ? vndTheme.lang.product.preOrder : vndTheme.lang.product.addToCart );
      $btn_t.html(str);
      $container.removeClass('product-disabled');
    } else {
      $container.find('.product-details__text .in-stock').first().html(vndTheme.lang.product.outStock);
      $btn_t.html(vndTheme.lang.product.soldOut);
      $btn.removeClass('btn-anm-cart');
      $container.find('.notify').show();
    }

    var variant_media = variant.featured_media ? variant.featured_media.id : false;
    var slider = $('.product-img-area .items-carousel.flickity-enabled');
    $(slider).find('.product-img').each(function(key, value) {
      var media_id = this.dataset.media;
      if ( variant_media && variant_media == media_id ) {
        slider.flickity( 'select', key );
        return false;
      }
    });

    $('.products-layout-grid .product-img-area .product-img').each(function(key, value) {
      var media_id = this.dataset.media;
      if ( variant_media && variant_media == media_id ) {
        $('html, body').animate({
          scrollTop: $(this).offset().top
        }, 450);
        return false;
      }
    });
  }
}

function initTabs(container) {
  $(container).find('.tabs-nav__item a').on('click', function(e) {
    e.preventDefault();
    $(this).parents('.tabs-nav').find('.tabs-nav__item').removeClass('active');
    $(this).parents('.tabs-nav__item').addClass('active');
    $(this).parents('.tabs').find('.tabs-content__item.active').removeClass('active');
    $(e.target.hash).addClass('active');
  });
}

// Venedor Theme Helper functions
var vndHlp = {
  parseVideo (url) {
    url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

    if (RegExp.$3.indexOf('youtu') > -1 ) {
      var type = 'youtube';
    } else if (RegExp.$3.indexOf('vimeo') > -1 ) {
      var type = 'vimeo';
    }

    return {
      type: type,
      id: RegExp.$6
    };
  },

  // Initialize Video play/pause controls
  ctrVideo () {
    $('video').each(function(i, video) {
      video.onplayed = function(e, i){
        $(this).parent().addClass('playing');
      }

      video.onpaused = function(e, i){
        $(this).parent().removeClass('playing');
      }
    });

    $('.play-video').on('click', function(e) {
      e.preventDefault();
      $(this).parent().find('video').each(function() {
        this.muted = false;
        this.play();
      });
      $(this).parent().addClass('playing');
    });

    $('.pause-video').on('click', function(e) {
      e.preventDefault();
      $(this).parent().find('video').each(function() {
        this.pause();
      });
      $(this).parent().removeClass('playing');
    });
  },

  parseMoney (money, origin) {
    if ( money ) {
      if ( vndCurrency.moneyFormats[vndTheme.s_c].money_format.indexOf('comma_separator') < 0 ) {
        money = money.replace(/,/g, '');
      } else {
        money = money.replace('.', '').replace(/,/g, '.');
      }

      return money.match(/([0-9]*[.])?[0-9]+/g)[0];
    }
  },

  formatCurrency() {
    vndTheme.c_c = vndCurrency.cookie.read();

    jQuery('span.money span.money').each(function() {
      jQuery(this).parents('span.money').removeClass('money');
      jQuery(this).attr('data-currency-' + vndTheme.s_c, jQuery(this).html());
    });

    // If there's no cookie or it's the shop vndCurrency.
    if ( vndTheme.c_c == null || vndTheme.c_c === vndTheme.s_c ) {
      vndCurrency.currentCurrency = vndTheme.s_c;
      // vndCurrency.convertAll(vndTheme.s_c, vndTheme.s_c);
    } else {
      if ( vndTheme.p_f == 'without_zero' && vndCurrency.moneyFormats[vndTheme.c_c][vndCurrency.format].indexOf('no_decimals') < 0 ) {
        vndCurrency.moneyFormats[vndTheme.c_c][vndCurrency.format] = vndCurrency.moneyFormats[vndTheme.c_c][vndCurrency.format].replace('amount', 'amount_no_decimals');
      }
      vndCurrency.convertAll(vndTheme.s_c, vndTheme.c_c);

      // Set currency flag
      let newHtml = vndTheme.c_c;
      if ( $('.currency-flag').length > 0 ) {
        newHtml = '<span class="currency-flag currency-flag-' + vndTheme.c_c.toLowerCase() + '"></span>' + vndTheme.c_c;
      }
      jQuery('.selected-currency .flag-name').html(newHtml);
    }

    if ( vndTpl == 'collection' || vndTpl == 'search' ) {
      collectionPage.initPriceRange(vndTheme.c_c);
    }

    // Change currency
    jQuery('.currency-picker a').click(function(e) {
      e.preventDefault();
      jQuery('.currency-picker li').removeClass('selected');
      jQuery(this).parent().addClass('selected');
      var newCurrency = jQuery(this).attr('data-currency');

      // Set currency flag
      let newHtml = newCurrency;
      if ( $('.currency-flag').length > 0 ) {
        newHtml = '<span class="currency-flag currency-flag-' + newCurrency.toLowerCase() + '"></span>' + newCurrency;
      }
      jQuery('.selected-currency .flag-name').html(newHtml);

      if ( vndTheme.p_f == 'without_zero' && vndCurrency.moneyFormats[newCurrency][vndCurrency.format].indexOf('no_decimals') < 0 ) {
        vndCurrency.moneyFormats[newCurrency][vndCurrency.format] = vndCurrency.moneyFormats[newCurrency][vndCurrency.format].replace('amount', 'amount_no_decimals');
      }

      vndCurrency.convertAll(vndCurrency.currentCurrency, newCurrency);

      if ( vndTpl == 'collection' || vndTpl == 'search' ) {
        collectionPage.initPriceRange(newCurrency);
      }
    });
  },

  initMap (id) {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var custom_styles = [{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#7f2200"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#87ae79"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#495421"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":4.1}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"saturation":"30"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4e4e4e"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"on"},{"saturation":"30"},{"color":"#4e4e4e"},{"weight":"1.50"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#2b2b2b"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"weight":"2.50"},{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#a4cd89"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#769E72"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#7B8758"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#EBF4A4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"off"},{"color":"#8dab68"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5B5B3F"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ABCE83"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#EBF4A4"},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#9BBF72"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#A4C67D"},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c5eaff"},{"visibility":"on"},{"weight":"1.00"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"visibility":"off"},{"color":"#ff0000"}]}];
    if ( vndTheme.map_style == '2' ) {
      custom_styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#212121"},{"saturation":"0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"saturation":"0"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"0"},{"gamma":"1"},{"weight":"0.80"},{"visibility":"simplified"},{"color":"#f1f1f1"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":"0"},{"visibility":"simplified"},{"color":"#3bb760"},{"gamma":"1"},{"weight":"1.90"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"lightness":"0"},{"saturation":"13"},{"visibility":"off"},{"hue":"#aaff00"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"0"},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"},{"lightness":"-49"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"100"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":"-24"},{"lightness":"-77"},{"weight":"2"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#f1f1f1"},{"visibility":"on"},{"lightness":"0"},{"gamma":"1"},{"weight":"1"}]}]
    } else if ( vndTheme.map_style == '3' ) {
      custom_styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#212121"},{"saturation":"0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"saturation":"0"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"0"},{"gamma":"1"},{"weight":"0.80"},{"visibility":"simplified"},{"color":"#f1f1f1"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":"0"},{"visibility":"simplified"},{"color":"#f9ff50"},{"gamma":"1"},{"weight":"1.90"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"lightness":"0"},{"saturation":"13"},{"visibility":"off"},{"hue":"#aaff00"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"0"},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"},{"lightness":"-49"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"100"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":"-24"},{"lightness":"-77"},{"weight":"2"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#f1f1f1"},{"visibility":"on"},{"lightness":"0"},{"gamma":"1"},{"weight":"1"}]}]
    }

    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,

        // The latitude and longitude to center the map (always required)
        // center: new google.maps.LatLng(40.6700, -73.9400), // New York
        center: new google.maps.LatLng(parseFloat(vndTheme.s_loc.lat), parseFloat(vndTheme.s_loc.lng)),

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: custom_styles
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById(id);

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    var $form = $(`#${id}`).parent().find('.contact-on__map');
    if ( $form.length > 0 ) {
      if ( $form.hasClass('form-center') ) {
        var os_x = ($(`#${id}`).width() + $($form).find('.col-padding').width()) / 4;
      } else {
        var os_x = ($(`#${id}`).width() * 0.1693 + $($form).find('.col-padding').width()) / 2;
      }

      map.panBy(os_x, 0);
    }

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(vndTheme.s_loc.lat), parseFloat(vndTheme.s_loc.lng)),
        map: map,
        title: 'Snazzy!'
    });
  },

  initCookieNotify() {
    var $cookie_div = $('.cookie-notify-container');
    if ( $cookie_div.length > 0 && vndHlp.readCookie('vs_cookieAgree') == 'true' ) {
      $cookie_div.remove();
    } else {
      $cookie_div.addClass('active');
    }

    $('.btn-cookie-close').on('click', function(e) {
      e.preventDefault();
      $cookie_div.remove();
      vndHlp.createCookie('vs_cookieAgree', 'true', 1);
    });
  },

  createCookie (name, value, days ) {
    var expires;
    if (days ) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  },

  readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for ( var i = 0; i < ca.length; i++ ) {
      var c = ca[i];
      while ( c.charAt(0) === ' ' ) c = c.substring(1, c.length);
      if ( c.indexOf(nameEQ) === 0 ) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  },

  eraseCookie(name) {
    vndHlp.createCookie(name, "", -1);
  },

  refreshCart(cart) {
    var mpInstance = $.magnificPopup.instance;
    if ( mpInstance.isOpen ) {
      mpInstance.close();
    }

    $('.cart-total').text(cart.item_count);
    $('.icon-cart__total').text(cart.item_count);

    // Update cart list
    $.get("/cart?view=json", function(list) {
      $(".cart-dropdown").html(list);
      lazySizes.loader.checkElems();
      $('.icon-cart__count .money').html(vndCurrency.formatMoney(cart.total_price, vndTheme.m_f));
      if ( vndTpl != 'cart' ) {
        if ( $('header.sticky-active').length ) {
          $('header.sticky-active .cart-dropdown').addClass('active');
        } else {
          $('.cart-dropdown').addClass('active');
        }
      }
      vndHlp.formatCurrency();

      setTimeout(function() {
        $('.cart-dropdown').removeClass('active');
      }, 2500);
    });
  },

  getTagsFromUrl() {
    if ( location.search.length ) {
      for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
        aKeyValue = aCouples[i].split('=');
        if ( aKeyValue.length > 1 ) {
          Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
        }
      }
    }

    if ( Shopify.queryParams.sort_by ) {
      $('#sort-by').val(Shopify.queryParams.sort_by);
    }

    if ( Shopify.queryParams.constraint ) {
      vndTheme.currentTags = Shopify.queryParams.constraint.split('+');
    }
  },

  setTagsFromString(string) {
    var newTag = string.replace(/\s+/g, '-');
    if ( newTag ) {
      var tagIndex = vndTheme.currentTags.indexOf(newTag);
      if ( tagIndex >= 0 ) {
        vndTheme.currentTags.splice(tagIndex, 1);
      } else {
        vndTheme.currentTags.push(newTag);
      }
    }
  },

  setQueryParams() {
    if ( vndTheme.currentTags.length ) {
      Shopify.queryParams.constraint = vndTheme.currentTags.join('+');
    } else {
      delete Shopify.queryParams.constraint;
    }
  },

  // Check if device size is mobile
  isMobile() {
    return $(window).width() < 992;
  },

  // Check if device type is touch
  isTchDvc() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },

  // Check if mobile menu initialized
  didMblInit() {
    return $('body').hasClass('mobile-menu-init');
  },

  // Check if mobile sidebar initialized
  didMblSdbInit() {
    return $('body').hasClass('mobile-sidebar-init');
  },

  subscribeNsl($form) {
    let url = $form.attr('action'),
        type = 'post',
        dataType = 'html',
        contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    if ( vndTheme.nsl_svc == 'mailchimp' ) {
      url = url.replace('subscribe/post?u=', 'subscribe/post-json?u=') + '&c=?';
      type = 'get';
      dataType = 'json';
      contentType = 'application/json; charset=utf-8';
    }
    $($form).parents('.newsletter-form').addClass('submitted');

    $.ajax({
      type: type,
      url: url,
      data: $form.serialize(),
      cache: false,
      dataType: dataType,
      contentType: contentType,
      beforeSend: function() {
        $($form).find('.btn').addClass('vnd-btn-busy').html('<span class="spinner" style="position:relative"></span>');
      },
      error: function(err) {
        let notice = vndTheme.lang.newsletter.error404;
        if ( err.status == 429 ) {
          notice = vndTheme.lang.newsletter.error429;
        }

        $form.replaceWith('<p class="msg-notice msg-notice__error">' + notice + '</p>');
        vndHlp.eraseCookie('vs_newsletterRead');
      },
      success: function(data, respond) {
        if ( respond == 'success' ) {
          $form.replaceWith('<p class="msg-notice msg-notice__success">' + vndTheme.lang.newsletter.confirmation + '</p>');
          $('.subscribe-config').remove();
          vndHlp.createCookie('vs_newsletterRead', 'true', 1);
        } else if ( type == 'get') {
          const notice = data.msg.replace('<a ', '<a class="em ds-block" ');
          $form.replaceWith('<p class="msg-notice msg-notice__warn">' + notice + '</p>');
          vndHlp.eraseCookie('vs_newsletterRead');
        } else {
          $form.replaceWith('<p class="msg-notice msg-notice__error">' + vndTheme.lang.newsletter.error404 + '</p>');
          vndHlp.eraseCookie('vs_newsletterRead');
        }
      }
    });
  },

  // Enter full screen with given class name element
  entFScr(class_name) {
    $(class_name).attr('id', 'fullscreen-element');
    var el = document.getElementById('fullscreen-element');
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) { /* Firefox */
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) { /* IE/Edge */
      el.msRequestFullscreen();
    }
  },

  // Exit fullscreen
  extFScr() {
    if ( document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  },

  // Initialize wishlist
  wslst() {
    productsCookieList();
  },

  // Initialize comparelist
  cplst() {
    const setting = {
      type: "vnd_cplst",
      pageClass: '.page-compare',
      btnClass:   ".btn-compare",
      listItem:   '.compare-card',
      listCount:  '.compare-count',
      listGrid:   '.compare-grid',
      removeAll:  '.clear-cplst'
    }

    productsCookieList(setting);
    var list = localStorage.getItem("vnd_cplst");
    if ( list != null ) {
      $('.compare-grid').show();
    }
  },

  showLoading() {
    $('.vnd-loading-scr').fadeIn('fast');
  },

  hideLoading() {
    $('.vnd-loading-scr').fadeOut('fast');
  }
}

function initNewsletter() {
  if ( vndTheme.ebl_nsl_pp ) {
    $('.subscribe-config input').on('click', function() {
      if ( $(this).parent().find('input:checked').length ) {
        vndHlp.createCookie('vs_newsletterRead', 'true', 1);
      } else {
        vndHlp.eraseCookie('vs_newsletterRead');
      }
    });

    if ( vndHlp.readCookie('vs_newsletterRead') == null ) {
      setTimeout(function() {
        const mpInstance = $.magnificPopup.instance;
        let delay = 0;
        if ( mpInstance.isOpen ) {
          mpInstance.close();
          delay = 360;
        }
        setTimeout(function() {
          $.magnificPopup.open({
            items: {
              src: $('#newsletter-popup'),
              type: 'inline'
            },
            removalDelay: 350,
            mainClass: 'mfp-appear-anm vnd-nsl-pp',
            midClick: true,
            fixedBgPos: true,
            callbacks: {
              beforeOpen: function() {$('#newsletter-popup .image-bg').length && lazySizes.loader.unveil($('#newsletter-popup .image-bg')[0]);}
            }
          });
        }, delay);
      }, vndTheme.nsl_dl * 1000);
    }
  }

  $('.form-newsletter button').on('click', function (e) {
    if ( $(e.target).hasClass('vnd-btn-busy') ) {
      return;
    }
    $form = $(e.target).parents('form');
    if ( $form[0].checkValidity() ) {
      e.preventDefault();
      vndHlp.subscribeNsl($form);
    } else {
      return;
    }
  });
}

function initPopups() {
  $('.popup-activator').on('click', function(e) {
    e.preventDefault();
    var target = e.currentTarget.hash;
    $(target).toggleClass('active');
  });

  var $box = $('#user-notice');
  $('#user-notice .user-notice__close').on('click', function() {
    $box.find(".heading").html('');
    $box.find(".message").html('');
    $box.removeClass('loaded');
  });

  $(window).on('click touchstart', function(e) {
    // When user clicks outside of popup box, hide it
    if ( $('.popup-box.active').length
      && !$(e.target).hasClass('popup-activator')
      && !$(e.target).parents('.popup-activator').length
      && !$(e.target).hasClass('popup-box')
      && !$(e.target).parents('.popup-box.active').length ) {
        $('.popup-box.active').removeClass('active');
      }

    if ( $('.cart-dropdown.active').length
      && !$(e.target).hasClass('cart-wrapper')
      && !$(e.target).parents('.cart-wrapper').length ) {
        $('.cart-dropdown.active').removeClass('active');
      }

    if ( $('.search-form.js-hover').length
      && !($(e.target).hasClass('search-form') && $(e.target).hasClass('js-hover'))
      && !$(e.target).parents('.search-form.js-hover').length ) {
        $('.search-form.js-hover').removeClass('js-hover');
      }
  });
}

// Initialize functions on window resize
function rszRender() {
  $(window).on('resize', function() {
    initMobileMenu();
    initMobileSidebarMenu();
  });
}

// Venedor Theme search functions
var vndSch = {
  init() {
    if ( vndHlp.isTchDvc() ) {
      $('.header-search .search-button').on('touchstart', function(e) {
        $p = $(e.target).parents('.search-form');
        if ( !$p.hasClass('js-hover') ) {
          if ( e.cancelable ) {
            e.preventDefault();
          }
          $p.toggleClass('js-hover');
        }
      });
    }
  },

  initBrandSearch() {
    $('.vs-group-content .filter-list .nav-list__link').on('click', function(e) {
      e.preventDefault();
      vndHlp.setTagsFromString($(this).text());
      $(this).find('.ticksign').toggleClass('active');
    });

    $('.search-with-brand').on('click', function(e) {
      e.preventDefault();
      vndHlp.setQueryParams();
      var params = '?' + jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
      var type = 'type=product';
      var query = '&q=' + $(this).parent().find('.sidebar-search__input').val();

      if ( params.length > 1 ) {
        var targetUrl = location.origin + location.pathname + 'search' + params + '&' + type + query;
      } else {
        var targetUrl = location.origin + location.pathname + 'search?' + type + query;
      }

      window.history && window.history.pushState && window.history.pushState('','', targetUrl);
      location = targetUrl;
    })
  },

  initPredictive(container) {
    var $container = $(container);
    if ( $container.length < 1 ) {
      return;
    }
    $container.find('.header-search__input').on('input', function(e) {
      var $that = e.target;
      var $parent = $($that).parents('.search-form').addClass('js-hover');
      var query = e.target.value;
      if ( query == '' ) {
        $('.result-container').empty();
        return;
      }

      var query = vndSch.normalizeQuery(query);
      if ( query ) {
        var params = vndSch.setRequestParams(query);

        jQuery.getJSON("/search/suggest.json", params)
          .done(function(response) {
            var products = response.resources.results.products;
            var articles = response.resources.results.articles;
            var pages = response.resources.results.pages;
            var collections = response.resources.results.collections;

            var $resultContainer = '<div class="result-container">';
            if ( products.length > 0 ) {
              if ( vndTheme.pdtv_fd == 'product,page,article,collection' ) {
                $resultContainer += '<h2 class="search-category">' + vndTheme.lang.search.products + '</h2>';
              }
              $.each(products, function(index, product) {
                var productImg = '';
                if ( product.image ) {
                  var productImg = '<img class="lazyload" src="' + product.image + '" alt="'+ product.title +'"/>'
                }
                var productTitle = '<div class="product-info"><h3 class="product-name">' + product.title + '</h3>';
                if ( product.compare_at_price_max > 0 ) {
                  var productPrice = '<span class="old-price money">' + vndCurrency.formatMoney(product.compare_at_price_max, vndTheme.m_f) + '</span><span class="sale-price current-price money">' + vndCurrency.formatMoney(product.price, vndTheme.m_f) + '</span></div>';
                } else {
                  var productPrice = '<span class="sale-price current-price money">' + vndCurrency.formatMoney(product.price, vndTheme.m_f) + '</span></div>';
                }

                var searchItem = '<a class="result-item ds-flex" href="' + product.url + '">' + productImg + productTitle + productPrice + '</a>';
                $resultContainer += searchItem;
              });
            }

            if ( vndTheme.pdtv_fd == 'product,page,article,collection' ) {
              if ( articles.length > 0 ) {
                $resultContainer += '<h2 class="search-category">' + vndTheme.lang.search.articles + '</h2>';

                $.each(articles, function(index, article) {
                  var articleImg = '';
                  if ( article.image ) {
                    var articleImg = '<img class="lazyload" src="' + article.image + '" alt="'+ article.title +'"/>'
                  }
                  var articleTitle = '<h3 class="product-name">' + article.title + '</h3>';
                  var searchItem = '<a class="result-item ds-flex" href="' + article.url + '">' + articleImg + articleTitle + '</a>';
                  $resultContainer += searchItem;
                });
              }

              if ( collections.length > 0 ) {
                $resultContainer += '<h2 class="search-category">' + vndTheme.lang.search.collections + '</h2>';
                $.each(collections, function(index, collection) {
                  var searchItem = '<a class="result-item ds-flex product-name" href="' + collection.url + '">' + collection.title + '</a>';
                  $resultContainer += searchItem;
                });
              }

              if ( pages.length > 0 ) {
                $resultContainer += '<h2 class="search-category">' + vndTheme.lang.search.pages + '</h2>';
                $.each(pages, function(index, page) {
                  var searchItem = '<a class="result-item ds-flex product-name" href="' + page.url + '">' + page.title + '</a>';
                  $resultContainer += searchItem;
                });
              }
            }

            $resultContainer += '</div>';
            $parent.find('.result-container').replaceWith($resultContainer);
        });
      }

      $container.find('.header-search__input').on('blur', function(e) {
        var $that = e.target;
        $parent = $($that).parents('.search-form').removeClass('js-hover');
      });

      $container.find('.header-search__input').on('focus', function(e) {
        var $that = e.target;
        $parent = $($that).parents('.search-form').addClass('js-hover');
      });
    });
  },

  normalizeQuery(query) {
    if ( typeof query !== "string" ) {
      return null;
    }

    return query
      .trim()
      .replace(" ", "-")
      .toLowerCase();
  },

  setRequestParams(query) {
    var type = vndTheme.pdtv_fd || "product";
    return {
      "q": query,
      "resources": {
        "type": type,
        "limit": vndTheme.sch_lmt || 5,
        "options": {
          "unavailable_products": "last"
        }
      }
    }
  }
}

function initScrollTop() {
  var scrolled = false;
  $(window).scroll(function() {
    if ( 250 < $(window).scrollTop() && !scrolled ) {
      $('#toPageTop').addClass('visible');
      scrolled = true;
    }

    if ( 250 > $(window).scrollTop() && scrolled ) {
      $('#toPageTop').removeClass('visible');
      scrolled = false;
    }
  });

  $('#toPageTop').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  })
}

// Search Iframes and convert youtube and vimeos to player
function initIframes(container) {
  $(container).find('iframe').each(function() {
    var videoObj = vndHlp.parseVideo($(this).attr("data-src"));

    if ( $(this).attr('data-autoplay') == "autoplay" ) {
      videoObj.id += '?autoplay=1';
    }


    if ( videoObj.type == 'youtube' ) {
      $(this).attr('src', '//www.youtube.com/embed/' + videoObj.id);
    } else if ( videoObj.type == 'vimeo' ) {
      $(this).attr('src', '//player.vimeo.com/video/' + videoObj.id);
    }
  });
}

var vndPageProduct = {
  init() {
    var vndSts = new vndTheme.vndSts();
    vndSts.init('.products-template', vndPrdTplSt.onLoad);
    vndSts.init('.product-details-tabs', vndPrdDtTabsSt.onLoad);
    vndPrdRcnt.addProduct();
    initSizeChart();
  }
}

var collectionPage = {
  init() {
    vndHlp.getTagsFromUrl();
    if ( vndTheme.currentTags.length ) {
      $.each(vndTheme.currentTags, function(index, tag) {
        // Tag Filter
        tag = tag.replace(/\-/g, ' ');
        var selector = ".filter-tag .nav-list__link:contains('" + tag +"')";
        $(selector).find('span').addClass('active');

        // Color Filter
        var selector = ".filter-color [data-color='"+ tag +"']";
        $(selector).addClass('active');
        collectionPage.scrollToMain(360);
      });
    }

    if ( vndTheme.scr_tm ) {
      collectionPage.scrollToMain(700);
    }

    collectionPage.initSidebarMenu();
    collectionPage.sortbyFilter();
    collectionPage.initFilterByTag();
    collectionPage.initFilterByColor();
    collectionPage.initGridSwitch();
    collectionPage.initInfinitScroll();
    initCountDown('#collectionsContent');
  },

  scrollToMain(sec) {
    let element = '.collection-sort';
    if ( vndTpl == 'search' ) {
      element = '#shopify-section-template-search';
    }

    if ( $(element).length ) {
      $('body,html').animate({
        scrollTop: $(element).offset().top - 65
      }, sec || 350);
    }
  },

  replaceContent(targetUrl) {
    $.ajax({
      type: 'GET',
      url: targetUrl,
      beforeSend: function() {
        $('#collectionsContent').addClass('loading');
        $(".result-loading").addClass('active');
      },
      success: function(result) {
        var breadcrumb = $(result).find('.breadcrumb').html();
        $('.breadcrumb').html(breadcrumb);

        var collectionSort = $(result).find('.collection-sort .pagination-container').html();
        $('.collection-sort .pagination').replaceWith(collectionSort);

        var filteredResult = $(result).find('#collectionsContent .row');
        $('#collectionsContent .row').replaceWith(filteredResult);

        productReview();
        initSwatch();
        quickViewInit();
        initCountDown('#collectionsContent');
        collectionPage.initInfinitScroll();

        setTimeout(() => {
          $('#collectionsContent').removeClass('loading');
          $('.result-loading').removeClass('active');
        }, 750);

        initStickySidebar();
        collectionPage.initPriceRange();
        collectionPage.scrollToMain(360);
      },
      error: function(x, t, m) {
        console.log(x, t, m);
        location.replace(targetUrl);
      },
      dataType: "html"
    });
  },

  filterProducts() {
    var params = '?' + jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
    var targetUrl = location.origin + location.pathname + params;
    window.history && window.history.pushState && window.history.pushState('','', targetUrl);

    if ( vndTheme.enable_ajax_filter ) {
      collectionPage.replaceContent(targetUrl);
    } else {
      location = targetUrl;
    }
  },

  sortbyFilter() {
    $('#sort-by').on('change', function() {
      Shopify.queryParams.sort_by = $(this).val();
      collectionPage.filterProducts();
    });
  },

  initFilterByTag() {
    $('.filter-tag a').on('click', function(e) {
      e.preventDefault();

      if ( Shopify.queryParams.constraint ) {
        vndTheme.currentTags = Shopify.queryParams.constraint.split('+');
      }

      vndHlp.setTagsFromString($(this).text());
      vndHlp.setQueryParams();
      collectionPage.filterProducts();
    });
  },

  initFilterByColor() {
    $('.filter-color a').on('click', function(e) {
      e.preventDefault();

      if ( Shopify.queryParams.constraint ) {
        vndTheme.currentTags = Shopify.queryParams.constraint.split('+');
      }

      const newTag = $(this).find('span').data('color');
      vndHlp.setTagsFromString(newTag);
      vndHlp.setQueryParams();
      collectionPage.filterProducts();
    });
  },

  initSidebarMenu() {
    initMobileSidebarMenu();
    initSlider('.sidebar-carousel');
    initStickySidebar();

    $('.sidebar-navigation .nav-child__wrapper').slideUp();
    $('.sidebar-navigation li').each(function(){
      if ( $(this).hasClass('active') ) {
        $(this).parents('li').addClass('active expanded');
      }
    });
    $('.sidebar-navigation .expanded > .nav-child__wrapper').slideDown();

    $('.expand').on('click', function(e) {
      e.preventDefault();
      const $this = $(e.currentTarget),
            $parent = $this.parent();

      $parent.toggleClass('expanded');
      $parent.find('>.nav-child__wrapper').slideToggle();
    });

    $('.filter-list .nav-list__link').on('click', function(e) {
      e.preventDefault();
      $(this).find('.ticksign').toggleClass('active');
    });
  },

  initPriceRange(newCurrency) {
    let $this = $('.price-range');
    if ( $this.length < 1 ) {
      return false;
    }

    let width = $this.parent().width() - 18,
        price_max = vndHlp.parseMoney($this.attr('data-max'), 'init') || 100,
        price_min = vndHlp.parseMoney($this.attr('data-min'), 'init') || 1;
        m_f = vndCurrency.moneyFormats[vndTheme.s_c]["money_format"].replace(/\{\{(.*?)\}\}/g, '%s');

    if ( newCurrency ) {
      price_max = Currency.convert(price_max, vndTheme.s_c, newCurrency);
      price_min = Currency.convert(price_min, vndTheme.s_c, newCurrency);
      m_f = vndCurrency.moneyFormats[newCurrency]["money_format"].replace(/\{\{(.*?)\}\}/g, '%s');
      $('.price-range-container').remove();
      $this.parent().append($this.clone());
      $this.remove();
      $this = $('.price-range');
    }

    price_max = Math.ceil(price_max);
    price_min = Math.floor(price_min);

    if ( price_min == price_max ) {
      price_min--;
    }

    $this.jRange({
      from: price_min,
      to: price_max,
      step: 1,
      format: m_f,
      showScale: false,
      isRange: true,
      width: width,
      ondragend: function(range) {collectionPage.initPriceElement(range)},
      onbarclicked: function(range) {collectionPage.initPriceElement(range)}
    }).jRange('setValue', price_min.toString() + ',' + price_max.toString());
  },

  initPriceElement(range) {
    var r = range.split(',');
    var price_min = parseFloat(r[0]);
    var price_max = parseFloat(r[1]);
    $('.product-price .current-price').each(function(index, item) {
      var current_price = parseFloat(vndHlp.parseMoney(item.innerHTML, 'change'));
      if ( current_price < price_min || current_price > price_max ) {
        $(item).closest('.collection-card__wrapper').hide();
      } else {
        $(item).closest('.collection-card__wrapper').show();
      }
    });
    setTimeout(() => {
      collectionPage.scrollToMain(360);
    }, 350);
  },

  initGridSwitch() {
    $('.collection-grid__switcher').on('click', function(e) {
      e.preventDefault();

      $('.collection-grid__switcher').removeClass('active');
      $(this).addClass('active');

      $('#collectionsContent .result-loading').addClass('active');

      if ( $(this).hasClass('grid') ) {
        $('#collectionsContent').removeClass('list').addClass('grid');
      } else {
        $('#collectionsContent').removeClass('grid').addClass('list');
      }

      initStickySidebar();

      setTimeout( function() {
        $('#collectionsContent .result-loading').removeClass('active');
      }, 250);
    });
  },

  initInfinitScroll() {
    if ( $('#infinite-more-link').length > 0 ) {
      var waypoint = new Waypoint({
        element: $('#infinite-more-link'),
        offset: '85%',
        handler: function(direction) {
          let $targetElement = $(this.element);
          const targetUrl = $targetElement.data('target');
          if ( !targetUrl || $targetElement.hasClass('disabled') ) { return; }
          $targetElement.addClass('disabled');

          $.ajax({
            type: 'GET',
            url: targetUrl,
            success: function(result) {
              $targetElement.remove();

              var filteredResult = $(result).find('.collection-card__wrapper');
              var newScrollPoint = '';
              var newScrollPoint = $(result).find('#infinite-more-link');
              $('#collectionsContent .row').append(filteredResult);
              $('#collectionsContent .row').append(newScrollPoint);

              productReview();
              initSwatch();
              quickViewInit();
              initCountDown('#collectionsContent');
              collectionPage.initInfinitScroll();
              vndHlp.wslst();
              vndHlp.cplst();
              waypoint.destroy();
              initStickySidebar();
              collectionPage.initPriceRange();
            },
            error: function(x, t, m) {
              console.log(x, t, m);
            },
            dataType: "html"
          });
        }
      });
    }

    $('.load-more').on('click', function(e) {
      e.preventDefault();
      var $targetElement = $(this);
      var targetUrl = $targetElement.data('target');
      if ( !targetUrl ) {
        return;
      }
      $.ajax({
        type: 'GET',
        url: targetUrl,
        beforeSend: function() {
           $targetElement.addClass('disabled');
        },
        success: function(result) {
          $targetElement.remove();
          var filteredResult = $(result).find('.collection-card__wrapper');
          var newScrollPoint = $(result).find('.load-more');
          $('#collectionsContent .row').append(filteredResult);
          $('#collectionsContent .row').append(newScrollPoint);

          productReview();
          initSwatch();
          quickViewInit();
          initCountDown('#collectionsContent');
          collectionPage.initInfinitScroll();
          initStickySidebar();
          collectionPage.initPriceRange();
          vndHlp.wslst();
          vndHlp.cplst();
        },
        error: function(x, t, m) {
          console.log(x, t, m);
        },
        dataType: "html"
      });
    });
  }
}

var listCollectionsPage = {
  init() {
    collectionPage.initSidebarMenu();
  }
}

var searchPage = {
  init() {
    vndHlp.getTagsFromUrl();
    if ( Shopify.queryParams.constraint ) {
      $('.template-search .collection-card__wrapper').each(function() {
        var element = $(this);
        var tags = $(this).data('tags');
        var bExists = false;
        $.each(tags.split(",").slice(0,-1), function(index, item) {
          var tag = item.replace(/\s+/g, '-');

          if ( tag ) {
            var tagIndex = vndTheme.currentTags.indexOf(tag);
            if ( tagIndex >= 0 ) {
              bExists = true;
            }
          }
        });

        if ( !bExists ) {
          $(element).addClass('invisible').hide();
        }
      });

      var hidden_items = $('.template-search .invisible').length;
      var total = parseInt($('.page-title span').text());
      $('.page-title span').text(total - hidden_items);
    }

    collectionPage.initSidebarMenu();
  }
}

var cartPage = {
  initAjaxAddCart() {
    $(document).on('click', 'form .btn-add-cart', function(e) {
      const $addCartBtn = $(e.currentTarget);
      if ( vndTpl == 'cart' || $addCartBtn.hasClass('disabled') ) return;
      e.preventDefault();
      const $cartForm = $(this).closest('form'),
            $option = $cartForm.children('#product-actual-select')[0],
            actual_count = parseInt($cartForm.find('.quantity').val());
      let max = 0,
          policy = 'deny',
          inv_mngmt = '';

      if ( $option ) {
        max = parseInt($option.selectedOptions[0].dataset.quantity)
        policy = $option.selectedOptions[0].dataset.policy;
        inv_mngmt = $option.selectedOptions[0].dataset.inventoryManagement;

        if (inv_mngmt != '' && policy != 'continue' && actual_count > max) {
          $cartForm.find('.quantity').val(max);
        }
      }

      $.ajax({
        url: '/cart/add.js',
        dataType: 'json',
        cache: false,
        type: 'post',
        data: $cartForm.serialize(),
        beforeSend: function() {
          $addCartBtn.addClass('disabled vnd-btn-busy');
        },
        success: function(itemData) {
          window.setTimeout(function(){
            $addCartBtn.removeClass('disabled vnd-btn-busy');
          }, 1000);

          $.ajax({
            url: '/cart.js',
            dataType: "json",
            cache: false,
            success: function(cart) {
              vndHlp.refreshCart(cart);
              if (inv_mngmt != '' && policy != 'continue' && actual_count > max) {
                const desc = vndTheme.lang.cart.set_max_available_html.replace(/<span class=\'max-count\'><\/span>/g, "<span class='max-count'>" + max +" </span>");
                const request = {
                  responseJSON: {
                    message: vndTheme.lang.cart.title,
                    description: desc
                  }
                }
                cartPage.handleError(request);
              }
            }
          });
        },
        error: function(request) {
          $addCartBtn.removeClass('disabled vnd-btn-busy');
          cartPage.handleError(request);
        }
      });

      return false;
    });
  },

  initAjaxRemove() {
    $(document).on("click", ".btn-remove-cart", function(e) {
      e.preventDefault();
      var id = $(this).data('id');
      var $targetItem = $('.btn-remove-cart[data-id="'+ id + '"]').closest('.cart-item');

      $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: 'quantity=0&id='+id,
        dataType: 'json',
        beforeSend: function() {
          vndHlp.showLoading();
        },
        success: function(t) {
          vndHlp.hideLoading();
          $targetItem.slideUp(350);
          if ( vndTpl == 'cart' && t.item_count == 0 ) {
            location.reload();
          }

          $.ajax({
            url: '/cart.js',
            dataType: "json",
            cache: false,
            success: function(cart) {
              vndHlp.refreshCart(cart);
            }
          });
        },
        error: function(request, textStatus ) {
          vndHlp.showLoading();
          cartPage.handleError(request);
        }
      });
    });
  },

  handleError(request) {
    var box = $('#user-notice'),
        i = request.responseJSON;

    box.find(".heading").html(i.message);
    box.find(".message").html(i.description);

    var mpInstance = $.magnificPopup.instance;
    if ( mpInstance.isOpen ) {
      mpInstance.close();
    }

    setTimeout(function() {
      box.addClass('loaded');
    }, 300);
  }
}

var blogPage = {
  init() {
    collectionPage.initSidebarMenu();
    initSlider('.blog-section');
  }
}

var customersPage = {
  customerAddressForm() {
    // Initialize observers on address selectors, defined in shopify_common.js
    if ( Shopify ) {
      new Shopify.CountryProvinceSelector(
        'AddressCountryNew',
        'AddressProvinceNew',
        {
          hideElement: 'AddressProvinceContainerNew'
        }
      );
    }

    // Initialize each edit form's country/province selector
    $('.address-country-option').each(function() {
      var formId = $(this).data('form-id');
      var countrySelector = 'AddressCountry_' + formId;
      var provinceSelector = 'AddressProvince_' + formId;
      var containerSelector = 'AddressProvinceContainer_' + formId;

      new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
        hideElement: containerSelector
      });
    });

    $('.address-edit-toggle').on('click', function() {
      var formId = $(this).data('form-id');
      var $editButton = $('#EditFormButton_' + formId);
      var $editAddress = $('#EditAddress_' + formId);
      var isExpanded = $editButton.attr('aria-expanded') === 'true';

      $editAddress.toggleClass('ds-none');
      $editButton.attr('aria-expanded', !isExpanded).focus();
    });

    $('.address-delete').on('click', function() {
      var $el = $(this);
      var target = $el.data('target');
      var confirmMessage = $el.data('confirm-message');

      if ( confirm(confirmMessage || 'Are you sure you wish to delete this address?') ) {
        Shopify.postLink(target, {
          parameters: { _method: 'delete' }
        });
      }
    });
  }
}

var PageRender = {
  init() {
    initMobileMenu();
    initSwatch();
    quickViewInit();
    initPopups();
    rszRender();
    vndHlp.ctrVideo();
    vndSch.init();

    if ( vndHlp.isTchDvc() ) {
      $('body').addClass('vnd-device-touch');
    }

    // Save current url for customers to be redirected after login
    var url = window.top.location.href;
    $("#login_redirect").val(url);

    if ( vndTpl ) {
      if ( vndTpl == 'index' ) {
        initNewsletter();
      }

      if ( vndTpl == 'product' ) {
        vndPageProduct.init();
      }

      if ( vndTpl == 'collection' ) {
        collectionPage.init();
      }

      if ( vndTpl == 'list-collections' || vndTpl == 'collection.sub-collection' ) {
        listCollectionsPage.init();
      }

      if ( vndTpl == 'search' ) {
        searchPage.init();
      }

      if ( vndTpl == 'customers/addresses' ) {
        customersPage.customerAddressForm();
      }

      if ( vndTpl == 'article' || vndTpl == 'blog' ) {
        blogPage.init();
      }
    }

    if ( vndTheme.ebl_ajx_crt ) {
      cartPage.initAjaxAddCart();
      cartPage.initAjaxRemove();
    }

    if ( vndTheme.ebl_scr_t ) {
      initScrollTop();
    }

    if ( vndTheme.sch_pdtv ) {
      vndSch.initPredictive('#shopify-section-header');
      vndSch.initPredictive('#shopify-section-top-bar');
    }

    vndHlp.formatCurrency();
    vndHlp.initCookieNotify();

    // Enable wishlist
    vndHlp.wslst();

    // Enable compare list
    vndHlp.cplst();
  }
}

$(document).ready(() => {
  var vndSts = new vndTheme.vndSts();
  PageRender.init();
  vndSts.init('#shopify-section-top-bar', vndTopbar.onLoad);
  vndSts.init('#shopify-section-header', vndHeader.onLoad);
  vndSts.init('section.vs-homepage-slideshow', slideShow.onLoad);
  vndSts.init('section.vs-parallax-lookbook', parallaxLookbook.onLoad);
  vndSts.init('section.vs-product-showcase', productShowCase.onLoad);
  vndSts.init('section.vs-group-content', groupContent.onLoad);
  vndSts.init('section.vs-initialize-slider', vndSectionSlider.onLoad);
  vndSts.init('.vs-instagram', vndInstaSt.onLoad);
  vndSts.init('section.vs-collections-tab', vndIstSection.onLoad);
  vndSts.init('section.vs-google-map', mapSection.onLoad);
  vndSts.init('section.vs-lookbook', lookbookSection.onLoad);
  vndSts.init('section.vs-lookbook-2', lookbookSection2.onLoad);
  vndSts.init('section.vs-products-masonry', productsMasonry.onLoad);
  vndSts.init('section.vs-packery', vndPkrSt.onLoad);
  vndSts.init('section.vs-product-recommendations', vndPrdRecmd.onLoad);
  vndSts.init('section.vs-product-recent', vndPrdRcnt.onLoad);
});
