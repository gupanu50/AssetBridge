import { ImageSourcePropType } from "react-native";

export type OverviewDataProps = {
    id: string;
    name?: string; // Make name optional for 'isViewAll' case
    price?: string; // Make price optional for 'isViewAll' case
    logo?: ImageSourcePropType;
    isUp?: boolean;
};

export type OverViewProps = {
    overViewData: {
        max_drawdown: string;
        win_rate: string;
    }
}