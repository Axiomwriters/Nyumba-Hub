const ROLE_STORAGE_KEY = 'selected_signup_role';

export const setSelectedRole = (role: string) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  }
};

export const getSelectedRole = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem(ROLE_STORAGE_KEY);
  }
  return null;
};

export const clearSelectedRole = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem(ROLE_STORAGE_KEY);
  }
};
