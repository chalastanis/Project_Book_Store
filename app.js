
//! Selectors
const booktitle = document.querySelector('.bookTitle');
const toCart = document.querySelector('.addToCart');
const addedBookList = document.querySelector(".addedBook-list");

const productBook = document.querySelector(".productBooks");
const checkOutPrice = document.querySelector(".fa-shopping-cart");



//! Event Listeners
document.addEventListener('DOMcontentLoaded', getTodos);
productBook.addEventListener('click', addToCart);
productBook.addEventListener('click', finalPrice);

addedBookList.addEventListener('click', deleteBook);
addedBookList.addEventListener('click', finalPrice);
checkOutPrice.addEventListener('click', finalPrice);


//! functions 
//for open close the cart

function openCart() {
    document.getElementsByClassName('overlay')[0].style.height ="50%";
}


function closeCart() {
    document.getElementsByClassName('overlay')[0].style.height ="0%";
}




//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



// function gia na ftiaxw to cart


function addToCart(event){
    console.log('hello');
    event.preventDefault(); // για να μην αννανεωνεται η σελιδα

    const item = event.target;
    // kanw to sygkekrimeno elegxo wste na trexoun oi parakatw entoles mono otan h klasi sto event target einai addToCart diladi to button pou exw orisei
    if(item.classList[0] === "addToCart"){
    // console.log(item);
    //making a div with class added book
    const addBook = document.createElement('div');    
    addBook.classList.add('added-book');
    // making an input to check the quantity
    const addQuan = document.createElement('input');
    addQuan.classList.add('add-Quantity');
    addQuan.type ="number";
    addQuan.min = '0';
    addQuan.max = '5';
    addQuan.value = '1';
    addBook.appendChild(addQuan);

    //making a li to put in the title
    const title = document.createElement('li');
    title.classList.add('added-item');    
    
    //making a li to put in the price
    const price = document.createElement('li');
    price.classList.add('added-item');
    
    // if (item.classList[0] === 'addToCart') {
        
        console.log(item);
        //!prosoxi sta kena metaxu twn epilogwn stin html. An uparxei keno metaxu twn elements dinei undefined
        const titleFinder = item.parentElement.firstChild.innerHTML;
        const priceFinder = item.previousSibling.innerHTML;

        console.log(titleFinder);
        console.log(priceFinder);

        title.innerText = titleFinder;
        price.innerText = priceFinder;
    // }    
    // prosthetw to li me ton titlo sto div
    addBook.appendChild(title);
    // prosthetw to li me tin timi sto div
    addBook.appendChild(price);
//! save value (gia kathe neo item pou kanoume local)
    saveLocalCart(title.innerText);
    
    saveLocalCart(price.innerText);

    
    // making a thrash button and put it inside the div
    const trashButton = document.createElement('button');
    trashButton.innerHTML ='<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    addBook.appendChild(trashButton);
    
    // const newAdd = document.getElementById("addedBook-list");
    // newAdd.appendChild(addBook);
    document.getElementById("addedBook-list").appendChild(addBook);
        
}
}

function deleteBook(event) {
    // console.log(event.target);

    // Σε αυτη τη συναρτηση με το event.target εντοπιζουμε με το κλικ το 
    // ελεμεντ που πειραζει ο χρηστης
    const item = event.target;

    // const item = document.querySelector("#addedBook-list > div > button")

    //delete
    // Εδω θα κανουμε ελεγχο μεσω της κλασης του αν ειναι το κλικ στο κουμπι με τη class thrash-btn τοτε χρησιμοποιωντας το parentElement θα διαγραψουμε το: 
    // <div class=​"todo">​
    //     <li class=​"todo-item">​</li>
    //     ​<button class=​"complete-btn">​…​</button>
    //     ​<button class=​"trash-btn">​…​</button>​
    // </div>​
    // το div δηλαδη που ειναι και το parent
    if (item.classList[0] === 'trash-btn') {
        // item.remove();
        //
        const addedBook = item.parentElement;
        // kai to kanoume remove me tin remove()
        addedBook.remove();    
        
    }
}
var sumPrice = 0;

function finalPrice(event){

    const shopAction = event.target;
    
    console.log(sumPrice);

    if (shopAction.classList[0] === 'addToCart') {

        const priceFinder = shopAction.previousSibling.innerHTML;

        addPrice = parseFloat(priceFinder) ;

        console.log(shopAction);
        console.log(addPrice);
        sumPrice = sumPrice + addPrice;

        
    }
    if (shopAction.classList[0] === 'trash-btn') {
        
        const priceFinder = shopAction.previousSibling.innerHTML;
   
        subPrice = parseFloat(priceFinder) ;        

        console.log(shopAction);        
        console.log(subPrice);
        sumPrice = sumPrice - subPrice;
    }

    document.getElementById('finalPrice').innerHTML = ("Subtotal: "+sumPrice+"€");

    console.log(sumPrice);
}



function saveLocalCart(addedBook){
    let addedBooks;

    if(localStorage.getItem('addedBooks') === null){
        addedBooks = [];
    }
    else{
        addedBooks =  JSON.parse(localStorage.getItem('addedBooks'));
    }
    addedBooks.push(addedBook);

    localStorage.setItem('addedBooks', JSON.stringify(addedBooks));
}


function getTodos(){
    let addedBooks;

    if(localStorage.getItem('addedBooks') === null){
        addedBooks = [];
    }
    else{
        addedBooks =  JSON.parse(localStorage.getItem('addedBooks'));
    }
    addedBooks.push(addedBook);

    localStorage.setItem('addedBooks', JSON.stringify(addedBooks));
}




