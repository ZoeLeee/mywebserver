const UNAME="zoelee";
const PWD="lz901021";

exports.defaultConfig={
  dbUrl:`mongodb://${UNAME}:${PWD}@ds117681.mlab.com:17681/learnforzoe`, 
  aLiDbUrl:"mongodb://127.0.0.1:27017/myWeb",
  staticUrl:"/usr/share/nginx/html/"
}