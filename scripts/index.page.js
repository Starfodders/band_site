const commentLog = [
    {
        src: null,
        name: "Connor Walton",
        date: "02/17/2021",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        src: null,
        name: "Emilie Beach",
        date: "01/09/2021",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        src: null,
        name: "Miles Acosta",
        date: "12/20/2020",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }

]
const commentContainer = document.querySelector('.comments__container');

//on page load and on comment submission, this function should be evoked so that the page gets re-rendered. 
function displayComment() {
    commentLog.forEach((comment) => {
       commentContainer.appendChild(generateCommentHTML(comment));
    })
}

function generateCommentHTML(comment) {
    const container = document.createElement('div');
    container.className = "comments__container__block";
    //left side, picture
    container.appendChild(setImage(comment))
    //right side, text
    container.appendChild(buildText(comment))
    return container;
}

function setImage(object) {
    //creates container div, checks for image, renders element
    const leftContainer = document.createElement('div');
    leftContainer.className = "comments__container__block__profile";
    if (!object.src) {
        const background = document.createElement('div');
        background.className = "comments__container__block__profile__icon";
        leftContainer.appendChild(background)
        return leftContainer;
    }else {
        const picture = document.createElement('img');
        picture.className = "comments__container__block__profile__picture";
        picture.src = object.src;
        picture.alt = "profile picture"
        leftContainer.appendChild(picture)
        return leftContainer;
    }
}

function buildText(object) {
    const rightSection = document.createElement('div');
    rightSection.classList = "comments__container__block__text";
    //top div of the right side
    function buildTop(object) {
        const rightSectionTop = document.createElement('div');
        rightSectionTop.className = "comments__container__block__text__top";
        const name = document.createElement('p');
        name.className = "comments__container__block__text__top__name";
        name.innerText = object.name;
        const date = document.createElement('p');
        date.className = "comments__container__block__text__top__date";
        date.innerText = object.date;
        rightSectionTop.appendChild(name);
        rightSectionTop.appendChild(date);
        rightSection.appendChild(rightSectionTop);
    }
    //comment section of right side
    function buildBottom(object) {
        const commentText = document.createElement('p');
        commentText.className = "comments__container__block__text__comment";
        commentText.innerText = object.comment;
        rightSection.appendChild(commentText);
    }
    buildTop(object);
    buildBottom(object);
    return rightSection;
}

displayComment();

