const fadeElements = document.querySelectorAll('.fade-up, .fade-up-delay');

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
        }

    });

}, {
    threshold: 0.2
});

fadeElements.forEach((element) => {
    observer.observe(element);
});