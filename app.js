const app = {
    init: function(selectors){
        this.flicks = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)


        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this))
    },

    renderListItem: function(flick){
        const item = document.createElement('li')
        item.dataset.id = flick.id
        item.textContent = flick.name

        const favoriteButton = document.createElement('button')
        const listUpButton = document.createElement('button')
        const listDownButton = document.createElement('button')
        const removeButton = document.createElement('button')

        favoriteButton.setAttribute('id', 'favButton')
        favoriteButton.textContent = 'Favorite!'
        favoriteButton.addEventListener('click', this.handleFavoriteButton.bind(this))
        item.appendChild(favoriteButton)

        listUpButton.setAttribute('id', 'upButton')
        listUpButton.textContent = 'Up'
        listUpButton.addEventListener('click', this.handleUpButton.bind(this))
        item.appendChild(listUpButton)

        listDownButton.setAttribute('id', 'downButton')
        listDownButton.textContent = 'Down'
        listDownButton.addEventListener('click', this.handleDownButton.bind(this))
        item.appendChild(listDownButton)

        removeButton.setAttribute('id', 'removeButton')
        removeButton.textContent = 'Remove'
        removeButton.addEventListener('click', this.handleRemoveButton.bind(this))
        item.appendChild(removeButton)

        return item
    },

    handleSubmit: function(ev) {
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
        }
        //console.log(flick)

        this.flicks.unshift(flick) //Adds to the front of the array

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)

        this.max++
        f.reset()
    },

    handleFavoriteButton: function(ev){
        ev.preventDefault()
        const b = ev.target
    },

    handleUpButton: function(ev){
        ev.preventDefault()
        const b = ev.target
    },

    handleDownButton: function(ev){
        ev.preventDefault()
        const b = ev.target
    },

    handleRemoveButton: function(ev){
        ev.preventDefault()
        const b = ev.target
    },
}


app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list'
})