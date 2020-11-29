<template>
    <div >
        <div class='h-panel' v-margin='20'>
            <div class='h-panel-bar' noBorder>
                <span class='h-panel-title'>分类管理</span>
            </div>
            <div class='h-panel-body'>
                <Row>
                    <Cell :width="8">
                        <Button color="primary" @click="clear" style="margin-bottom: 10px;">添加</Button>
                        <li v-for="item in typeList" @click="info(item.id)">
                            {{item.title}}
                        </li>
                    </Cell>
                    <Cell :width="16">
                        <Form validOnChange ref="form" :model="form" :rules="rules" showErrorTip>
                            <FormItem label="标题"  prop="title" v-width="400">
                                <input type="text" v-model="form.title">
                            </FormItem>
                            <FormItem label="图片" prop="img">
                                <Uploads :limit="1" :values="form.img" multiple @uploadfinish="imgfinish" key="img" @delimt="delimgfinish"></Uploads>
                            </FormItem>
                            <FormItem label="轮播图片" prop="swiperImg">
                                <Uploads :limit="3"  :values="form.swiperImg" multiple @uploadfinish="swiperImgfinish" key="swiperImg"  @delimt="delImg"></Uploads>
                            </FormItem>
                            <FormItem>
                                <Button color="primary" @click="submit">{{ form.id == 0 ? '提交' : '更新' }}</Button>
                                <Button color="red" v-if="form.id != 0" @click="del">删除</Button>
                            </FormItem>
                        </Form>
                    </Cell>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            typeList: [],
            id: 0,

            form: {
                id: 0,
                title: '',
                img: [],
                swiperImg: []
            },
            rules: {
                required: ['title', 'swiperImg']
            }
        }
    },
    created() {
        this.getlist()
    },
    methods: {
        async getlist() {
            const res = await R.Specie.list()
            if(res.ok) {
                this.typeList = res.data
            }
        },
        async info(id) {
            const res = await R.Specie.info({ id })
            if(res.ok) {
                ['title', 'img', 'swiperImg'].forEach(item => {
                    this.form[item] = res.data[item]
                })
                this.form.id = res.data._id
            }
        },
        async submit() {
            let res = ''
            if(!this.form.id) {
                res = await R.Specie.insert(this.form)
            }else {
                res = await R.Specie.update(this.form)
            }

            if(res.ok) {
                this.$Message.success(res.msg)
                this.getlist()
                this.clear()
            }
        },
        async del() {
            const res = await R.Specie.delete({ id: this.form.id })
            if(res.ok) {
                this.$Message.success(res.msg)
                this.getlist()
                this.clear()
            }
        },
        imgfinish(data) {
            this.form.img = data
        },
        swiperImgfinish(data) {
            this.form.swiperImg = data
        },
        clear() {
            this.form = {
                id: 0,
                title: '',
                img: [],
                swiperImg: []
            }
        },
        delImg(index) {
            this.form.swiperImg.splice(index, 1)
        },
        delimgfinish(index) {
            this.form.img.splice(index, 1)
        }
    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
li {
    list-style: none;
    cursor: pointer;
    padding: 10px;
}

li:hover {
    background: #eaeaea;
}
</style>