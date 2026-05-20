(function () {
    "use strict";

    function initAccordion() {
        var headers = document.querySelectorAll(".accordion-header");
        headers.forEach(function (header) {
            header.addEventListener("click", function () {
                var content = header.nextElementSibling;
                var isOpen = header.classList.contains("active");

                headers.forEach(function (h) {
                    h.classList.remove("active");
                    var c = h.nextElementSibling;
                    c.classList.remove("open");
                    c.style.maxHeight = null;
                });

                if (!isOpen) {
                    header.classList.add("active");
                    content.classList.add("open");
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });

        if (headers.length) {
            headers[0].click();
        }
    }

    function initMenuSearch() {
        var searchInput = document.getElementById("menuSearch");
        if (!searchInput) return;

        var items = document.querySelectorAll(".menu-item");
        var noResults = document.getElementById("noResults");

        searchInput.addEventListener("input", function () {
            var query = searchInput.value.toLowerCase().trim();
            var visibleCount = 0;

            items.forEach(function (item) {
                var name = item.querySelector(".item-name").textContent.toLowerCase();
                var desc = item.querySelector(".item-description").textContent.toLowerCase();
                var match = !query || name.indexOf(query) !== -1 || desc.indexOf(query) !== -1;

                item.classList.toggle("hidden", !match);
                if (match) visibleCount++;
            });

            if (noResults) {
                noResults.classList.toggle("visible", visibleCount === 0 && query.length > 0);
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initAccordion();
        initMenuSearch();
    });
})();
