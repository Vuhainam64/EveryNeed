const projectReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_PROJECT":
            return {
                ...state,
                projects: action.projects,
            };
        case "SET_PROJECT_NULL":
            return {
                ...state,
                projects: null,
            };
        default:
            return state;
    }
}

export default projectReducer;