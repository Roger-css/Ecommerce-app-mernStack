export default (p) => {
  if (p == undefined) {
    return "http://via.placeholder.com/900x1600";
  } else {
    return `http://localhost:3000/uploads/${p}`;
  }
};
