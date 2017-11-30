
export default (state = [], action) => {

  switch (action.type) {
    case 'CREATE_EVENT_SUCCESS':
      return {
        ...state,
        loading: true,
        createSuccess: action.createEvent.data,
        error: null
      }
    case 'CREATE_EVENT_REJECTED':

    return {
        ...state,
        loading: true,
        createrejected: action.createEvent,
        error: null
      }

    case 'RECEIVE_ALL_EVENT':

    return {
        ...state,
        loading: true,
        getEventSuccess: action.payload.data,
        error: null
     }
    default:
      return state;
  }

  
};