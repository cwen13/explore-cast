
let data = {};

let handleGrab = (event) => {
  event.preventDefault();
  data["city"] = $("#city").val();
  data["state"] = $("#state").val();
  data["startDate"] =  $("#startDate").val();
  data["EndDate"] = $("#endDate").val();
  console.log(data);
  return 0;
}

$(".button").on('click',handleGrab);
