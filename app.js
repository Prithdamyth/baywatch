const app = {
    init: function(){
        document
            .querySelector('form#flick-form')
            .addEventListener('submit', this.handleSubmit)
    },

    handleSubmit: function(ev) {
        ev.preventDefault()
        const f = ev.target
        console.log(f.flickName.value)
    },
}

app.init()