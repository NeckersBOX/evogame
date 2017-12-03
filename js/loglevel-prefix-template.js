const f2 = n => (n + '').length < 2 ? '0' + n : (n + '').length > 2 ? (n + '').substr(-2) : n
const f3 = n => (n + '').length < 2 ? '00' + n : (n + '').length < 3 ? '0' + n : n;

const prefixTemplate = {
  template: '[%t] [%l] [%n',
  timestampFormatter: date =>
    f2(date.getDate()) + '/' + f2(date.getMonth() + 1) + '/' + f2(date.getFullYear()) + ' ' +
    f2(date.getHours()) + ':' + f2(date.getMinutes()) + ':' + f2(date.getSeconds()) + ':' + f3(date.getMilliseconds())
};

export default prefixTemplate;
