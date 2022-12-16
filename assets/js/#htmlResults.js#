
/* Want to place the results building porition in JS so all tiles
 * are created in the same way and no default tile is used
 */

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
  let container = document.create("section");
  continainer.setAttribute("class", "box");
  let resultTile = document.create("article");
  resultTile.setAttribute("class","media");

  // build picture elements
  let ePicEl = document.createElement("img");
  ePicEl.setAttribute("src", eventResults("picture"));
  let figuseEl = document.createElement("figure");
  figureEl.setAttribute("class", "image is-64x64")
  let picSectionEl = document.createElement("section");
  picSectionEl.setAttribute("class","media-left");

  // assemble picture
  figureEl.appendChild(ePicEl);
  picSectionEl.appendChild(figureEl);
  resultTile.appendChild(picSectionEl);

  // build title and datetime items
  let eTitleEl = document.crreateElement("section");
  eTitleEl.textContent = eventResults("title");
  
  let eDateTimeEl = document.createElement("section");
  let date = Date.parse(eventResults("dateTime"))
  eTitleEl.textContent = date.toUTCString();
  let titleSectionEl = document.createElement("section");
  titleSectionEl.setAttribute("class", "content");
  let middleSection = document.createElement("div");
  middleSection.setAttribute("class", "media-content");
  titleSectionEl.appendChild(eDateTimeEl);
  titleSectionEl.insertBefore(eTitleEl, titleSectionEl[0]);
  middleSection.appendChild(titleSectionEl);
  
  let eDescrEl = document.createEement("section");
  eDescEl.textContent = eventResults("description");
  
  let eSourceEl = document.createElement("a");
  eSourceEl.textContent = eventResults("source");

  
  

}
