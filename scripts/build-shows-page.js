//in order to display show content dynamically, need three pieces: date, venue, location.

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

function generateShowHTML(item) {
    const newContainer = document.createElement('div');
    newContainer.className = "tickets__choices__item";
    //iterate over every key-value pair in the passed down object
    let itemLength = Object.keys(item).length;
    for (let i = 0; i < itemLength; i++) {
        const block = document.createElement('div');
        block.className = 'tickets__choices__item__block';
        const titleEl = document.createElement('p');
        titleEl.className = "tickets__choices__item__block__mobile-header";
        titleEl.innerText = Object.keys(item)[i].toString();
        block.appendChild(titleEl);

        const spanEl = document.createElement('span');
        //applies bold to the element if its 'date'
        if (Object.keys(item)[i].toString() === 'date') {
            spanEl.className = "bold";
        }
        spanEl.innerText = Object.values(item)[i];
        block.appendChild(spanEl);
        newContainer.appendChild(block);
    }
    //add button element
    const buttonBlock = document.createElement('div');
    buttonBlock.className = "tickets__choices__item__block";
    const button = document.createElement('button');
    button.className = "tickets__choices__item__button";
    button.innerText = "Buy Tickets"
    buttonBlock.appendChild(button);
    newContainer.appendChild(buttonBlock);

    return newContainer;
}


//hide the mobile headers (date, venue, location) on larger breakpoints
const ticketHeaders = document.querySelectorAll('.tickets__choices__item__block__mobile-header');
function addHiddenClass(list) {
    for (let i = 0; i < list.length; i++) {
        list[i].classList.add('large-hidden')
    }
}
addHiddenClass(ticketHeaders)

//creates html element that displays date, venue, location on larger breakpoints, prepends to the container
function addTabletHeader() {
    const valueArray = ['Date', 'Venue', 'Location', 'Spacer']
    const heading = document.querySelector('.tickets__choices');
    const element = document.createElement('div');
    element.className = "tickets__choices__item tablet-header";
    for (let i = 0; i < valueArray.length; i++) {
        const block = document.createElement('div');
        block.className = "tickets__choices__item__block";
        //spacer is class given with visibility none for formatting
        if (valueArray[i] === 'Spacer') {
            block.className = "tickets__choices__item__block spacer";
        }
        block.innerText = valueArray[i]
        element.appendChild(block);
    }
    heading.prepend(element);
}
addTabletHeader();

