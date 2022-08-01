function info(cid,cmd){
  var txt = '📙Bot demo TECH kamus📙'
  +'%0ABot ini untuk demo Tambah, Edit, Cari, Hapus (TECH)'
  +'%0AKamus sederhana (kata_kunci dan keterangan).'
  +'%0A%0AAdapun perintahnya adalah'
  +'%0A☸tambah\u{FF03}kata_kunci\u{FF03}keterangan%0A\u{0020}\u{0020}\u{0020}\u{0020}\u{0020}\u{0020}untuk tambah data,'
  +'%0A☸edit\u{FF03}kata_kunci\u{FF03}keterangan%0A\u{0020}\u{0020}\u{0020}\u{0020}\u{0020}\u{0020}untuk edit data,'
  +'%0A☸cari\u{FF03}kata_kunci%0A\u{0020}\u{0020}\u{0020}\u{0020}\u{0020}\u{0020}untuk cari data,'
  +'%0A☸hapus\u{FF03}kata_kunci%0A\u{0020}\u{0020}\u{0020}\u{0020}\u{0020}\u{0020}untuk hapus data,'
  +'%0A%0AWA admin : 0822.1438.1966';
  sendMessage(cid,txt);
}

function tambah(cid,cmd){
  var txt = '';
  var pola = cmd.match(/tambah#(.+)#(.+)/);
  Logger.log(pola);
  if (pola[1]!='' && pola[2]!='') {
    var uji = cek(pola[1]);
    if (uji == '') {
      var ws = SpreadsheetApp.openById(ssID);
      var ss = ws.getSheetByName('telbot');
      ss.appendRow([pola[1],pola[2]]);
      txt = 'Kunci '+pola[1]+' dan '+pola[2]+' berhasil ditambahkan...';
      sendMessage(cid,txt);
    } else {
      txt = 'Sudah ditemukan '+uji;
      sendMessage(cid,txt);
    }
  } else {
    txt = 'Pola salah';
    Logger.log(txt);
  }
}

function edit(cid,cmd){
  var ws = SpreadsheetApp.openById(ssID);
  var ss = ws.getSheetByName('telbot');
  var txt = '';
  var pola = cmd.match(/edit#(.+)#(.+)/);
  if (pola[1]!='' && pola[2]!=''){
    var uji = cek(pola[1]);
    if (uji!=''){
      var rs = bacadata();
      for (var i=0;i<rs.length;i++) {
        if (rs[i][0] == pola[1]){
          var j = i + 2;
          ss.deleteRow(j);
        }
      }
      ss.appendRow([pola[1],pola[2]]);
      txt = 'Kunci '+pola[1]+' dan '+pola[2]+' berhasil diubah...';
      sendMessage(cid,txt);
    } else {
      txt = 'Data gagal diubah';
      sendMessage(cid,txt);
    }
  }
}

function cari(cid,cmd){
  var txt = '';
  var pola = cmd.match(/cari#(.+)/);
  if (pola[1]!=''){
    var rs = bacadata();
    for (var i=0;i<rs.length;i++) {
      if (rs[i][0] == pola[1]){
        txt = pola[1]+' adalah '+rs[i][1];
        sendMessage(cid,txt);
      }
    }
  }
}

function hapus(cid,cmd){
  var ws = SpreadsheetApp.openById(ssID);
  var ss = ws.getSheetByName('telbot');
  var txt = '';
  var pola = cmd.match(/hapus#(.+)/);
  var uji = cek(pola[1]);
  if (uji!=''){
    var rs = bacadata();
    for (var i=0;i<rs.length;i++) {
      if (rs[i][0] == pola[1]){
        var j = i + 2;
        ss.deleteRow(j);
        txt = pola[1]+' telah dihapus';
        sendMessage(cid,txt);
      }
    }
  } else {
    txt = 'Data '+pola[1]+' tidak ditemukan...';
    sendMessage(cid,txt);
  }
}

function daftar(cid,cmd){
  var txt = 'Daftar kata kunci:';
  var kt = [];
  var rs = bacadata();
  for (var i=0;i<rs.length;i++) {
    kt.push([rs[i][0]]);
  }
  txt=txt+kt.join(',');
  sendMessage(cid,txt);
}

function cek(kunci){
  var txt = '';
  if (kunci!=''){
    var rs = bacadata();
    for (var i=0;i<rs.length;i++) {
      if (rs[i][0] == kunci){
        txt = rs[i][0]+' adalah '+rs[i][1];
      }
    }
  }
  return txt;
}

function bacadata(){
  var ws = SpreadsheetApp.openById(ssID);
  var ss = ws.getSheetByName('telbot');
  var lr = SpreadsheetApp.openById(ssID).getActiveSheet().getLastRow()
  var lc = SpreadsheetApp.openById(ssID).getActiveSheet().getLastColumn()
  var rg = 'telbot!A2:B'+lr;
  var rs = SpreadsheetApp.openById(ssID).getActiveSheet().getRange(rg).getValues();
  return rs;
}
