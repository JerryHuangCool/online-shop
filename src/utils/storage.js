const INFO_KEY = 'online_shop_info'
const SEARCH_HISTORY = 'online_shop_serach_history'
export function getInfo () {
  const res = localStorage.getItem(INFO_KEY)
  return res ? JSON.parse(res) : { token: '', userId: '' }
}
export function setInfo (obj) {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
export function removeInfo () {
  localStorage.removeItem(INFO_KEY)
}

export function getSearchHistory () {
  const res = localStorage.getItem(SEARCH_HISTORY)
  return res ? JSON.parse(res) : []
}
export function setSearchHistory (history) {
  localStorage.setItem(SEARCH_HISTORY, JSON.stringify(history))
}
