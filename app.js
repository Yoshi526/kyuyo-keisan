const calendar = document.getElementById("calendar");
const salaryTotal = document.getElementById("salaryTotal");

const salaryInput =
  document.getElementById("monthlySalary");

const hoursInput =
  document.getElementById("monthlyHours");

const saveButton =
  document.getElementById("saveSettings");

const overtimeRateInput = 
  document.getElementById("overtimeRate");
const holidayRateInput = 
  document.getElementById("holidayRate");
const commuteInput = 
  document.getElementById("commuteAllowance");
const overtimeBaseInput = 
  document.getElementById("overtimeBase");
const otherInput = 
  document.getElementById("otherAllowance");

// 保存済み設定
let monthlySalary =
  Number(localStorage.getItem("monthlySalary"))
  || 300000;

let monthlyHours =
  Number(localStorage.getItem("monthlyHours"))
  || 160;

let overtimeRate =
  Number(localStorage.getItem("overtimeRate")) || 1.3;

let holidayRate =
  Number(localStorage.getItem("holidayRate")) || 1.4;

  let commuteAllowance =
  Number(localStorage.getItem("commuteAllowance")) || 0;

let overtimeBase =
  Number(localStorage.getItem("overtimeBase")) || 0;

let otherAllowance =
  Number(localStorage.getItem("otherAllowance")) || 0;

// 画面反映
salaryInput.value = monthlySalary;
hoursInput.value = monthlyHours;
overtimeRateInput.value = overtimeRate;
holidayRateInput.value = holidayRate;
commuteInput.value = commuteAllowance;
overtimeBaseInput.value = overtimeBase;
otherInput.value = otherAllowance;

// 保存
saveButton.addEventListener("click", () => {

  monthlySalary =
    Number(salaryInput.value);

  monthlyHours =
    Number(hoursInput.value);

  overtimeRate = 
    Number(overtimeRateInput.value);

  holidayRate = 
    Number(holidayRateInput.value);

  commuteAllowance = 
    Number(commuteInput.value);

  otherAllowance = 
    Number(otherInput.value);

  localStorage.setItem(
    "monthlySalary",
    monthlySalary
  );

  localStorage.setItem(
    "monthlyHours",
    monthlyHours
  );

  localStorage.setItem(
    "overtimeRate", 
    overtimeRate
  );

  localStorage.setItem(
    "holidayRate", 
    holidayRate
  );

  localStorage.setItem(
    "commuteAllowance", 
    commuteAllowance
  );

  localStorage.setItem(
    "overtimeBase",
    overtimeBase
  );

  localStorage.setItem(
    "otherAllowance", 
    otherAllowance
  );

  updateTotal();

  alert("保存しました");

});

// 保存データ
let workData = {};

function updateTotal() {

  const baseHourly =
    (monthlySalary + overtimeBase) / monthlyHours;

  let overtimePay = 0;
  let holidayPay = 0;
  let overtimeHours = 0;
  let holidayHours = 0;

  Object.values(workData).forEach(item => {

    const overtime =
    Number(item.overtime || 0);

    const holiday =
    Number(item.holiday || 0);

    overtimeHours += overtime;
    holidayHours += holiday;

    overtimePay +=
      baseHourly *
      overtimeRate *
      overtime;

      holidayPay +=
      baseHourly *
      holidayRate *
      holiday;
  });

  const hourlyPay =
  monthlySalary / monthlyHours;

  const total =
  monthlySalary +
  overtimePay +
  holidayPay +
  commuteAllowance +
  otherAllowance;

  salaryTotal.innerHTML = `

  <div style="font-size:14px">
    支給見込額
  </div>

  <div style="
    font-size:36px;
    font-weight:bold;
    margin-bottom:15px;
  ">
    ¥${Math.round(total).toLocaleString()}
  </div>

  <div>
    基本給
    ¥${Math.round(monthlySalary).toLocaleString()}
  </div>

  <div>
    時給
    ¥${Math.round(hourlyPay).toLocaleString()}
  </div>

  <hr>

  <div>
    残業
    ${overtimeHours}h
  </div>

 <div>
    休日出勤
    ${holidayHours}h
  </div>

  <div>
    残業代
    ¥${Math.round(overtimePay).toLocaleString()}
  </div>

  <div>
    休日手当
    ¥${Math.round(holidayPay).toLocaleString()}
  </div>

    <div>
    通勤手当
    ¥${Math.round(commuteAllowance).toLocaleString()}
  </div>

  <div>
    時間外基礎額
    ¥${Math.round(overtimeBase).toLocaleString()}
  </div>

  <div>
    その他手当
    ¥${Math.round(otherAllowance).toLocaleString()}
  </div>

`;
}

let currentDate = new Date();

function renderCalendar() {

  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthKey =
    `${year}-${String(month + 1).padStart(2,"0")}`;

  workData =
    JSON.parse(
      localStorage.getItem(monthKey)
    ) || {};

  updateTotal();

  document.getElementById("monthTitle").textContent =
    `${year}年 ${month + 1}月`;

  const firstDay =
    new Date(year, month, 1).getDay();

  const lastDate =
    new Date(year, month + 1, 0).getDate();

  const weekNames =
    ["日","月","火","水","木","金","土"];

  weekNames.forEach(name => {

    const cell =
      document.createElement("div");
    cell.className = "day";
    cell.style.fontWeight = "bold";
    cell.textContent = name;

    calendar.appendChild(cell);

  });

  for(let i = 0; i < firstDay; i++){

    calendar.appendChild(
      document.createElement("div")
    );

  }

  for(let day = 1; day <= lastDate; day++){

    const cell =
      document.createElement("div");

    cell.className = "day";

    const today = new Date();
    if(
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    const weekDay =
     new Date(year,month,day).getDay();

    if(weekDay === 0){
      cell.classList.add("sunday")
    }
    
    if(weekDay === 6){
      cell.classList.add("saturday")
    }

    const saved =
      workData[day];

    if(saved){

      let text = `${day}`;

      if(saved.overtime > 0){
        text += `<br>⏱${saved.overtime}h`;
      }

      if(saved.holiday > 0){
        text += `<br>🏖${saved.holiday}h`;
      }

      cell.innerHTML = text;

    } else {

      cell.textContent = day;

    }

    cell.addEventListener("click",()=>{

      const overtime =
        prompt(
          `${day}日の残業時間`,
          saved ? saved.overtime : 0
        );

      if(overtime === null) return;

      const holiday =
        prompt(
          `${day}日の休日出勤時間`,
          saved ? saved.holiday : 0
        );

      if(holiday === null) return;

      workData[day] = {
        overtime:Number(overtime),
        holiday:Number(holiday)
      };

      localStorage.setItem(
        monthKey,
        JSON.stringify(workData)
      );

      renderCalendar();
      updateTotal();

    });

    calendar.appendChild(cell);

  }

}
document
.getElementById("prevMonth")
.addEventListener("click",()=>{

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderCalendar();

});

document
.getElementById("nextMonth")
.addEventListener("click",()=>{

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderCalendar();

});

renderCalendar();
updateTotal();