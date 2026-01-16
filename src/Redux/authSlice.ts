const initialAuthState = {
  isLogin: false,
  userData: {
    userId: '',
  },
};

export const authReducer = (state = initialAuthState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: true,
        userData: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogin: false,
        userData: null,
      };
    default:
      return state;
  }
};

export const login = (userData: any) => ({
  type: 'LOGIN',
  payload: userData,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const selectIsLogin = (state: any) => state.auth.isLogin;
export const selectUserData = (state: any) => state.auth.userData;
