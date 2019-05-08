var request = require('request')
const express = require('express')
const https = require('https')
const app = express()
const port = 3000

// declare 10 sites we want to scrape
const sites = [
    'https://www.sitepoint.com',
    'https://www.google.com',
    'https://www.microsoft.com/en-us/',
];

// use request package or base https
const useRequest = true;

// iterate over each site and console log the html
sites.forEach((site) => {
    if (useRequest) {
        request({uri: site}, 
            function(error, response, body) {
            console.log(body);
        });
    } else {
        https.get(site, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(site);
                console.log(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });        
    }
})