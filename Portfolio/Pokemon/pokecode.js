function removeChildren(container){
  while (container.firstChild){
  container.removeChild(container.firstChild)
  }
  }

function getAPIData(url) {
    try {
      return fetch(url).then((data) => data.json())
    } catch (error) {
      console.error(error)
    }
  }
  
  function loadPokemon(offset = 0, limit = 25) {
     removeChildren(pokeGrid)
      getAPIData(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`,) 
      .then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData => populatePokeCard(pokeData))
      )
    }

  })
  }

  

  const pokeGrid = document.querySelector('.pokeGrid')
  const loadButton = document.querySelector('.loadPokemon')
  loadButton.addEventListener('click', () => {
  loadPokemon(0, 25)
  })
  const newPokemon = document.querySelector('.newPokemon')
  newPokemon.addEventListener('click', () => {
      let pokeName = prompt('Name your new Pokemon!')
      let pokeHeight = prompt ('How tall is your Pokemon?')
      let pokeAbilities = prompt('What are your Pokemon abilites? (use a comma seperated list.')
      let newPokemon = new Pokemon(pokeName, pokeHeight, 3785, getAbilitiesArray (pokeAbilities))
      populatePokeCard(newPokemon)
  })

const morePokemon = document.querySelector('.morePokemon')
morePokemon.addEventListener('click', () => {
    let startPoint = prompt('Which Pokemon Id do we start with?')
    let howMany = prompt ('how many do you want to see?')
    loadPokemon(startPoint, howMany)
})


  function getAbilitiesArray(commaString) {
      let tempArray = commaString.split(',')
      return tempArray.map((abilityName) => {
          return {
              ability: {
                  name: abilityName
              }
          }
      })
  }
  
  function populatePokeCard(singlePokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => 
      pokeCard.classList.toggle('is-flipped')
    )
    const front = populateCardFront(singlePokemon)
    const back = populateCardBack(singlePokemon)
  
    pokeCard.appendChild(front)
    pokeCard.appendChild(back)
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
  }
  
  function populateCardFront(pokemon) {
    const pokeFront = document.createElement('figure')
    pokeFront.className = 'cardFace front'
    const pokeImg = document.createElement('img')
    if(pokemon.id === 9001) {
        pokeImg.src = 'Poke-ball-gloss.png'
    } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    const pokeCaption = document.createElement('figcaption')
    pokeCaption.textContent = `${pokemon.name} `
    pokeFront.appendChild(pokeImg)
    pokeFront.appendChild(pokeCaption)
    return pokeFront
  }
}
  function populateCardBack(pokemon) {
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'
    const label = document.createElement('h4')
    label.textContent = 'Abilities:'
    const abilityList = document.createElement('ul')
    abilityList.className = `list`
    pokemon.abilities.forEach((ability) => {
      let abilityItem = document.createElement('li')
      abilityItem.textContent = ability.ability.name
      abilityItem.className = `abilityList`
      abilityList.appendChild(abilityItem)
    })
    const pokeHP = document.createElement('h4')
    pokeHP.textContent = `Hit Points: ${pokemon.stats[0].base_stat}`
    console.log(pokemon.id)

    let pokeID = document.createElement('h4')
    pokeID.textContent = `Number: ${pokemon.id}`
  




    pokeBack.appendChild(label)
    pokeBack.appendChild(abilityList)
    pokeBack.appendChild(pokeHP)
    pokeBack.appendChild(pokeID)
    return pokeBack
  }

  class pokemon {
      constructor(name, height, weight, abilities) {
          this.id = 9001,
          this.name = name,
          this.height = height,
          this.weight = weight
          this.abilities = abilities
      }
  }
