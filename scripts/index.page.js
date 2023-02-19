// const commentLog = [];
getComments();
function getComments() {
    axios.get(`/comments?api_key=${key}`)
        .then(result => {
            result.data.forEach((comment) => {
                // console.log(comment);
                displayComment(comment)
            })
        })
        .catch(err => {
            console.log('There is an error', err);
        })
}

const commentContainer = document.querySelector('.comments-container');
const nameInput = document.querySelector('#input-name');
const textInput = document.querySelector('#input-comment');
const formSubmit = document.querySelector('#writable-form');

function displayComment(comment) {
    //first clear all existing comments
    // const logLength = commentContainer.children.length;
    // if (logLength > 0) {
    //     for (let i = 0; i < logLength; i++) {
    //         commentContainer.removeChild(commentContainer.lastChild);
    //     }
    // }
    commentContainer.appendChild(generateCommentHTML(comment))

    //sort array to render from latest comment(biggest ID) 
    // reverseLog = commentLog.sort((com1, com2) => com2.id - com1.id);
    //then render the array
    // reverseLog.forEach((comment) => {
    //     commentContainer.appendChild(generateCommentHTML(comment));
    // })
    //comment submit load animation
    // loadAnim();
}
// function loadAnim() {
//     commentContainer.children[0].classList.add('anim-load')
// }

function generateCommentHTML(comment) {
    const container = document.createElement('div');
    container.className = "comments-container__block";
    //left side, picture
    container.appendChild(setImage())
    //right side, text
    container.appendChild(buildText(comment))
    return container;
}

function setImage() {
    const leftContainer = document.createElement('div');
    leftContainer.className = "comments-container__profile";
    const background = document.createElement('div');
    background.className = "comments-container__icon";
    leftContainer.appendChild(background)
    return leftContainer;
}

function buildText(object) {
    const rightSection = document.createElement('div');
    rightSection.classList = "comments-container__text";
    //top div of the right side
    function buildTop(object) {
        const rightSectionTop = document.createElement('div');
        rightSectionTop.className = "comments-container__top";
        const name = document.createElement('p');
        name.className = "comments-container__name";
        name.innerText = object.name;
        const date = document.createElement('p');
        date.className = "comments-container__date";
        date.innerText = convertTime(object.timestamp);
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
        throw new Error
    } else {
        const newCommentObject = {
            name: nameInput.value,
            comment: textInput.value
        }
        postComment(newCommentObject);
        formSubmit.reset();
    }
})
function postComment(object) {
    axios.post(`/comments?api_key=${key}`, object)
        .then(result => {
            displayComment(result.data)
        })
        .catch(err => {
            console.log(err);
        })
}
function highlightError() {
    //select the hidden error messages with empty fields, change the field stylings and display additional info
    const [firstField, secondField] = document.querySelectorAll(".comments__error");
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
    //new date object created on submit event, time in epoch format returned
    const currentTime = new Date;
    const epoch = currentTime.getTime()
    return epoch;
}
function convertTime(epoch) {
    const currentDate = new Date();
    const minutes = Math.abs(currentDate.getTime() - epoch) / 60000;
    if (minutes < 1) {
        return '< 1 minute ago';
    }
    //minutes ago
    else if (minutes >= 1 && minutes <= 59) {
        const minInt = parseInt(minutes);
        if (minInt === 1) {
            return `1 minute ago`
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
