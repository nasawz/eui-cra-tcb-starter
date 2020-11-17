import { getApp } from '../lib/tcb';
import { config } from '../config';
import { useState } from 'react';
const app = getApp();
const auth = app.auth({ persistence: 'session' });

const ticketUrl = `https://${config.envId}.service.tcloudbase.com/login`;

export function useUser() {
  const [user, setUser]: any = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);
  const login = (userId, cb) => {
    setLoading(true);
    fetch(`${ticketUrl}?userId=${userId}`)
      .then(async res => {
        // if (res.status === 400) {
        //   throw new Error(`${res.status}: ${res.statusText} 获取 Ticket 失败，用户 Id 不符合规则`)
        // }
        // if (res.status === 429) {
        //   throw new Error(`${res.status}: ${res.statusText} API rate limit exceeded`)
        // }
        const data = await res.json();
        auth
          .customAuthProvider()
          .signIn(data.ticket)
          .then(res => {
            const { user } = res;
            setUser(user);
            cb(null, user);
          })
          .catch(err => {
            cb(err, null);
          });
      })
      .catch(err => {
        cb(err, null);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const logout = () => {
    auth.signOut();
    setUser(null);
  };
  return {
    user,
    login,
    logout,
    loading,
  };
}
