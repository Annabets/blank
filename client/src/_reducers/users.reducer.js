import { userConstants } from '../_constants';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };


        case userConstants.GETBYID_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETBYID_SUCCESS:
            return {
                receivedUser: action.user
            };
        case userConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };


        case userConstants.UPDATE_REQUEST:
            return {
                ...state,
                updating: true
            };
        case userConstants.UPDATE_SUCCESS:
            return {
                updatedUser: action.user
            };
        case userConstants.UPDATE_FAILURE:
            return {
                updating: false,
                updateError: action.error
            };


        case userConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                deleting: true
            };
        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return { };
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                deleting: false,
                deleteError: action.error
            };
        default:
            return state
    }
}