<template>
  <div>
    <Row>
      <Col :sm="{ span: 10, offset: 7 }">
        <Select v-model="formData.userid" style="width: 166px;" placeholder="选人" @on-change="select">
          <Option v-for="user in userList" :value="user.id" :key="user.id">{{ user.username }}</Option>
        </Select>
        <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 166px"
                    @on-change="cldate"></DatePicker>
        <Button type="primary" @click="tianModal = true">添加</Button>
        <br>
        <h3>总金额:{{allPrice}}</h3>
        <Table :columns="columns" :data="data"></Table>
        <Modal
          v-model="tianModal"
          title="先这样吧">
          <Form ref="msgData" :rules="rule" :model="msgData">
            <FormItem prop="msg">
              <Input clearable placeholder="物品信息" v-model="msgData.msg"/>
            </FormItem>
            <!--<br>-->
            <!--<br>-->
            <FormItem prop="price">
              <Input  placeholder="价钱" v-model="msgData.price" />
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" size="large" @click="tianModal=false">取消</Button>
            <Button type="primary" size="large" @click="sendMsg('msgData')">确定</Button>
          </div>
        </Modal>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      columns: [
        {
          title: '是谁',
          key: 'name'
        }, {
          title: '啥时候',
          key: 'time'
        }, {
          title: '多少钱',
          key: 'price'
        }, {
          title: '买了啥',
          key: 'msg'
        }
      ],
      data: [],
      userList: [],
      formData: {
        userid: '',
        starttime: '',
        endtime: ''
      },
      msgData: {
        msg: '',
        price: '',
        userid: ''
      },
      allPrice: '',
      tianModal: false,
      rule: {
        msg: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        price: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number',
            message: '数字',
            trigger: 'blur',
            transform (value) {
              return Number(value)
            }}
        ]
      }

    }
  },
  mounted () {
    this.getMsg()
    this.$axios.get('/api/user/list')
      .then((r) => {
        this.userList = r.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    cldate (b) {
      this.formData.starttime = b[0]
      this.formData.endtime = b[1]
      this.getMsg()
    },
    getMsg () {
      console.log('get msg')
      this.$axios.get('/api/msg/list', {params: this.formData})
        .then((r) => {
          this.data = r.data
        })
        .catch(function (error) {
          console.log(error)
        })
      this.$axios.get('/api/msg/allprice', {params: this.formData})
        .then((r) => {
          this.allPrice = r.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    select () {
      this.getMsg()
    },
    sendMsg (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!')
          this.$cookies.get('user')
          this.$axios.post('/api/msg', this.msgData)
            .then((r) => {
              // this.allPrice = r.data
              alert(r)
              this.tianModal=false
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          this.$Message.error('有填错的')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
