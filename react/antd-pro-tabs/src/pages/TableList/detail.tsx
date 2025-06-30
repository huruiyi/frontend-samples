import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';

export default () => {
  const params = useParams();

  return (
    <PageContainer>
      <h1>路由参数：{params.id}</h1>
    </PageContainer>
  );
};
