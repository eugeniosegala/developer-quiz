
const sortNumber = (a, b) => {
  return a.match(/\d+/g).map(Number) - b.match(/\d+/g).map(Number);
};

const importAll = (r) => {
  return r.keys().sort(sortNumber).map(r);
};

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
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "docker"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "nodejs"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "java"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "scala"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "mysql"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "mongodb"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "linux"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "npm"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "mariadb"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "go"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: ".net"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "postgresql"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "sqlserver"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "ruby"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "perl"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "python"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "spark"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "jquery"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "azure"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "git"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "yarn"
  },
  {
    main: images[counter++],
    placeholder: images[counter++],
    name: "swift"
  },
];
