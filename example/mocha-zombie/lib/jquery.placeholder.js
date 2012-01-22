(function() {
  var $;
  $ = jQuery;
  $.fn.placeholder = function(description) {
    return this.each(function() {
      var input;
      input = $(this);
      return input.on("blur.placeholder", function() {
        return input.val(input.val() || description);
      }).on("focus.placeholder", function() {
        if (input.val() === description) {
          return input.val('');
        }
      }).trigger("blur.placeholder");
    });
  };
}).call(this);
