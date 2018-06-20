import Marionette from 'backbone.marionette';
import App from './App';
import workshop from './appWorkshop';
import Backbone from 'backbone';
import store from './appStore';

export default Marionette.Object.extend({
    initialize: function(){
        let app = new App();
        app.start();
        this.options.app = app;
    },
    showRoot: function(){
        if (this.loggedIn() && this.mnemonicSaved()) {
            $('#loading-place').html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
            store.loadData().then(() => {
                store.startPolling();
                let app = this.options.app;
                $('#loading-place').html('');
                app.showRoot();
            })
        }
    },
    showTransactions: function() {
        if (this.loggedIn() && this.mnemonicSaved()) {
            $('#loading-place').html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
            store.loadData().then(() => {
                store.startPolling();
                let app = this.options.app;
                $('#loading-place').html('');
                app.showTransactions();
            })
        }
    },
    showLogin: function(){
        if (!workshop.getLoggedIn()) {
            let app = this.options.app;
            app.showLogin();
        } else {
            Backbone.history.navigate('/', {trigger : true});
        }
    },
    showMnemonic: function(){
        if (this.loggedIn()) {
            if (this.mnemonicSaved()) {
                Backbone.history.navigate('/', {trigger: true});
            } else {
                $('#loading-place').html('<i class="fa fa-spinner fa-pulse fa-2x"></i>');
                store.loadData().then(() => {
                    let app = this.options.app;
                    app.showMnemonic();
                    $('#loading-place').html('');
                })
            }
        }
    }, 
    loggedIn: function(){
        if (workshop.getLoggedIn()) return true;
        else {
            Backbone.history.navigate('/login', {trigger : true});
            return false;
        }
    },
    mnemonicSaved: function(){
        if (workshop.getMnemonicSaved()) return true;
        else {
            Backbone.history.navigate('/mnemonic', {trigger : true});
            return false;
        }
    }
})