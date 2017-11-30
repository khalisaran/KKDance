
export default (state = [], action) => {
      switch (action.type) {
        case 'CREATE_SCHEDULER_SUCCESS':
          return {
            ...state,
            loading: true,
            createSuccess: action.createScheduler.data,
            error: null
          }
        case 'CREATE_SCHEDULER_REJECTED':
    
        return {
            ...state,
            loading: true,
            createRejected: action.createScheduler,
            error: null
          }
          case 'UPDATE_SCHEDULER_SUCCESS':
          return {
            ...state,
            loading: true,
            updateSuccess: action.updateScheduler.data,
            error: null
          }
        case 'UPDATE_SCHEDULER_REJECTED':
    
        return {
            ...state,
            loading: true,
            updateRejected: action.updateScheduler.data,
            error: null
          }
        case 'RECEIVE_ALL_SCHEDULER':
          
        return {
            ...state,
            loading: true,
            getSchedulerSuccess: action.payload.data,
            error: null
        }
        case 'RECEIVE_ALL_CATEGORY':
        
        return {
            ...state,
            loading: true,
            getCategorySuccess: action.payload.data,
            error: null
        }
        case 'RECEIVE_USERBY_ID':
        
        return {
            ...state,
            loading: true,
            getUserByIdSuccess: action.payload.data,
            error: null
        }
        case 'CREATE_SCHEDULE_DETAILS_SUCCESS':
        return {
          ...state,
          loading: true,
          createScheduleDetailSuccess: action.createScheduleDetails.data,
          error: null
        }
      case 'CREATE_SCHEDULE_DETAILS_REJECTED':
  
      return {
          ...state,
          loading: true,
          createScheduleDetailRejected: action.createScheduleDetails.data,
          error: null
        }
        case 'RECEIVE_FindSchedulesByEventId_ID':
        
            return {
                ...state,
                loading: true,
              getListScheduleDetail: action.payload.data,
                error: null
              }

        default:
          return state;
      }
    
      
    };