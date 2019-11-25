function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export const logos = [
  {
    main: images[0],
    placeholder: images[1],
    name: "php"
  },
  {
    main: images[2],
    placeholder: images[3],
    name: "apache"
  },
  {
    main: images[4],
    placeholder: images[5],
    name: "cassandra"
  },
  {
    main: images[6],
    placeholder: images[7],
    name: "docker"
  },
];
