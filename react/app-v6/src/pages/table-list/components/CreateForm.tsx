import { PlusOutlined } from '@ant-design/icons';
import {
  type ActionType,
  ModalForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import type { FC } from 'react';
import { addRule } from '@/services/ant-design-pro/api';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;

  const [messageApi, contextHolder] = message.useMessage();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const { run, loading } = useRequest(addRule, {
    manual: true,
    onSuccess: () => {
      messageApi.success('添加成功');
      reload?.();
    },
    onError: () => {
      messageApi.error('添加失败，请重试！');
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: '新建规则',
        })}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>
        }
        width="800px"
        grid
        colProps={{ span: 12 }}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          await run({ data: value as API.RuleListItem });

          return true;
        }}
      >
        <ProFormText
          label="客户编号"
          name="customerCode"
          rules={[{ required: true, message: '请输入客户编号' }]}
          placeholder="请输入客户编号"
        />
        <ProFormText
          label="客户名称"
          name="customerName"
          rules={[{ required: true, message: '请输入客户名称' }]}
          placeholder="请输入客户名称"
        />
        <ProFormText
          label="客户简称"
          name="customerShortName"
          placeholder="请输入客户简称"
        />
        <ProFormSelect
          label="客户类型"
          name="customerType"
          rules={[{ required: true, message: '请选择客户类型' }]}
          placeholder="请选择客户类型"
          options={[
            { label: '企业客户', value: 'enterprise' },
            { label: '个人客户', value: 'personal' },
          ]}
        />
        <ProFormSelect
          label="客户等级"
          name="customerLevel"
          placeholder="请选择客户等级"
          options={[
            { label: 'VIP', value: 'vip' },
            { label: '普通', value: 'normal' },
          ]}
        />
        <ProFormSelect
          label="行业分类"
          name="industry"
          rules={[{ required: true, message: '请选择行业分类' }]}
          placeholder="请选择行业分类"
          options={[
            { label: '其他/定制', value: 'other' },
            { label: '制造业', value: 'manufacturing' },
            { label: '服务业', value: 'service' },
          ]}
        />
        <ProFormSelect
          label="国家地区"
          name="country"
          placeholder="请选择国家地区"
          options={[
            { label: '中国', value: 'china' },
            { label: '美国', value: 'usa' },
          ]}
        />
        <ProFormSelect
          label="省份"
          name="province"
          placeholder="请选择省份"
          options={[
            { label: '上海市', value: 'shanghai' },
            { label: '北京市', value: 'beijing' },
            { label: '广东省', value: 'guangdong' },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
