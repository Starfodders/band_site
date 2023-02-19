getShows()
function getShows() {
    axios.get(`https://project-1-api.herokuapp.com/showdates?api_key=${key}`)
        .then(result => {
            console.log(result.data);
            result.data.forEach((item) => {
                createListing(item)
            })
        })
        .catch(err => {
            console.log(err);
        })
}
//create HTML element and populate it with the concert object information, append to container
const ticketContainer = document.querySelector('.tickets__choices');

function createListing(item) {
    ticketContainer.appendChild(generateShowHTML(item));
}

//each item is an object
function generateShowHTML(item) {
    const newContainer = document.createElement('div');
    newContainer.className = "tickets__item";
    addBlock(item, newContainer)
    addListeners(newContainer);
    return newContainer
}
function addBlock(item, container) {
    //builds as many blocks as there are details per concert
    for (let i = 1; i <= Object.keys(item).length - 1; i++) {
        const block = document.createElement('div');
        block.className = 'tickets__block';
        //make the headers (date, venue, location)
        const titleEl = document.createElement('p');
        titleEl.className = 'tickets__block--mobile-header large-hidden';
        titleEl.innerText = Object.keys(item)[i];
        //make the specific details of date, venue, location. Bold if 'date'. Run convertTime() to change epoch time to readable time
        const spanEl = document.createElement('span');
        if (titleEl.innerText === 'date') {
            spanEl.className = "bold";
            spanEl.innerText = convertTime(Object.values(item)[i])
        } else {
            spanEl.innerText = Object.values(item)[i];
        }
        block.appendChild(titleEl);
        block.appendChild(spanEl);
        container.appendChild(block);
    }
    container.appendChild(buildButton())
}
function buildButton() {
    const buttonBlock = document.createElement('div');
    buttonBlock.className = "tickets__block";
    const button = document.createElement('button');
    button.className = "tickets__button";
    button.innerText = "Buy Tickets"
    buttonBlock.appendChild(button);
    return buttonBlock;
}

//creates html element that displays date, venue, location on larger breakpoints, prepends to the container
function addTabletHeader() {
    const valueArray = ['Date', 'Venue', 'Location', 'Spacer']
    const heading = document.querySelector('.tickets__choices');
    const element = document.createElement('div');
    element.className = "tickets__item tablet-header";
    for (let i = 0; i < valueArray.length; i++) {
        const block = document.createElement('div');
        block.className = "tickets__block";
        //spacer is class given with visibility none for formatting
        if (valueArray[i] === 'Spacer') {
            block.className = "tickets__block spacer";
        }
        block.innerText = valueArray[i]
        element.appendChild(block);
    }
    heading.prepend(element);
}
addTabletHeader();

//clear all active styles, then apply selected style on clicked ticket item
function addListeners(element) {
    element.addEventListener('click', () => {
        clearSelected();
        element.classList.add('selected');
    })
}
function clearSelected(){
    const ticketNode = document.querySelector('.tickets__choices');
    const ticketList = ticketNode.children;
    for (let i = 0; i < ticketList.length; i++) {
        ticketList[i].classList.remove('selected')
    }
}

function convertTime(epoch) {
    const date = new Date(epoch);
    const day = date.getDate();
    const month = date.toLocaleDateString('default', {month: 'short'});
    const year = date.getFullYear();
    const dateString = `${getDayOfWeek(epoch)} ${month} ${day} ${year}`
    return dateString;
}

function getDayOfWeek(num) {
    const date = new Date(num).getDay();
    switch (date){
        case 0:
          day = "Sun";
          break;
        case 1:
          day = "Mon";
          break;
        case 2:
           day = "Tue";
          break;
        case 3:
          day = "Wed";
          break;
        case 4:
          day = "Thur";
          break;
        case 5:
          day = "Fri";
          break;
        case 6:
          day = "Sat";
      }
      return day;
}

