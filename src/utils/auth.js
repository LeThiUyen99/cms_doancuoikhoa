import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const accountKey = 'Admin-info'
const uidKey = 'Admin-UID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUID() {
  return Cookies.get(uidKey)
}

export function setUID(uid) {
  return Cookies.set(uidKey, uid)
}

export function removeUID() {
  return Cookies.remove(uidKey)
}

export function setAcountInfo(account = {}) {
  Cookies.set(accountKey, account)
  console.log('.............. thong tin tk  ', account)
}

export function getAcountInfo(account = '{}') {
  const ac = Cookies.get(accountKey)
  // console.log('.............. thong tin tk  ', ac)
  return account ? parseJson(ac) : null
}

export function parseJson(json) {
  try {
    return JSON.parse(json)
  } catch (error) {
    return null
  }
}
