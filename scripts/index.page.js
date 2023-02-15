const commentLog = [
    {
        id: 1,
        src: null,
        name: "Miles Acosta",
        date: "12/20/2020",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
        
    },
    {
        id: 2,
        src: null,
        name: "Emilie Beach",
        date: "01/09/2021",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        id: 3,
        src: null,
        name: "Connor Walton",
        date: "02/17/2021",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    }

]
const commentContainer = document.querySelector('.comments__container');
const nameInput = document.querySelector('#input-name');
const textInput = document.querySelector('#input-comment');
const formSubmit = document.querySelector('#writable-form');

function displayComment() {
    //first clear all existing comments
    const logLength = commentContainer.children.length;
    if (logLength > 0) {
        for (let i = 0; i < logLength; i++) {
            commentContainer.removeChild(commentContainer.lastChild);
        }
    }
    //sort array to render from latest comment(biggest ID) 
    reverseLog = commentLog.sort((com1, com2) => com2.id - com1.id);
    //then render the array
    reverseLog.forEach((comment) => {
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
    } else {
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
        date.innerText = returnReadableTime(object.date);
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

formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nameInput.value || !textInput.value) {
        highlightError();
        throw new RangeError('Must enter valid input values');
    } else {
        let inputHolder = [];
        let id = commentLog.length + 1;
        inputHolder.push(id, nameInput.value, returnNewTime(), textInput.value);
        const newCommentObject = {
            id: inputHolder[0],
            src: null,
            name: inputHolder[1],
            date: inputHolder[2],
            comment: inputHolder[3]
        }
        //prepend new object into array, clear fields, re-render the comments
        commentLog.push(newCommentObject);
        nameInput.value = '';
        textInput.value = '';
        displayComment();
    }
})

function highlightError() {
    //select the hidden error messages, with empty fields change the field stylings and display additional info
    const [firstField, secondField] = document.querySelectorAll(".comments__write__right__error");
    if (!nameInput.value) {
        nameInput.classList.add('error-border')
        firstField.classList.remove('error-message')
        nameInput.addEventListener('click', function removeError() {
            nameInput.classList.remove('error-border');
            firstField.classList.add('error-message')
            nameInput.removeEventListener('click', removeError);
        })
    }
    if (!textInput.value) {
        textInput.classList.add('error-border')
        secondField.classList.remove('error-message')
        textInput.addEventListener('click', function removeError() {
            textInput.classList.remove('error-border')
            secondField.classList.add('error-message')
            textInput.removeEventListener('click', removeError);
        })
    }
}
function returnNewTime() {
    //new date object created on submit event, is then passed into converter for readability
    const currentTime = new Date;
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const year = currentTime.getFullYear();
    const date = `0${month}/${day}/${year}`;
    return date;
}
function returnReadableTime(date) {
    //get timestamps for both current day and day comment was made
    const currentDate = new Date();
    const commentDate = new Date(date);
    const difference = currentDate.getTime() - commentDate.getTime();           //returns in ms
    //convert to usable format (minutes) and compare
    const minutes = Math.round(difference / 60000);
    if (minutes < 1) {
        return 'Less than a minute ago';
    }
    //minutes ago
    else if (minutes >= 1 && minutes <= 59) {
        const minInt = parseInt(minutes);
        if (minInt === 1) {
            return `< 1 minute ago`
        } else {
            return `${minInt} minutes ago`
        }
    }
    //hours ago
    else if (minutes >= 60 && minutes <= 1439) {
        const hourInt = parseInt(minutes / 60);
        if (hourInt === 1) {
            return `${hourInt} hour ago`
        } else {
            return `${hourInt} hours ago`
        }
    }
    //days ago, goes up to a month
    else if (minutes >= 1440 && minutes <= 43799) {
        const dayInt = parseInt(minutes / 1440);
        if (dayInt === 1) {
            return `${dayInt} day ago`
        } else {
            return `${dayInt} days ago`
        }
    }
    //months ago up to a year
    else if (minutes >= 43800 && minutes <= 525599) {
        const monthInt = parseInt(minutes / 43800);
        if (monthInt === 1) {
            return `${monthInt} month ago`
        } else {
            return `${monthInt} months ago`
        }
    }
    //years ago
    else {
        const yearInt = parseInt(minutes / 525600);
        if (yearInt === 1) {
            return `${yearInt} year ago`
        } else {
            return `${yearInt} years ago`
        }
    }
}

//on page load, run to display current comments
displayComment();

//question: should the new object be added to end of the array for consistency?


