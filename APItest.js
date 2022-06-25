var prefecture=document.getElementById("prefecture");
var city=document.getElementById("city");
var entry_password;

$.ajax({
  url: "https://opendata.resas-portal.go.jp/api/v1/prefectures/",
  type: "GET",
  headers: {
      'X-API-KEY':"WP4ecYE1jXwTwoaSk0OnZxzXa6YzDZohjQNWNA9G"
  },
  async: "false",
  success: function(result_data) {
      /*var a=document.createElement("option");
      a.innerText="選択してください";
      prefecture.appendChild(a);*/
      for(i=0; i<result_data.result.length; i++){
        var a=document.createElement("option");
        a.innerText=result_data.result[i].prefName;
        a.value=i+1;
        prefecture.appendChild(a);
      }
  }
});

function update(){
  $.ajax({
    url: "https://opendata.resas-portal.go.jp/api/v1/cities?prefCode="+prefecture.value,//prefcode追加する
    type: "GET",
    headers: {
        'X-API-KEY':"WP4ecYE1jXwTwoaSk0OnZxzXa6YzDZohjQNWNA9G"
    },
    async: "false",
    success: function(result_data) {
        while(city.firstChild){
          city.removeChild(city.firstChild);
        }
        for(i=0; i<result_data.result.length; i++){
          var a=document.createElement("option");
          a.innerText=result_data.result[i].cityName;
          city.appendChild(a);
        }
    }
  });
}

function entry(){
  entry_password=Math.random().toString(32).substring(2);
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "takino0309@gmail.com",
      Password : "611F43F65CCD81DAD28D4F2AC75BBD936CA2",
      To : document.getElementById('mail-adress').value,
      From : "takino0309@gmail.com",
      Subject :"仮登録",
      Body :entry_password
    });
  var confirmation=document.getElementById("confirmation");
  var a=document.createElement("input");
  a.type="text";
  a.id="password";
  confirmation.appendChild(a);

  a=document.createElement("input");
  a.type="button";
  a.value="決定";
  a.id="entry_button";
  a.onclick=check;
  confirmation.appendChild(a);

  a=document.createElement("h3");
  a.id="result";
  a.innerText="判定中";
  confirmation.appendChild(a);
}

function check(){
  if(document.getElementById("password").value==entry_password){
    document.getElementById("result").innerText="登録完了";
  }else{
    document.getElementById("result").innerText="パスワードが間違っています";
  }
}