import {createStore, combineReducers, applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

export default createStore(
    combineReducers(reducers), {
        from: '北京',
        to: '上海',
        // 城市选择浮层
        isCitySelectorVisible: false,
        // 城市选择值回填
        currentSelectingLeftCity: false,
        // 城市数据 异步
        cityData:null,
        // 当前是否加载城市数据 节流
        isLoadingCityData:false,
         // 日期选择浮层开关
        isDataSelectorVisible:false,
        // 是否选择高铁动车
        hightSepeed:false,
        // 离开时间
        departDate:Date.now()
    }, applyMiddleware(thunk)
)