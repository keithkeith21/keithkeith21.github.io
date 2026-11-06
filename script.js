/* Portfolio interactions: mobile menu, active link, scroll reveal, contact form */
(function () {
  "use strict";
 
  // Enable reveal animations only when JavaScript is running
  document.documentElement.classList.add("js");
 
  // ----- Mobile menu -----
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
 
  function closeMenu() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
 
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
 
  menu.addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-link")) closeMenu();
  });
 
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
 
  // ----- Highlight the nav link of the section in view -----
  var links = document.querySelectorAll(".nav-link");
  var sections = Array.prototype.map.call(links, function (link) {
    return document.querySelector(link.getAttribute("href"));
  });
 
  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
 
    sections.forEach(function (s) { if (s) navObserver.observe(s); });
 
    // ----- Scroll reveal -----
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
 
    document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Older browsers: show everything
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  }
 
  // ----- Contact form (opens the visitor's email app) -----
  // TODO: replace with your real email address
  var CONTACT_EMAIL = "your.email@example.com";
 
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
 
  form.addEventListener("submit", function (e) {
    e.preventDefault();
 
    var name = form.elements.name;
    var email = form.elements.email;
    var message = form.elements.message;
    var valid = true;
 
    [name, email, message].forEach(function (field) {
      var ok = field.value.trim() !== "" && field.checkValidity();
      field.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });
 
    if (!valid) {
      status.className = "form-status error";
      status.textContent = "Please fill in every field with a valid email address.";
      return;
    }
 
    var subject = encodeURIComponent("Portfolio message from " + name.value.trim());
    var body = encodeURIComponent(message.value.trim() + "\n\nFrom: " + name.value.trim() + " (" + email.value.trim() + ")");
 
    status.className = "form-status";
    status.textContent = "Opening your email app...";
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
  });
 
  // ----- Footer year -----
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
