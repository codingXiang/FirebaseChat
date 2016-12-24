/*
  AngularJS 部分
*/
// 設定 ng-app 名稱為 FirebaseChat
var app = angular.module("FirebaseChat", []);
// 設定 FirebaeChat 的 Controller 名為 ChatController
app.controller("ChatController", function($scope) {
    // chatMessages 為訊息陣列
    $scope.chatMessages = [];
    /*  這裡用來讀取 Firebase 中的聊天訊息 */
    var chatData = firebase.database().ref('chats');
    chatData.on('value', function(snapshot) {
        angular.element(document.getElementById('test')).scope().chatMessages = []
        for (i in snapshot.val()) {
            firebase.database().ref('chats/' + i).once('value', function(result) {
                var data = result.val()
                $scope.addMessage(data["sender"], data["message"], data["time"]);
                $scope.$apply();
                var elem = document.getElementById('scrollPanel');
                elem.scrollTop = elem.scrollHeight;
            });
        }
    });

    // 聊天訊息的格式
    $scope.formatChat = function(username, text, origDt) {
            console.log(origDt)
            var chat = {};
            chat.username = username;
            chat.text = text;
            chat.time = origDt;
            return chat;
        }
        // 新增聊天訊息到 html 當中
    $scope.addMessage = function(username, text, date) {
            var chat = $scope.formatChat(username, text, new Date(date));
            $scope.chatMessages.push(chat)
        }
        // 新增訊息到 Firebase 當中
    $scope.addChat = function() {
        if ($scope.newChatMsg != "" && $scope.username != "") {
            sendMessage($scope.username, $scope.newChatMsg, new Date().toString())
            $scope.newChatMsg = "";
        } else {
            alert("請輸入完整訊息！")
        }
    }

});

app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});
