import { StyleSheet } from 'react-native'
import { ThemeColors } from '~/styles/theme'

export default (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            gap: 12,
        },
        selectedDateLabel: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.secondary,
        },
        emptyStateText: {
            color: colors.gray[100],
            fontSize: 13,
        },
        timelineContainer: {
            position: 'relative',
            minHeight: 1536,
            paddingBottom: 24,
        },
        hourRow: {
            height: 64,
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        hourLabel: {
            width: 52,
            fontSize: 12,
            color: colors.gray[100],
        },
        hourDivider: {
            flex: 1,
            borderTopWidth: 1,
            borderTopColor: colors.gray[50],
            marginTop: 8,
            marginLeft: 4,
        },
        eventsLayer: {
            position: 'absolute',
            top: 0,
            left: 56,
            right: 0,
            bottom: 0,
        },
        eventItem: {
            position: 'absolute',
            left: 0,
            right: 0,
            justifyContent: 'center',
            backgroundColor: colors.primary,
            paddingHorizontal: 16,
        },
        eventTitle: {
            color: colors.white,
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
        },
        eventTime: {
            marginTop: 2,
            color: colors.white,
            fontSize: 12,
            textAlign: 'center',
        },
    })
