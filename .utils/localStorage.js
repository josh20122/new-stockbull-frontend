export const setItem = (item, value) => {
    return window.localStorage.setItem(item, value);
  };
  
  export const getItem = (item) => {
    return window.localStorage.getItem(item);
  };
  
  export const clearStorage = () => {
    return window.localStorage.clear();
  };
  
  export const removeItem = (key) => {
    return window.localStorage.removeItem(key);
  };