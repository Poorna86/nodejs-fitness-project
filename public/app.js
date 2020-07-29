// ======================================================
// ======================= CLIENT ======================= 
// ======================================================

// only display loader until all static files are fully loaded
document.onreadystatechange = () => {
	const state = document.readyState
	if (state === 'interactive') {
		console.log('here 1')
		return false
  	} else if (state === 'complete') {
		console.log('here 2')
  		setTimeout(() => {
        	document.querySelector('.loader').style.display = 'none'
        	document.querySelector('#fully-loaded').classList.remove('hide')
    	}, 500)
  	}
}

// force page scroll position to top upon page refresh
window.onbeforeunload = () => {
	console.log('here 3')
	window.scrollTo(0,0)
}

// ========= Navbar Functionality ========= 

// changes scrollbar background color when scrolling down at least 10 pixels
$(window).scroll(() => {
	console.log('here 4')
  $('nav').toggleClass('scrolled', $(this).scrollTop() > 10)
})

// clicking outside open navbar closes the navbar
document.addEventListener('click', (event) => { // Listen for all clicks on the document
	console.log('here 5')
	if (!event.target.closest('.navbar-toggler')) {
	// If a click happened on/inside the ACTIVE .navbar-collapse, don't run code to exit out of navbar
		console.log('here 6')
		if (event.target.closest('.navbar-collapse')) return
			console.log('here 7')
	    // Otherwise, run code, which exits out of active navbar
	    	$('.navbar-collapse').collapse('hide')
	}
}, false)

// ========= Register/Login Modal ========= 

// navbar buttons
const regNav = document.querySelector('#navbarRegister')
const logNav = document.querySelector('#navbarLogin')

// modals
const regModal = document.querySelector('#register-modal')
const logModal = document.querySelector('#login-modal')
const regContent = document.querySelector('#register-content')
const logContent = document.querySelector('#login-content')

// x button
const closeReg = document.querySelector('#register-close')
const closeLog = document.querySelector('#login-close')

// buttons inside modal
const regBtn = document.querySelector('#register-btn')
const logBtn = document.querySelector('#login-btn')

// open register modal if "sign up" button is clicked
regNav.addEventListener('click', () => {
	console.log('here 8')
	// if "sign up/login" buttons are clicked, exit out of expanded navbar
	$('.navbar-collapse').collapse('hide')

	// clicking on reg/log btn exits out of other modal, if other modal is open
	if (logModal.classList.contains('fadeIn')) {
		console.log('here 9')
		fadeOutModal()
	}

	// prevent scrolling while modal is open
	preventBodyScroll()

	// trigger modal
	regModal.classList.remove('fadeOut')
	regModal.classList.add('fadeIn')
	regContent.classList.remove('fadeOutUpBig', 'slow')
	regContent.classList.add('slideInDown')
	console.log('window.location.search 1: ', window.location.search)
	// if server sent back error message in search query, display message on modal
	if (window.location.search) {
		console.log('window.location.search 2: ', window.location.search)
		if (window.location.search.includes('Error:')) {
			console.log('window.location.search 3: ', window.location.search)
			const message = document.querySelector('#reg-message')
			message.innerText = decodeURI(window.location.search).replace(/[^a-zA-Z ]/g, "") + '.'
		} else if (!window.location.search.includes('Invalid')) {
				const message = document.querySelector('#reg-message')
				message.innerText = 'Error: ' + decodeURI(window.location.search).replace(/[^a-zA-Z ]/g, "") + '.'
			}
	}

})

// open login modal if "login" link is clicked
logNav.addEventListener('click', (event) => {
	// needed to prevent jumping to top of page from link click
	console.log('here 11')
	event.preventDefault()

	// if "sign up/login" buttons are clicked, exit out of expanded navbar
	$('.navbar-collapse').collapse('hide')

	// clicking on reg/log btn exits out of other modal, if other modal is open
	if (regModal.classList.contains('fadeIn')) {
		console.log('here 12')
		fadeOutModal()
	}

	// prevent scrolling while modal is open
	preventBodyScroll()

	// trigger modal
	logModal.classList.remove('fadeOut')
	logModal.classList.add('fadeIn')
	logContent.classList.remove('fadeOutUpBig', 'slow')
	logContent.classList.add('slideInDown')

	// if server sent back error message in search query, display message on modal
	if (window.location.search) {
		console.log('here 13')
		if (window.location.search.includes('Invalid')) {
			const message = document.querySelector('#log-message')
			message.innerHTML = 'Error: ' + decodeURI(window.location.search).replace(/[^a-zA-Z ]/g, "") + '. Please try again.<br>'
		}
	}

})

// clicking x exits out of modal
closeReg.onclick = () => fadeOutModal() 
closeLog.onclick = () => fadeOutModal() 

// clicking outside content div exits out of modal
window.onclick = (event) => {
	console.log('here 14')
  if (event.target == regModal) {
    fadeOutModal()
  } else if (event.target == logModal) {
  	fadeOutModal()
  }
}

const fadeOutModal = () => {
	console.log('here 15')
	restorePosition()
	console.log('here 16')
	regContent.classList.remove('slideInDown')
	regContent.classList.add('fadeOutUpBig', 'slow')
	logContent.classList.remove('slideInDown')
	logContent.classList.add('fadeOutUpBig', 'slow')
	setTimeout(() => { 
		console.log('here 17')
		regModal.classList.remove('fadeIn')
		regModal.classList.add('fadeOut')
		logModal.classList.remove('fadeIn')
		logModal.classList.add('fadeOut')
	}, 300)
}

const preventBodyScroll = () => {
	console.log('here 18')
	document.querySelector('nav').style.background = '#0a0a0a'
	document.body.style.top = '-' + window.scrollY + 'px'
	document.body.style.position = 'fixed'
}

const restorePosition = () => {
	console.log('here 19')
	const scrollY = document.body.style.top
	document.body.style.position = ''
	document.body.style.top = ''
	window.scrollTo(0, parseInt(scrollY || '0') * -1)
	document.querySelector('nav').style.background = ''
}

regBtn.addEventListener('click', (e) => {

	const phone = document.querySelector('#reg-phonenum')
	const phoneNum = /^\d{10}$/

	const message = document.querySelector('#reg-message')
    if(!phone.value.match(phoneNum)) { 
		message.innerText = 'Error: Invalid Phone number '
		phone.value = ''
		e.preventDefault()
	}
	
	const passField1 = document.querySelector('#reg-password')
	const passField2 = document.querySelector('#confirm')
	
	const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,18}$/

	if (!passField1.value.match(passw)) {
		message.innerText = 'Password between 8 and 18 characters; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.'
		passField1.value = ''
        passField2.value = ''
		e.preventDefault()
	}

	if (passField1.value !== passField2.value) {
		message.innerText = 'Error: Password fields do not match!'
		passField1.value = ''
        passField2.value = ''
		e.preventDefault()
	} 
})

// If there is a search query in the URL, open modal to display error message
if (window.location.search) {
	console.log('here 21')
	if (window.location.search.includes('Invalid')) {
		// Open login modal
		console.log('here 22')
		logNav.click()
	} else if (!window.location.search.includes('Invalid')) {
		// Open register modal
		console.log('here 23')
		regNav.click()
	} 
}