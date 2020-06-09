const app = {
    init: function(selectors){
        this.flicks = []
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
		
		//Dont need to do this because its global to window, and we can just say localStorage (see save function)
		//this.localStorage = window.localStorage
		
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handleSubmit.bind(this))
			
		this.load()
    },
	
	load() {
		//Load json from localstorage
		const flicksJSON = localStorage.getItem('flicks')
		//Convert json back into array
		const flicksArr = JSON.parse(flicksJSON)
		
		if(flicksArr){
			flicksArr.reverse()
			.map(this.addFlick.bind(this))
		}
	},

	save() {
		localStorage.setItem('flicks', JSON.stringify(this.flicks));
	},
	
	//Can also just do renderListItem(flick){}
    renderListItem: function(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
		
		if(flick.fav) {
			item.classList.add('fav')
		}
		
		const nameSpan = item.querySelector('.flick-name')
		
        nameSpan.textContent = flick.name
		nameSpan.addEventListener(
			'keypress',
			this.saveOnEnter.bind(this, flick, item)
		)

        item.querySelector('button.del').addEventListener('click', this.removeFlick.bind(this, flick)) //bind will pass down 'flick' to the remove function
        item.querySelector('button.fav').addEventListener('click', this.favFlick.bind(this, flick))
        item.querySelector('button.up').addEventListener('click', this.moveFlickUp.bind(this, flick))
        item.querySelector('button.down').addEventListener('click', this.moveFlickDown.bind(this, flick))
		item.querySelector('button.edit').addEventListener('click', this.toggleEditable.bind(this, flick, item))


        return item
    },
	
	addFlick(flick) {
		this.flicks.unshift(flick) //Adds to the front of the array

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)
		
		if(flick.id > this.max){
			this.max = flick.id
		}
		
		this.save()
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
		
		this.addFlick(flick)
		
		f.reset() // reset the form after handling submit
    },

	saveOnEnter(flick, listItem, ev) {
		if(ev.key === 'Enter'){
			this.toggleEditable(flick, listItem)
		}
	},
	
	toggleEditable: function(flick, listItem, ev){
		const listItemName = listItem.querySelector('.flick-name')
		//const btn = ev.currentTarget //need to use currentTarget because just using target may get the icon instead
		const btn = listItem.querySelector('button.edit')
		//console.log(btn)
		const icon = btn.querySelector('i.fa')
		
		if(listItemName.isContentEditable){
			listItemName.contentEditable = "false"
			icon.classList.remove('fa-check')
			icon.classList.add('fa-edit')
			btn.classList.remove('success')
			
			//save changes
			flick.name = listItemName.textContent
			this.save()
		}
		else{
			//make it editable
			listItemName.contentEditable = "true"
			listItemName.focus()
			icon.classList.remove('fa-edit')
			icon.classList.add('fa-check')
			btn.classList.add('success')
		}
		
	},
	
    removeFlick: function(flick, ev){
        //Remove from the DOM
        const listItem = ev.target.closest('.flick') //checks the ancestors for a match
        listItem.remove()

        //Remove from the array
        const i = this.flicks.indexOf(flick)

        this.flicks.splice(i, 1); //remove 1 thing
		
		this.save()
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
		// or just flick.fav = listItem.classList.toggle('fav')
		
		this.save()
        
    },

    moveFlickUp(flick, ev){
        const listItem = this.list.querySelector(`[data-id="${flick.id}"]`)
        const i = this.flicks.indexOf(flick)
        //update the array
        if(i === 0){
            console.log("Can't move list item any higher")
        }
        else{
            const temp = this.flicks[i]
            this.flicks[i] = this.flicks[i-1]
            this.flicks[i-1] = temp

            //Move list item in DOM
            this.list.insertBefore(listItem, listItem.previousSibling)

			this.save()
        }
        
    },

    moveFlickDown(flick, ev){
        const listItem = ev.target.closest('.flick')
        const i = this.flicks.indexOf(flick)
        
        if(i === this.flicks.length - 1){
            console.log("Can't move list item any lower")
        }
        else{
            const temp = this.flicks[i]
            this.flicks[i] = this.flicks[i+1]
            this.flicks[i+1] = temp

            this.list.insertBefore(listItem.nextSibling, listItem) //Move list Item in DOM

			this.save()
        }
        
        
        
    }
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template'
})