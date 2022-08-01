var ssID   = '184SaiI2vesLIRgkFtMO5wziFmG0MrjbzMeyNgUPYNrI';
var webUrl = 'https://script.google.com/macros/s/AKfycbzZgdi_QOZgc0icrQCSVFOmLJ26Nw38UoOvraSg2wx2_Om839Q/exec';
var token  = '5395782060:AAGFZnFps4xsaSfGXP1JfgxrEqYsjcGVa1E';
var webTel = 'https://api.telegram.org/bot' + token;

function setWebhook(){
  var url = webTel + '/setWebhook?url='+webUrl;
  var hsl = UrlFetchApp.fetch(url);
  Logger.log(hsl.getContentText());
}
function sendMessage(cid,txt){
  var url = webTel + '/sendMessage?chat_id='+cid+'&text='+txt+'&parse_mode=HTML';
  var hsl = UrlFetchApp.fetch(url);
}
function doPost(e){
  var inp = JSON.parse(e.postData.contents);
  var mid = inp.message.message_id;
  var cid = inp.message.chat.id;
  var fnm = inp.message.chat.first_name;
  var lnm = inp.message.chat.last_name;
  var unm = inp.message.chat.username;
  var psn = inp.message.text;
  var cmd = psn.toLowerCase();
  if (cmd.substr(0,5)=='/info'){info(cid,cmd);}
  if (cmd.substr(0,6)=='tambah'){tambah(cid,psn);}
  if (cmd.substr(0,4)=='edit'){edit(cid,psn);}
  if (cmd.substr(0,4)=='cari'){cari(cid,cmd);}
  if (cmd.substr(0,5)=='hapus'){hapus(cid,cmd);}
  if (cmd.substr(0,7)=='/daftar'){daftar(cid,cmd);}
  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'Hasil JSON', JSON.stringify(e, null, 4));
  log(cid,fnm,lnm,unm,mid,psn);
}
