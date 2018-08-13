import axios from 'axios';
import _ from 'lodash';
import { getAccessKeys } from './storage';

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
}
