const app = {
    init: function(selectors){
        this.flicks = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)


        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this))
    },

    renderListItem: function(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item.querySelector(".flick-name").textContent = flick.name

        item.querySelector('button.del').addEventListener('click', this.removeFlick.bind(this, flick)) //bind will pass down 'flick' to the remove function
        item.querySelector('button.fav').addEventListener('click', this.favFlick.bind(this, flick))
        item.querySelector('button.up').addEventListener('click', this.moveFlickUp.bind(this, flick))

        return item
    },

    handleSubmit: function(ev) {
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
            fav: false,
        }
        //console.log(flick)

        this.flicks.unshift(flick) //Adds to the front of the array

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)

        this.max++
        f.reset()
    },

    removeFlick: function(flick, ev){
        //Remove from the DOM
        const listItem = ev.target.closest('.flick')
        listItem.remove()

        //Remove from the array
        const i = this.flicks.indexOf(flick)

        this.flicks.splice(i, 1); //remove 1 thing
    },

    favFlick(flick, ev){
        const listItem = ev.target.closest('.flick')
        flick.fav = !flick.fav
        //flick.fav = listItem.classList.toggle('fav') --> Another option for this
        if(flick.fav){
            listItem.classList.add('fav')
        }
        else{
            listItem.classList.remove('fav')
        }
        
    },

    moveFlickUp(flick, ev){
        
    }
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template'
})

//Move up --> Use insert above and use previous element (previous sibling or prev element sibling)
//      For in the array use temp variable and swap

//Move down --> get the one underneath and move that down (next sibling function)