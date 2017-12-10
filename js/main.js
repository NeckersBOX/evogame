import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import Layout from './components/Layout'
import store from './reducers/store';
import log, { setLevel } from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import prefixTemplate from './loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
setLevel(process.env.loglevel || 'info');
console.log('Log level:', process.env.loglevel || 'info');

window.addEventListener('load', () => {
  const logPrefix = ':loadEvent] ';
  log.info(logPrefix, '-->');

  render (
    <Provider store={store}>
      <Layout />
    </Provider>, document.getElementById('container')
  );

  log.info(logPrefix, '<--');
});
