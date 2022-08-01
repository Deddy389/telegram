let token='5395782060:AAGFZnFps4xsaSfGXP1JfgxrEqYsjcGVa1E';

function getMe() {
let response =  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getMe');
console.log(response.getContentText());
}

function setWebhook() {
  let webAppUrl='https://script.google.com/macros/s/AKfycbztpudfUlQ2uPOGUdGuGvVA_MMH-yIU42W84wz1LbNRvxtTaqs0i5wkajkUgBfFXerugQ/exec';
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/setWebhook?url=" + webAppUrl);
  console.log(response.getContentText());
}

function sendText(chat_id, text) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML"
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function send() {
  let chat_id = 461634512;
  let text = "Hi! How are you?";
  sendText(chat_id, text);
}

function doPost(e){
  let contents = JSON.parse(e.postData.contents);
  let chat_id = contents.message.chat.id;
  let text = contents.message.text;
  sendText(chat_id, text);
  SpreadsheetApp.getActive().getSheetByName("Messages").appendRow([chat_id, text]);
}
