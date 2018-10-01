const MyComponent = {
    props: ['msg'],
    template: '<div class="notification">' +
        '<button class="delete"></button>' +
        '{{msg.text}}</div>'
}

const timeLine = new Vue({
    el: '#example',
    data:function(){
        let isItem=JSON.parse(localStorage.getItem('items'));
        let messageArray =[];
        for(let item in isItem){
           messageArray.push({id:item, text:isItem[item]});
        }
        return {message:messageArray};
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
        message: 'text',
        items: [],
        json:'',
        lastPost:''
    },
    mounted() {
        this.items = JSON.parse(localStorage.getItem('items')) || [];
    },
    methods: {
    addItem() {
        this.items.push(this.message);
        this.setItems();
        let date = new Date();
        this.lastPost = date;
    },
    deleteAllItems() {
        this.items = [];
        this.setItems();
    },
    setItems() {
        localStorage.setItem('items', JSON.stringify(this.items));
        localStorage.setItem('lastpost', JSON.stringify(this.lastPost));
    }, async submit () {
            await console.log(this.message);
            await timeLine.message.push({id:timeLine.message.length+1  ,text:this.message});
            await this.addItem();
            this.message='';
        }
    },
});

(window.onload = function() {
    document.querySelectorAll('.delete').forEach((elm) => {
        elm.addEventListener('click', (ev) => {
            const target = ev.target.closest('.notification');
            if (target) {
                target.parentNode.removeChild(target);
            }
        });
    });
    const now = new Date();
    const hourAgo = new Date();
    const targetHour= hourAgo.setHours(now.getHours() -1);
    const lastpost = JSON.parse(localStorage.getItem('lastPost')) || [];
    if(lastpost>targetHour){
        form.deleteAllItems();
    }
})();

