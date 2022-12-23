
let data = {};

let handleGrab = (event) => {
  event.preventDefault();
  data["city"] = $("#city").val();
  let stateEl = document.getElementById("selectState");
  data["state"] = stateEl.options[stateEl.selectedIndex].value;
  data["startDate"] =  $("#startDate").val();
  data["endDate"] = $("#endDate").val();
  console.log(data);
  localStorage.setItem("timeLocation", JSON.stringify(data));
  window.location.href = "./results.html";
  return 0;
}

$(".submit").on('click',handleGrab);

