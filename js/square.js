// string, array, bool
function Square(heading, links, isSearch, size) {
  this.heading = heading;
  this.links = links;
  this.isSearch = isSearch;

  // Make sure size has a unit
  this.size = isNaN(size) ? size.substr(0, size.length-2) : size;
  this.sizeUnit = isNaN(size) ?  size.substr(-2) : "px";

  this.squareElement = document.createElement("div");
  this.squareElement.setAttribute("class", "sqr");

  this.headingElement = document.createElement("span");
  const headingTextnode = document.createTextNode(this.heading);
  this.headingElement.appendChild(headingTextnode);

  this.contentElement = document.createElement("div");
  this.contentElement.setAttribute("class", "content");

  if(!isSearch) {
    const linkElements = [];

    for (let i = 0; i < links.length; i++) {
      linkElements[i] = document.createElement("a");
      linkElements[i].tabIndex = "-1";
      linkElements[i].setAttribute("href", this.links[i].url);

      const textnode = document.createTextNode(this.links[i].name);
      linkElements[i].appendChild(textnode);
      this.contentElement.appendChild(linkElements[i]);
      this.contentElement.appendChild(document.createElement("br"));
     }

  } else {
    this.squareElement.setAttribute("id", "search_sqr");
    this.searchinput = document.createElement("input");
    this.searchinput.tabIndex = "-1";
    this.searchinput.setAttribute("id", "searchinput");
    this.searchinput.setAttribute("autocomplete", "off");

    this.contentElement.appendChild(this.searchinput);

    const enter = function(a) {
      const key = a.keyCode;
      if(key == 13) {
        const query = this.value;
        search(query);
      }
    };
    const searchFocused = (this.searchinput == document.activeElement);
    this.searchinput.addEventListener("keypress", enter);
  }


  this.squareElement.appendChild(this.headingElement);
  this.squareElement.appendChild(this.contentElement);
  document.getElementById("container").appendChild(this.squareElement);

  if(!data.bool.alwaysopen) {
    const square = this;
    this.squareElement.addEventListener("mouseover", this.expand.bind(this),
                                        false);
    this.squareElement.addEventListener("mouseout", this.contract.bind(this),
                                        false);
  }

  const squareElement = this.squareElement;
  const searchinput = this.searchinput;
}

Square.prototype.maxHeight = function() {
  return this.size*2 + (this.isSearch ? 37 : 25*this.links.length);
}

Square.prototype.expand = function() {
  if(data.bool.alwaysopen) return;
  this.squareElement.style.height = this.maxHeight() + this.sizeUnit;
  if(data.bool.borders) {
    this.squareElement.style.borderWidth = data.style.border_width_hovered;
  }
};

Square.prototype.contract = function() {
  if(data.bool.alwaysopen) return;
  this.squareElement.style.height = this.size + this.sizeUnit;
  this.squareElement.style.borderWidth = data.style.border_width_normal;
};

Square.prototype.focus = function(index) {
  this.contentElement.childNodes[index*2].style.backgroundColor =
      data.style.focus_bg_color;
  this.contentElement.childNodes[index*2].style.color = data.style.focus_color;
};

Square.prototype.unfocus = function(index) {
  this.contentElement.childNodes[index*2].style.backgroundColor = "initial";
  this.contentElement.childNodes[index*2].style.color = data.style.link_color;
};
