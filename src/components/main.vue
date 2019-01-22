<template>
  <div>
    <Row>
      <Col :sm="{ span: 10, offset: 7 }">
        <Select v-model="formData.userid" style="width: 166px;" placeholder="选人" @on-change="select" >
          <Option v-for="user in userList" :value="user.id" :key="user.id">{{ user.username }}</Option>
        </Select>
        <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 166px"
                    @on-change="cldate" ></DatePicker>
        <br>
        <h3>总金额:{{allPrice}}</h3>
        <Table :columns="columns" :data="data"></Table>
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
      allPrice: ''

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
    }
  }
}
</script>

<style scoped>

</style>
