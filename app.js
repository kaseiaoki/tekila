const MyComponent = {
    props: ['msg'],
    template: '<div class="notification">' +
        '<button class="delete"></button>' +
        '{{msg.text}}</div>'
}

const timeLine = new Vue({
    el: '#example',
    data:function(){
        return {message:[]}
    },
    components: {
        'my-component': MyComponent
    },
    method:{
    }
})

const form = new Vue({
    el: '#msgForm',
    data: {
        message: 'text'
    },
    methods: {
        async submit () {
            await console.log(this.message);
            await timeLine.message.push({id:timeLine.message.length+1, text:this.message});
            this.message='';
            document.querySelectorAll('.delete').forEach((elm) => {
                elm.addEventListener('click', (ev) => {
                    const target = ev.target.closest('.notification');
                    if (target) {
                        target.parentNode.removeChild(target);
                    }
                });
            });
        }
    },
});
export default {
    data() {
        return {
            items: [],
            json: ''
        }
    },
    mounted() {
        this.items = JSON.parse(localStorage.getItem('items')) || [];
    },
    methods: {
        addItem() {
            this.items.push('item_' + this.items.length);
            this.setItems();
        },
        deleteAllItems() {
            this.items = [];
            this.setItems();
        },
        setItems() {
            localStorage.setItem('items', JSON.stringify(this.items));
        }
    }
}

