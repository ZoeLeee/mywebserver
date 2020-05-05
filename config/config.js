const UNAME="zoelee";
const PWD="lz901021";

const TX_NAME="lizhou1021";
const TX_PWD="lz901021";

exports.defaultConfig={
  dbUrl:`mongodb://${UNAME}:${PWD}@ds117681.mlab.com:17681/learnforzoe`, 
  aLiDbUrl:`mongodb://${TX_NAME}:${TX_PWD}@122.51.246.156:27017/myweb`, 
  staticUrl:"/usr/share/nginx/html/"
}