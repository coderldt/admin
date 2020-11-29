<template>
    <div>
        <div class="upload relative">
            <button :style="{ width: width + 'px', height: width + 'px' }">
                <i class="iconfont icon-tianjia"></i>
            </button>
            <input type="file" :multiple="multiple" @change='upload($event)' accept="image/jpeg,image/png" :style="{ width: width + 'px', height: width + 'px' }">
            <span 
                class="imgItem" 
                v-for="(item, index) in value" 
                :key="index"
                :style="{ width: width + 'px', height: width + 'px', 'margin-right': '10px', backgroundImage: 'url(' + item + ')'}">
                <span class="operate">
                  <i class="operate1" @click="$ImagePreview(item)">全屏</i>
                  <i class="operate1" @click="del(index)">删除</i>
                </span>
              </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            width: {
                type: Number,
                default: 70
            },
            type: {
                type: String,
                default: 'file'
            },
            multiple: {
                type: Boolean,
                default: false
            },
            limit: {
                type: Number,
                default: 1
            },
            values: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                value: []
            }
        },
        watch: {
            'values'(val) {
                if(val) {
                    this.value = this.values
                }
            }
        },
        methods: {
            clear() {
                this.value = []
            },
            async upload(e) {
                let list = e.target.files
                if(list.length + this.value.length > this.limit) {
                    return this.$Message.warn(`最多可选${this.limit}张图片`)
                }
                
                let data = new FormData()
                if(list.length == 1) {
                    data.append('file',e.target.files[0]);
                    const res = await R.Upload.upload(data)
                    if(res) {
                        this.value.push(res.data.data.path)
                        this.$emit('uploadfinish', this.value)
                    }
                }else {
                    for(let i of list) {
                        data.append('files', i);
                    }
                    const res = await R.Upload.uploads(data)
                    if(res) {
                        for(let i of res.data.data.path) {
                            this.value.push(i)
                        }
                        this.$emit('uploadfinish', this.value)
                    }
                }
            },
            del(index) {
                this.$emit('delimt', index)
            }
        }
    }
</script>
<style lang="less" scoped>
    /* @import url(); 引入css类 */
    @font-face {
        font-family: "iconfont";
        src: url('//at.alicdn.com/t/font_2209748_jc0052bga6b.eot?t=1605605709536');
        /* IE9 */
        src: url('//at.alicdn.com/t/font_2209748_jc0052bga6b.eot?t=1605605709536#iefix') format('embedded-opentype'),
            /* IE6-IE8 */
            url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKkAAsAAAAABlQAAAJXAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApcbwE2AiQDCAsGAAQgBYRtBzEblgURFYwBsq8KeDIxj4EXyp2aQPLFEHNNN1xFTVUHeR5E8LVf1u/PbDIhcoAqWbUVT3DAnlhdXXlEhw5Y2RMKJevT39xGxz7RiQwEQzSVhW4yFmuyeQJtdd3/qRn2hQ4oC/M88S7/4/7MvFyXUokKWMBm0+hrtWT7PJfTm34VyPxAOe5FY02aNIB6cUAB7Y1RZEUSecPYBS/wMYFO45pibWPXIUVmrwrEhbOnjyqFkCyzbBHaGg5mxGOqVK/6jEfR9+OfVhSoNBLsun2n1k9Y+snJS5fry25ACENAxxtIaCIThxpTeyTBBElnKpvmWNXBT3UdOMVRbYL9dXZlNxiF8mdSeMpHzVbwWPIhveOTJhOjp9lP9z6gHl94+X1nNwnvfozUJ7741PXtZX2t8Vbfq5A/Mz6jKHC9a92/YwnUT9KfFASCR1/6cB//iwvg60VL6idZOouyL3fwTxQDu7Khsh1V1hSNg5XRczV06kQN+wb9mGoeuYFcKEYmeNqNZUiKWTKzTTR0WUCbYhGd5m0e7zLkoiRyBXNuAARO+IAMHyx8SWF/UMsfJqJEc2Je6HYEkYSS0YB6Q9DrYl0Xi7j6hO4+ScqrIuEN6QhRaKumnB1xQVpiy/FwHbMFS+sMA3gOp2mFjdaImivPvPV1bZveVOl1zoREkMSQAZQ3EGirhQ2GM1H5/Aly7iYSdXTUZW8QOYTxQavSDCBH/TKo41FeOTw4HcYsYJHVDAxgHppMVmBrnhchjVX8hMSmVzv97FB9tb1x/rsjZJlgW4pw6pJyKcglerYsAwAAAA==') format('woff2'),
            url('//at.alicdn.com/t/font_2209748_jc0052bga6b.woff?t=1605605709536') format('woff'),
            url('//at.alicdn.com/t/font_2209748_jc0052bga6b.ttf?t=1605605709536') format('truetype'),
            /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
            url('//at.alicdn.com/t/font_2209748_jc0052bga6b.svg?t=1605605709536#iconfont') format('svg');
        /* iOS 4.1- */
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-tianjia:before {
        content: "\e62d";
    }

    button {
      position: relative;
      border: 1px dashed #c1c1c1;
      border-radius: 4px;
      background: transparent;
      margin-right: 10px;
    }

    .iconfont {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 22px;
    }

    input {
      position: absolute;
      left: 0;
      top: 0;
      cursor: pointer;
      opacity: 0;
    }

    .operate {
      display: none;
      position: relative;
      width: 70px;
      height: 70px;
      background: rgba(0,0,0,.6);
      border-radius: 4px;
    }

    .operate1 {
      position: absolute;
      color: #fff;
      top: 50%;
      left: 50%;
      font-size: 10px;
    }

    .operate1:nth-of-type(1) {
      transform: translate(-113%, -50%);
    }
    .operate1:nth-of-type(2) {
      transform: translate(12%, -50%);
    }

    .imgItem {
      display: inline-block;
      width: 70px;
      height: 70px;
      border-radius: 4px;
      margin-right: 10px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      cursor: pointer;
    }

    .imgItem:hover .operate {
        display: inline-block;
    }

    .operate {
      display: none;
      position: relative;
      width: 70px;
      height: 70px;
      background: rgba(0,0,0,.6);
      border-radius: 4px;
    }

    .operate1 {
      position: absolute;
      color: #fff;
      top: 50%;
      left: 50%;
      font-size: 10px;
    }

    .operate1:nth-of-type(1) {
      transform: translate(-113%, -50%);
    }
    .operate1:nth-of-type(2) {
      transform: translate(12%, -50%);
    }
</style>