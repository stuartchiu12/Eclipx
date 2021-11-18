<template>
    <div>
    <ul>
    <li><label>Email</label><input type="text" id="email" :value="email"></li>
    <li><label>Password</label><input type="password" id="password" :value="password"></li>
    </ul>
    <input type="submit" v-on:click="login">
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: 'admin@eclipx.com',
      password: 'eclipx'
    }
  },
  methods: {
    login () {
      const body = {
        email: this.email,
        password: this.password
      }
      const payload = { credentials: 'same-origin', mode: 'cors', method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }
      fetch('http://localhost:8000/login', payload)
        .then(res => res.json())
        .then(json => {
          sessionStorage.setItem('jwt', json.jwt)
          this.$router.push('map')
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  label{
    width: 200px;
    display: inline-block;
  }
  ul{
    width: 800px;
    list-style-type: none;
    margin: 0 auto;
    padding: 0;
  }

</style>
