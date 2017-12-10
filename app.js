

/*
Name        :   app.js
Author      :   Kartikey Agarwal
Date        :   10/12/2017
Description :   Gets a url from server.js and fetches images from it, passes the
              images to aws.js after compressing and converting them to greyscale
*/



var request = require('request');
var url = require('url');
var cheerio = require('cheerio');
path = require('path')
var Jimp = require("jimp");
var aws = require('./aws.js');

var i = 0;                                //Used to create file names

module.exports.getImages = (uri,keyword) =>  {
  request(uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body)
      imgs = $('img').toArray()
      console.log("Downloading...")
      i = 0;
      imgs.forEach(function (img) {
        process.stdout.write(".");
        img_url = img.attribs.src         //Fetches image Url

        if (/^https?:\/\//.test(img_url)) {
          Jimp.read(img_url).then(function (lenna) {
            img_name = path.basename(`${keyword}_${i}.jpg`)
            lenna.resize(256, 256)         // resize
            .quality(80)                 // set JPEG quality
            .greyscale()                // set greyscale
            .getBuffer(Jimp.MIME_JPEG,function(err,buffer){ // Black Magic
              aws.Upload(buffer,img_name,keyword);
            });
            i++;
          }).catch(function (err) {
            console.error(err);
          });
        }
      })
      console.log("Done!")
    }
  })
}
