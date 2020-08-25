import axios from 'axios'
import {config } from '../config'


export const authenRequest = async (path, data) => {  
  const url = `${config.backend}${path}`
  try {
    const res = await axios.post(url, data)    
    if (res.status >= 300) {
      return {...res, ok: false}
    } else {
      return {...res, ok: true}
    }    
  } catch(err) {
    return {err: err, ok: false}
  }
}

export const signUpRequest = async(path, data) => {
  const url = `${config.backend}${path}`
  try {
    const res = await axios.post(url, data)      
      if (res.status >= 300) {
        return {...res, ok: false}
      } else {
        return {...res, ok: true}
      }    
    } catch(err) {
      return {err: err, ok: false}
    }
}

export const newGameRequest = async(path, userId) => {
  const url = `${config.backend}${path}/${userId}/`   
  try {    
    const res = await axios({
        method: 'POST',
        url: url,
    });
    if (res.status >= 300) {
      return {...res, ok: false}
    } else {
      return {...res, ok: true}
    }    
  } catch(err) {
    return {err: err, ok: false}
  }
}

export const gameRequest = async (path, gameId = '') => {
  const url = `${config.backend}${path}${gameId}`
  try {    
    const res = await axios({
      method: 'GET',
      url: url,      
    });    
    if (res.status >= 300) {
      return {...res, ok: false}
    } else {
      return {...res, ok: true}
    }    
  } catch(err) {
    return {err: err, ok: false}
  }
}

export const cardRequest = async (path, data, gameId) => {    
  const url = `${config.backend}${path}${gameId}`
  try {    
    const res = await axios.patch(url, data)    
    if (res.status >= 300) {
      return {...res, ok: false}
    } else {
      return {...res, ok: true}
    }    
  } catch(err) {
    return {err: err, ok: false}
  }
}