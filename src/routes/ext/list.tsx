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
  EuiSpacer,
  EuiBasicTable,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiText,
  EuiFieldText,
  EuiFieldPassword,
} from '@elastic/eui';
import _ from 'lodash';
import moment from 'moment';
import Form, { useForm } from 'rc-field-form';
import * as React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import FormRow from '../../components/formRow';
import { useDemoWeb } from '../../hook/useDemoWeb';

export interface IExtListProps {}

export default function ExtList(props: IExtListProps) {
  // ==================== Table
  const [dataParams, setDataParams] = useState({
    pageIndex: 0,
    pageSize: 10,
    sortField: 'updatedAt',
    sortDirection: 'desc',
    search: '',
  });
  const { data, error } = useDemoWeb(dataParams);
  const isLoading = !error && !data;
  const [selectedItems, setSelectedItems] = useState([]);

  const tableRef: any = useRef();

  const onTableChange = ({ page, sort }: any) => {
    const oriPage = { index: dataParams.pageIndex, size: dataParams.pageSize };
    const { index: pageIndex, size: pageSize } = page ? page : oriPage;
    const { field: sortField, direction: sortDirection } = sort;
    const newParams = _.merge({}, dataParams, {
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
    });
    setDataParams(newParams);
  };

  const onSearchChange = search => {
    const fn = () => {
      const newParams = _.merge({}, dataParams, { pageIndex: 0, search });
      setDataParams(newParams);
    };
    _.debounce(() => {
      fn();
    }, 500)();
  };

  const onSelectionChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  const renderDeleteButton = () => {
    if (selectedItems.length === 0) {
      return;
    }
    return (
      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          onClick={() => {
            // setIsBatchDel(true);
            // showDestroyModal();
          }}
        >
          删除 ({selectedItems.length})
        </EuiButton>
      </EuiFlexItem>
    );
  };

  const pagination: any = {
    pageIndex: dataParams.pageIndex,
    pageSize: dataParams.pageSize,
    totalItemCount: data ? data.count : 0,
    hidePerPageOptions: true,
  };

  const sorting: any = {
    sort: {
      field: dataParams.sortField,
      direction: dataParams.sortDirection,
    },
  };

  const selection: any = {
    selectable: data => {
      return true; //TODO selectable
    },
    selectableMessage: selectable => (!selectable ? '无法选择' : undefined),
    onSelectionChange: onSelectionChange,
    initialSelected: [],
  };

  const actions = [
    {
      name: '编辑',
      available: data => true, //TODO
      description: '编辑',
      icon: 'pencil',
      type: 'icon',
      onClick: item => {},
      isPrimary: true,
      'data-test-subj': 'action-edit',
    },
    {
      name: item => (item.objectId ? '删除' : ''),
      available: data => true, //TODO
      description: '删除',
      icon: 'trash',
      color: 'danger',
      type: 'icon',
      onClick: item => {},
      isPrimary: true,
      'data-test-subj': 'action-delete',
    },
  ];

  const columns: any = [
    {
      field: 'title',
      name: '标题',
      width: '200px',
    },
    {
      field: 'updatedAt',
      name: '更新时间',
      sortable: true,
      render: time => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      name: '操作',
      actions,
    },
  ];

  const renderDataTableCtl = () => {
    return (
      <EuiFlexGroup
        gutterSize="l"
        justifyContent="spaceBetween"
        direction="row"
        responsive
      >
        <EuiFlexItem grow={2}>
          <EuiFlexGroup gutterSize="s" direction="row" responsive>
            {renderDeleteButton()}
            <EuiFlexItem grow={1}>
              <EuiFormControlLayout fullWidth>
                <EuiFormRow fullWidth>
                  <EuiFieldSearch
                    placeholder="搜索..."
                    fullWidth
                    onChange={e => onSearchChange(e.target.value)}
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
              <EuiButton fill iconType="plusInCircle" onClick={showFlyout}>
                Create
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  const renderDataTable = () => {
    return (
      <EuiBasicTable
        loading={isLoading}
        ref={tableRef}
        items={data ? data.list : []}
        itemId="objectId"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        isSelectable={true}
        selection={selection}
        onChange={onTableChange}
        rowHeader="title"
      />
    );
  };

  // ==================== Form
  const [form] = useForm();
  const handleFinish = values => {
    console.log(values);
  };
  const renderForm = () => {
    return (
      <Form
        form={form}
        validateMessages={{
          default: '${name} 看起来怪怪的……',
          required: '你需要一个 ${displayName}',
          types: {
            number: '嗨，这个 ${name} 不是一个合格的 ${type}',
          },
          enum: '${name} 不在 ${enum} 中呢',
          whitespace: '${name} 不可以是空的啦',
          pattern: {
            mismatch: '${name} 并不符合格式：${pattern}',
          },
        }}
        onFinish={handleFinish}
        className="euiForm"
        initialValues={{}}
      >
        {/* <FormRow
          name="txt"
          label="EuiFieldText"
          helpText="I am some friendly help text."
          messageVariables={{ displayName: '字段' }}
          rules={[
            // { required: true },
            // { required: true, message: <h1>我是 ReactNode</h1> },
            // { type: 'number' },
            // { type: 'enum', enum: ['aaa', 'bbb'] },
            // { type: 'date' },
            // { whitespace: true },
            // { pattern: /^\w{3}$/ },
            // {
            //   message: '至少两个字符!',
            //   validator: async (_, value) => {
            //     if (value.length < 2) {
            //       throw new Error();
            //     }
            //   },
            // }
          ]}
        >
          <EuiFieldText />
        </FormRow>

        <FormRow
          name="p1"
          messageVariables={{ displayName: '密码' }}
          rules={[{ required: true }]}
        >
          <EuiFieldPassword />
        </FormRow>

        <FormRow
          name="p2"
          dependencies={['p1']}
          messageVariables={{ displayName: '密码2' }}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              async validator(_, value) {
                if (getFieldValue('p1') !== value) {
                  return Promise.reject('p2 is not same as p1');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <EuiFieldPassword />
        </FormRow> */}

        <FormRow
          name="title"
          label="title"
          helpText="I am some friendly help text."
          messageVariables={{ displayName: '标题' }}
          rules={[
            { required: true },
            // { required: true, message: <h1>我是 ReactNode</h1> },
            // { type: 'number' },
            // { type: 'enum', enum: ['aaa', 'bbb'] },
            // { type: 'date' },
            // { whitespace: true },
            // { pattern: /^\w{3}$/ },
            // {
            //   message: '至少两个字符!',
            //   validator: async (_, value) => {
            //     if (value.length < 2) {
            //       throw new Error();
            //     }
            //   },
            // }
          ]}
        >
          <EuiFieldText />
        </FormRow>
        <EuiSpacer />

        <EuiButton type="submit" fill>
          Save form
        </EuiButton>
      </Form>
    );
  };
  // ==================== Flyout

  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  let flyout;

  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        ownFocus
        onClose={closeFlyout}
        size="s"
        aria-labelledby="flyoutSmallTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="flyoutSmallTitle">A small flyout</h2>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText color="subdued">
            <p>
              Put navigation items in the header, and cross tab actions in a
              footer.
            </p>
          </EuiText>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>{renderForm()}</EuiFlyoutBody>
      </EuiFlyout>
    );
  }

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
            {renderDataTableCtl()}
            <EuiSpacer />
            {renderDataTable()}
            {flyout}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
