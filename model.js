// Firebase 初始化
var config = {
    apiKey: "AIzaSyBdydZ_9C9gKI4aRX7YSXYQKL4Nvk54dok",
    authDomain: "cloudtalk-e3181.firebaseapp.com",
    databaseURL: "https://cloudtalk-e3181.firebaseio.com",
    storageBucket: "cloudtalk-e3181.appspot.com",
    messagingSenderId: "53484565436"
};
firebase.initializeApp(config);

// 將聊天資料上傳至 Firebase 當中
function sendMessage(username, message, date) {
    var postData = {
        sender: username,
        message: message,
        time: date
    };

    // 取得亂數 key
    var newPostKey = firebase.database().ref().child('posts').push().key;

    var updates = {};
    updates['/chats/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}
