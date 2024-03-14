const { Web3 } = require('web3');
const nodemailer = require('nodemailer');
const web3 = new Web3('https://polygon-pokt.nodies.app');

const accountAddress = '0x2644Fc0CfAf6Eac976B789014fff849a41CDc7'; // Replace with your account address

let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "",
        pass: "",
    },
});


const checkBalance = () => {
    web3.eth.getBalance(accountAddress).then((balance) => {
        let ethBalance = web3.utils.fromWei(balance, 'ether');
        console.log("Balance in Ether", ethBalance);

        let mailOptions = {
            from: 'Polygon Balance Check Notification', // sender address
            to: '', // list of receivers
            subject: 'Polygon Balance is Low', // Subject line
            text: 'Polygon Balance Low', // plain text body
            html: `<h1>Polygon Balance Low</h1>
            <b>Polygon Wallet Balance is ${ethBalance}. Please topup.</b>`
        };
        
        if (ethBalance < 5) {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Notification sent');
            });
        }
    }).catch((error) => {
        console.error("Error getting balance:", error);
    });
}

const time = setInterval(checkBalance, 86400000);

// time;
checkBalance();
