function bookSlider(){

    const bookContainers = [...document.querySelectorAll('#books-line')];
    const allBooks = document.querySelectorAll('.book')
    const nxtBtn = document.querySelector('#nxt-btn');
    const preBtn = document.querySelector('#pre-btn');
    const begBtn = document.querySelector('#beg-btn');
    const endBtn = document.querySelector('#end-btn');
    const widthOfOneBook = 200
    bookContainers.forEach((item) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;
        console.log("l",containerDimensions)

        nxtBtn.addEventListener('click', () => {
            item.scrollLeft -= containerWidth/2;
        })

        preBtn.addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        begBtn.addEventListener('click', () => {
            item.scrollLeft -= item.scrollLeft
        })

        endBtn.addEventListener('click', () => {
            item.scrollLeft += widthOfOneBook*allBooks.length - item.scrollLeft 
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
        if(words.length === 1){
            ratio = words[0]/bookWidth;
        }
        item.childNodes[1].style.fontSize = `${(1/ratio)*100}px`

        if(max === 1){
            item.childNodes[1].style.fontSize = `5rem`
        }
    })
}

async function createNewPage(e){
    const loggedUser = JSON.parse(document.getElementById('username').textContent); 
    const bookName = JSON.parse(document.querySelector('#book_name').textContent).split(' ').join('-');
    console.log("a",loggedUser)
    console.log("pagetitle",bookName)
    const pageContainer = document.querySelector('#all-pages')
    const allPages = document.querySelectorAll('.page');
    if(allPages.length !== 50){
        const color = allPages[0].childNodes[1].getAttribute('style').split(':')[1]
        const number = 1 + parseInt(allPages[allPages.length-1].textContent)
        const page = document.createElement('a');
        page.classList.add('p-3')
        page.classList.add('page')
        page.classList.add('m-3')
        page.classList.add('text-decoration-none')
        page.setAttribute('id','page-False')
        page.setAttribute('href',`${bookName}/${number}`)
        page.innerHTML = `<h1 id ="page-number" class="text-center" style="color:${color}">${number}</h1>`
        console.log(allPages.childNodes)
        pageContainer.appendChild(page)
        await fetch(`/${loggedUser}/${bookName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie('csrftoken') // You need to define the `getCookie` function
                }
            })
    }else{
        document.querySelector('#new-page').disabled = true
    }
}

function displayEditWordView(e){
        //This opens up word edit view
        const wordArea = e.target.closest('#word-meaning').childNodes[1]
        const currentWord = wordArea.childNodes[3].textContent
        const wordEdit = wordArea.childNodes[3].childNodes[3]
        const wordDiv = wordArea.childNodes[3].childNodes[1]
        wordEdit.value = currentWord.trim()
        wordDiv.classList.add('d-none')
        wordEdit.classList.remove('d-none')

        //This opens up meaning edit view
        const meaningArea = e.target.closest('#word-checkbox').childNodes[1].childNodes[1]
        const currentMeaning = meaningArea.childNodes[1].textContent
        meaningArea.childNodes[3].value = currentMeaning
        meaningArea.childNodes[1].classList.add('d-none')
        meaningArea.childNodes[3].classList.remove('d-none')
        console.log(currentMeaning)
        console.log(meaningArea.childNodes[3])

        //switch edit button to save button
        e.target.closest('#checkbox-container').childNodes[1].classList.remove('d-none')
        e.target.classList.add('d-none')
}

function saveTheWordsChanges(e){
    console.log(e.target)
    //This opens up word edit view
    const wordArea = e.target.closest('#word-meaning').childNodes[1]
    const currentWord = wordArea.childNodes[3].childNodes[3].value
    const wordEdit = wordArea.childNodes[3].childNodes[3]
    const wordDiv = wordArea.childNodes[3].childNodes[1]
    wordDiv.textContent= currentWord
    wordDiv.classList.remove('d-none')
    wordEdit.classList.add('d-none')

    //This opens up meaning edit view
    const meaningArea = e.target.closest('#word-checkbox').childNodes[1].childNodes[1]
    const currentMeaning = meaningArea.childNodes[3].value
    meaningArea.childNodes[1].textContent = currentMeaning
    meaningArea.childNodes[1].classList.remove('d-none')
    meaningArea.childNodes[3].classList.add('d-none')
    console.log(currentMeaning)
    console.log(meaningArea.childNodes[3])

    //switch edit button to save button
    e.target.closest('#checkbox-container').childNodes[3].classList.remove('d-none')
    e.target.classList.add('d-none')
}
async function saveWords(){
    console.log("save clicked")
    const loggedUser = JSON.parse(document.getElementById('username').textContent); 
    const bookName = JSON.parse(document.querySelector('#book_name').textContent).split(' ').join('-');
    const pageNumber = JSON.parse(document.getElementById('page_number').textContent); 
    console.log(loggedUser, bookName,pageNumber)
    const allWordCards = document.querySelectorAll('#word-meaning')
    let wordsContent = []
    allWordCards.forEach(wordCard => {
        const word = wordCard.childNodes[1].childNodes[3].textContent
        const meaning = wordCard.childNodes[3].childNodes[1].childNodes[1].childNodes[1].textContent
        const wordMeaningMatch = {
            word:word.trim(),
            meaning:meaning.trim()
        }
        wordsContent.push(wordMeaningMatch)
    })
    document.querySelector('#back-to-pages-btn').classList.remove('d-none')
    await fetch(`/${loggedUser}/${bookName}/${pageNumber}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie('csrftoken') // You need to define the `getCookie` function
        },
        body: JSON.stringify(wordsContent)
    }).then(res => res.json()).then(data => {
        displaySuccess(data)
    })

}

