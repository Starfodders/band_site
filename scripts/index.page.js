const commentLog = [
    {
        profile: "",
        name: "Connor Walton",
        date: "02/17/2021",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        profile: "",
        name: "Emilie Beach",
        date: "01/09/2021",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        profile: "",
        name: "Miles Acosta",
        date: "12/20/2020",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }

]

const commentContainer = document.querySelector('.comments__container');
console.log(commentContainer);
//when the comments button is clicked, evoke the function again

//on page load and on comment submission, this function should be evoked so that the page gets re-rendered. 
function displayComment() {
    commentLog.forEach((com) => {
       commentContainer.appendChild(generateCommentHTML(com));
    })
}

function generateCommentHTML(com) {
    const container = document.createElement('div');
    container.className = "comments__container__block";
    //left side, picture
    const leftSection = document.createElement('div');
    leftSection.className = "comments__container__block__profile";
    const profile = document.createElement('img');
    profile.className = "comments__container__block__profile__picture";
    profile.src = com.profile;
    leftSection.appendChild(profile);
    container.appendChild(leftSection);
    //right side, text
    const rightSection = document.createElement('div');
    rightSection.classList = "comments__container__block__text"
    //top div of the right side
    const rightSectionTop = document.createElement('div');
    rightSectionTop.className = "comments__container__block__text__top";
    const name = document.createElement('p');
    name.className = "comments__container__block__text__top__name";
    name.innerText = com.name;
    const date = document.createElement('p');
    date.className = "comments__container__block__text__top__date";
    date.innerText = com.date;
    rightSectionTop.appendChild(name);
    rightSectionTop.appendChild(date);
    rightSection.appendChild(rightSectionTop)
    //comment block
    const commentText = document.createElement('p');
    commentText.className = "comments__container__block__text__comment";
    commentText.innerText = com.comment
    rightSection.appendChild(commentText);
    container.appendChild(rightSection);
    return container;
}

displayComment();