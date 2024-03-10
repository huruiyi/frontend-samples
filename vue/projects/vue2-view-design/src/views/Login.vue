<template>
    <div>
        <Row type="flex">
            <Col offset="8" span="8">
                <div style="text-align: center;margin-top: 300px">
                <Button style="margin: 0 auto" type="success" @click="handleLogin">一键登录</Button>
                </div>
            </Col>
        </Row>

    </div>
</template>

<script>
    export default {
        name: 'Login',
        methods: {
            handleLogin() {
                this.$router.push('/main')
            }
        }
    }
</script>

<style scoped>

</style>
