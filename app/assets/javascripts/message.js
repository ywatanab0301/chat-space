$(function(){
  function buildHTML(message){
    var image = message.image !== null ? `<img class="lower-message__image" src=${message.image}></img>`:"";
    var html = `<div class="message">
                  <div class="message__username">${message.name}</div>
                  <div class="message__time">${message.time}</div>
                  <div class="message__text">${message.body}</div>
                  <div class="lower-message__image">${image}</div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.footer__input--send-button').prop('disabled', false)
      $('.footer__input--box').val('');
      $('.hidden').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  })
})
