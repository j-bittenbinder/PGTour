// (window as any).global = window;
// window.Buffer = window.Buffer || require('buffer').Buffer;

// const AWS = require('../../../../node_modules/aws-sdk');
// AWS.config.loadFromPath('./s3_config.json');
// var s3Bucket = new AWS.S3( { params: {Bucket: 'pgtour'} } );

// const imageUpload = async (base64) => {
//     const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
//     var data = {
//         Key: "1", 
//         Body: "teste",
//         ContentEncoding: 'base64',
//         ContentType: 'image/jpeg'
//       };

//       console.log(data)
//       s3Bucket.putObject(data, function(err, data){
//           if (err) { 
//             console.log(err);
//             console.log('Error uploading data: ', data); 
//           } else {
//             console.log('succesfully uploaded the image!');
//           }
//       });
//     // To delete, see: https://gist.github.com/SylarRuby/b3b1430ca633bc5ffec29bbcdac2bd52
//   }
  
//   module.exports = imageUpload;