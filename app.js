const MyComponent = {
    props: ['msg'],
    template: '<div class="notification">' +
        '<button class="delete"></button>' +
        '{{msg.text}}</div>'
}
// 登録する
// Vue.component('my-component', MyComponent)
// root インスタンスを作成する
const timeLine = new Vue({
    el: '#example',
    data:function(){
        return {message:[
                // {id:1,text:'yo'},
                // // {id:2,text:'yo bro'}
            ]}
    },

    components: {
        'my-component': MyComponent
    },
})

const form = new Vue({
    el: '#msgForm',
    data: {
        message: 'fafa'
    },
    methods: {
        async submit () {
            await console.log(this.message);
            await timeLine.message.push({id:timeLine.message.length+1, text:this.message});
            this.message='';
        }
    }
});
