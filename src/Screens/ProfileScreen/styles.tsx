import { StyleSheet } from "react-native";
import { fontFamily, mainColors } from "../../Utils/helper";
import scaler from "../../Utils/scaler";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scaler(16),
        paddingTop: scaler(8),
        backgroundColor: mainColors.black,
        paddingBottom: scaler(22),
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaler(6),
    },
    avatarWrap: {
        width: scaler(90),
        height: scaler(90),
        borderRadius: scaler(26),
        overflow: 'hidden',
        marginRight: scaler(12),
    },
    avatar: {
        width: scaler(90),
        height: scaler(90),
        borderRadius: scaler(26),
    },
    avatarDownBtn: {
        position: 'absolute',
        right: scaler(2),
        bottom: scaler(2),
        width: scaler(20),
        height: scaler(20),
        borderRadius: scaler(10),
        backgroundColor: mainColors.appColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: scaler(2),
    },

    headerMid: {
        flex: 1,
    },
    headerId: {
        color: mainColors.headingTextColor,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(16),
        lineHeight: scaler(18),
    },
    headerName: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(16),
        lineHeight: scaler(18),
        marginTop: scaler(2),
    },
    headerPhone: {
        color: mainColors.headingTextColor,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(13),
        lineHeight: scaler(16),
        marginTop: scaler(2),
    },
    headerGearBtn: {
        width: scaler(50),
        height: scaler(50),
    },

    balanceCard: {
        marginTop: scaler(16),
        borderRadius: scaler(14),
        paddingHorizontal: scaler(16),
        paddingVertical: scaler(14),
    },
    balanceTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    balanceLabel: {
        color: mainColors.headingTextColor,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(11),
    },
    balanceValue: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(18),
        marginTop: scaler(10),
    },
    balanceBtnRow: {
        flexDirection: 'row',
        marginTop: scaler(14),
    },
    btnOutline: {
        flex: 1,
        height: scaler(40),
        borderRadius: scaler(10),
        borderWidth: scaler(1),
        borderColor: mainColors.mainButton,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scaler(10),
    },
    btnOutlineText: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
    },
    btnSolid: {
        flex: 1,
        height: scaler(40),
        borderRadius: scaler(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mainColors.mainButton,
    },
    btnSolidText: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(12),
    },

    sectionTitle: {
        marginTop: scaler(18),
        color: mainColors.white,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(12),
    },

    chipsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: scaler(10),
        gap: scaler(10),
    },
    chip: {
        paddingHorizontal: scaler(14),
        height: scaler(30),
        borderRadius: scaler(8),
        backgroundColor: mainColors.profileConsoleChips,
        borderWidth: scaler(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipText: {
        color: mainColors.mainButton,
        fontFamily: fontFamily.poppinsMedium,
        fontSize: scaler(11),
    },
    hr: {
        height: scaler(1),
        borderColor: mainColors.inputBorder,
        borderWidth: 0.5,
        marginBottom: scaler(10),
    },

    menuItem: {
        paddingVertical: scaler(12),
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaler(12),
    },
    menuLabel: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(13),
    },

    referCard: {
        marginTop: scaler(16),
        borderRadius: 15,
        paddingHorizontal: scaler(14),
        paddingVertical: scaler(12),
        backgroundColor: mainColors.profileRefer,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    referLeft: {
        marginRight: scaler(12),
    },
    referIconCircle: {
        width: scaler(40),
        height: scaler(40),
    },
    referMid: {
        flex: 1,
    },
    referTitle: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(12),
    },
    referSub: {
        marginTop: scaler(2),
        color: mainColors.inputLabel,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
    },

    footer: {
        height: scaler(110),
        width: scaler(150),
        alignSelf: 'center'
    },
    footerBrand: {
        color: mainColors.white,
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: scaler(14),
        letterSpacing: 0.5,
    },
    versionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    versionText: {
        color: mainColors.headingTextColor,
        fontFamily: fontFamily.poppinsRegular,
        fontSize: scaler(10),
    },
    imgView: {
        height: '100%',
        width: '100%',
    },
    menuIcon: {
        height: scaler(18),
        width: scaler(18),
    }
});