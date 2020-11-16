import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormControlLayout,
  EuiFormRow,
  EuiFieldSearch,
  EuiButton,
} from '@elastic/eui';
import * as React from 'react';

export interface IExtListProps {}

export default function ExtList(props: IExtListProps) {
  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>List</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection></EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiFlexGroup
              gutterSize="l"
              justifyContent="spaceBetween"
              direction="row"
              responsive
            >
              <EuiFlexItem grow={2}>
                <EuiFlexGroup gutterSize="s" direction="row" responsive>
                  <EuiFlexItem grow={1}>
                    <EuiFormControlLayout fullWidth>
                      <EuiFormRow fullWidth>
                        <EuiFieldSearch
                          placeholder="搜索..."
                          fullWidth
                          isClearable={true}
                        />
                      </EuiFormRow>
                    </EuiFormControlLayout>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={2}>
                <EuiFlexGroup
                  gutterSize="s"
                  justifyContent="flexEnd"
                  direction="row"
                  responsive
                  wrap
                >
                  <EuiFlexItem grow={false}>
                    <EuiButton fill iconType="plusInCircle">
                      Create
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
