import { starships } from "../Data/starships.js";

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.displaySection')

function populateView(starships) {
    starships.forEach(starship => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        let listItem = document.createElement('li')
        listItem.textContent = starship.name
        anchorWrap.addEventListener('click', () => {
            populateShipView(starship)
        })

        

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
    })
}

populateView(starships)

function populateShipView(shipData) {
    let shipImage = document.createElement('img')
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/15.jpg`
    shipView.appendChild(shipImage)
}