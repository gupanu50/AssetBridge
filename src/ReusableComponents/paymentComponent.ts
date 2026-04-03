import RazorpayCheckout from 'react-native-razorpay';
import { PaymentScreenProps } from './commonTypes';

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