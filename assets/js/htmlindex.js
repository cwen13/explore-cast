
let data = {};

let handleGrab = (event) => {
  event.preventDefault();
  data["city"] = $("#city").val();
  let stateEl = document.getElementById("selectState");
  data["state"] = stateEl.options[stateEl.selectedIndex].value;
  data["startDate"] =  $("#startDate").val();
  data["EndDate"] = $("#endDate").val();
  console.log(data);
  return 0;
}

$(".submit").on('click',handleGrab);
