# Ported from Josh Bush's example at http://digitalbush.com/2011/03/29/testing-jquery-plugins-with-node-js-and-jasmine/
$ = jQuery
$.fn.placeholder = (description) ->
  @.each ->
    input = $(@)
    input.on("blur.placeholder", -> input.val(input.val() or description))
      .on("focus.placeholder", -> if input.val() is description then input.val(''))
      .trigger "blur.placeholder"