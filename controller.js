// firebase
var config = {
  apiKey: "AIzaSyBdydZ_9C9gKI4aRX7YSXYQKL4Nvk54dok",
  authDomain: "cloudtalk-e3181.firebaseapp.com",
  databaseURL: "https://cloudtalk-e3181.firebaseio.com",
  storageBucket: "cloudtalk-e3181.appspot.com",
  messagingSenderId: "53484565436"
};
firebase.initializeApp(config);
function sendMessage(username, message, date) {
  var postData = {
    sender: username,
    message : message,
    time : date
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/chats/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}



// angularjs
var app = angular.module("testapp",[]);

app.factory("DataModel", function() {
  var Service = {};
  return Service;
});

app.controller("ChatController", function($scope) {
  $scope.chatMessages = [];
  var chatData = firebase.database().ref('chats');
  chatData.on('value', function(snapshot) {
    angular.element(document.getElementById('test')).scope().chatMessages = []
    for (i in snapshot.val()){
      firebase.database().ref('chats/' + i).once('value',function(result){
          var data = result.val()
          $scope.addMessage(data["sender"],data["message"],data["time"]);
          $scope.$apply();
          var elem = document.getElementById('scrollPanel');
          elem.scrollTop = elem.scrollHeight;
        });
    }
  });


  $scope.formatChat = function(username,text,origDt) {
    console.log(origDt)
    var chat = {};
    chat.username = username;
    chat.text = text;
    chat.time = origDt;
    return chat;
  }

  $scope.addMessage = function(username,text,date){
    var chat = $scope.formatChat(username,text,new Date(date));
    $scope.chatMessages.push(chat)
  }
  $scope.addChat = function() {
    if ($scope.newChatMsg != "" && $scope.username != "") {
      sendMessage($scope.username , $scope.newChatMsg , new Date().toString())
      $scope.newChatMsg = "";
    }
    else {

    }
  }

});

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
