var request = require('request')
const express = require('express')
const https = require('https')
const fs = require('fs')
const url = require("url");
const path = require("path");
const app = express()
const port = 3000

// declare 10 sites we want to scrape
const sites = [
    'https://www.sitepoint.com',
    'https://www.google.com',
    'https://www.microsoft.com/en-us/',
    'https://firebase.google.com/',
    'https://www.agency73.com/',
    'https://nodejs.org/en/',
    'https://www.chess.com/',
    'https://material.io/',
    'https://swagger.io/',
    'https://developers.google.com/web/tools/lighthouse/'
];
const dir = `${__dirname}/sites`;

// use request package or base https
const useRequest = false;

// iterate over each site and console log the html
sites.forEach((site) => {
    if (useRequest) {
        request({uri: site}, 
            function(error, response, body) {
                writeToFile(body, site);
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
                writeToFile(data, site);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });        
    }
})

function writeToFile(content, site) {
    createSubFolder();
    const file = createFileName(site);
    fs.writeFile(`${dir}/${file}.html`, content, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log(`File ${file}.html saved successfully...`);
    }); 
}

function createSubFolder() {
    if (!fs.existsSync(dir)) {
        console.log(`creating directory ${dir}...`)
        fs.mkdirSync(dir);
    }
}

function createFileName(site) {
    return url.parse(site).hostname;
}