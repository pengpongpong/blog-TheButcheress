// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

// export async function GET(request: Request) {
//     bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
//         // Store hash in your password DB.
//     });
//     bcrypt.hash(myPlaintextPassword, saltRounds, function (err: string, hash: string) {
//         console.log(hash)


//         bcrypt.compare(myPlaintextPassword, hash, function (err: string, result: string) {
//             console.log(result)
//         });
//         bcrypt.compare(someOtherPlaintextPassword, hash, function (err: string, result: string) {
//             console.log(result)
//         });


//         bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
//             // result == true
//         });
//         bcrypt.compare(someOtherPlaintextPassword, hash).then(function(result) {
//             // result == false
//         });
//     });
//     // return new Response('Draft mode is enabled')
// }