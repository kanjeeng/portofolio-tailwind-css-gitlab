// Navbar Fixed
window.onscroll = function () {
    const header = document.querySelector('header');
    const fixedNav =header.offsetTop;
    const toTop = document.querySelector('#to-top');

    if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    }else {
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
}

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});


// Klik di luar hamburger
window.addEventListener('click', function(e) {
    if(e.target != hamburger && e.target != navMenu) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

// Darkmode toggle (optional — only wired up if a #dark-toggle control exists on the page)
const darkToggle = document.querySelector('#dark-toggle');
const tsx = document.querySelector('tsx');

if (darkToggle && tsx) {
    darkToggle.addEventListener('click', function () {
        if (darkToggle.checked) {
            tsx.classList.add('dark');
        } else {
            tsx.classList.remove('dark');
        }
    });
}

