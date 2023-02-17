const concertList = [
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
]

//create HTML element and populate it with the concert object information, append to container
const ticketContainer = document.querySelector('.tickets__choices');

function createListing(list) {
    list.forEach((item) => {
        ticketContainer.appendChild(generateShowHTML(item));
    })
}
createListing(concertList)

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
    for (let i = 0; i <= Object.keys(item).length - 1; i++) {
        const block = document.createElement('div');
        block.className = 'tickets__block';
        //make the headers (date, venue, location)
        const titleEl = document.createElement('p');
        titleEl.className = 'tickets__block--mobile-header large-hidden';
        titleEl.innerText = Object.keys(item)[i];
        //make the specific details of date, venue, location. Bold if 'date'
        const spanEl = document.createElement('span');
        if (titleEl.innerText === 'date') {
            spanEl.className = "bold";
        }
        spanEl.innerText = Object.values(item)[i];
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
