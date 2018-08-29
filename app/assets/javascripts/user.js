$(function(){

var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.name}">追加</a>
              </div>`
  search_list.append(html);
}

function appendNoUser(user) {
  var html = `<div class='chat-group-user clearfix'>${ user }</div>`
  search_list.append(html);
}

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    console.log(input);

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
});

$(function(){

var member_list = $(".chat-group-users")

function appendMember(member_name, member_user_id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
              <input name='group[user_ids][]' type='hidden' value='${member_user_id}'>
              <p class='chat-group-user__name'>${member_name}</p>
              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
            </div>`
member_list.append(html)
}

  $(document).on("click", ".chat-group-user__btn--add", function() {
    console.log(this);
    $(this).parent().remove();
    var member_name = $(this).attr('data-user-name')
    var member_user_id = $(this).attr('data-user-id')
    console.log(member_name, member_user_id)
    appendMember(member_name, member_user_id)
  })
})
