const bigHeroImagesContain = document.querySelector('.big-hero-img-contain');
const bigHeroImages = bigHeroImagesContain.querySelectorAll('img');
const modalContainer = document.querySelector('.modal-container');
const modalBigImagesContain = document.querySelector('.modal-hero-img-contain');
const modalBigHeroImagesContain = document.querySelector('.modal-big-hero-img-contain')
const modalBigImages = modalBigHeroImagesContain.querySelectorAll('img');

// ANIMATION LINER NAVBAR LINKS HOVER
((navLinks)=> {
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', ()=> {
      
      link.classList.remove('back-line');
      link.classList.remove('move-line');
      link.classList.add('show-line');
      
    });
    link.addEventListener('mouseleave', ()=> {
      
      link.classList.remove('show-line');
      link.classList.add('move-line');
      link.style.transition = 'none';
      setTimeout(()=> link.classList.add('back-line'), 200);
      
    });
  });
})(document.querySelectorAll('.nav-link'));
// FUNCTION FOR SHOW UP NAVBAR LINKS
const showNavLinks = (navLinksContain) => {
  const burger = document.querySelector('.burger-btn');
  // show nav links
  navLinksContain.classList.toggle('show');
  // toggle change burger button and close button
  if (navLinksContain.classList.contains('show')) burger.src = 'images/icon-close.svg';
  else burger.src = 'images/icon-menu.svg';
}

// FUNCTION FOR COUNTS HOW MANY LISTS IN THE CART
const checkCartLists =()=> {
  const lists = document.querySelectorAll('.cart-list');
  const cartAmount =document.querySelector('.cart-amount');
  const emptyTxt = document.querySelector('.empty-txt')
  
  cartAmount.textContent = lists.length;
  // check if there is no list -> shows empty text
  if(lists.length == 0) {
    cartAmount.style.transitionDelay = '5s';
    cartAmount.classList.add('hide');
    emptyTxt.style.display = 'inline-block';
  } else {
    cartAmount.style.transitionDelay = '0s';
    cartAmount.classList.remove('hide');
    emptyTxt.style.display = 'none';
  }
  
}

// AREA HEADER BUTTON CLICKED
((header)=> {
  const navLinksContain = document.querySelector('.nav-links');
  header.addEventListener('click', (e)=> {
    
    e.preventDefault();
    if(e.target.classList.contains('burger-btn') || e.target.classList.contains('nav-links')) {
      // burger button clicked -> show|remove nav links
      showNavLinks(navLinksContain);
    } else if(e.target.classList.contains('cart-icon') || e.target.classList.contains('cart-amount')) {
      // cart button clicked -> show|remove cart box
      document.querySelector('.cart-box').classList.toggle('show');
    } else if(e.target.classList.contains('delete-btn')) {
      // delete button clicked -> check continue to delete, true? remove the list
      const question = confirm('Delete this cart?');
      (question) ? e.target.closest('.cart-list').remove() : '';
      // check how many lists in the cart;
      checkCartLists();
    }
    
  });
})(document.body.querySelector('#header'));

// NAVIGATION BUTTON FOR SMALLER SCREEN CLICKED
(()=> {
  const previousBtn = document.querySelector('.previous-btn');
  const nextBtn = document.querySelector('.next-btn');
  // get big hero image width
  const bigImageHeroWidth = bigHeroImagesContain.clientWidth;
  let counter = 0;
  // previous button clicked
  previousBtn.addEventListener('click', ()=> {
    
    counter--;
    if(counter < 0) counter = 3;
    bigHeroImages.forEach(image => image.style.transform = `translateX(${-bigImageHeroWidth * counter}px)`);

  });
  // next button clicked
  nextBtn.addEventListener('click', () => {
  
  counter++;
  if (counter >= 4) counter = 0;

  bigHeroImages.forEach(image => image.style.transform = `translateX(${-bigImageHeroWidth * counter}px)`);
  
  });
})();

// THUMB IMAGE FOR WIDER SCREEN CLICKED
((thumbs)=> {
  const bigImageHeroWidth = bigHeroImagesContain.clientWidth;
  // thumb image clicked
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', ()=> {
      
      // if thumbs have class active-> remove all class active
      thumbs.forEach(active => active.classList.remove('active'));
      // add class active only thumb that clicked
      thumb.classList.add('active');
      // counter from thumbs index for slider big hero images
      let counter = i;
      bigHeroImages.forEach(image => image.style.transform = `translateX(${-bigImageHeroWidth * counter}px)`);
      
    });
  });
})(document.querySelectorAll('.thumb'));

