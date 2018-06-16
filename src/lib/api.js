import axios from 'axios';
import _ from 'lodash';
import { getAccessKeys } from './storage';

export default class CarbonAPI {
  constructor() {
    this.uri = 'http://localhost:7070'; // local
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
}
