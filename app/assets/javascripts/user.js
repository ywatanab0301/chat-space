$(function(){

var searchList = $("#user-search-result");
var memberList = $(".chat-group-users")

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  searchList.append(html);
}

function appendNoUser(user) {
  var html = `<div class='chat-group-user clearfix'>${ user }</div>`
  searchList.append(html);
}

function appendMember(memberName, memberUser) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${memberUser}'>
                <p class='chat-group-user__name'>${memberName}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
memberList.append(html)
}

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    var inputs = input.split(" ").filter(function(e) { return e; });

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $('#user-search-result').empty();
        if (users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });

  $(document).on("click", ".chat-group-user__btn--add", function() {
    $(this).parent().remove();
    var memberName = $(this).attr('data-user-name')
    var memberUser = $(this).attr('data-user-id')
    appendMember(memberName, memberUser)
  })

  $(document).on("click", ".chat-group-user__btn--remove.js-remove-btn", function(){
    $(this).parent().remove();
  })
});
