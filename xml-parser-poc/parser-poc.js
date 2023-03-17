
function getXmlDoc() {
  let xml = document.getElementById('xml-input').innerHTML;
  let parser = new DOMParser();
  xml = xml.replaceAll('&lt;', '<');
  xml = xml.replaceAll('&gt;', '>');
  xml = xml.trim();
  return parser.parseFromString(xml, 'text/xml');
}

function chaseFd() {
        let xmlDoc = getXmlDoc();

        let output = document.getElementById('output');
        let bookstores = xmlDoc.getElementsByTagName('bookstore');

        for (let i = 0; i < bookstores.length; i++) {
                let bookstore = bookstores[i];
                let books = bookstore.getElementsByTagName('book');
                let list = document.createElement('ul');
                
                for (let j = 0; j < books.length; j++) {
                        let book = books[j];
                        let title = book.getElementsByTagName('title')[0].innerHTML;
                        let author = book.getElementsByTagName('author')[0].innerHTML;
                        let li = document.createElement('li');
                        li.innerHTML = `${title} by ${author}`;
                        list.appendChild(li);
                }

                output.appendChild(list);
        }
        
}

function testXml() {
  let sampleXml = `<bookstore>
    <book>
      <author>Sam</author>
      <title>How to chase her</title>
    </book>
  </bookstore>`;
  let xmlEl = document.getElementById('xml-input');
  xmlEl.innerHTML = sampleXml;
}

function xmlParserTest() {
  let text = "<bookstore><book>" +
"<title>Everyday Italian</title>" +
"<author>Giada De Laurentiis</author>" +
"<year>2005</year>" +
"</book></bookstore>";
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(text,"text/xml");
  console.log('Parsed XML', xmlDoc);
}

