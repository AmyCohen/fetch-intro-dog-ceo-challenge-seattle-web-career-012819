console.log('%c HI', 'color: firebrick')


const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
let myDogArray = [];
fetch(imgUrl)
.then( response => response.json() )
.then( response => {
    for (let i = 0; i < response.message.length; i++) {
        myDogArray.push(response.message[i])
    }
    randomDogImages()
})

console.log("my dog array", myDogArray)

const randomImageContainer = document.getElementById('dog-image-container')
function randomDogImages () {
    
    let ul = document.createElement('ul')
    for (let i = 0; i < myDogArray.length; i++) {
        
        let li = document.createElement('li')
        
        let imgTag = document.createElement('img')
        imgTag.setAttribute('src', myDogArray[i])
        imgTag.setAttribute('alt', 'cute random dog picture')
        imgTag.width = 200

        li.appendChild(imgTag)
        ul.appendChild(li)
    }
    randomImageContainer.appendChild(ul)
}




const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let myBreeds = {}
let myBreedList = {}

fetch(breedUrl)
.then( response => response.json())
.then( data => parsingJson(data.message))
.then( info => {
    // console.log(info)
    myBreedList = Object.assign({}, info)
    // console.log(myBreedList)
})

function parsingJson (myJson) {
    const ul = document.getElementById('dog-breeds')
    
    for (let str in myJson) {
        const li = document.createElement('li')

        li.addEventListener('click', () => {
            li.classList.add('looked-at')
        })

        li.textContent = str
        
        if ((myJson[str].length !== 0)) {
            const subul = document.createElement('ul')
            if (myJson[str].length > 1) {
                for (let subBreed in myJson[str]) {
                    const subli = document.createElement('li')
                    subli.textContent = myJson[str][subBreed]
                    subul.appendChild(subli)
                }
            } else {
                const subli = document.createElement('li')
                subli.textContent = myJson[str]
                subul.appendChild(subli)
            }
            li.appendChild(subul)
        }
        ul.appendChild(li)
    }
    return myJson
}

// console.log(myBreedList)

function displayFilteredList() {

    const dropDown = document.getElementById('breed-dropdown').value
    console.log(dropDown)

    if (dropDown === "a") {
        filter(dropDown)
    } else if (dropDown === "b") {
        filter(dropDown)
    } else if (dropDown === "c") {
        filter(dropDown)
    } else if (dropDown === "d") {
        filter(dropDown)
    } 
    
}

function filter (letter) {
    clearList ()
    const ul = document.getElementById('dog-breeds')

    for (let str in myBreedList) {
        const li = document.createElement('li')

        if (letter === str[0]) {
            li.textContent = str
            
            if ((myBreedList[str].length !== 0)) {
                const subul = document.createElement('ul')
                if (myBreedList[str].length > 1) {
                    for (let subBreed in myBreedList[str]) {
                        const subli = document.createElement('li')
                        subli.textContent = myBreedList[str][subBreed]
                        subul.appendChild(subli)
                    }
                } else {
                    const subli = document.createElement('li')
                    subli.textContent = myBreedList[str]
                    subul.appendChild(subli)
                }
                li.appendChild(subul)
            }
            ul.appendChild(li)
        }
    }
}

function clearList () {
    const ul = document.getElementById('dog-breeds')

    while(ul.childElementCount > 0) {
        ul.firstElementChild.remove()
    }
}

//SOURCES:
//For loading up the image with the source, alt, and width
//--> https://stackoverflow.com/questions/226847/what-is-the-best-javascript-code-to-create-an-img-element

//For selecting the items from a dropdown menu with not attached to a form
//--> https://stackoverflow.com/questions/33932395/what-event-handler-do-i-need-to-use-for-a-drop-down-menu-list-in-javascript