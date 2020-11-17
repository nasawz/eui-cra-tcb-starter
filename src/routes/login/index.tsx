import {
  EuiPage,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiText,
  EuiTitle,
  EuiContext,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiSpacer,
  EuiButton,
} from '@elastic/eui';
import { error } from 'console';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Empty from '../../components/empty';
import { useToast } from '../../hook/useToast';
import bgloginPath from './assets/bg_login.svg';
import { getTheme } from '../../lib/theme';
import Form, { Field, useForm } from 'rc-field-form';
import FormRow from '../../components/formRow';
import { useUser } from '../../hook/useUser';
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const { currUser } = useUser();
  const [form] = useForm();
  const history = useHistory();
  const { toasts, showToast } = useToast();
  const loading = false;
  let error: any;
  // const {
  //   login,
  //   state: { loading, data, error },
  // } = useLoginMutation();

  const handleLogin = values => {
    console.log(values);
    // setTimeout(() => {
    //   form.setFieldsValue({ username: "aaa" });
    // }, 500);
    showToast('登录成功');
    history.push('/ext');
    // login(username.trim(), password.trim());
  };
  // if (error) {
  //   console.log(error.message);
  // }
  // if (data && !loading) {
  //   router.push({ pathname: `/data-max` });
  // }
  return (
    <Empty dark={getTheme() != 'light'}>
      <EuiPage>
        <EuiFlexGroup>
          <EuiFlexItem grow={false} style={{ width: '400px' }}>
            <EuiIcon size="original" type={bgloginPath} />
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ width: '400px', padding: '30px' }}>
            <EuiText textAlign="center">
              <EuiTitle size="m">
                <h2>登录</h2>
              </EuiTitle>
            </EuiText>
            <EuiContext
              i18n={{
                mapping: {
                  'euiForm.addressFormErrors': '出错了',
                },
              }}
            >
              <Form
                form={form}
                onFinish={handleLogin}
                className="euiForm"
                // initialValues={{ username: 'strange' }}
              >
                <FormRow
                  name="username"
                  label="用户名"
                  rules={[{ required: true }]}
                >
                  <EuiFieldText icon="user" />
                </FormRow>

                <FormRow
                  name="password"
                  label="密码"
                  rules={[{ required: true }]}
                >
                  <EuiFieldPassword />
                </FormRow>
                <EuiSpacer />
                <EuiFlexGroup
                  justifyContent="spaceBetween"
                  alignItems="center"
                  gutterSize="s"
                >
                  <EuiFlexItem>
                    <EuiButton
                      isLoading={loading}
                      data-test-id="login-button"
                      className="loginButton"
                      color={`primary`}
                      fill={true}
                      type="submit"
                    >
                      登录
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem></EuiFlexItem>
                </EuiFlexGroup>
              </Form>
            </EuiContext>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPage>
    </Empty>
  );
}
