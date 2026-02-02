const initialAuthState = {
  isLogin: false,
  userData: {
    access: '',
    refresh: '',
    user: {
      id: 0,
      last_login: null,
      username: '',
      first_name: '',
      last_name: '',
      date_joined: '',
      created_at: '',
      updated_at: '',
      email: null,
      country_code: +91,
      contact: '',
      auth_provider: '',
      is_active_trader: true,
      is_verified: true,
      kyc_status: '',
      portfolio_balance: '',
      available_balance: '',
      invested_amount: '',
      user_permissions: []
    }
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
