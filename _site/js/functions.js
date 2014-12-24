$('#cd').countdown('2015/01/01', function(event) {
  $(this).html(event.strftime(''
    + '<span>%H</span><span class="sep"> : </span>'
    + '<span>%M</span><span class="sep"> : </span>'
    + '<span>%S</span>'));
});



modal()

function modal(){

  $('.js-closeModal').click(function(event) {

  event.preventDefault();
  $('.modal').fadeOut();
  $('body').removeClass('modal-active')
});


$('.js-openModal').click(function(event) {
  event.preventDefault();

  var content  = $(this).attr('href');
  if ($(this).hasClass('js-openModal')) { 

  $.get(content , function() {
  $('.modal-content').addClass('loading')
  })
   .always(function(data) {
    $( ".modal-content" ).html(data);
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

