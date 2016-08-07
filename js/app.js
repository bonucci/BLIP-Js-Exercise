import 'whatwg-fetch';
import Weather from './weather';

new Weather({
  city: document.getElementById('city'),
  search: document.getElementById('search')
});
