function bookSlider(){
    const bookContainers = [...document.querySelectorAll('#books-line')];
    const nxtBtn = document.querySelector('#nxt-btn');
    const preBtn = document.querySelector('#pre-btn');

    bookContainers.forEach((item) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;
        console.log("l",containerDimensions)

        nxtBtn.addEventListener('click', () => {
            item.scrollLeft -= containerWidth/2;
        })

        preBtn.addEventListener('click', () => {
            item.scrollLeft += containerWidth/2;
        })
    })
}

function displayNewBookView(){
    document.querySelector('#create-book-overlay').classList.remove('d-none')
    document.querySelector('#overlay').classList.remove('d-none')
}

function closeNewBookView(e){
    const createOverlay = document.querySelector('#create-book-overlay')
    const overlay = document.querySelector('#overlay')
    if(e.target === createOverlay || e.target === overlay){
        createOverlay.classList.add('d-none')
        overlay.classList.add('d-none')
    }
}

function closeNewBookView2(){
    const createOverlay = document.querySelector('#create-book-overlay')
    const overlay = document.querySelector('#overlay')
        createOverlay.classList.add('d-none')
        overlay.classList.add('d-none')
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function createNewBook(){
    //const bookName = document.querySelector('#book-name').value;
    //console.log(bookName)
    //const targetLanguage = document.querySelector('#target-language').value
    //const wordForPage = document.querySelector('#words-per-page').value
    //const e = document.querySelector('#color-cover');
    //const color = e.options[e.selectedIndex].value;
    //const colorSelect = document.querySelector('#color-cover').innerHTML;
    //let textColor = '#FFFFFF';
    //if( colorSelect === 'White' || colorSelect === 'Yellow' || colorSelect === 'Pink' ){
        //textColor = '#000000';
    //}
    //const bookLine = document.querySelector('#books-line')
    //const div = document.createElement('div');
    //div.innerHTML = `
    //<div id="book" class="m-1 rounded text-light" style="background-color:${color};">
        //<h1 class="p-4">${bookName}</h1>
    //</div>`
    //bookLine.appendChild(div)
    //closeNewBookView2()
}

function filterBooks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`.book`).forEach((item) => {
    const name = item.childNodes[1].textContent;

    if(name.toLowerCase().indexOf(text) !== -1){
        item.style.display ='block';
    }else{
        item.style.display = 'none';
    }
    })
}

async function getBookContent(e){
    const bookElement = e.target.closest('.book')
    console.log(bookElement)
}

function resizeFontSize(books){
    books.forEach(item => {
        const bookWidth = item.clientWidth
        const bookHeight = item.clientHeight
        const dynamicText = item.childNodes[1].textContent;
        const words = dynamicText.split(' ')
        
        //Get the longest word of a title
        let max = words[0].length;
        for(let i=0; i<words.length; i++){
            if(words[i].length > max){
                max = words[i].length
            }
            console.log(max,bookHeight,bookWidth)
        }

        const widthRatio = (max/bookWidth)*100
        const heightRatio = (dynamicText.length/bookWidth)*100
        let ratio = (heightRatio + widthRatio)/2
        item.childNodes[1].style.fontSize = `${(1/ratio)*100}px`

    })
}
function init(){
    const createBtn = document.querySelector('#create-btn');
    const body = document.querySelector('body'); 
    const saveCreateBtn = document.querySelector('#save-create');
    const filter = document.querySelector('#filter-books');
    const books = document.querySelectorAll('.book');

    books.forEach(item => {
        //item.addEventListener('mouseover', getBookContent)
    })

    if(filter){
        filter.addEventListener('keyup',filterBooks)
    }
    if(createBtn){
        createBtn.addEventListener('click', displayNewBookView)
    }
    else{
        return
    }
    
    resizeFontSize(books)
    // Call the function initially and whenever the window is resized

    body.addEventListener('click',closeNewBookView)
    saveCreateBtn.addEventListener('click',createNewBook)
    bookSlider();
}

document.addEventListener('DOMContentLoaded',init)
