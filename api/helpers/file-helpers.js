const fs = require('fs')
const url = require("url");
const request = require('request')
const https = require('https')
const dir = `../sites`;

module.exports = {
    getSiteHtml: function(useRequest, site) {
        if (useRequest) {
            return new Promise(function(resolve, reject){
                request({uri: site}, 
                    (error, response, body) => {
                        if (error) {
                            reject(error);
                            return;
                        }

                        writeToFile(body, site);
                        resolve(true);
                    });
            });
        } else {
            return new Promise((resolve, reject) => {
                https.get(site, (resp) => {
                    let data = '';
                
                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
                
                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        writeToFile(data, site);
                        resolve(true);
                    });
                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                    reject(err);
                });   
            });
        }
    }
}

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