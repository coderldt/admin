<template>
    <div>
        <div class='h-panel' v-margin='20'>
            <div class='h-panel-bar'>
                <span class='h-panel-title'>员工管理</span>
            </div>
            <div class='h-panel-body'>
                <div class="search clear-fix">
                    <Button color="primary" @click="editmodal.show = true" v-margin="20">添加</Button>
                    <div class="float-right">
                        <div class="h-input-group " v-width="400" v-margin="20">
                            <div class="h-input-addon"><Select v-model="search.type" :datas="selectList"
                                    :no-border="true"></Select></div>
                            <input type="text" v-model="search.value" />
                            <Button color="primary" @click="getList">搜索</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Table :datas="list" borderborder stripe :loading="loading" border>
                        <TableItem align="center" title="姓名" prop="real_name"></TableItem>
                        <TableItem align="center" title="手机号" prop="mobile"></TableItem>
                        <TableItem align="center" title="状态">
                            <template slot-scope="{data}">
                                <h-switch v-model="data.status" :small="true" @change="changeStatus(data._id)">
                                </h-switch>
                            </template>
                        </TableItem>
                        <TableItem align="center" title="操作">
                            <template slot-scope="{data}">
                                <Button color="primary" @click="edit(data._id)">编辑</Button>
                                <Button color="yellow" @click="reset(data.mobile)">重置密码</Button>
                                <Button color="green" @click="addressManager(data._id)">地址管理</Button>
                                <Button color="red" @click="remove(data._id)">删除</Button>
                            </template>
                        </TableItem>
                    </Table>
                </div>
                <p>
                    <Pagination v-model='pagination' v-if="pagination.total" layout='total,pager,jumper,sizes'
                        align="right" small></Pagination>
                </p>
            </div>
        </div>
        <Edit :editShow.sync="editmodal.show" :id="editmodal.id" @addsuccess="getList"></Edit>
        <addressModel :addressShow.sync="addressShow.show" :id="addressShow.id"></addressModel>
    </div>
</template>

<script>
    import Edit from './edit'
    import addressModel from './addressModel'
    import axios from 'axios'
    import Upload from 'components/common/upload'
    export default {
        components: {
            Edit,
            addressModel,
            Upload
        },
        data() {
            return {
                img: '',

                list: [],
                loading: false,
                selectList: [
                    { key: 'mobile', title: '手机号' },
                    { key: 'real_name', title: '姓名' },
                ],
                search: {
                    type: 'mobile',
                    value: '',
                },
                pagination: {
                    page: 1,
                    size: 10,
                    total: 0
                },
                editmodal: {
                    show: false,
                    id: ''
                },
                addressShow: {
                    show: false,
                    id: ''
                }
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            async getList() {
                this.loading = true
                this.search.page = this.pagination.page
                this.search.pageSize = this.pagination.size
                const res = await R.Employe.list(this.search)
                if (res.ok) {
                    this.list = res.data.list
                    this.pagination.total = res.data.total
                }
                this.loading = false
            },
            edit(id) {
                this.editmodal.show = true
                this.editmodal.id = id
            },
            addressManager(id) {
                this.addressShow.show = true
                this.addressShow.id = id
            },
            async remove(id) {
                const res = await R.Employe.delete({ id })
                if (res.ok) {
                    this.$Message.success(res.msg)
                    this.getList()
                }
            },
            async changeStatus(id) {
                const res = await R.Employe.changeStatus({ id })
                if (res.ok) {
                    this.$Message.success(res.msg)
                    this.getList()
                }
            },
            async reset(mobile) {
                this.$Modal({
                    title: '重置密码',
                    content: '确定重置密码',
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
                            const res = await R.Common.reset({ mobile })
                            if (res) {
                                this.$Message.success(res.msg)
                                this.getList()
                            }
                            modal.close();
                        },
                        cancel: (modal) => {
                            modal.close();
                        }
                    }
                });
            },
            // uploadfinish(data) {
            //     console.log(data);
            // }
        }
    }
</script>
<style scoped>
</style>

<style>
    .clear-fix::after {
        content: '';
        display: block;
        clear: both;
    }
</style>