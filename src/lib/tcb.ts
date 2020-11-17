import cloudbase from '@cloudbase/js-sdk';
import { config } from '../config';

export const getApp = () => {
  const app = cloudbase.init({
    env: config.envId!,
  });
  return app;
};
