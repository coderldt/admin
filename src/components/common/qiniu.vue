<template>
  <div>
    <Uploader
      @fileclick="fileclick"
      :type="type"
      :files="value"
      :data-type="dataType"
      :limit="limit"
      :uploadList="uploadList"
      ref="uploader"
      :dragdrop="dragdrop"
      :class-name="className"
      @deletefile="deletefile"
      :readonly="readonly"
      :multipart_params="multipart_params"
    >
      <div slot="dragdrop" v-if="$slots.dragdrop">
        <slot name="dragdrop"></slot>
      </div>
    </Uploader>
  </div>
</template>
<script>
// 由于七牛和plupload的封装不是es6模式的，所以我们自己封装了两个对应的es6包
import initUploader from '../../js/common/pupload';

export default {
  props: {
    multiSelection: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'image'
    },
    dataType: String,
    dragdrop: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Object, Array, String]
    },
    limit: Number,
    className: String,
    readonly: {
      type: Boolean,
      default: false
    },
    multipart_params: {
      type: Object,
      default: function() {
        return {};
      }
    },

    url:{
      type:String,
      default: function (){
        return 'http://localhost:3000/api/upload';
      },
    },
  },
  data() {
    return {
      uploadList: []
    };
  },

  watch:{
    multipart_params : {
      deep:true,
      handler(val){
        console.log(val)
      },
    },
  },

  methods: {
    deletefile(index) {
      let value = null;
      if (this.type == 'images' || this.type == 'files') {
        value = Utils.copy(this.value);
        value.splice(index, 1);
      } else {
        value = null;
        this.uploadList = [];
      }
      this.$emit('input', value);
      // 修改添加了参数,index  2020/9/14
      this.$emit('onDeleted',index);
    },
    init() {
      let that = this;

      let filters = {};
      if (this.type == 'images' || this.type == 'image') {
        filters.mime_types = [
          {
            title: 'Image',
            extensions: 'jpg'
          }
        ];
      }

      if (this.type == 'files' || this.type == 'file') {
        filters.mime_types = [
          {
            title: 'xlsx',
            extensions: 'xlsx'
          }
        ];
      }

      console.log(this.imgHost)

      initUploader({
        filters,
        runtimes: 'html5',
        browserButton: this.$refs.uploader.getBrowseButton(),
        url: this.url,
        domain: this.imgHost,
        multiSelection: this.multiSelection,
        multipart_params: this.multipart_params,
        // 上传后
        fnFilesAdded(up, files) {
          if (that.limit && files.length + that.value.length > that.limit) {
            that.$Message.error(`你上传的文件超过${that.limit}个。`);
            files = [];
            that.uploadList = [];
            // 这里不能 return false
            return;
          }
          files.forEach(file => {
            if (FileReader) {
              let reader = new FileReader();
              reader.onload = event => {
                file.thumbUrl = event.target.result;
              };
              reader.readAsDataURL(file.getNative());
            }
            if (that.type == 'files' || that.type == 'images') {
              that.uploadList.push(file);
            } else {
              that.uploadList = [file];
            }
          });
        },
        // 上传之前
        fnBeforeUpload(up, file) {},

        // 上传中
        fnUploadProgress(up, file) {},

        // 返回上传结果
        fnFileUploaded(up, file, res) {
          if (res.ret == 200) {
            let domain = up.getOption('domain');
            that.$Message.success('上传成功');
            if (!Utils.isEmpty(res.data.url)) {
              file.url = `${domain}/${res.data.url}`;
            }
          } else {
            that.$Message.error(res.msg);
          }
        },
        // 发生异常后
        fnError(up, err, errTip) {
          that.uploadList.splice(0, that.uploadList.length);
          that.$Message.error(errTip);
        },

        fnUploadComplete(res) {
          let fileList = that.$refs.uploader.getFileList();
          that.$emit('input', fileList);
          if (that.type == 'files' || that.type == 'images') {
            that.uploadList.splice(0, that.uploadList.length);
          }
          that.$emit('completeUpload');
        }
      });
    },
    fileclick(file) {
      console.log(file)
      // this.$Modal({
      //   title: '预览或者下载',
      //   content: `自定义处理文件预览或者下载`
      // });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  }
};
</script>
