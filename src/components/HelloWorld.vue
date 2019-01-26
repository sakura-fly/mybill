<template>
  <div>
    <Row>
      <Col :sm="{ span: 8, offset: 8 }">
        <Form ref="data" :rules="rule" :model="data">
          <FormItem prop="username">
            <Input clearable placeholder="用户名" v-model="data.username"/>
          </FormItem>
          <FormItem prop="pwd">
            <Input clearable placeholder="密码" type="password" v-model="data.pwd"/>
          </FormItem>
          <div v-if="inLogin">
            <Button long type="info" @click="login('data')">登录</Button>
          </div>
          <div v-else>
            <Button long type="info" @click="regist('data')">注册</Button>
          </div>
        </Form>
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
      inLogin: true,
      rule: {
        username: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        pwd: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'string', min: 3, message: '最少3位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post(process.env.API_HOST + '/auth', this.$qs.stringify(this.data))
            .then((r) => {
              if (r.data.code === 1 && r.data.model !== null) {
                // this.$cookies.set('user', JSON.stringify(r.data.model))
                alert('ok')
                // window.location.href = 'main'
                this.$router.push({path: '/main'})
              } else {
                alert('失败')
              }
            })
            .catch(function (e) {
              alert('失败')
            })
        } else {
          this.$Message.error('有填错的')
        }
      })
    },
    regist (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post(process.env.API_HOST + '/user', this.$qs.stringify(this.data))
            .then(function (r) {
              if (r.data.code === 1 && r.data.model !== null) {
                // this.$cookies.set('user', JSON.stringify(r.data.model))
                // window.local.href = 'main'
                alert('注册成功')
              } else {
                alert('注册失败')
              }
            })
            .catch(function (e) {
              console.log(e)
              alert('网络失败')
            })
        } else {
          this.$Message.error('有填错的')
        }
      })
    }
  }
}
</script>
