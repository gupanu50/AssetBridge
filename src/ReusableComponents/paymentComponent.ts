import React from 'react';
import { Button, Alert } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';
import RazorpayCheckout from 'react-native-razorpay';
import { PaymentScreenProps } from './commonTypes';
// export default function PaymentScreen() {

//     const startPayment = async (props: PaymentScreenProps) => {
//         try {
//             console.log('PaymentScreenProps', props);
//             // 2) Configure Razorpay options
//             var options: any = {
//                 description: 'Bot Subscription Amount',
//                 image: 'https://i.imgur.com/3g7nmJC.jpg',
//                 // currency: 'INR',
//                 currency: props.currency,
//                 key: 'rzp_test_SFCKJ4Oj96S9ZJ', // from dashboard
//                 amount: `${props.amount}`,     // same as server
//                 order_id: props.id,
//                 // subscription_id: 'XpN7nB8uwZKsPyjoNRvD5Y1i',            
//                 name: 'Asset Bridge',
//                 prefill: {
//                     email: props.email,
//                     contact: props.contact,
//                     name: props.name
//                 },
//                 theme: {
//                     color: '#53a20e'
//                 }
//             };
//             console.log('Razorpay Options', options);
//             // 3) Open checkout
//             RazorpayCheckout.open(options)
//                 .then(data => {
//                     // success
//                     console.log('RazorpayPaymentSuccess', data);
//                     Alert.alert("SUCCESS", `Payment Id: ${data.razorpay_payment_id}`);
//                 })
//                 .catch(error => {
//                     console.log('RazorpayPaymentError', error);
//                     Alert.alert("FAILURE", `${error.code} | ${error.description}`);
//                 });

//         } catch (err) {
//             console.log("PaymentErrorCatch", err);
//             Alert.alert("Error", "Payment failed");
//         }
//     };
//     return { startPayment };
// }

export async function startRazorpayPayment(p: PaymentScreenProps) {
    try {
        const options: any = {
            description: 'Bot Subscription Amount',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: p.currency || 'INR',
            key: 'rzp_test_SFCKJ4Oj96S9ZJ',                       // ✅ only KEY_ID
            amount: Number(p.amount),         // ✅ number (paise)
            name: 'Asset Bridge',
            order_id: p.id,
            prefill: {
                email: p.email,
                contact: p.contact,
                name: p.name,
            },
            theme: { color: '#53a20e' },
        };

        const data = await RazorpayCheckout.open(options);
        return { ok: true as const, data };
    } catch (error: any) {
        return { ok: false as const, error };
    }
}