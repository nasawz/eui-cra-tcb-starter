import { EuiBreadcrumb, EuiHeaderBreadcrumbs } from '@elastic/eui';
import _ from 'lodash';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export interface IBreadcrumbsProps {}

export default function Breadcrumbs(props: IBreadcrumbsProps) {
  const history = useHistory();
  let { pathname } = useLocation();
  pathname = pathname.replace(/^\//, '');
  const pathSegments = pathname.split('/');
  const breadcrumbContext: string[] = [];
  const breadcrumbs: EuiBreadcrumb[] = [];
  for (const segment of pathSegments) {
    const breadcrumbPath = breadcrumbContext.concat(segment).join('/');
    breadcrumbs.push({
      text: _.capitalize(segment),
      onClick: () => history.push(`/${breadcrumbPath}`),
    });

    breadcrumbContext.push(segment);
  }
  return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
}
