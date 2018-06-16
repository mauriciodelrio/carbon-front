import _ from 'lodash';

const accentsTidy = (s) => {
  let r = s.toLowerCase();
  r = r.replace(new RegExp('[àáâãäå]', 'g'), 'a');
  r = r.replace(new RegExp('ç', 'g'), 'c');
  r = r.replace(new RegExp('[èéêë]', 'g'), 'e');
  r = r.replace(new RegExp('[ìíîï]', 'g'), 'i');
  r = r.replace(new RegExp('ñ', 'g'), 'n');
  r = r.replace(new RegExp('[òóôõö]', 'g'), 'o');
  r = r.replace(new RegExp('[ùúûü]', 'g'), 'u');
  return r;
};

const wordsTidy = (s) => {
  let r = s.toLowerCase();
  r = r.replace(new RegExp('deportivo', 'g'), '');
  r = r.replace(new RegExp('deportes', 'g'), '');
  r = r.replace(new RegExp('atletico', 'g'), '');
  r = r.replace(new RegExp('independiente', 'g'), '');
  r = r.replace(new RegExp('la ', 'g'), '');
  r = r.replace(new RegExp('fc', 'g'), '');
  r = r.replace(new RegExp('america de', 'g'), '');
  return r;
};

// thumbnail work
const thumbWork = (value) => {
  const thumbs = _.get(value, 'thumbnails');
  let defaultThumb = _.filter(thumbs, (o) => o.is_default && o.size !== '144');
  defaultThumb = _.sortBy(defaultThumb, 'size');
  if (_.isEmpty(defaultThumb)) { defaultThumb = _.head(thumbs); }
  let url = _.get(_.head(defaultThumb), 'url');
  if (!url) { url = require('./../assets/img/default-win.png'); }
  return url;
};

// time work
const timeWork = (value) => {
  let time = _.get(value, 'duration', '');
  const hours = Math.floor(time / 3600);
  time -= hours * 3600;
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60; // eslint-disable-line
  minutes < 10 && (minutes = `0${minutes}`); // eslint-disable-line
  seconds < 10 && (seconds = `0${seconds}`); // eslint-disable-line
  return `${hours}:${minutes}:${seconds}`;
};

export { accentsTidy, wordsTidy, thumbWork, timeWork };
