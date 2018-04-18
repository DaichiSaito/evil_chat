// frontend/client/chat.js
import createChannel from "client/cable";

let callback; // 後で関数を保持するための変数を宣言

/*
messageオブジェクトを受信したら、何らかの関数を呼び出す必要があります。
コンポーネントのこの部分は、必要に応じてDOMを扱う方法を責務上知っていなければならないので、
この関数をここで定義したくありません。そこで、setCallbackという汎用的な関数を1つ作成します。
この関数は、正しいコンポーネントから呼び出されると、メッセージ受信後に呼び出したい
コンポーネント固有のあらゆる関数を保存するcallback変数を変更します
*/
const chat = createChannel("ChatChannel", {
  received({ message }) {
    if (callback) callback.call(null, message);
  }
});

// メッセージを1件送信する: `perform`メソッドは、対応するRubyメソッド（chat_channel.rbで定義）を呼び出す
// ここがJavaScriptとRubyをつなぐ架け橋です！
function sendMessage(message) {
  chat.perform("send_message", { message }); // ES6の{ message: message }のショートハンド
}

// メッセージを1件受け取る: ChatChannelで何かを受信すると
// このコールバックが呼び出される
// messages.jsでこれを呼び出してcallbackを設定しておく。
function setCallback(fn) {
  callback = fn;
}

export { sendMessage, setCallback };
