const openpgp = require("openpgp");
const fs = require("fs");

generate();
async function generate() {
  const { privateKey, publicKey }  = await openpgp.generateKey({
    type: 'ecc',  //curve: 'curve25519',
    curve: 'curve25519', //rsaBits: 4096,
    userIDs: [{ name: "Garrett", email: "example@example.com" }],
    passphrase: "simba",
    format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
  });
  fs.writeFileSync("./private-Garrett-Brunner.key", privateKey);
  fs.writeFileSync("./public-Garrett-Brunner.key", publicKey);
  console.log(`keys generated and written to file...`);
}