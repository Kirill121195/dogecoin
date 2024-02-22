"use strict";
document.addEventListener("DOMContentLoaded", () => {
    let newsContainer = document.querySelector("#news");
    let newsMoreButton = document.querySelector("#news_more_btn");
    let newsMoreText = newsMoreButton.querySelector(".button__text");
    let newsMoreSpinner = newsMoreButton.querySelector(".button__spinner");

    let currentPage = 1;
    let postsLimitPerPage = 5;
    let totalLoadedPosts = 0;
    let isPostsLoading = false;
    const maxPosts = 30;

    //Формируем каркас карточки
    const createPostCard = (post) => {
        const card = document.createElement("div");
        card.className = "news__card";

        const picture = document.createElement("picture");
        picture.className = "news__card-img";
        const img = document.createElement("img");
        img.src = "/img/hero_promo.webp";
        img.alt = post.title;
        picture.appendChild(img);

        const content = document.createElement("div");
        content.className = "news__card-content";

        const title = document.createElement("h3");
        title.className = "news__card-title";
        title.textContent = post.title;

        const preview = document.createElement("div");
        preview.className = "news__card-preview";
        preview.textContent = "How to increase your productivity with a Music";

        const descr = document.createElement("div");
        descr.className = "news__card-descr";
        descr.textContent = post.body;

        const info = document.createElement("div");
        info.className = "news__card-info";
        info.innerHTML = "Posted by <span>Eugenia</span>, on July 24, 2019";

        const button = document.createElement("a");
        button.className = "news__card-button";
        button.href = "#";
        button.textContent = "Continue reading";

        content.appendChild(title);
        content.appendChild(preview);
        content.appendChild(descr);
        content.appendChild(info);
        content.appendChild(button);

        card.appendChild(picture);
        card.appendChild(content);

        newsContainer.appendChild(card);
    };

    //Показываем спиннер при загрузке постов
    const showLoadingPostsSpinner = () => {
        newsMoreSpinner.style.display = "flex";
        newsMoreText.style.opacity = "0";
    };

    //Скрываем спиннер после загрузки постов
    const hideLoadingPostsSpinner = () => {
        newsMoreSpinner.style.display = "none";
        newsMoreText.style.opacity = "1";
    };

    //Получаем посты по 5 штук за один запрос с ограничением в 30штук
    const getPosts = () => {
        if (!isPostsLoading) {
            isPostsLoading = true;
            showLoadingPostsSpinner();
            fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsLimitPerPage}`)
                .then((response) => response.json())
                .then((posts) => {
                    if (posts.length > 0) {
                        totalLoadedPosts += posts.length;
                        posts.forEach((post) => createPostCard(post));
                        if (totalLoadedPosts < maxPosts) {
                            currentPage++;
                        } else {
                            newsMoreButton.style.display = "none";
                        }
                    }
                    isPostsLoading = false;
                    hideLoadingPostsSpinner();
                })
                .catch((error) => {
                    console.error("Ошибка при получении постов:", error);
                });
        }
    };

    //Получаем первую порцию постов при загрузки страницы
    getPosts();

    newsMoreButton.addEventListener("click", (event) => {
        event.preventDefault();
        getPosts();
    });
});
