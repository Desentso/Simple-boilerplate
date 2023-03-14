import create from 'zustand';
import makeRequest from '../utils/requests';
import { immerZustandMiddleware } from './state-helpers';

const useUserStore = create(
  immerZustandMiddleware((set, get) => ({
    user: null,

    fetchCurrentUser: async () => {
      const user = await makeRequest({
        path: '/users/current',
        method: 'GET',
      });

      if (!user.error) {
        set((state) => {
          state.user = user;
        });
      }
    },

    login: async ({ email, password }) => {
      const user = await makeRequest({
        path: '/auth/login',
        method: 'POST',
        body: { email, password },
      });

      if (!user.error) {
        set((state) => {
          state.user = user;
        });
      }

      return user
    },

    register: async ({ name, email, password, confirmPassword, discountCode, source }) => {
      const user = await makeRequest({
        path: '/auth/register',
        method: 'POST',
        body: { name, email, password, confirmPassword, discountCode, source },
      });

      if (!user.error) {
        set((state) => {
          state.user = user;
        });
      }

      return user
    },

    forgotPassword: async ({ email }) => {
      const response = await makeRequest({
        path: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      });

      return response
    },

    resetPassword: async ({ password, confirmPassword, resetToken }) => {
      const response = await makeRequest({
        path: '/auth/reset-password',
        method: 'POST',
        body: { password, confirmPassword, resetToken },
      });

      return response
    },

    logout: async () => {
      await makeRequest({
        path: "/auth/logout"
      })

      window.location.href = "https://example.com"
    }
  }))
);

export default useUserStore;
