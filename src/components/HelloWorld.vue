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
        <div v-if="inLogin">
          <Button long type="info" @click="login">登录</Button>
        </div>
        <div v-else>
          <Button long type="info" @click="regist">注册</Button>
        </div>
        <br>
        <a href="javascript:void(0)" @click="inLogin = !inLogin">换</a>
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
      },
      inLogin: true
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
    },
    regist () {
      this.$axios.post('/api/user', this.$qs.stringify(this.data))
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
