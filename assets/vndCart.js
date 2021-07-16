var submitButton = 'Get A Quote';
var submitButtonDisabled = 'Calculating...';

Shopify.Cart.ShippingCalculator.show({
  submitButton: submitButton,
  submitButtonDisabled: submitButtonDisabled,
  
  moneyFormat: null
});

$('.expander').on('click', function(e) {
  e.preventDefault();
  var $parent = $(this).parent();
  $parent.toggleClass('opened');
  $parent.find('.expandable').slideToggle();
});
