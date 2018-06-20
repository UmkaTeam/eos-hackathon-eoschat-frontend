import Marionette from 'backbone.marionette';
import ChatView from './chatView';
import config from '../../controller/appConfig';

export default Marionette.CollectionView.extend({
    childView: ChatView,
    className: 'container col-md-9',
    attributes: {
        id: 'chat-box'
    },
    initialize: function(){
        this.collection.on('add', this.added, this);
    },
    added: function(){
        if (this.waitingHandshake) {
        let state = JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + localStorage.getItem('selected-chat-user')));
            if (state && state.sessionKey) {
                this.waitingHandshake = false;
                this.render();
            }
        }
        
    },
    onChildviewChatScroll: function(){
        this.scroll();
    },
    scroll: function(){
        this.$el.scrollTop(this.$el.prop('scrollHeight'))
    },
    onRender: function(){
        console.log('render');
        this.scroll();
        let state = JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + localStorage.getItem('selected-chat-user')));
        console.log(this.collection)
        if (state) {
            console.log(state)
            if (state.sessionKey) {
                let count = 0;
                if (state.send) count++;
                if (state.received) count++;
                for (let i = 0; i < count; i++) {
                    let msg = this.collection.at(i);
                    if (msg) {
                        msg.set('skip', true)
                        this.collection.remove(msg);
                    }
                }
            } else {
                this.waitingHandshake = true;
                this.$el.html('Waiting for handshake');
            }
        }
    },
    onAttach: function(){
        this.$el.animate({
            scrollTop: this.$el.prop('scrollHeight')
        }, 700)
    }
})