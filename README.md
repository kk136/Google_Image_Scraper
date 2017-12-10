# Google Image Scraper
Uses MEAN stack to get the top 15 images from google images after accepting a keyword.

Start with server.js


A NODE JS stack app containing  2 pages which would scrape images from google search and store it in Amazon S3: 
A page contains an input field and a submit button to Fetch images from google and save top 15 images after passing through a compression algorithm then pass it through a black and white filter and upload all the images to Amazon S3.

After clicking on any word on the listing opens up another page which will have all the images for that particular keyword, but this time the images are loaded from the Amazon S3 server.


Uses MongoDb with Mongoose and Express 4.x for the backend and use AngularJs 1.x for frontend.

App Link
https://serene-cove-79317.herokuapp.com/
