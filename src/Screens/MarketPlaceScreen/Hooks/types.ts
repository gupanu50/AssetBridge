export type apiData = {
    bot_id: number;
}
export type apiResponse = {
    data: {
        message: string
    }
}

export type verifyPaymentProps = {
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
}