import Ajax from './ajax';
import axios from 'axios'

const Request = {
  Common: {
    checkLogin() {
      return Ajax.post('/checkLogin')
    },
    login(param) {
      return Ajax.post('/login', param)
    },
    register(param) {
      return Ajax.post('/register', param)
    },
    changePassword(param) {
      return Ajax.post('/changePassword', param)
    },
    reset(param) {
      return Ajax.post('/reset', param)
    },
  },
  System: {

  },
  Employe: {
    list(param) {
      return Ajax.post('/employe/list', param)
    },
    info(param) {
      return Ajax.post('/employe/info', param)
    },
    add(param) {
      return Ajax.post('/employe/add', param)
    },
    update(param) {
      return Ajax.post('/employe/update', param)
    },
    delete(param) {
      return Ajax.post('/employe/delete', param)
    },
    changeStatus(param) {
      return Ajax.post('/employe/changeStatus', param)
    },
    address(param) {
      return Ajax.post('/employe/address', param)
    },
  },
  Specie: {
    list() {
      return Ajax.post('/specie/list')
    },
    insert(param) {
      return Ajax.post('/specie/insert', param)
    },
    update(param) {
      return Ajax.post('/specie/update', param)
    },
    info(param) {
      return Ajax.post('/specie/info', param)
    },
    delete(param) {
      return Ajax.post('/specie/delete', param)
    }
  },
  Goods: {
    list(param) {
      return Ajax.post('/goods/list', param)
    },
    insert(param) {
      return Ajax.post('/goods/insert', param)
    },
    update(param) {
      return Ajax.post('/goods/update', param)
    },
    info(param) {
      return Ajax.post('/goods/info', param)
    },
    delete(param) {
      return Ajax.post('/goods/delete', param)
    },
    changeStatus(param) {
      return Ajax.post('/goods/changeStatus', param)
    },
    changeSwiperStatus(param) {
      return Ajax.post('/goods/changeSwiperStatus', param)
    },
    changeIsPromote(param) {
      return Ajax.post('/goods/changeIsPromote', param)
    },
  },
  Upload: {
    upload(data) {
      return axios.request({
        url: '/api/upload',
        method: 'post',
        headers:{"Content-Type":"multipart/form-data"},
        data
      })
    },
    uploads(data) {
      return axios.request({
        url: '/api/uploads',
        method: 'post',
        headers:{"Content-Type":"multipart/form-data"},
        data
      })
    }
  },



  User: {
    info() {
      return Ajax.get('/account/info');
    }
  },
  Dict: {
    get() {
      return Ajax.get(`/dict`);
    }
  },
  Home: {
    getMessageList() {
      return Ajax.get(`/home/messages`);
    }
  },
  Account: {
    menus() {
    }
  },
  Login: {
    login(param) {
      return Ajax.postJson('/login', param);
    },
    logout(param) {
      return Ajax.post('/logout', param);
    }
  },
  Management: {
    users(params) {
      return Ajax.get('/management/users', params);
    },
    roles(params) {
      return Ajax.get('/management/roles', params);
    }
  }
};

export default Request;
