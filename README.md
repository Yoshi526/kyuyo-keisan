index.html

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>給与計算</title>
<style>
body{
font-family:-apple-system,BlinkMacSystemFont,sans-serif;
background:#f5f5f7;
margin:0;
padding:20px;
}
.card{
background:white;
border-radius:16px;
padding:20px;
margin-bottom:15px;
box-shadow:0 2px 8px rgba(0,0,0,.08);
}
h1{
margin-top:0;
}
input{
width:100%;
padding:10px;
margin-top:5px;
margin-bottom:10px;
border:1px solid #ddd;
border-radius:10px;
}
button{
width:100%;
padding:12px;
border:none;
border-radius:12px;
font-size:16px;
}
.total{
font-size:32px;
font-weight:bold;
}
</style>
</head>
<body>
<div class="card">
<h1>💰給与計算</h1>
<div class="total" id="total">¥0</div>
</div>
<div class="card">
<h3>設定</h3>

月給
所定労働時間
</div>
<div class="card">
<h3>入力</h3>

残業時間
休日出勤時間
計算

</div>
<script>
function calc(){
const salary=
Number(document.getElementById('salary').value);
const hours=
Number(document.getElementById('hours').value);
const ot=
Number(document.getElementById('ot').value);
const holiday=
Number(document.getElementById('holiday').value);
const base = salary / hours;
const otPay =
base * 1.3 * ot;
const holidayPay =
base * 1.4 * holiday;
const total =
otPay + holidayPay;
document.getElementById("total").innerHTML =
"¥" + Math.round(total).toLocaleString();
}
calc();
</script>
</body>
</html>