import { getApp } from '../lib/tcb';
const app = getApp();
console.log(app);

export function useUser() {
  return {
    currUser: null,
  };
}
