import { Card, Col, List, Progress, Row } from "antd";

const DashboardPage = () => {

  const data = [
    {
      title: 'PO2024011801 - 高精密轴承组件A-7391',
      step1: {},
      step2: {},
      step3: {}
    },
    {
      title: 'PO2024011802 - 液压泵体B-2156',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  return (
      <Row>
        <Col span={ 6 }>
          <Card title="今日生产订单" extra={ <a href="#">共12个订单</a> } variant="outlined"
                style={ { marginLeft: "5px", marginRight: "5px", height: "85vh" } }>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col style={ {} } span={ 13 }>
          <Card title="工作进度矩阵" extra={
            <p><span style={ { backgroundColor: "red", "borderRadius": "15px" } }>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><label>正常</label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={ { backgroundColor: "#22c55E", "borderRadius": "15px" } }>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><label>异常</label>
            </p> } variant="outlined"
                style={ { marginLeft: "5px", marginRight: "5px", height: "85vh" } }>

            <List
                split={ false }
                itemLayout="vertical"
                dataSource={ data }
                renderItem={ (item) => (
                    <List.Item>
                      <List.Item.Meta
                          title={ item.title }
                      />
                      <Card variant={ "borderless" }>
                        <Row>
                          <Col span={ 8 }>
                            <Progress
                                percent={ 80 }
                                format={ () => `80/100` }
                                percentPosition={ { align: 'start', type: 'inner' } }
                                size={ [ 100, 20 ] }
                                strokeColor="#22c55E"
                            />
                          </Col>
                          <Col span={ 8 }>
                            <Progress
                                percent={ 70 }
                                format={ () => `70/100` }
                                percentPosition={ { align: 'start', type: 'inner' } }
                                size={ [ 100, 20 ] }
                                strokeColor="#22c55E"
                            />
                          </Col>
                          <Col span={ 8 }>
                            <Progress
                                percent={ 50 }
                                format={ () => `50/100` }
                                percentPosition={ { align: 'start', type: 'inner' } }
                                size={ [ 100, 20 ] }
                                strokeColor="#22c55E"
                            />
                          </Col>
                        </Row>
                      </Card>
                    </List.Item>
                ) }
            />
          </Card>
        </Col>
        <Col span={ 5 }>
          <Card title="预警通知" extra={ <a href="#">5个待处理</a> } variant="outlined"
                style={ { marginLeft: "5px", marginRight: "5px", height: "85vh" } }>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
  );
}

export { DashboardPage };
