// Hamburger Menu Toggle //
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });


        window.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
});

// Tutorial Toggle //
    const tutorialBtn = document.getElementById('toggleTutorial');
    const tutorialContent = document.getElementById('tutorialContent');
    const tutorialArrow = document.getElementById('tutorialArrow');

tutorialBtn.addEventListener('click', () => {
    const isExpanded = tutorialContent.style.maxHeight && tutorialContent.style.maxHeight !== "0px";
    if (isExpanded) {
        tutorialContent.style.maxHeight = "0px";
        tutorialArrow.classList.remove('rotate-180');
    } else {
        tutorialContent.style.maxHeight = tutorialContent.scrollHeight + "px";
        tutorialArrow.classList.add('rotate-180');
    }
});