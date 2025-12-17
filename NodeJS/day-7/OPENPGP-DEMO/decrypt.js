// decrypt.js
const openpgp = require("openpgp");
const fs = require("fs");
const argv = require('process').argv;
const privateKeyPath = argv[2]
console.log(`using private key file at: ${privateKeyPath}`);
const privateKeyArmored = fs.readFileSync(privateKeyPath);

const passphrase = 'simba';

(async () => {
 const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored.toString() }),
    passphrase
  });

  const encryptedData = fs.readFileSync("encrypted-secret-02.txt");
  const decrypted = await openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage:encryptedData.toString() }),
    decryptionKeys: [privateKey],
  });
  console.log(`successfully decrypted data... `);
  console.log(decrypted.data);
})();