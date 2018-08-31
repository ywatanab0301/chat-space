
$(function(){
  function buildHTML(message){
    var image = message.image !== null ? `<img class="lower-message__image" src=${message.image}></img>`:"";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__username">${message.name}</div>
                  <div class="message__time">${message.time}</div>
                  <div class="message__text">${message.body}</div>
                  <div class="lower-message__image">${image}</div>
                </div>`
    return html;
  }

  function scrollDown(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
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
      scrollDown();
    })
    .fail(function(){
      alert('エラー');
    })
  })

    function autoUpdate(){
      if($('.messages')[0]){
        // 現在表示されているページ中、最後のクラス名messageのmessage−idを取得しidに代入
        var message_id = $('.message:last').data('message-id');
      } else {
        var message_id = 0;
      }
      // ajaxで現在のページの情報をjson形式で送信
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { message: { id: message_id } },
        dataType: 'json'
      })
      // jbuilderで送られてきたデータを受ける
      .done(function(jason){
        var insertHTML = '';
        jason.forEach(function(message) {
          if (message.id > message_id) {
          insertHTML += buildHTML(message);
         }
        })
        $('.messages').append(insertHTML);
        scrollDown();
      })
      .fail(function(jason){
        alert('自動更新に失敗しました。')
      })
    }

  var interval = setInterval(function(){
    // urlが違っていたら自動更新は中止
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      autoUpdate();
    } else{
      clearInterval(interval)
    }
  } , 5000 )
})
