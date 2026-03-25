import { StyleSheet } from 'react-native';
import scaler from '../../../../Utils/scaler';
import { fontFamily, mainColors } from '../../../../Utils/helper';

export const styles = StyleSheet.create({
    logoCircle: {
        height: scaler(30),
        width: scaler(30),
        borderRadius: scaler(15),
        backgroundColor: mainColors.pnlCard,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoInitials: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(12),
    },

    sectionHeaderRow: {
        marginTop: scaler(14),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    sectionHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    mainView: {
        marginHorizontal: scaler(10),
    },

    sectionTitle: {
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.headingTextColor,
        fontSize: scaler(14),
    },

    moverTabsRow: {
        marginTop: scaler(10),
        flexDirection: 'row',
        alignItems: 'center',
    },

    moverSegmentBtn: {
        paddingVertical: scaler(3),
        paddingHorizontal: scaler(12),
        borderRadius: 999,
        marginRight: scaler(10),
    },

    moverSegmentBtnActive: {
        backgroundColor: mainColors.mainButton,
    },

    moverSegmentBtnInActive: {
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        borderRadius: 20,
    },

    moverSegmentText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.white,
        fontSize: scaler(10),
    },

    moverSegmentTextActive: {
        opacity: 1,
    },

    indexDrop: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        borderRadius: 999,
        paddingHorizontal: scaler(12),
        paddingVertical: scaler(5),
    },

    indexDropText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.white,
        fontSize: scaler(10),
        marginRight: scaler(8),
        opacity: 0.9,
    },

    indexDropArrow: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.white,
        fontSize: scaler(10),
        opacity: 0.7,
    },

    moversGridWrap: {
        marginTop: scaler(12),
    },

    moverCard: {
        width: '48.5%',
        borderRadius: scaler(12),
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        backgroundColor: mainColors.googleButton,
        padding: scaler(12),
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: scaler(12),
        minHeight: scaler(110),
    },

    moverName: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.white,
        fontSize: scaler(12),
        paddingTop: scaler(5),
    },

    moverPrice: {
        marginTop: scaler(15),
        fontFamily: fontFamily.poppinsMedium,
        color: mainColors.white,
        fontSize: scaler(12),
    },

    moverChg: {
        marginTop: scaler(4),
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(10),
    },

    viewAllCard: {
        justifyContent: 'center',
        alignItems: 'center',
        height: scaler(110),
    },

    viewAllText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.white,
        fontSize: scaler(12),
        opacity: 0.85,
    },

    viewAllCircle: {
        width: scaler(36),
        height: scaler(36),
        marginTop: scaler(10),
        borderRadius: scaler(18),
        backgroundColor: mainColors.mainButton,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: mainColors.mainButton,
    },

    viewAllArrow: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.white,
        fontSize: scaler(22),
    },

    newsCard: {
        marginTop: scaler(10),
        borderRadius: scaler(12),
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        overflow: 'hidden',
        backgroundColor: mainColors.black,
    },

    newsSeparator: {
        height: 1,
        backgroundColor: mainColors.inputBorder,
    },

    footer: {
        alignItems: 'center',
        paddingBottom: scaler(10),
    },

    footerText: {
        fontFamily: fontFamily.poppinsRegular,
        color: mainColors.descText,
        fontSize: scaler(12),
        textAlign: 'center',
    },

    tMimg: {
        height: scaler(22),
        width: scaler(22),
        marginRight: scaler(5),
    },

    logoImg: {
        height: scaler(25),
        width: scaler(25),
        marginRight: scaler(5),
    },

    line: {
        alignSelf: 'center',
        height: scaler(30),
        width: scaler(80),
    },

    // Skeleton styles
    botSkeletonCard: {
        width: '100%',
        borderRadius: scaler(16),
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        backgroundColor: mainColors.googleButton,
        padding: scaler(16),
        marginTop: scaler(4),
    },

    skeletonGap8: {
        height: scaler(8),
    },

    skeletonGap10: {
        height: scaler(10),
    },

    skeletonGap16: {
        height: scaler(16),
    },

    skeletonGridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scaler(12),
    },

    skeletonMoverCard: {
        width: '48.5%',
        borderRadius: scaler(12),
        borderWidth: 1,
        borderColor: mainColors.inputBorder,
        backgroundColor: mainColors.googleButton,
        padding: scaler(12),
        minHeight: scaler(110),
    },

    skeletonNewsRow: {
        flexDirection: 'row',
        padding: scaler(12),
        alignItems: 'center',
    },

    skeletonNewsContent: {
        flex: 1,
        marginLeft: scaler(12),
    },
});