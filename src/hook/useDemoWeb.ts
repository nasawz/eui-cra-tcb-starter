import useSWR, { mutate } from 'swr';
import { getApp } from '../lib/tcb';
const app = getApp();
const db = app.database();

export function useDemoWeb({
  pageIndex,
  pageSize,
  sortField,
  sortDirection,
  search,
}) {
  return useSWR(
    ['demo_web', pageIndex, pageSize, sortField, sortDirection, search],
    async () => {
      const query = db
        .collection('demo_web')
        .orderBy(sortField, sortDirection)
        .skip(pageIndex * pageSize)
        .limit(pageSize);
      const countRes = await query.count();
      const dataRes = await query.get();
      return {
        count: countRes.total,
        list: dataRes.data,
      };
    },
  );
}
