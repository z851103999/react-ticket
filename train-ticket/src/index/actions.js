import DepartDate from "./DepartDate";

// actionType
export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';

/**
 * 始发地城市
 * @param {String} from
 */
export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from
  }
}

/**
 * 目的地城市
 * @param {String} to
 */
export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to
  }
}

/**
 * 是否加载城市数据
 * @param {Boolean} isLoadingCityData
 */
export function setIsLoadingCityData(isLoadingCityData) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData
  }
}

/**
 * 城市数据
 * @param {Array} cityData
 */
export function setCityData(cityData) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData,
  };
}

/**
 * 切换是否只看高铁
 */
export function toggleHightSpeed() {
  return (dispatch, getState) => {
    const {hightSpeed} = getState()
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !hightSpeed
    })
  }
}

/**
 * 派发两个 dispatch 一个设置城市是否可见，一个设置城市
 * @param {String} currentSelectingLeftCity
 */
export function showCitySelector(currentSelectingLeftCity) {
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    })

    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity
    })
  }
}

/**
 * 隐藏城市
 */
export function hideCitySelector() {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
  }
}

/**
 * 设置选择的城市
 * @param {String} city
 */
export function setSelectedCity(city) {
  return (dispatch, getState) => {
    const {currentSelectingLeftCity} = getState();
    console.log(city)
    if (currentSelectingLeftCity) {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city));
    }

    dispatch(hideCitySelector());
  };
}


/**
 * 交换始发地和目的地
 */
export function exchangeFromTo() {
  return (dispatch, getState) => {
    const {from, to} = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
}

/*
*  请求城市列表数据
* */
export function fetchCityData() {
  return (dispatch, getState) => {
    const {isLoadingCityData} = getState();

    if (isLoadingCityData) {
      return;
    }

    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}');

    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data));
      return;
    }

    dispatch(setIsLoadingCityData(true));

    fetch('/rest/cities?_' + Date.now())
      .then(res => res.json())
      .then(cityData => {
        dispatch(setCityData(cityData));

        localStorage.setItem(
          'city_data_cache',
          JSON.stringify({
            expires: Date.now() + 60 * 1000,
            data: cityData,
          })
        );

        dispatch(setIsLoadingCityData(false));
      })
      .catch(() => {
        dispatch(setIsLoadingCityData(false));
      });
  };
}

/* 
 * 离开时间
*/
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate
  }
}

/**
 *设置日期可见
 */
export function showDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false
  }
}

/* 
* 隐藏时间列表
*/
export function hideDateSelector(){
  return{
    type:ACTION_SET_DEPART_DATE,
    payload:DepartDate
  }
}
