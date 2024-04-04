 <template>
      <div class="app-container">
      <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
      <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
      <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
      </el-button>
      <image-cropper
                   v-show="imagecropperShow"
                   :width="300"
                   :height="300"
                   :key="imagecropperKey"
                   :url="BASE_API+'/eduoss/fileoss/upload'"
                   field="file"
                   @close="close"
                   @crop-upload-success="cropSuccess"/>

      </el-form-item>


      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        // avatar: ''
        avatar: 'null'

      },

      imagecropperShow: false, // 上传弹框组件是否显示
      imagecropperKey: 0 ,// 上传组件key值
      BASE_API: process.env.BASE_API, // 接口API地址
      saveBtnDisabled: false // 保存按钮是否禁用,
    }


  },

  watch: {
    $route(to, from) {
      console.log('watch $route')
      this.init()
    }
  },

  created() {
    console.log('created')
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.fetchDataById(id)
    }else{
      this.teacher = {}
    }

  },

  methods: {

    close() {
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },

    cropSuccess(data){
        this.imagecropperShow = false
        this.teacher.avatar=data.url
        this.imagecropperKey = this.imagecropperKey + 1
    },



    cropSuccess(data) {
      this.imagecropperShow = false
      this.teacher.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },

    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
        this.teacher = {}
      }
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true // 防止表单重复提交

      if (!this.teacher.id) {
        this.saveTeacher()
      }else{
        this.updateTeacherInfo()
      }

     
    },
     
    //添加老师的方法
    saveTeacher() {
      teacher.addTeacher(this.teacher)
             .then(response => {
               //提示信息
               this.$message({
                 type: 'success',
                 message: '添加成功!'
               })
               //回到列表页面 路由跳转
               this.$router.push({path:'/teacher/list'})
             })
             .catch(error => {
               // console.log(error)
               this.$message({
                 type: 'error',
                 message: '添加失败!'
               })
               
             })
    },
    
    //数据回显
    fetchDataById(id) {
    teacher.getTeacherInfo(id).then(response => {
        this.teacher = response.data.item
    }).catch((response) => {
        this.$message({
            type: 'error',
            message: '获取数据失败'
        })
    })
    },


    

    updateTeacherInfo() {
      teacher.updateTeacher(this.teacher).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.$router.push({ path: '/teacher/list' })
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '修改失败!'
        })
      })
      
    }
  }
}
</script>