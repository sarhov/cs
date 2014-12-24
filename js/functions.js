$('#cd').countdown('2015/01/01', function(event) {
  $(this).html(event.strftime(''
    + '<span>%H</span><span class="sep"> : </span>'
    + '<span>%M</span><span class="sep"> : </span>'
    + '<span>%S</span>'));
});

 $('.tooltip').tooltipster({contentAsHTML: true,position:'top',positionTracker:true}); 

modal()

function modal(){

  $('.js-closeModal').click(function(event) {

  event.preventDefault();
  $('.modal').fadeOut();
  $('body').removeClass('modal-active')
});


$('.js-openModal').click(function(event) {
  event.preventDefault();
  if ($(this).attr('data-id')) {
      var productId = $(this).data('id');
      //console.log(productId);
  }


  var content  = $(this).attr('href');
  if ($(this).hasClass('js-openModal')) { 
  $.get(content , function() {
  $('.modal-content').addClass('loading')
  })
   .always(function(data) {
    $( ".modal-content" ).html(data);
    $('.modal-content').find('#productId').val(productId)
    $('.modal').fadeIn();
    $('body').addClass('modal-active');
    $('.modal-content').removeClass('loading');
    modal();  
})
  };
  //console.log(content)


  //$('body').addClass('modal-active');
  //$('.modal').fadeIn();
});

}

