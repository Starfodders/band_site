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
        //larger block
        const newContainer = document.createElement('div');
            newContainer.className = "tickets__choices__item";
        //date element
        const itemBlock1 = document.createElement('div');
            itemBlock1.className = "tickets__choices__item__block";
        const titleEl1 = document.createElement('p');
            titleEl1.className = "tickets__choices__item__block__mobile-header";
            titleEl1.innerText = 'Date'
            itemBlock1.appendChild(titleEl1);
        const spanEl1 = document.createElement('span');
            spanEl1.className = "bold"
            spanEl1.innerText = item.date;
            itemBlock1.appendChild(spanEl1);
        //venue element
        const itemBlock2 = document.createElement('div');
            itemBlock2.className = "tickets__choices__item__block";
        const titleEl2 = document.createElement('p')
            titleEl2.className = "tickets__choices__item__block__mobile-header";
            titleEl2.innerText="Venue"
            itemBlock2.appendChild(titleEl2)
        const spanEl2 = document.createElement('span');
            spanEl2.innerText = item.venue;
            itemBlock2.appendChild(spanEl2);
        //location element
        const itemBlock3 = document.createElement('div');
            itemBlock3.className = "tickets__choices__item__block";
        const titleEl3 = document.createElement('p')
            titleEl3.className = "tickets__choices__item__block__mobile-header";
            titleEl3.innerText="Location"
            itemBlock3.appendChild(titleEl3)
        const spanEl3 = document.createElement('span');
            spanEl3.innerText = item.location;
            itemBlock3.appendChild(spanEl3);
        //button element
        const itemBlock4 = document.createElement('div');
            itemBlock4.className = "tickets__choices__item__block";
        const button = document.createElement('button');
            button.className = "tickets__choices__item__button"
            button.innerText = "Buy Tickets"
            itemBlock4.appendChild(button);
        //add all blocks into item container
        newContainer.appendChild(itemBlock1);
        newContainer.appendChild(itemBlock2)
        newContainer.appendChild(itemBlock3)
        newContainer.appendChild(itemBlock4)
        ;
            
         



        // newDiv.className = "tickets__choices__item";
        // newDiv.innerHTML = `<div class = "tickets__choices__item__block"><p class = "tickets__choices__item__block__mobile-header">Date</p>
        // <span class = "bold">${item.date}</span></div>
        //     <div class = "tickets__choices__item__block"><p class = "tickets__choices__item__block__mobile-header">Venue</p>${item.venue}</div>
        //     <div class = "tickets__choices__item__block"><p class = "tickets__choices__item__block__mobile-header">Location</p>${item.location}</div>
        //     <div class = "tickets__choices__item__block">
        //         <button class = "tickets__choices__item__button">Buy Tickets</button>
        //     </div>`
        // newDiv.addEventListener('click', () => {
        //     newDiv.classList.toggle('clicked')
        // })
    
        ticketContainer.appendChild(newContainer)
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

