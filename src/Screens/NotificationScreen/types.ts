export type NotificationTypeProps = {
    id: number;
    title: string,
    message: string,
    created_at: string,
    is_read: boolean;
}

export type ReadNotiProps = {
    id: number;
}

export type DeleteNotiProps = {
    ids: Array<number>;
}

export const NOTI_COUNT_KEY = ['api/v1/notifications/count'] as const;
export const NOTI_LIST_KEY = ['api/v1/notifications'] as const;
export const TRADING_BOT_KEY = ['api/v1/strategy/bots'] as const;
export const TRADING_USER_BOTS = ['api/v1/strategy/user-bots'] as const;
export const ORDERS_KEY = ['api/v1/orders/'] as const;