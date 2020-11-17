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
  const { user, login, loading } = useUser();
  // const user = null
  // const login = (a, b) => { }
  // const loading = false
  const [form] = useForm();
  const history = useHistory();
  const { showToast } = useToast();

  const handleLogin = values => {
    // console.log(values);
    // setTimeout(() => {
    //   form.setFieldsValue({ username: "aaa" });
    // }, 500);
    // login(username.trim(), password.trim());
    login(values.userId, (err, u) => {
      if (!err) {
        showToast('登录成功');
        setTimeout(() => {
          history.push('/ext');
        }, 1000);
      }
    });
  };
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
                  name="userId"
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
