import axios from 'axios';
import _ from 'lodash';
import { getAccessKeys } from './storage';
import fs from 'fs';
export default class CarbonAPI {
  constructor() {
    this.uri = 'http://localhost:7070'; // local
  }
  
  logout() {
    const url = `${this.uri}/api/signout`;
    return axios(url, {
      method: 'POST',
    }).then((resp) => resp.data);
  }

  search(payload) {
    const url = `${this.uri}/search`;
    return axios(url, {
      method: 'GET',
      params: payload,
    }).then((resp) => resp.data);
  }

  find(payload) {
    const url = `${this.uri}/find`;
    return axios(url, {
      method: 'GET',
      params: payload,
    }).then((resp) => resp.data);
  }

  login(payload) {
    const url = `${this.uri}/api/signin`;
    return axios(url, {
      method: 'POST',
      data: payload,
    }).then((resp) => resp);
  }

  create_user(payload) {
    const url = `${this.uri}/api/student/new`;
    return axios(url, {
      method: 'POST',
      data: payload,
    }).then((resp) => resp.data);
  }

  create_user_csv(payload) {
    const obj = {
      user_name: payload[0],
      user_lastname: payload[1],
      user_email: payload[5],
      user_password: payload[6],
      institution_id: payload[3],
      user_gender: payload[2],
      user_birthday: payload[4]
    }
    const url = `${this.uri}/api/student/new`;
    return axios(url, {
      method: 'POST',
      data: obj,
    }).then((resp) => resp.data);
  }

  find_user(payload) {
    const url = `${this.uri}/api/users/find`;
    return axios(url, {
      method: 'POST',
      data: payload,
    }).then((resp) => resp);
  }

  change_state_user(payload) {
    const url = `${this.uri}/api/user/${payload.user_id}/edit`;
    return axios(url, {
      method: 'POST',
      data: payload,
    }).then((resp) => resp);
  }

  user_type(payload) {
    const url = `${this.uri}/api/users/${payload}/type`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp);
  }

  get_institutions() {
    const url = `${this.uri}/api/institutions/all`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_categories() {
    const url = `${this.uri}/api/categories/all`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_types() {
    const url = `${this.uri}/api/typematerials/all`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_keywords() {
    const url = `${this.uri}/api/keywords/all`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_departaments_by_institution(payload) {
    const url = `${this.uri}/api/departaments/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_careers_by_departament(payload) {
    const url = `${this.uri}/api/careers/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_courses_by_career(payload) {
    const url = `${this.uri}/api/courses/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_career_by_id(payload) {
    const url = `${this.uri}/api/career/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }
  
  get_materials_by_course(payload) {
    const url = `${this.uri}/api/materials/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_course_by_id(payload) {
    const url = `${this.uri}/api/course/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_material_by_id(payload) {
    const url = `${this.uri}/api/material/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_materials() {
    const url = `${this.uri}/api/materials/all`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  change_state_material(payload) {
    const url = `${this.uri}/api/material/${payload.material_id}/edit`;
    return axios(url, {
      method: 'POST',
      data: payload,
    }).then((resp) => resp.data);
  }

  get_material_by_string(payload) {
    const url = `${this.uri}/api/materials/search?name=${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_material_by_category(payload) {
    const url = `${this.uri}/api/materials/category/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_material_by_type(payload) {
    const url = `${this.uri}/api/materials/typematerial/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  get_material_by_keyword(payload) {
    const url = `${this.uri}/api/materials/keyword/${payload}`;
    return axios(url, {
      method: 'GET',
    }).then((resp) => resp.data);
  }

  create_material(payload) {
    const url = `${this.uri}/api/material/new`;
    return axios(url, {
      method: 'POST',
      data: payload,
    }).then((resp) => resp.data);
  }

  create_material_category(category_id, material_id) {
    const url = `${this.uri}/api/material/category/new`;
    const payload = {
      category_id,
      material_id
    }
    return axios(url, {
      method: 'POST',
      data: payload,
    }).then((resp) => resp.data);
  }

  create_material_type(typematerial_id, material_id) {
    const url = `${this.uri}/api/material/typematerial/new`;
    const payload = {
      typematerial_id,
      material_id
    }
    return axios(url, {
      method: 'POST',
      data: payload,
    }).then((resp) => resp.data);
  }

  create_material_keyword(keyword_id='', material_id, keyword_new=false, keyword_name='') {
    const url = `${this.uri}/api/material/keyword/new`;
    const payload = {
      keyword_id,
      material_id,
      keyword_new,
      keyword_name
    }
    return axios(url, {
      method: 'POST',
      data: payload,
    }).then((resp) => resp.data);
  }

  download_material(payload) {
    const url = `${this.uri}/api/drive/download`;
    return axios(url, {
      method: 'GET',
      data: payload,
    }).then((resp) => {
      console.log("asdasdasdad3crv 4vb5bnn 4", resp)
      if (resp.data.status === 'OK') {
        return axios(resp.data.data.url, {
          method: 'GET',
          headers: resp.data.data.headers,
          responseType: 'blob', // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', resp.data.data.name);
          document.body.appendChild(link);
          link.click();
        });
      }
    });
  }
}
