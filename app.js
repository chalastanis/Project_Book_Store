//! Selectors
const booktitle = document.querySelector('.bookTitle');
const toCart = document.querySelector('.addToCart');
const addedBookList = document.querySelector(".addedBook-list");
const productBook = document.querySelector(".productBooks");
const checkOutPrice = document.querySelector(".fa-shopping-cart");

//! Event Listeners
productBook.addEventListener('click', addToCart);
productBook.addEventListener('click', finalPrice);
addedBookList.addEventListener('click', deleteBook);
addedBookList.addEventListener('click', finalPrice);
checkOutPrice.addEventListener('click', finalPrice);

//! functions 

//for open close the cart
function openCart() {
    let mql = window.matchMedia('(max-width: 800px)');
    console.log(mql)
    if(mql.matches){
        document.getElementsByClassName('overlay')[0].style.height ="100%";
    }else{        
        document.getElementsByClassName('overlay')[0].style.height ="50%";
    }
    
}

function closeCart() {
    document.getElementsByClassName('overlay')[0].style.height ="0%";
}

// Home button
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

// function for cart

let countBooks = 0;
let counter = 0;
function addToCart(event){    
    event.preventDefault(); // για να μην αννανεωνεται η σελιδα
    const item = event.target;    
    // kanw to sygkekrimeno elegxo wste na trexoun oi parakatw entoles mono otan h klasi sto event target einai addToCart diladi to button pou exw orisei
    if(item.classList[0] === "addToCart"){
        //!prosoxi sta kena metaxu twn epilogwn stin html. An uparxei keno metaxu twn elements dinei undefined
        const titleFinder = item.parentElement.firstChild.innerHTML;
        const priceFinder = item.previousSibling.innerHTML;
        let i;
        for(i=0; i<countBooks; i++){ //me ton metriti countbooks elegxw an exw vivlia sto cart
            if(titleFinder === document.getElementsByClassName("added-book")[i].firstChild.nextSibling.innerHTML){
                let w = parseFloat(document.getElementsByClassName("add-Quantity")[i].value) + 1;
                document.getElementsByClassName("add-Quantity")[i].value = w;
                counter++;
            }
        }
        if(counter === 0){ 
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
            title.innerText = titleFinder; 
            //making a li to put in the price
            const price = document.createElement('li');
            price.classList.add('added-item');
            price.innerText = priceFinder;
            // prosthetw to li me ton titlo sto div
            addBook.appendChild(title);
            // prosthetw to li me tin timi sto div
            addBook.appendChild(price);
            // making a thrash button and put it inside the div
            const trashButton = document.createElement('button');
            trashButton.innerHTML ='<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            addBook.appendChild(trashButton);
            //prosthetw to vivlio sti lista tou kalathiou
            document.getElementById("addedBook-list").appendChild(addBook);
            
            countBooks++;
        }else{
            counter--;
        }
    }
}

function deleteBook(event) {    
    // Σε αυτη τη συναρτηση με το event.target εντοπιζουμε με το κλικ το ελεμεντ που πειραζει ο χρηστης
    const item = event.target;
    //delete 
    if (item.classList[0] === 'trash-btn') {
        const addedBook = item.parentElement;
        addedBook.remove();    
        countBooks--;
    }
}



var sumPrice = 0;

function finalPrice(event){
    const shopAction = event.target;  
    if (shopAction.classList[0] === 'addToCart') {
        const priceFinder = shopAction.previousSibling.innerHTML;
        addPrice = parseFloat(priceFinder);
        sumPrice = sumPrice + addPrice;        
    }
    if (shopAction.classList[0] === 'trash-btn') {        
        const priceFinder = shopAction.previousSibling.innerHTML;
        const quantityFinder = shopAction.parentElement.firstChild.value;   
        subPrice = parseFloat(priceFinder) ; 
        quantity = parseFloat(quantityFinder);
        sumPrice = sumPrice - subPrice*quantity;
    }
    document.getElementById('finalPrice').innerHTML = ("Subtotal: "+sumPrice+"€");
}
