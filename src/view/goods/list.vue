<template>
    <div>
        <div class='h-panel' v-margin='20'>
            <div class='h-panel-bar' noBorder>
                <span class='h-panel-title'>商品管理</span>
            </div>
            <div class='h-panel-body'>
                <Row>
                    <Cell :width="8">
                        <Button color="primary" @click="$router.push('/goods/edit')">添加</Button>
                    </Cell>
                    <Cell :width="16" style="text-align: right;">
                        <Form ref="form" mode="inline">
                            <FormItem>
                                <div class="h-input-group" v-width="300">
                                    <span class="h-input-addon">名称</span>
                                    <NumberInput v-model="search.title" />
                                    <Button color="primary" @click="getData">确定</Button>
                                  </div>
                            </FormItem>
                        </Form>
                    </Cell>
                </Row>
                <Table :datas="list" stripe border>
                    <TableItem title="名称" :width="80" align="center" prop="title"></TableItem>
                    <TableItem title="类型" :width="80" align="center" prop="type"></TableItem>
                    <TableItem title="价格" :width="80" align="center" prop="price"></TableItem>
                    <TableItem title="质量" :width="80" align="center" prop="weight"></TableItem>
                    <TableItem title="状态" :width="80" align="center">
                        <template v-slot:default="{data}">
                            <h-switch v-model="data.status" small @change="changestatus(data._id)"></h-switch>
                        </template>
                    </TableItem>
                    <TableItem title="图片" :width="250" align="center">
                        <template v-slot:default="{data}">
                            <ImagePreview :width="60" style="display: inline-block;" :borderRadius="5" :distance="15"
                                :datas="data.swiperImg" @click="$ImagePreview(data.swiperImg)" />
                        </template>
                    </TableItem>
                    <TableItem title="是否轮播展示" :width="150" align="center">
                        <template v-slot:default="{data}">
                            <h-switch v-model="data.isSwiper" small @change="changeSwiperStatus(data._id)"></h-switch>
                        </template>
                    </TableItem>
                    <TableItem title="是否推新" :width="150" align="center">
                        <template v-slot:default="{data}">
                            <h-switch v-model="data.isPromote" small @change="changeIsPromoteStatus(data._id)"></h-switch>
                        </template>
                    </TableItem>
                    <TableItem title="操作" :width="150" align="center">
                        <template slot-scope="{data}">
                            <!-- <Button color="primary">详情</Button> -->
                            <Button color="blue" @click="update(data._id)">修改</Button>
                            <Button color="red" @click="del(data._id)">删除</Button>
                        </template>
                    </TableItem>
                </Table>
                <p v-if="pagination.total">
                    <Pagination v-model='pagination' @change='changePage' layout='total,pager,jumper,sizes'
                        align='right'></Pagination>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                
                search: {
                    page: 1,
                    pageSize: 10,
                    title: ''

                },
                pagination: {
                    page: 1,
                    size: 10,
                    total: 0
                }
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            async getData() {
                const res = await R.Goods.list(this.search)
                if (res) {
                    this.list = res.data
                    this.$Message.success('刷新成功')
                }
            },
            changePage(value) {
                console.log(value);
                this.search.page = value.page
                this.search.pageSize = value.size
                this.getData()
            },
            del(id) {
                this.$Modal({
                    title: '删除',
                    content: '确定删除商品吗',
                    hasDivider: true,
                    hasCloseIcon: true,
                    buttons: [{
                        type: 'ok',
                        name: '确认',
                        color: 'primary'
                    }, {
                        type: 'cancel',
                        name: '关闭'
                    },],
                    events: {
                        ok: async (modal) => {
                            const res = await R.Goods.delete({id})
                            if (res) {
                                this.$Message.success(res.msg)
                                this.getData()
                            }
                            modal.close();
                        },
                        cancel: (modal) => {
                            modal.close();
                        }
                    }
                });
                console.log(id);
            },
            async changestatus(id) {
                const res = await R.Goods.changeStatus({id})
                if(res) {
                    this.$Message.success(res.msg)
                }
            },
            update(id) {
                this.$router.push('/goods/edit?id=' + id)
            },
            async changeSwiperStatus(id) {
                const res = await R.Goods.changeSwiperStatus({id})
                if(res) {
                    this.$Message.success(res.msg)
                }
            },
            async changeIsPromoteStatus(id) {
                const res = await R.Goods.changeIsPromote({id})
                if(res) {
                    this.$Message.success(res.msg)
                }
            }
        },
    }
</script>
<style scoped>
    /* @import url(); 引入css类 */
</style>