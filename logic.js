function tableCreate() {
  var div = document.createElement("div");
  div.innerHTML = "a";

  const body = document.body,
    tbl = document.createElement("table");
  tbl.className = "editabletable";
  tbl.style.border = "1px solid black";

  for (let i = 0; i < 101; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < 101; j++) {
      const tc = tr.insertCell();
      if (i == 0 && j == 0) {
        continue;
      } else if (i == 0) {
        tc.appendChild(document.createTextNode(`${j}`));
      } else if (j == 0) {
        tc.appendChild(
          document.createTextNode(`${convertToNumberingScheme(i)}`)
        );
      } else {
        tc.innerHTML = "";
        tc.setAttribute("contenteditable", true);
      }
      tc.style.height = "30px ";
      tc.style.border = "1px solid black";
    }
  }
  body.appendChild(tbl);
  var reloading = sessionStorage.getItem("data");
  if (reloading != null) {
    var tables = document.getElementsByClassName("editabletable");
    var i;
    for (i = 0; i < tables.length; i++) {
      retrieveData(tables[i]);
    }
  }
  localStorage.setItem("data", null);
  init();
}

function init() {
  var tables = document.getElementsByClassName("editabletable");
  var i;
  for (i = 0; i < tables.length; i++) {
    makeTableEditable(tables[i]);
  }
}

function convertToNumberingScheme(number) {
  var baseChar = "A".charCodeAt(0),
    letters = "";

  do {
    number -= 1;
    letters = String.fromCharCode(baseChar + (number % 26)) + letters;
    number = (number / 26) >> 0; // quick `floor`
  } while (number > 0);

  return letters;
}
function makeTableEditable(table) {
  var rows = table.rows;
  var r;
  for (r = 0; r < rows.length; r++) {
    var cols = rows[r].cells;
    var c;
    for (c = 0; c < cols.length; c++) {
      var cell = cols[c];
      var listener = makeEditListener(table, r, c);
      cell.addEventListener("input", listener, false);
    }
  }
}

function makeEditListener(table, row, col) {
  return function (event) {
    var cell = getCellElement(table, row, col);
    var text = cell.innerHTML.replace(/<br>$/, "");
    var items = split(text);

    if (items.length === 1) {
      // Text is a single element, so do nothing.
      // Without this each keypress resets the focus.
      return;
    }

    var i;
    var r = row;
    var c = col;
    for (i = 0; i < items.length && r < table.rows.length; i++) {
      cell = getCellElement(table, r, c);
      cell.innerHTML = items[i]; // doesn't escape HTML

      c++;
      if (c === table.rows[r].cells.length) {
        r++;
        c = 0;
      }
    }
    cell.focus();
  };
}

function getCellElement(table, row, col) {
  // assume each cell contains a div with the text
  return table.rows[row].cells[col];
}

function split(str) {
  // use comma and whitespace as delimiters
  return str.split(/,|\s|<br>/);
}

tableCreate();

function save() {
  var tables = document.getElementsByClassName("editabletable");
  var i;
  for (i = 0; i < tables.length; i++) {
    saveData(tables[i]);
  }
  sessionStorage.setItem("reloadData", true);
  // document.location.reload();
}

function saveData(table) {
  var data = [];
  for (let i = 1; i < 101; i++) {
    row = [];
    for (let j = 1; j < 101; j++) {
      cell = getCellElement(table, i, j);
      row.push(cell.innerHTML);
    }
    data.push(row);
  }
  console.log(data);

  // Put the object into storage
  localStorage.setItem("data", JSON.stringify(data));
}

function retrieveData(table) {
  var data = JSON.parse(localStorage.getItem("data"));
  for (let i = 1; i < 101; i++) {
    row = data[i];

    for (let j = 1; j < 101; j++) {
      cell = getCellElement(table, i, j);
      cell.innerHTML = row[j];
    }
  }
}

function italics() {
  var selection = window.getSelection().getRangeAt(0);
  var selectedText = selection.extractContents();
  var span = document.createElement("span");
  span.style.fontStyle = "italic";
  span.appendChild(selectedText);
  selection.insertNode(span);
}

function bold() {
  var selection = window.getSelection().getRangeAt(0);
  var selectedText = selection.extractContents();
  var span = document.createElement("span");
  span.style.fontWeight = "bold";
  span.appendChild(selectedText);
  selection.insertNode(span);
}

function underline() {
  var selection = window.getSelection().getRangeAt(0);
  var selectedText = selection.extractContents();
  var span = document.createElement("span");
  span.style.textDecoration = "underline";
  span.appendChild(selectedText);
  selection.insertNode(span);
}
