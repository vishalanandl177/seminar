var ref = new Firebase("https://saseminar.firebaseio.com/");
var db = "SaSeminarChat/message";
var _sessionKey = 'firebase:session::saseminar'
var chat = ref.child(db);

$(document).ready(function(){
  var session = localStorage.getItem(_sessionKey);
  if(session){
    _session = JSON.parse(session);
    $('#oauth').css({"background-image":'url('+ _session.github.profileImageURL +')'});
    $('#oauth-tooltip').text('bye bye~~');
    $('#oauth').click(function(){
      localStorage.clear();
      location.reload();
    });
  }
  else {
    $('#oauth-tooltip').text('login plz~~');
    $('#oauth').click(function(){
      ref.authWithOAuthPopup("github", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          $('#oauth').css({"background-image":'url('+authData.github.profileImageURL+')'});
        }
      });
    });
  }
  //
  // chat.once('value',function(snap){
  //   snap.forEach(function(trend){
  //     var card = $('<div>', {class:"mdl-card mdl-cell mdl-cell--4-col mdl-shadow--2dp"}).appendTo('#list');
  //     var body = $('<div>', {class:"mdl-card__supporting-text"}).appendTo(card);
  //     var title = $('<h4>').appendTo(body);
  //     var link = $('<a>', {class:"gtk-project-link", href:trend.url, target:"_blank"}).appendTo(title).text(trend.val().title);
  //     body.append(trend.val().desc);
  //     var bottom = $('<div>', {class:"mdl-card__actions gtk-card-bottom"}).appendTo(card);
  //     $('<div>',{class:"gtk-project-etc"}).appendTo(bottom).text(trend.val().etc);
  //     var button = $('<button>',{class:"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp gtk-assign-btn"}).appendTo(bottom);
  //
  //     trend.ref().on("value",function(_trend){
  //       if(_trend.val().owner){
  //         button.css({"background-image":'url('+ _trend.val().owner.profile +')', "background-size":"56px"});
  //       } else {
  //         $(button).css('background-image', 'none');
  //       }
  //       button.unbind('click');
  //       button.click(assign(_trend));
  //     });
  //   })
  // });

  $('#chat-input-btn').click(function(){
    _session = JSON.parse(localStorage.getItem(_sessionKey));
    if ($('#chat-input').val() == ''){
      return false;
    }
    chat.set({username:_session.github.username, message: $('#chat-input').val()})
    $('#chat-input').val('');
  });
  chat.on("value",function(_message){
    var div = $('<div>',{class:"sc-chat"}).appendTo('#chat-grid');
    $('<span>',{class:"sc-username"}).text(_message.val().username).appendTo(div);
    $('<span>',{class:"sc-message"}).text(_message.val().message).appendTo(div);
    $("#chat-grid").animate({ scrollTop: $(document).height() }, "slow");
  });
});
