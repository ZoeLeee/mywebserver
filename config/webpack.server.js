const path=require("path");
const merge=require('webpack-merge');
const common=require('./webpack.common').config;


module.exports=merge(common,{
  target:"node",
  mode: 'development',
  entry:{
    app:path.join(__dirname,"../src/server-entry.tsx")
  },
  output:{
    filename:'server-entry.js',
    libraryTarget:"commonjs2"
  },
  externals: {
    react: 'commonjs react',
   'react-dom': 'commonjs react-dom',
 },
  node:{
    global:true,
  }
})