// BIG HERO IMAGES CLICKED
((product)=> {
  const modalBigImageWidth = modalBigHeroImagesContain.clientWidth;
  const modalThumbs = Array.from(document.querySelectorAll('.modal-thumb'));
  // big product image clicked
  product.addEventListener('click', ()=> {
    // in this environment, variable index and counter are important
    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    let index = thumbs.map(thumb => thumb.classList.contains('active')).indexOf(true);
    // change the display modal image to product image that clicked
    modalBigImages.forEach(image => {
      // delete transition only when click product big image
      image.style.transition = 'none';
      setTimeout(()=> image.style.transition = '.2s', 100);
      image.style.transform = `translateX(${-modalBigImageWidth * index}px)`;
    });
    // unactivated and activated modal thumbs
    modalThumbs.forEach(thumb => thumb.classList.remove('active'));
    modalThumbs[index].classList.add('active');
    // show modal container
    modalBigImagesContain.classList.add('show');
    modalContainer.classList.add('show');
    // counter is index to set modal navigation and modal thumbs 
    let counter = modalThumbs.map(thumb => thumb.classList.contains('active')).indexOf(true);
    // modal previous button clicekd
    document.querySelector('.modal-previous-btn').addEventListener('click', ()=> {
      
      counter--
      if(counter < 0) counter = 3;
      // display modal image choosed
      modalBigImages.forEach(image => image.style.transform = `translateX(${-modalBigImageWidth * counter+1}px)`);
      // unactivated and activated modal thumbs
      modalThumbs.forEach(thumb => thumb.classList.remove('active'));
      modalThumbs[counter].classList.add('active');
      
    });
    // modal next button clicked
    document.querySelector('.modal-next-btn').addEventListener('click', ()=> {
      
      counter++
      if(counter > 3) counter = 0;
      // display modal image choosed
      modalBigImages.forEach(image => image.style.transform = `translateX(${-modalBigImageWidth * counter}px)`);
      // unactivated and activated modal thumbs
      modalThumbs.forEach(thumb => thumb.classList.remove('active'));
      modalThumbs[counter].classList.add('active');
      
    });
    
    // modal thumb images clicked
    modalThumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
    
      // if thumbs have class active-> remove all class active
      modalThumbs.forEach(active => active.classList.remove('active'));
      // add class active only thumb that clicked
      thumb.classList.add('active');
      // counter from modal thumbs index for slider big hero images
      counter = i - 1;
      counter++
      if(counter > 3) counter = 0;
      // display modal image choosed
      modalBigImages.forEach(image => image.style.transform = `translateX(${-modalBigImageWidth * counter}px)`);
    
    });
    });
    
  });
})(document.querySelector('.big-hero-img-contain'));

// click modal close button or transparent background -> remove modal show
document.body.addEventListener('click', (e)=> {
  if(e.target.classList.contains('modal-close-btn') || e.target.classList.contains('modal-container')) {
    
    modalContainer.classList.remove('show');
    modalBigImagesContain.classList.remove('show');

  }
 });

// ADD PRODUCT LIST INTO THE CART
((productInfo)=> {
  const cartListsContain = document.querySelector('.cart-lists-contain');
  const priceDiscount = document.querySelector('.price-discount');
  const minusBtn = document.querySelector('.min-btn');
  const plusBtn = document.querySelector('.plus-btn');
  const totalTxt = document.querySelector('.total-txt');
  let totalCounter = 0;
  
  // minus button clicked
  document.querySelector('.min-btn').addEventListener('click', ()=> {
    if (totalCounter <= 0) return;
    totalCounter--
    totalTxt.textContent = totalCounter;
  });
  // plus button clicked
  document.querySelector('.plus-btn').addEventListener('click', ()=> {
     if (totalCounter >= 15) return alert("You can't add more than 15 products quantity.");
     totalCounter++
     totalTxt.textContent = totalCounter;
  });
  // add to cart button clicked
  document.querySelector('.add-to-cart-btn').addEventListener('click', (e)=> {
    e.preventDefault();
     if (totalCounter == 0) return alert('Please add at least one product quantity.')
     const price = priceDiscount.textContent;
     const totalPrice = Number(price.slice(1)) * totalCounter;
     cartListsContain.append(cartListElement(price, totalCounter, totalPrice));
     // check how many lists in cart;
     checkCartLists();
  });
  
})(document.querySelector('.product-info-contain'));
// CREATE LIST ELEMENT
function cartListElement(price, total, totalPrice) {
  const cartList = document.createElement('li');
  cartList.classList.add('cart-list');
  cartList.innerHTML = `<div class="list">
                <img src="images/image-product-1-thumbnail.jpg" alt="" class="thumb-list">
                <div class="name-price-list">
                  <p class="name-list">Autumn Limited Edition Sneakers</p>
                  <p class="price-list">$125.00 x ${total} <span class="total-price">$${totalPrice}.00</span></p>
                </div>
                <a href="#" aria-label="delete-list" class="delete-btn">
                  <img src="images/icon-delete.svg" alt="" class="delete-btn">
                </a>
              </div>
              <a href="#" class="checkout-btn">Checkout</a>`
  return cartList;
}
