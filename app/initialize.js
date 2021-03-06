import './styles/application.css';
import 'bootstrap';
import 'font-awesome-webpack';
import router from './MVC/controller/appRouter';
import LoadingView from './MVC/view/loading/loadingView';

document.addEventListener('DOMContentLoaded', () => {
  let loading = new LoadingView();
  loading.render();
  Backbone.loading = loading;
  new router();
  Backbone.history.start({
    pushState: true,
    root: '/'
  })
});
