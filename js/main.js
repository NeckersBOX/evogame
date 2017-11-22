import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import Layout from './components/Layout'
import store from './reducers/store';

window.addEventListener('load', event => {
  render (
    <Provider store={store}>
      <Layout />
    </Provider>, document.getElementById('container'));
});
