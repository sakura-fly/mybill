<template>
  <div>
    <Row>
      <Col :sm="{ span: 8, offset: 8 }">
        <Select v-model="seUser" style="width: 166px;">
          <Option v-for="user in userList" :value="user.id" :key="user.id">{{ user.username }}</Option>
        </Select>
        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 166px"
                    @on-change="cldate"></DatePicker>

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
      seUser: ''

    }
  },
  mounted () {
    console.log(this.data + '111111111111111')

    this.$axios.get('/api/msg/list')
      .then((r) => {
        this.data = r.data
      })
      .catch(function (error) {
        console.log(error)
      })
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
      console.log(b)
    }
  }
}
</script>

<style scoped>

</style>
