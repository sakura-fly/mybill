<template>
  <div>
    <Row>
      <Col :sm="{ span: 8, offset: 8 }">
        <Input clearable placeholder="用户名" v-model="data.username" />
        <br>
        <br>
        <Input clearable placeholder="密码" type="password" v-model="data.pwd"/>
        <br>
        <br>
        <Button long type="info" @click="login">ok</Button>
        <!--// eslint-disable-next-line-->
      </Col>
    </Row>
  </div>

  <!--<div>asfsfsad</div>-->
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: {
        username: '',
        pwd: ''
      }
    }
  },
  methods: {
    login () {
      this.$axios.post('/api/auth', this.data)
        .then(function (r) {
          alert(r)
        })
        .catch(function (e) {
          alert(e)
        })
    }
  }
}
</script>
