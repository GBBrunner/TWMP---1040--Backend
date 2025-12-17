const https = require('https');
const fs = require('fs');

const options = {
    hostname: "en.wikipedia.org",
    port: 443,
    path: "/wiki/George_Washington",
};

const request = https.request(options, (response) => {
    .request(options, (response) => {
    let requestBody = "";

    console.log("Response from server started...");
    
