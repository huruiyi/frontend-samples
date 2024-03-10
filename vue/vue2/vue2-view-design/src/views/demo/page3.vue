<template>
  <div class="i-layout-page-header">
    <Card v-if="!isEditMode">
      <p slot="title">
        <Icon type="ios-cube-outline"/>
        基础数据
      </p>
      <Row>
        <Form :model="dataDic" label-position="right" :label-width="100">
          <Col>
            <FormItem label="类型">
              <Input v-model="dataDic.Type"/>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="代码">
              <Input v-model="dataDic.Code"/>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="名称">
              <Input v-model="dataDic.Name"/>
            </FormItem>
          </Col>
          <Col>
            <Button icon="ios-search-outline" shape="circle" type="primary" @click="queryList">检索</Button>
            <Button icon="ios-cut-outline" shape="circle" style="margin-left: 8px" @click="resetQuery">重置</Button>
          </Col>
        </Form>
      </Row>
    </Card>
    <Card dis-hover :bordered="false">
      <Button icon="ios-add-circle-outline" type="primary" ghost @click.native="addRecord">新增</Button>
      <Button icon="ios-create-outline" style="margin-left: 8px" type="primary" ghost @click.native="editRecord">编辑
      </Button>
      <Poptip confirm title="是否要进行删除操作?" @on-ok="deleteRecord">
        <Button icon="ios-close-circle-outline" style="margin-left: 8px" type="error" ghost>删除</Button>
      </Poptip>
      <Table stripe border ref="searchTable" :columns="tableItem.column" :data="tableItem.data"
             :height="tableItem.height" style="margin-top:10px;width:100%;"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="tableItem.total" :page-size='tableItem.pageSize' :current="tableItem.pageIndex" show-total
                show-sizer
                :page-size-opts="[50, 100, 150]"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  name: 'page3',
  data: function () {
    return {
      isEditMode: false,
      loading: false,
      dataDic: {
        Code: '',
        Name: '',
        Type: ''
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 1
      },
      tableItem: {
        height: 0,
        total: 0,
        pageIndex: 1,
        pageSize: 50,
        column: [
          {
            title: 'Id',
            key: 'Id',
            align: 'center',
            width: '50px',
            type: 'selection'
          },
          {
            title: '类型名称',
            key: 'Type',
            align: 'center',
            width: '100px'
          },
          {
            title: '代码',
            key: 'Code',
            align: 'center',
            width: '180px'
          },
          {
            title: '名称',
            key: 'Name',
            align: 'center',
            width: '250px'
          },
          {
            title: '父级',
            key: 'ParentId',
            align: 'center',
            width: '250px'
          },
          {
            title: '排序值',
            key: 'Sort',
            align: 'center',
            width: '150px'
          },
          {
            title: '备注',
            key: 'Remark',
            align: 'left'
          }
        ]
      },
      dataDics: [
        {
          Id: '1',
          Type: '事项大类',
          Code: ' TaxServices',
          Name: '纳税服务',
          Sort: '1',
          ParentId: '',
          Remark: '备注信息。。。'
        },
        {
          Id: '2',
          Type: '事项大类',
          Code: ' BasicManagement ',
          Name: '基础管理',
          Sort: '2',
          ParentId: '',
          Remark: '备注信息。。。'
        },
        {
          Id: '3',
          Type: '事项大类',
          Code: 'RiskManagement',
          Name: '风险管理',
          Sort: '3',
          ParentId: '',
          Remark: '备注信息。。。'
        },
        {
          Id: '4',
          Type: '事项大类',
          Code: 'LegalAffairs',
          Name: '法制事务',
          Sort: '4',
          ParentId: '',
          Remark: '备注信息。。。'
        },
        {
          Id: '5',
          Type: '事项大类',
          Code: 'InternalAffairs',
          Name: '内部事务',
          Sort: '5',
          ParentId: '',
          Remark: '备注信息。。。'
        }, {
          Id: '6',
          Type: '事项中类',
          Code: '',
          Name: '申报征收批量处理',
          Sort: '1',
          ParentId: '1-事项大类',
          Remark: '备注信息。。。'
        }, {
          Id: '7',
          Type: '事项中类',
          Code: '',
          Name: '违法处置',
          Sort: '2',
          ParentId: '1-事项大类',
          Remark: '备注信息。。。'
        }, {
          Id: '9',
          Type: '事项中类',
          Code: '',
          Name: '风险应对实施-管理风险应对',
          Sort: '3',
          ParentId: '1-事项大类',
          Remark: '备注信息。。。'
        }
      ]
    }
  },
  methods: {
    handlePage(value) {
      this.page.currentPage = value
      this.queryList()
    },
    handlePageSize(value) {
      this.page.pageSize = value
      this.page.currentPage = 1
      this.queryList()
    },
    queryList() {
      this.loading = true
      const url = `http://localhost:8010/api/Home/GetDicInfo?pageSize=${this.page.pageSize}&currentPage=${this.page.currentPage}`
      console.log(url)
      this.$http.get(url).then(response => {
        const resObj = response.body
        this.page.pageTotal = resObj.total
        this.dataDics = resObj.data
        this.loading = false
      }, response => {
        console.log(response)
      })
    },
    addRecord() {
    },
    editRecord() {

    },
    deleteRecord() {

    },
    back() {
    },
    resetQuery() {
      this.dataDic.Code = ''
      this.dataDic.Name = ''
      this.dataDic.Type = ''
    }
  }
}
</script>

<style scoped>

</style>
