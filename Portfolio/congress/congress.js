import { senators } from '../data/senators.js'
import { representatives } from '../Data/representatives.js'

const members = [...senators, ...representatives] 

const senatorDiv = document.querySelector('.senators')
const loyaltyHeading = document.querySelector('.mostLoyal')
const seniorityHeading = document.querySelector('.seniority')


/*const party = document.querySelector('.buttons')
partyButton = document.createElement('button')
partyButton.textContent = "Test me"

partyButton.addEventlistener('click', () => populateSenatorDiv(short_title))

party.appendChild(partyButton)

const section = document.createElement('header')
const senatorsButton = document.createElement('button')
senatorsButton.textContent = 'Button'

senatorsButton.addEventListener('click', () => populateSenatorDiv(title))
section.appendChild(senatorsButton)




//senatorsButton.addEventListener('click', () => populateSenatorDiv(party))
//representativeButton.addEventListener('click', () => populateSenatorDiv(title)) 

I could not get the buttons to work at all.... :,(*/

function SimplifiedMembers(chamberFilter) {
  const filteredArray = members.filter(member => chamberFilter ? member.short_title === chamberFilter : members)

  return filteredArray.map((senator) => {
    let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      gender: senator.gender,
      seniority: +senator.seniority,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    }
  })
}

function populateSenatorDiv(simpleSenators) {
  simpleSenators.forEach((senator) => {
    const senFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')

    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorDiv.appendChild(senFigure)
  })
}

const mostSeniorMember = SimplifiedMembers().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)

seniorityHeading.textContent = `The oldest fart of congress is ${mostSeniorMember.name} who has been in congress for ${mostSeniorMember.seniority} years. `

const mostLoyal = SimplifiedMembers().reduce((acc, senator) => {
  if (senator.loyaltyPct === 100) {
    acc.push(senator)
  }
  return acc
}, [])

const cowardList = document.createElement('ol')

const spineless = mostLoyal.map(coward => {
    let listItem = document.createElement('li')
    listItem.textContent = coward.name
    cowardList.appendChild(listItem)
})

loyaltyHeading.appendChild(cowardList)



populateSenatorDiv(SimplifiedMembers())