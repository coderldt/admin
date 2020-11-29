<template>
    <div >
        <div class='h-panel' v-margin='30'>
            <div class='h-panel-bar' noBorder>
                <span class='h-panel-title'> 
                    <span class="link" @click="$router.go(-1)"><i class="h-icon-left"></i>&nbsp;返回</span>&nbsp;&nbsp; 添加商品</span>
            </div>
            <div class='h-panel-body'>
                <h2 v-margin="20">基本信息</h2>
                <Form validOnChange ref="form" :model="form" :rules="rules" v-width="500" showErrorTip>
                    <FormItem label="名称" prop="title">
                        <input type="text" v-model="form.title">
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <Select v-model="form.type" keyName="id" titleName="title" :datas="typeList"></Select>
                    </FormItem>
                    <FormItem label="轮播图片" prop="swiperImg">
                        <Uploads :limit="3" :values="form.swiperImg" multiple @uploadfinish="swiperImgfinish" key="swiperImg" @delimt='delImg'></Uploads>
                    </FormItem>
                    <FormItem label="是否有货" prop="status">
                        <Radio v-model="form.status" :datas="[{ key: 0, title: '无货' }, { key: 1, title: '有货' }]"></Radio>
                    </FormItem>
                    <FormItem label="价格" prop="price">
                        <NumberInput v-model="form.price" useOperate :precision="2"></NumberInput>
                    </FormItem>
                    <FormItem label="质量" prop="weight">
                        <NumberInput v-model="form.weight" useOperate :precision="2"></NumberInput>
                    </FormItem>
                    <FormItem label="单位" prop="unit">
                        <input type="text" v-model="form.unit">
                    </FormItem>
                </Form>
                <h2 v-margin="20">更多</h2>
                <Form validOnChange ref="formmore"  :model="form" :rules="rules" showErrorTip>
                    <FormItem label="详情" prop="detail">
                        <Uploads :limit="3" :values="form.detail" multiple @uploadfinish="detailfinish" key="detail" @delimt='deldetail'></Uploads>
                    </FormItem>
                    <FormItem label="参数" prop="param">
                        <Form  mode="twocolumn" >
                            <FormItem>
                                <div class="h-input-group"  v-width="500">
                                    <TagInput v-model="type" type="string" split="," placeholder="请用逗号分隔"></TagInput>
                                    <Button color="primary" @click="add">添加参数</Button>
                                </div>
                            </FormItem>
                            <FormItem :label="item.title" v-for="(item, index) in form.param" :key="index" style="width: 50%;">
                                <textarea v-model="item.value" rows="2"></textarea>
                            </FormItem>
                        </Form>
                    </FormItem>
                    <FormItem label="保障" prop="guarantee">
                        <Checkbox v-model="form.guarantee" keyName="key" titleName="title" :datas="guaranteeSelect" ></Checkbox>
                    </FormItem>
                    <FormItem label="保障详情">
                        <Form :labelWidth="120" readonly>
                            <FormItem :label="item.title" v-for="(item, index) in guaranteeDetail" :key="index">
                                {{item.msg}}
                            </FormItem>
                        </Form>
                    </FormItem>
                </Form>
                <div style="border-top: 1px solid #c1c1c1;">
                    <Button v-margin="20" @click="submit" >提交</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { guarantee } from 'js/config/param-config.js'
export default {
    data() {
        return {
            typeList: [],
            guaranteeSelect: [],
            guaranteeDetail: [],
            type: '',
            form: {
                _id: 0,
                type: '',
                title: '',
                swiperImg: [],
                status: 1,
                price: 0,
                weight: 0,
                unit: '',
                detail: [],
                param: [
                    { title: '生产日期', value: '' },
                    { title: '品牌', value: '' },
                    { title: '产地', value: '' },
                ],
                guarantee: []
            },
            rules: {
                required: ['type', 'title', 'swiperImg', 'status', 'price', 'weight', 'unit', 'detail', 'param', 'guarantee']
            }
        }
    },
    created() {
        this.getSpecieList()
        this.guaranteeSelect = guarantee.selectList
        this.form._id = this.$route.query.id
    },
    methods: {
        async getSpecieList() {
            const res = await R.Specie.list()
            if(res.ok) {
                this.typeList = res.data
            }
        },
        async submit() {
            let validResult = this.$refs.form.valid();
            let validResult1 = this.$refs.formmore.valid();
            if (validResult.result && validResult1.result) {
                let res = null
                if(this.form._id) {
                    res = await R.Goods.update(this.form)
                }else {
                    res = await R.Goods.insert(this.form)
                }
                if(res.ok) {
                    this.$Message.success(res.msg);
                }
            }
        },
        add() {
            if(!this.type) {
                return this.$Message.warn('请输入添加参数名')
            }
            let param = this.type.split(',')
            for(let i of param) {
                this.form.param.push({ title: i, value: '' })
            }
        },
        swiperImgfinish(data) {
            this.form.swiperImg = data
        },
        detailfinish(data) {
            this.form.detail = data
        },
        async getinfo(id) {
            const res = await R.Goods.info({id})
            if(res.ok) {
                this.form = res.data
            }
        },
        delImg(index) {
            this.form.swiperImg.splice(index, 1)
        },
        deldetail(index) {
            this.form.detail.splice(index, 1)
        }
    },
    watch: {
        'form._id'(val) {
            if(val) {
                this.getinfo(val)
            }
        },
        'form.guarantee': {
            immediate: true,
            handler(val) {
                console.log(val, guarantee);

                this.guaranteeDetail = []
                for(let i of guarantee.detail) {
                    if(val.indexOf(i.key) != -1) {
                        this.guaranteeDetail.push(i)
                    }
                }
                console.log();
            }
        }
    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
<style>
    textarea {
        resize: none;
    }
</style>