const log = console.log
log('javascript is running...')

// desktop breakpoint (from mobile)
const breakpoint = 900

const removeSideNav = () => {
  document.querySelector('.isSideNavShowing').checked = false
}
// remove side navigation when desktop breakpoint is reached
// occurs when sideNav (mobile) is showing then resized to desktop breakpoint
window.addEventListener('resize', () => {
  window.innerWidth >= breakpoint && removeSideNav()
})
// remove sideNav after clicking on a sideNavLink
document.querySelectorAll('.sideNavLink').forEach(sideNavLink => {
  sideNavLink.addEventListener('click', removeSideNav)
})
// show or hide side nav when burgerContainer is clicked
const showOrHideSideNav = () => {
  const isSideNavShowing = document.querySelector('.isSideNavShowing')
  isSideNavShowing.checked ? removeSideNav() : isSideNavShowing.checked = true
}
document.querySelector('.burgerContainer').addEventListener('click', showOrHideSideNav)


// > Adjust width of element to show rating represented in stars
document.querySelectorAll('[data-rating]').forEach(el => {
  const rating = el.dataset.rating
  el.style.width = rating + 'rem'
  el.innerText = `rated ${rating} stars`
})


// > Show sale indicator or not
document.querySelectorAll('.specialtyMenu-card').forEach(card => {
  const saleElement = card.querySelector('.sale')
  // ensure that element is empty and hidden to screen-readers
  saleElement.innerText = ''
  saleElement.ariaHidden = 'true'
  // ensure that element only has one class (sale)
  saleElement.className = 'sale'

  const addSale = () => {
    saleElement.innerText = 'Sale'
    saleElement.classList.add('show')
    saleElement.ariaHidden = 'false'
  }
  card.dataset.sale === 'true' && addSale()
})


// > Where's Rick?
const videoContainer = document.querySelector('.videoContainer')
const handleClickedMockVideo = () => {
  videoContainer.classList.toggle('isClicked')

  if (videoContainer.classList.contains('isClicked')) {
    const surpriseInner = `<iframe
            src="https://player.vimeo.com/video/623121479?h=bdfd0c9791&autoplay=1&loop=1&title=0&byline=0&portrait=0"
            style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
    const surprise = document.createElement('div')
    surprise.className = 'surprise'
    surprise.innerHTML = surpriseInner
    videoContainer.append(surprise)
    return // * implicit return
  }

  videoContainer.lastChild.remove()
}
videoContainer.addEventListener('click', handleClickedMockVideo)


// > Process Email Subscription
const email = document.getElementById('subscriber-email')
const processSubscription = () => {
  const modal = document.createElement('div')
  modal.className = 'modal'
  modal.innerHTML = '<div><p>Subscription Sent</p><p>But there\'s no backend. 😁</p><button>Close</button></div>'

  document.body.append(modal)

  /*
    trying out querySelector without a specific target class/id
    pretty sure it's not performant and/or not dev-friendly, though 🤷
  */
  const closeModalBtn = document.querySelector('.modal button')

  const closeModal = () => {
    document.body.removeChild(modal)
    closeModalBtn.removeEventListener('click', closeModal)
    email.value = ''
  }
  closeModalBtn.addEventListener('click', closeModal)

  // automatically close modal after 10s if not manually initiated
  setTimeout(closeModal, 10000)
}


// > Email Subscription Handler
const handleEmailSubscription = (e) => {
  e.preventDefault()
  const emailError = document.querySelector('.error')
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  emailError.className = 'error'
  emailError.innerText = ''
  // log(email.validity.valid) // username@domain is resulting to true rather than false
  // * npm validator might be a better option in the future
  const isValidEmail = emailRegExp.test(email.value)

  const addError = () => {
    emailError.classList.add('active')
    if (email.value === '') emailError.innerText = 'Please provide an email address'
    if (email.value.length > 0)  emailError.innerText = 'Please provide a valid email address'
  }
  !isValidEmail ? addError() : processSubscription()
}
document.querySelector('.subscription').addEventListener('submit', handleEmailSubscription)


// > Header Logo Animation
const animateLogo = () => {
  document.querySelector('.header-logo').classList.add('animating')
}
['focus', 'mouseover', 'animationend'].forEach(ev => {
  const headerLogo = document.querySelector('.header-logo')
  if (ev === 'animationend') {
    headerLogo.addEventListener(ev, () => headerLogo.classList.remove('animating'))
    return // implicit return --- removes the use of else
  }
  headerLogo.addEventListener(ev, animateLogo)
})


// > Show Search Input (header only)
/*
  trying out querySelector without a specific target class/id
  pretty sure it's not performant and/or not dev-friendly, though 🤷
*/
const navSearch = document.querySelector('header input[type=search]')
const toggleNavSearch = () => {
  navSearch.classList.toggle('searchActive')
}
navSearch.addEventListener('blur', toggleNavSearch)
document.querySelector('.btnSearch').addEventListener('click', toggleNavSearch)



// > Handling Order -- Add to Cart
const addOneToCart = (e) => {
  const cartElements = document.querySelectorAll('[data-cart]')
  let counter = cartElements[0].dataset.cart
  ++counter

  // update cart with counter value
  cartElements.forEach(cartELement => {
    cartELement.innerText = cartELement.dataset.cart = counter
    cartELement.closest('.counterContainer').classList.add('alertAdd')
  })

  // removes focus on button once clicked
  e.target.blur()
}
document.querySelectorAll('.orderBtn').forEach(btn => {
  btn.addEventListener('click', addOneToCart)
})

// > Removes alertAdd class after animation ends
/*
  allows changing duration on css animation only
  -- no need to update the setTimeout duration
  more preferred than setTimeout
*/
document.querySelectorAll('.counterContainer').forEach(container => {
  container.addEventListener('animationend', () => {
    container.classList.remove('alertAdd')
  })
})
