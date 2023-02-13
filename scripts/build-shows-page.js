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
        const newDiv = document.createElement('div');
        newDiv.className = "tickets__choices__item";
        newDiv.innerHTML = `<div class = "tickets__choices__item__block"><p class = "tickets__choices__item__block__mobile-header">Date</p><span class = "bold">${item.date}</span></div>
            <div class = "tickets__choices__item__block"><p class = "tickets__choices__item__block__mobile-header">Venue</p>${item.venue}</div>
            <div class = "tickets__choices__item__block"><p class = "tickets__choices__item__block__mobile-header">Location</p>${item.location}</div>
            <div class = "tickets__choices__item__block">
                <button class = "tickets__choices__item__button">Buy Tickets</button>
            </div>`
        // newDiv.addEventListener('click', () => {
        //     newDiv.classList.toggle('clicked')
        // })
        ticketContainer.appendChild(newDiv)
    })
}
createListing(concertList)

//hide the mobile headers (date, venue, location) on larger breakpoints
const ticketHeaders = document.querySelectorAll('.tickets__choices__item__block__mobile-header');
function addHiddenClass(list) {
    for(let i = 0; i < list.length; i++) {
        list[i].classList.add('large-hidden')
    }
}
addHiddenClass(ticketHeaders)

function addTabletHeader() {
    const heading = document.querySelector('.tickets__choices');
    const element = document.createElement('div');
    element.className = "tickets__choices__item tablet-header";
    element.innerHTML = `<div class = "tickets__choices__item__block">Date</div>
                        <div class = "tickets__choices__item__block">Venue</div>
                        <div class = "tickets__choices__item__block">Location</div>
                        <div class ="tickets__choices__item__block spacer">Spacer</div>`
    heading.prepend(element);
}
addTabletHeader();

//For future functionality, should be able to input a day such as Jan 20 2022 and be given the Day of Week
// function getDayOfWeek(date) {
//     const dayString = new Date(date)
//     switch (dayString.getDay()) {
//         case 1:
//             day = 'Mon'
//             break;
//         case 2:
//             day = 'Tue'
//             break;
//         case 3:
//             day = 'Wed'
//             break;
//         case 4:
//             day = 'Thur'
//             break;
//         case 5:
//             day = 'Fri'
//             break;
//         case 6:
//             day = 'Sat'
//             break;
//         case 0:
//             day = 'Sun'
//             break;
//         default:
//             throw new TypeError('Please provide a valid date in format Month-Day-Year')
//     }
//     return day;
// }

