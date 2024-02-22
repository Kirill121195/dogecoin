"use strict";
document.addEventListener("DOMContentLoaded", () => {
    let $menu = document.querySelector(".js-header-menu"),
        $headerBurger = document.querySelector(".js-header-burger");

    //Открытие меню
    $headerBurger.addEventListener("click", function (e) {
        e.preventDefault();
        this.classList.toggle("header__burger_active");

        if (this.classList.contains("header__burger_active")) {
            this.setAttribute("aria-expanded", "true");
            document.body.style.overflow = "hidden";
            $menu.classList.add("header__menu_active");
        } else {
            this.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
            $menu.classList.remove("header__menu_active");
        }
    });
});
