import { StyleSheet } from 'react-native';
import { fontFamily, mainColors } from '../../../Utils/helper';
import scaler from '../../../Utils/scaler';
const PAD_H = scaler(14);

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColors.black,
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: PAD_H,
        paddingTop: scaler(6),
        paddingBottom: scaler(10),
    },

    backBtn: {
        width: scaler(38),
        height: scaler(38),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scaler(10),
    },

    title: {
        flex: 1,
        color: mainColors.white,
        fontSize: scaler(16),
        fontFamily: fontFamily.poppinsMedium,
        textAlign: 'left',
        marginLeft: scaler(4),
    },

    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: scaler(12),
        height: scaler(32),
        borderRadius: 16,
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
    },

    dateText: {
        color: mainColors.white,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular,
    },

    caret: {
        color: mainColors.white,
        fontSize: scaler(12),
    },

    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#101010',
        alignItems: 'center',
        paddingHorizontal: PAD_H,
        height: scaler(30),
    },

    headerText: {
        color: mainColors.descText,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular,
    },

    headerLeft: {
        flex: 1,
        textAlign: 'left',
    },

    headerMid: {
        width: scaler(90),
        textAlign: 'center',
    },

    headerRight: {
        flex: 1,
        textAlign: 'right',
    },

    listContent: {
        paddingHorizontal: PAD_H,
        paddingBottom: scaler(16),
    },

    sep: {
        height: scaler(14),
    },

    rowWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: scaler(44),
        paddingVertical: scaler(6),
    },

    cellLeft: {
        flex: 1,
    },

    cellMid: {
        width: scaler(90),
        alignItems: 'center',
        justifyContent: 'center',
    },

    cellRight: {
        flex: 1,
        alignItems: 'flex-end',
    },

    moneyText: {
        color: mainColors.white,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular,
    },

    pctText: {
        marginTop: scaler(2),
        fontSize: scaler(11),
        fontFamily: fontFamily.poppinsRegular,
    },

    strikeText: {
        color: mainColors.white,
        fontSize: scaler(13),
        fontFamily: fontFamily.poppinsRegular,
    },

    midTick: {
        marginTop: scaler(8),
        height: scaler(2),
        width: scaler(38),
        borderRadius: 999,
    },

    tickGreen: {
        backgroundColor: mainColors.green,
    },

    tickRed: {
        backgroundColor: mainColors.red,
    },

    tickNone: {
        backgroundColor: mainColors.white,
    },

    green: {
        color: mainColors.green,
    },

    red: {
        color: mainColors.red,
    },

    bottomArea: {
        paddingVertical: scaler(10),
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: mainColors.white,
        backgroundColor: mainColors.inputBorder,
    },

    bottomLabel: {
        color: mainColors.headingTextColor,
        fontSize: scaler(12),
        fontFamily: fontFamily.poppinsRegular,
    },

    bottomValue: {
        color: mainColors.white,
        fontSize: scaler(12),
        marginTop: scaler(2),
    },

    datePicker: {
        width: 150,
        height: 40,
        backgroundColor: mainColors.white,
        borderRadius: 5,
        paddingHorizontal: 10,
    },

    tickTrack: {
        marginTop: scaler(6),
        height: scaler(3),
        width: scaler(45),
        borderRadius: scaler(2),
        backgroundColor: 'rgba(255,255,255,0.10)',
        overflow: 'hidden',
        alignSelf: 'center',
    },

    tickBar: {
        height: '20%',
        borderRadius: scaler(2),
    },

    tooltipWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tooltipBox: {
        backgroundColor: 'rgba(60,60,60,0.92)',
        paddingHorizontal: scaler(14),
        paddingVertical: scaler(8),
        borderRadius: scaler(10),
    },

    tooltipText: {
        color: mainColors.white,
        fontSize: scaler(11),
        fontFamily: fontFamily.poppinsRegular,
    },

    centerDividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: scaler(8),
    },

    centerDividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.18)',
    },

    centerDividerPill: {
        marginHorizontal: scaler(12),
        paddingHorizontal: scaler(14),
        paddingVertical: scaler(7),
        borderRadius: scaler(12),
        backgroundColor: 'rgba(90,90,90,0.9)',
    },

    centerDividerText: {
        color: mainColors.white,
        fontSize: scaler(11),
        fontFamily: fontFamily.poppinsRegular,
    },

    tickTrack2: {
        marginTop: scaler(6),
        width: scaler(70),
        height: scaler(3),
        borderRadius: scaler(2),
        backgroundColor: 'rgba(255,255,255,0.12)',
        overflow: 'hidden',
        position: 'relative',
    },

    tickLeftRed: {
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        backgroundColor: mainColors.red,
        transform: [{ translateX: -1 }],
    },

    tickRightGreen: {
        position: 'absolute',
        right: '50%',
        top: 0,
        bottom: 0,
        backgroundColor: mainColors.green,
        transform: [{ translateX: 1 }],
    },

    skeletonTopBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: PAD_H,
        paddingTop: scaler(6),
        paddingBottom: scaler(10),
    },

    skeletonBackWrap: {
        width: scaler(38),
        height: scaler(38),
        alignItems: 'center',
        justifyContent: 'center',
    },

    skeletonTitleWrap: {
        flex: 1,
        marginLeft: scaler(8),
        justifyContent: 'center',
    },

    skeletonDropdownWrap: {
        width: scaler(110),
        alignItems: 'flex-end',
    },

    skeletonHeaderLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },

    skeletonHeaderMid: {
        width: scaler(90),
        alignItems: 'center',
    },

    skeletonHeaderRight: {
        flex: 1,
        alignItems: 'flex-end',
    },

    skeletonRowWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: scaler(44),
        paddingVertical: scaler(6),
    },

    skeletonCellLeft: {
        flex: 1,
        justifyContent: 'center',
    },

    skeletonCellMid: {
        width: scaler(90),
        alignItems: 'center',
        justifyContent: 'center',
    },

    skeletonCellRight: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    skeletonGap6: {
        height: scaler(6),
    },

    skeletonCenterDividerPill: {
        marginHorizontal: scaler(12),
        paddingHorizontal: scaler(14),
        paddingVertical: scaler(7),
        borderRadius: scaler(12),
        backgroundColor: 'rgba(90,90,90,0.45)',
    },
});