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
        item.textContent = flick.name

        const favoriteButton = document.createElement('button')
        favoriteButton.setAttribute('id', 'favButton')
        favoriteButton.textContent = 'Favorite!'
        favoriteButton.addEventListener('click', this.handleFavoriteButton.bind(this))
        item.appendChild(favoriteButton)

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

        this.flicks.push(flick)

        const listItem = this.renderListItem(flick)
        this.list.appendChild(listItem)

        this.max++
    },

    handleFavoriteButton: function(ev){
        ev.preventDefault()
        const f = ev.target
    },
}


app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list'
})