
// src/utils/role-selection.ts
import Cookies from 'js-cookie';

export const setSelectedRole = (role: string) => {
  localStorage.setItem('selectedRole', role);
  Cookies.set('selectedRole', role, { expires: 1 }); // Expires in 1 day
};

export const getSelectedRole = () => {
  return Cookies.get('selectedRole') || localStorage.getItem('selectedRole');
};

export const clearSelectedRole = () => {
  localStorage.removeItem('selectedRole');
  Cookies.remove('selectedRole');
};
