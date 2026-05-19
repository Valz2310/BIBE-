(function () {
    "use strict";

    function initDarkMode() {
        var toggle = document.getElementById("darkModeToggle");
        if (!toggle) return;

        if (localStorage.getItem("blessFoodsDarkMode") === "true") {
            document.body.classList.add("dark-mode");
            toggle.textContent = "Light Mode";
        }

        toggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            var isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("blessFoodsDarkMode", isDark);
            toggle.textContent = isDark ? "Light Mode" : "Dark Mode";
        });
    }

    function setActiveNavLink() {
        var currentPage = window.location.pathname.split("/").pop() || "index.html";
        var links = document.querySelectorAll(".nav-links a");
        links.forEach(function (link) {
            var href = link.getAttribute("href");
            if (href === currentPage || (currentPage === "" && href === "index.html")) {
                link.classList.add("active");
            }
        });
    }

    function initScrollAnimations() {
        var elements = document.querySelectorAll(".fade-in");
        if (!elements.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    function initCarousel() {
        var carousel = document.querySelector(".carousel");
        if (!carousel) return;

        var inner = carousel.querySelector(".carousel-inner");
        var slides = carousel.querySelectorAll(".carousel-slide");
        var prevBtn = carousel.querySelector(".carousel-btn.prev");
        var nextBtn = carousel.querySelector(".carousel-btn.next");
        var dotsContainer = carousel.querySelector(".carousel-dots");
        var current = 0;
        var total = slides.length;
        var autoPlay;

        function goToSlide(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            current = index;
            inner.style.transform = "translateX(-" + current * 100 + "%)";

            var dots = dotsContainer.querySelectorAll(".carousel-dot");
            dots.forEach(function (dot, i) {
                dot.classList.toggle("active", i === current);
            });
        }

        slides.forEach(function (_, i) {
            var dot = document.createElement("button");
            dot.className = "carousel-dot" + (i === 0 ? " active" : "");
            dot.setAttribute("aria-label", "Go to slide " + (i + 1));
            dot.addEventListener("click", function () {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        if (prevBtn) {
            prevBtn.addEventListener("click", function () {
                goToSlide(current - 1);
                resetAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                goToSlide(current + 1);
                resetAutoPlay();
            });
        }

        function startAutoPlay() {
            autoPlay = setInterval(function () {
                goToSlide(current + 1);
            }, 5000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlay);
            startAutoPlay();
        }

        startAutoPlay();
    }

    document.addEventListener("DOMContentLoaded", function () {
        initDarkMode();
        setActiveNavLink();
        initScrollAnimations();
        initCarousel();
    });
})();
