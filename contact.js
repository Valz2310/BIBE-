(function () {
    "use strict";

    function showError(input, message) {
        input.classList.add("error");
        var errorEl = input.parentElement.querySelector(".error-msg");
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add("visible");
        }
    }

    function clearError(input) {
        input.classList.remove("error");
        var errorEl = input.parentElement.querySelector(".error-msg");
        if (errorEl) {
            errorEl.classList.remove("visible");
        }
    }

    function validateName(value) {
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
    }

    function validateEmail(value) {
        if (!value.trim()) return "Email is required.";
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(value)) return "Please enter a valid email address.";
        return "";
    }

    function validatePhone(value) {
        if (!value.trim()) return "Phone number is required.";
        var digits = value.replace(/\D/g, "");
        if (digits.length < 9) return "Please enter a valid phone number.";
        return "";
    }

    function validateMessage(value) {
        if (!value.trim()) return "Message is required.";
        if (value.trim().length < 10) return "Message must be at least 10 characters.";
        return "";
    }

    function initContactForm() {
        var form = document.getElementById("contactForm");
        if (!form) return;

        var fields = {
            name: { input: document.getElementById("name"), validate: validateName },
            email: { input: document.getElementById("email"), validate: validateEmail },
            phone: { input: document.getElementById("phone"), validate: validatePhone },
            message: { input: document.getElementById("message"), validate: validateMessage }
        };

        Object.keys(fields).forEach(function (key) {
            var field = fields[key];
            if (!field.input) return;

            field.input.addEventListener("blur", function () {
                var error = field.validate(field.input.value);
                if (error) {
                    showError(field.input, error);
                } else {
                    clearError(field.input);
                }
            });

            field.input.addEventListener("input", function () {
                if (field.input.classList.contains("error")) {
                    var error = field.validate(field.input.value);
                    if (!error) clearError(field.input);
                }
            });
        });

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var isValid = true;

            Object.keys(fields).forEach(function (key) {
                var field = fields[key];
                if (!field.input) return;
                var error = field.validate(field.input.value);
                if (error) {
                    showError(field.input, error);
                    isValid = false;
                } else {
                    clearError(field.input);
                }
            });

            var successMsg = document.getElementById("formSuccess");
            if (isValid) {
                if (successMsg) successMsg.classList.add("visible");
                form.reset();
                setTimeout(function () {
                    if (successMsg) successMsg.classList.remove("visible");
                }, 5000);
            } else if (successMsg) {
                successMsg.classList.remove("visible");
            }
        });
    }

    document.addEventListener("DOMContentLoaded", initContactForm);
})();
