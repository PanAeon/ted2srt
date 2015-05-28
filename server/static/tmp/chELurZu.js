(function() {
  'use strict';

  var selected = [],
      main = document.querySelector('#main'),
      langs = document.querySelector('#main li'),
      watch = document.querySelector('#watch'),
      download = document.querySelector('.download'),
      en = document.querySelector('[data-lang="en"]');

  var mkUrl = function(arr) {
    if (arr.length === 0) return '&lang=en';
    else return arr.map(function(i){return '&lang=' + i}).join('');
  };

  if (en) {
    en.classList.add('selected');
    selected.push('en');
  }

  for(var index=0; index<langs.length; index++) {
  langs[index].addEventListener('click', function(e) {
    var lang = e.target.dataset.lang,
        len = selected.length,
        index = selected.indexOf(lang);
    if (len < 2) {
        e.target.classList.toggle('selected');
        index === -1 ? selected.push(lang) : selected.splice(index, 1);
    } else if (len === 2) {
        e.target.classList.remove('selected');
        if (index !== -1) selected.splice(index, 1);
    }
  });

  if (download) {
    download.addEventListener('click', function(e) {
      var url = '/download?tid=' + main.dataset.tid + '&type=' + e.target.id;
      url += mkUrl(selected);
      location.href = url;
    });
  }

  watch.addEventListener('click', function() {
    var url = '/watch?tid=' + main.dataset.tid;
    url += mkUrl(selected);
    location.href= url;
  });
})();
