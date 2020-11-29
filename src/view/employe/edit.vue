<template>
    <div>
        <Modal v-model='open' hasCloseIcon middle>
            <div slot='header'>添加员工</div>
            <div style='margin: 20px 35px 0px 0px' v-width="500">
                <div>
                    <Form validOnChange ref="form" :model="form" :rules="rules" showErrorTip>
                        <FormItem label="姓名" prop="real_name">
                            <input type="text" v-model="form.real_name">
                        </FormItem>
                        <FormItem label="手机号" prop="mobile">
                            <input type="text" v-model="form.mobile">
                        </FormItem>
                        <FormItem label="状态" prop="status">
                            <Radio :datas="[{ key: '0', title: '禁用' }, { key: '1', title: '启用' } ]"
                                v-model="form.status"></Radio>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <div slot='footer'>
                <button class='h-btn h-btn-primary' @click='confirm'>确定</button>
                <button class='h-btn' @click='open=false'>取消</button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        props: {
            editShow: Boolean,
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
                    real_name: '',
                    mobile: '',
                    status: 1
                },
                rules: {
                    required: ['real_name', 'mobile', 'status']
                }

            }
        },
        methods: {
            async confirm() {
                let validResult = await this.$refs.form.valid();
                if (validResult.result) {
                    let res = null
                    if (this.form.id) {
                        res = await R.Employe.update(this.form)
                    } else {
                        res = await R.Employe.add(this.form)
                    }
                    if (res.ok) {
                        this.$Message.success(res.msg)
                        this.open = false
                        this.$emit('addsuccess')
                    }
                }
            }
        },
        watch: {
            editShow(val) {
                this.open = val
                this.form.id = this.id
            },
            open(val) {
                if (!val) {
                    this.$emit('update:editShow', val)
                }else {
                    if(this.id) {
                        R.Employe.info({id: this.id}).then(res => {
                            this.form = res.data
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