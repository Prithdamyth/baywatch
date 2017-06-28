const app = {
    init: function(){
        this.max = 0;
        document
            .querySelector('form#flick-form')
            .addEventListener('submit', this.handleSubmit.bind(this))
    },

    handleSubmit: function(ev) {
        ev.preventDefault()
        const f = ev.target
        const flick ={
            id: this.max + 1,
            name: f.flickName.value,
        }
        console.log(flick)
        this.max++
    },
}

app.init()