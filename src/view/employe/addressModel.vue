<template>
    <div >
        <Modal v-model='open' hasCloseIcon middle>
            <div slot='header'>地址管理</div>
            <div style='margin: 20px 35px 0px 0px'>
                <Form>
                    <FormItem readonly label="用户">{{form.real_name}}</FormItem>
                    <FormItem label="地址">
                        <div class="h-input-group" v-width="500">
                            <input type="text" v-model="addressValue" placeholder="输入" />
                            <Button color="primary" @click="add">添加</Button>
                        </div>
                    </FormItem>
                    <FormItem readonly v-for="(item, index) in form.address" :key="index">
                        <Button class="float-right" color="red" @click="form.address.splice(index, 1)">删除</Button>
                        {{item}} 
                    </FormItem>
                </Form>
            </div>
            <div slot='footer'>
                <button class='h-btn h-btn-primary' @click='confirm'>确定</button>
                <button class='h-btn' @click='open = false'>取消</button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        addressShow: Boolean,
        id: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            open: false,
            form: {
                id: '',
                address: [],
            },
            addressValue: ''
        }
    },
    methods: {
        add() {
            this.form.address.push(this.addressValue)
            this.addressValue = ''
        },
        async confirm() {
            const res = await R.Employe.address(this.form)
            if(res.ok) {
                this.$Message.success(res.msg)
                this.open = false
            }
        }
    },
    watch: {
        addressShow(val) {
            this.open = val
            this.form.id = this.id
        },
        open(val) {
            if (!val) {
                this.$emit('update:addressShow', val)
                this.form = {
                    id:     '',     
                    address: [],
                }
            }else {
                if(this.id) {
                    R.Employe.info({id: this.id}).then(res => {
                        this.form.real_name = res.data.real_name
                        this.form.address = res.data.address
                    })
                }
            }
        }
    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>