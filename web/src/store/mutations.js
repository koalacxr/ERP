import * as types from './mutations-types'

export default {
    [types.GLOBAL_SET_WINDOW_HRIGHT](state, height) {
        state.windowStyles.leftSidebarStyles.height = height + 'px';
        let mainHeight = height - 50;
        state.windowStyles.rightMainStyles.height = mainHeight + 'px';
    },
    [types.GLOBAL_TOGGLE_LEFT_SIDEBAR](state) {
        if (state.showLeftSidebar)
            state.showLeftSidebar = false
        else
            state.showLeftSidebar = true
    }

}