async function saveAndRewriteButton(){
    const loggedUser = JSON.parse(document.getElementById('username').textContent); 
    const bookName = JSON.parse(document.querySelector('#book_name').textContent).split(' ').join('-');
    const pageNumber = JSON.parse(document.getElementById('page_number').textContent); 
    const allWordCards = document.querySelectorAll('#word-meaning');
    let unForgottenWords = []
    allWordCards.forEach( wordCard=> {
        const remembered = wordCard.childNodes[3].childNodes[3].childNodes[1].checked
        if(remembered){
            const word = wordCard.childNodes[1].childNodes[7].textContent
            const meaning = wordCard.childNodes[3].childNodes[1].childNodes[5].childNodes[1].textContent
            const unForgottenWordMeaningMatches = {
                word:word.trim(),
                meaning:meaning.trim()
            }
            console.log(unForgottenWordMeaningMatches)
            unForgottenWords.push(unForgottenWordMeaningMatches)
        }
    })
    console.log(unForgottenWords)

    await fetch(`/${loggedUser}/${bookName}/${pageNumber}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie('csrftoken') // You need to define the `getCookie` function
        },
        body: JSON.stringify(unForgottenWords)
    }).then(res => res.json()).then(data => {
        displaySuccess(data)
    })
    document.querySelector('#rewrite-words').classList.remove('d-none')

}
function displaySuccess(success){
    const container = document.querySelector('#word-save-success');
    container.classList.remove('d-none')
    container.innerHTML = success.message
    setTimeout(() => {
        container.classList.add('d-none')
    }, 2000);
}

function hideAndDisplayWord(e){
    console.log("hid")
    const id = e.target.parentElement.getAttribute('id');
    if(id === 'sl-eye-word' || id === 'opn-eye-word'){
        const parent = e.target.closest('#w-container')
        const word = parent.childNodes[7]
        const wordStar = parent.childNodes[9]
        const openEyeWord = parent.childNodes[5]
        const slashEyeWord = parent.childNodes[3]
        if(id === 'sl-eye-word' ){
            word.classList.remove('d-none')
            wordStar.classList.add('d-none')
            openEyeWord.classList.remove('d-none')
            slashEyeWord.classList.add('d-none')
        }else{
            word.classList.add('d-none')
            wordStar.classList.remove('d-none')
            openEyeWord.classList.add('d-none')
            slashEyeWord.classList.remove('d-none')
        }       
    }else{
        const parent = e.target.closest('#m-container')
        console.log(parent.childNodes[5].childNodes)
        const meaning = parent.childNodes[5].childNodes[1]
        const meaningStar = parent.childNodes[5].childNodes[3]
        const openEyeMeaning = parent.childNodes[3]
        const slashEyeMeaning= parent.childNodes[1]
        if(id === 'sl-eye-meaning' ){
            meaning.classList.remove('d-none')
            meaningStar.classList.add('d-none')
            openEyeMeaning.classList.remove('d-none')
            slashEyeMeaning.classList.add('d-none')
        }else{
            meaning.classList.add('d-none')
            meaningStar.classList.remove('d-none')
            openEyeMeaning.classList.add('d-none')
            slashEyeMeaning.classList.remove('d-none')
        }       
    }
}

function init(){
    const createBtn = document.querySelector('#create-btn');
    const body = document.querySelector('body'); 
    const saveCreateBtn = document.querySelector('#save-create');
    const filter = document.querySelector('#filter-books');
    const books = document.querySelectorAll('.book');
    const newPageBtn = document.querySelector('#new-page');

    //check if user is logged in and get logged in username
    let logged_user = undefined

    if(document.querySelector('#all-pages')){
        const allPages = document.querySelectorAll('#page')
        if(allPages.length === 49){
            document.querySelector('#new-page').disabled = true
        }
    }
    
    if(document.querySelector('#all-words')){
        const allWords= document.querySelector('#all-words')
            allWords.addEventListener('click',(e) => {
                if(e.target.matches('#edit-word-btn')){
                    displayEditWordView(e);

                }else if(e.target.matches('#save-word-btn')){
                    saveTheWordsChanges(e);
                }
            })
    }

    if(document.querySelector('#inner-container')){
        const innerContainer = document.querySelector('#inner-container')
        innerContainer.addEventListener('click',(e)=>{
            if(e.target.matches('#save-all-btn')){
                saveWords()
            }
            if(e.target.matches('.fa-eye') || e.target.matches('.fa-eye-slash')){
                console.log("hi")
                hideAndDisplayWord(e)
            }else if(e.target.matches('#save-words-btn')){
                saveAndRewriteButton()
            }
        })
    }
    if(document.getElementById('username')){
        logged_user = JSON.parse(document.getElementById('username').textContent); 
    }
    else{
        logged_user = undefined
    }
    console.log(logged_user)
    if(filter){
        filter.addEventListener('keyup',filterBooks)
    }
    if(newPageBtn){
       newPageBtn.addEventListener('click',createNewPage);
    }
    if(createBtn){
        createBtn.addEventListener('click', displayNewBookView)
    }
    else{
        return
    }
    if(document.querySelector('#book-with-same-name')){
        setTimeout(() => {
            document.querySelector('#book-with-same-name').className = 'd-none'
        }, 2000);
    }
    

    resizeFontSize(books)
    // Call the function initially and whenever the window is resized
    body.addEventListener('click',closeNewBookView)
    if(document.querySelectorAll('.book')){
        bookSlider();
    }
}

document.addEventListener('DOMContentLoaded',init)
