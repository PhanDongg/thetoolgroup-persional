/* See https://www.algolia.com/doc/integration/shopify/advanced-customization/customizing-instant-search/#hogan */

(function(algolia) {
  'use strict';
  var Hogan = algolia.externals.Hogan;


  var formatVIPPrice = function formatVIPPrice(price, vendor) {

    if (localStorage.getItem('vendorData')
            && localStorage.getItem('vendorDataCSV') == window.pricing.csv) {

      let percentValue;

      const vendorData = JSON.parse(localStorage.getItem('vendorData'));
      const vendorItem = vendorData.find(pricing => pricing.vendor === vendor);

      if (vendorItem) {
        percentValue = vendorItem.percent / 100;
      }
      if (percentValue){
        return parseInt(price,10) - (parseInt(price,10) * percentValue);
      }
    }

    return price;

  }

  var formatPrice = function formatPrice(value) {
    return algolia.formatMoney(Number(value) * 100);
  };

  var formatIncPrice = function formatIncPrice(value) {
    return algolia.formatMoney(Number(value) * 110);
  };
  
  var formatIncPriceExlTas = function formatIncPrice(value) {
    return algolia.formatMoney(Number(value) * 100);
  };
  
  

  function formattedPriceWithComparison(price, compare_at_price, price_ratio, vendor) {
    var comparing =
            Number(compare_at_price) && Number(compare_at_price) > Number(price);
    var discount_ratio = 1.0 - price_ratio;

    //var res = '<b>' + formatPrice(price) + '</b>';
    var res = '<b><span class="vendor-money" data-vendor="'+ vendor +'" data-price="' + Number(price) * 100 +'"> ' + formatPrice(price) + '</span></b>';
    if (comparing) {
      res +=
              ' <span class="ais-hit--price-striked"><span>' +
              formatPrice(compare_at_price) +
              '</span></span> ';
      res +=
              ' <span class="ais-hit--price-discount" style="font-weight: ' +
              Math.floor(discount_ratio * 10) * 100 +
              ';">-' +
              Math.floor(discount_ratio * 100) +
              '%</span>';
    }

    return res;
  }


  var formatPriceProductTile = function formatPriceProductTile(value, vendor) {

    if (window.vip == true) {
      value = formatVIPPrice(value, vendor);
    }

//         var formattedPrice = formatPrice(value);
    var  formattedPrice = formatIncPrice(value);
    //var split = formattedPrice.toString().split(".");

    var res = '';
    res +=
            '<div class="ais-hit--price-container">' +
            '<span class="ais-hit--price">' +
            '<div class="label-small" style="font-size: 12px">From</div>' +
            '<div class="flex-container">' +
            '<span class="h2 m-0 ais-hit--price-main"><span class="vendor-money" data-price="' + Number(value) * 100 + '" data-vendor="'+ vendor +'">' + formattedPrice + '</span></span>' +
            '<div class="flex-container flex-dir-column">';
    res +=
            '<span class="text-smaller semibold">INC GST</span>' +
            '</div>' +
            '</div>' +
            '<div class="overline-uppercase"> Suggested RRP </div>' +
            '</span>' +
            '</div>';

    return res;
  };


  function formattedPriceWithComparisonProductTile(price, compare_at_price, price_ratio, vendor, origin_price) {
    var comparing =
            Number(price) && Number(price) != Number(origin_price);
    var discount_ratio = 1.0 - price_ratio;

    if (window.vip == true) {
      price = formatVIPPrice(price, vendor);
    }

    var formattedPrice = formatIncPrice(price);
    var tax_text = 'INC GST';
    
    if (comparing) {
      
    	formattedPrice = formatIncPriceExlTas(price);
      	tax_text = 'Exc GST';
    }
    


    var res = '';
    res +=
            '<div class="ais-hit--price-container">' +
            '<span class="ais-hit--price">' +
            '<div class="flex-container">' +
            '<span class="h2 m-0 ais-hit--price-main"><span class="vendor-money" data-price="'+Number(price) * 100 +'" data-vendor="'+ vendor +'">' + formattedPrice + '</span></span>' +
            '<div class="flex-container flex-dir-column">';
    res +=
            '<span class="text-smaller semibold">'+tax_text+'</span>' +
            '</div>' +
            '</div>'+
            '<span class="overline-uppercase">Suggested RRP ';
    if (comparing) {
        res +=
               formatIncPrice(origin_price);
      	res += ' INC GST';
      }
    +'</span>';


    res +=
            '</span>' +
            '</div>';

    return res;
  }

  var escapeHtml = function escapeHtml(unsafe) {
    return (unsafe || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
  };

  algolia.helpers = {
    formatNumber: function formatNumber(text, render) {
      return Number(render(text)).toLocaleString();
    },
    wishlist: function wishlist(){
      //if (this.meta.my_fields.display_pricing == true || this.meta.my_fields.display_pricing == "true") {
      if(false){
      } else {
        var base_url = window.location.origin;
        var addVariantId = !this._distinct && this.objectID !== this.id;
        var url =
                base_url  +
                '/products/' +
                this.handle +
                (addVariantId ? '?variant=' + this.objectID : '');

        var html =
                '<div class="ais-hit--wishlist color-secondary-text">' +
                '<button data-with-epi="true" class="swym-button swym-add-to-wishlist-view-product product_' + this.id + '" data-swaction="addToWishlist" data-product-id="' + this.id + '" data-variant-id="' + this.objectID + '" data-product-url="' + url + '"></button>' +
                '</div>';

        return html;
      };
    },
    displayPricingClass: function displayPricingClass() {
//         if (this.meta.my_fields.display_pricing == true || this.meta.my_fields.display_pricing == "true") {
//             return 'call-for-pricing';
//         }
    },
    formattedPrice: function formattedPrice(text, render) {
      return formatPrice(render(text));
    },
    formattedPriceWithoutDecimals: function formattedPriceWithoutDecimals(
            text,
            render
    ) {
      return formatPrice(render(text)).replace(/\.\d+$/, '');
    },
    autocompletePrice: function autocompletePrice() {
//       if (this.meta.my_fields.display_pricing == true || this.meta.my_fields.display_pricing == "true") {
//           return '<span><b>Call for Pricing</b></span>';
//       }

      if (this._distinct) {
        var min = this.variants_min_price;
        var max = this.variants_max_price;
        if (min !== max) {
          //return '<b>' + formatPrice(min) + ' - ' + formatPrice(max) + '</b>';
          return '<span>From </span><b><span class="vendor-money" data-price="' + Number(min) * 100 + '" data-vendor="'+ this.vendor +'">' + formatPrice(min) + '</span></b>';
        }
      }

      //return formattedPriceWithComparison(this.price, null);
      return formattedPriceWithComparison(this.price, null, null, this.vendor);
    },
    instantsearchPrice: function instantsearchPrice() {
      console.log(this.meta.my_fields);
      if(this.meta.my_fields){ // add by TN
      //  console.log("in");
     if (this.meta.my_fields.display_pricing == true || this.meta.my_fields.display_pricing == "true") {
          return '<div class="h3 m-0">Call for Pricing</div>';
     }    
      }else{
      //  console.log("out");
      }
      if (this._distinct) {
        var min = this.variants_min_price;
        var max = this.variants_max_price;
        if (min !== max) {
          return formatPriceProductTile(min, this.vendor);
        }
      }

      return formattedPriceWithComparisonProductTile(
              this.price,
              this.compare_at_price,
              this.price_ratio,
              this.vendor,
              this.price
      );
    },

    instantsearchWholesalePrice: function instantsearchWholesalePrice() {
      var wholesale_price = this.price;
      if(this.meta.product){
        if(this.meta.product.wholesale_price){
          var wholesale_price = this.meta.product.wholesale_price;
        }

      }
      return formattedPriceWithComparisonProductTile(
              wholesale_price,
              this.compare_at_price,
              this.price_ratio,
              this.vendor,
              this.price,
      );
    },

    instantsearchWholesaletkPrice: function instantsearchWholesaletkPrice() {
      if(this.meta.product){
        if(this.meta.product.wholesaletk_price){
          var wholesale_price = this.meta.product.wholesaletk_price;
        }

      }
      return formattedPriceWithComparisonProductTile(
              wholesale_price,
              this.compare_at_price,
              this.price_ratio,
              this.vendor,
              this.price,
      );
    },

    instantsearchWholesalenoPrice: function instantsearchWholesalenoPrice() {
      var wholesale_price = this.price;
      if(this.meta.product){
        if(this.meta.product.wholesaleno_price){
          var wholesale_price = this.meta.product.wholesaleno_price;
        }

      }

      return formattedPriceWithComparisonProductTile(
              wholesale_price,
              this.compare_at_price,
              this.price_ratio,
              this.vendor,
              this.price,
      );
    },

    instantsearchWholesaleprPrice: function instantsearchWholesaleprPrice() {

      var wholesale_price = this.price;
      if(this.meta.product){
        if(this.meta.product.wholesalepr_price){
          var wholesale_price = this.meta.product.wholesalepr_price;
        }

      }


      return formattedPriceWithComparisonProductTile(
              wholesale_price,
              this.compare_at_price,
              this.price_ratio,
              this.vendor,
              this.price,
      );
    },

    instantsearchWholesalettPrice: function instantsearchWholesalettPrice() {
      var wholesale_price = this.price;
      if(this.meta.product){
        if(this.meta.product.wholesalett_price){
          var wholesale_price = this.meta.product.wholesalett_price;
        }

      }


      return formattedPriceWithComparisonProductTile(
              wholesale_price,
              this.compare_at_price,
              this.price_ratio,
              this.vendor,
              this.price,
      );
    },
    getDiscountPrice: function getDiscountPrice(){
      wholesale_price = this.price;
      if(window.wholesaletk && this.meta.product.wholesaletk_price){
        var wholesale_price = this.meta.product.wholesaletk_price;
      }
      if(window.wholesalepr && this.meta.product.wholesalepr_price){
        var wholesale_price = this.meta.product.wholesalepr_price;
      }
      if(window.wholesaleno && this.meta.product.wholesaleno_price){
        var wholesale_price = this.meta.product.wholesaleno_price;
      }
      if(window.wholesalett && this.meta.product.wholesalett_price){
        var wholesale_price = this.meta.product.wholesalett_price;
      }
      if(window.wholesale && this.meta.product.wholesale_price){
        var wholesale_price = this.meta.product.wholesale_price;
      }
      var discount_price = this.price - wholesale_price;
      return discount_price;
    },

    instantsearchLink: function instantsearchLink() {
      var base_url = window.location.origin;
      var addVariantId = !this._distinct && this.objectID !== this.id;
      return (
              base_url  +
              '/products/' +
              this.handle +
              (addVariantId ? '?variant=' + this.objectID : '')
      );
    },
    fullTitle: function fullTitle() {
      var res = this.title;
      if (
              !this._distinct &&
              this.variant_title &&
              this.variant_title !== 'Default Title' &&
              this.variant_title !== 'Default'
      ) {
        res += ' (' + this.variant_title + ')';
      }

      return escapeHtml(res);
    },
    fullHTMLTitle: function fullHTMLTitle() {
      var res = '';

      if (this._highlightResult.title && this._highlightResult.title.value) {
        res = algolia.helpers.fullEscapedAttribute(
                this._highlightResult.title.value
        );
      }

      if (
              !this._distinct &&
              this.variant_title &&
              this.variant_title !== 'Default Title' &&
              this.variant_title !== 'Default'
      ) {
        res += ' <span class="algolia-variant">(' + res + ')</span>';
      }
      return res;
    },
    fullEscapedAttribute(attribute) {
      return new DOMParser().parseFromString(attribute, 'text/html')
              .documentElement.textContent;
    },
    fullEscapedHTMLTitle: function fullEscapedHTMLTitle() {
      var res = '';

      if (this._highlightResult.title && this._highlightResult.title.value) {
        res = algolia.helpers.fullEscapedAttribute(
                this._highlightResult.title.value
        );
      }

      if (
              !this._distinct &&
              this.variant_title &&
              this.variant_title !== 'Default Title' &&
              this.variant_title !== 'Default'
      ) {
        res += ' <span class="algolia-variant">(' + res + ')</span>';
      }
      return res;
    },
    fullEscapedHTMLProductType: function fullEscapedHTMLProductType() {
      if (
              this._highlightResult.product_type &&
              this._highlightResult.product_type.value
      ) {
        return algolia.helpers.fullEscapedAttribute(
                this._highlightResult.product_type.value
        );
      } else {
        return '';
      }
    },
    fullEscapedHTMLVendor: function fullEscapedHTMLVendor() {
      if (this._highlightResult.vendor && this._highlightResult.vendor.value) {
        return algolia.helpers.fullEscapedAttribute(
                this._highlightResult.vendor.value
        );
      } else {
        return '';
      }
    },
    handle: function handle(text, render) {
      return render(text).toLowerCase().split(' ').join('-');
    },
    tooltipImage: function tooltipImage(text, render) {
      return '<img src="' + window.theme.assetUrl + 'tooltip-' + render(text).toLowerCase().split(' ').join('-') + '.svg" alt="Icon for ' + render(text) + '" title="' + render(text) + ' Tooltip"/>';
    },
    inventoryQuantity: function inventoryQuantity (){
      if(this.variants_inventory_count  > 0){
        return this.variants_inventory_count +' In Stock';
      }else{
        return 'Out of stock';

      }
    },
    floor: function floor(text, render) {
      return '' + Math.floor(Number(render(text)));
    },
    ceil: function ceil(text, render) {
      return '' + Math.ceil(Number(render(text)));
    },
    sizedImage: function sizedImage(text, render) {
      var image = this._distinct ? this.product_image : this.image;
      if (!image) {
        return 'http://cdn.shopify.com/s/images/admin/no-image-compact.gif';
      }
      var size = render(text).replace(/^\s+|\s+$/g, ''); // Render and trim
      if (size === 'original') {
        return image;
      }
      return image.replace(/\/(.*)\.(\w{2,4})/g, '/$1_' + size + '.$2');
    },
  };

  [
    'pico',
    'icon',
    'thumb',
    'small',
    'compact',
    'medium',
    'large',
    'grande',
    'original',
  ].forEach(function(size) {
    algolia.helpers[size + 'Image'] = (function(_size) {
      return function() {
        var image = this._distinct ? this.product_image : this.image;

        if (!image) {
          return 'http://cdn.shopify.com/s/images/admin/no-image-compact.gif';
        }

        if (_size === 'original') {
          return image;
        }

        return image.replace(/\/(.*)\.(\w{2,4})/g, '/$1_' + _size + '.$2');
      };
    })(size); // We need to create a new scope so that the internal size has the good value.
  });

  /* Create an Hogan lambda, which doesn't respect the mustache doc */
  var helpers = algolia.assign(
          {},
          algolia.helpers,
          algolia.translation_helpers
  );
  var helpersNames = Object.keys(helpers);
  var i = helpersNames.length;
  var helpersArray = new Array(i);
  while (i--) helpersArray[i] = [helpersNames[i], helpers[helpersNames[i]]];

  algolia.hoganHelpers = helpersArray.reduce(function(res, options) {
    var name = options[0];
    var helper = options[1];

    var newRes = algolia.assign({}, res);

    newRes[name] = function() {
      return function(text) {
        var render = function(value) {
          return Hogan.compile(value, algolia.hoganOptions).render(this);
        }.bind(this);

        return helper.call(this, text, render);
      }.bind(this);
    };

    return newRes;
  }, {});
})(window.algoliaShopify);
