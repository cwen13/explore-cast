
/* Want to place the results building porition in JS so all tiles
 * are created in the same way and no default tile is used
 */

let eR = [{"title": "Big concert",
	  "date": "2022-03-12",
	  "pic": "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600",
	  "sourec": "My head",
	   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",},
	  {"title": "Big concert",
	  "date": "2022-03-12",
	  "pic": "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600",
	  "sourec": "My head",
	   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",},
	  {"title": "Big concert",
	  "date": "2022-03-12",
	  "pic": "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600",
	  "sourec": "My head",
	   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",},
	  {"title": "Big concert",
	  "date": "2022-03-12",
	  "pic": "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600",
	  "sourec": "My head",
	  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",}] 


function buildTile (eventResults) {
  // Need to make componets
  // Need to nest them together
  // place in DOM
  // info in eventResulst has the following
  // -Title
  // -DateTime
  // -Description
  // -Picture linlk
  // -Source of event

  // build shell
  let resultList = document.querySelector(".results");
  let container = document.createElement("section");
  container.setAttribute("class", "box results");
  let resultTile = document.createElement("article");
  resultTile.setAttribute("class","media");

  // build picture elements
  let ePicEl = document.createElement("img");
  ePicEl.setAttribute("src", eventResults["pic"]);
  let figureEl = document.createElement("figure");
  figureEl.setAttribute("class", "image is-64x64")
  let picSectionEl = document.createElement("section");
  picSectionEl.setAttribute("class","media-left");

  // build title and datetime items
  let eTitleEl = document.createElement("section");
  let dateEl = document.createElement("div");
  dateEl.textContent=eventResults["date"]
  let breakEl = document.createElement("br");
  let titleEl = document.createElement("strong")
  titleEl.textContent = eventResults["title"];
  eTitleEl.setAttribute("class", "colulmn is-fifth");
  let titleSectionEl = document.createElement("section");
  titleSectionEl.setAttribute("class", "content columns");
  let middleSection = document.createElement("section");
  middleSection.setAttribute("class", "media-content");
  let eDescEl = document.createElement("section");
  eDescEl.setAttribute("class" , "column is-four-fifths");
  eDescEl.textContent = eventResults["description"];
  let eSourceEl = document.createElement("a");
  eSourceEl.textContent = eventResults["source"];

  // build tile
  figureEl.appendChild(ePicEl);
  picSectionEl.appendChild(figureEl);
  eTitleEl.appendChild(dateEl);
  eTitleEl.insertBefore(breakEl, dateEl);
  eTitleEl.insertBefore(titleEl, breakEl);
  titleSectionEl.appendChild(eTitleEl);
  titleSectionEl.appendChild(eDescEl);
  middleSection.appendChild(titleSectionEl);
  resultTile.appendChild(middleSection);
  resultTile.insertBefore(picSectionEl, middleSection);
  resultList.appendChild(resultTile);

  return 0;
}

function main () {
  for (let i=0; i<eR.length;i++){
    buildTile(eR[0]);
  }
  return 0;
}

main();





