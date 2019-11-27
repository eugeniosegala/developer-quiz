
function sortNumber(a, b) {
  return a.match(/\d+/g).map(Number) - b.match(/\d+/g).map(Number);
}

function importAll(r) {
  return r.keys().sort(sortNumber).map(r);
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

let counter = 0;

export const logos = [
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "php"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "apache"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "cassandra"
  }
];
