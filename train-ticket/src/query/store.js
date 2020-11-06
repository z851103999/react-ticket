import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {h0} from '../common/fp'
import {ORDER_DEPART} from './constans'

const inital = {
    from: null,
    to: null,
    // 高铁日期
    departDate: h0(new Date()),
    // 高铁选择
    highSpeed: false,
    // 火车数据
    trainList: [],
    // 订单排序
    orderType: ORDER_DEPART,
    // 只看票
    onlyTickets: false,
    // 选择票 备选项
    ticketTypes: [],
    // 选择票 选中类型
    checkedTrainTypes: {},
    // 出发车站
    departStations: [],
    // 出发车站 被选择
    checkedDepartStattions: {},
    // 到达选项
    arriveStations: [],
    // 到达选项 被选择
    checkedArriveStations: {},
    // 出发时间 0
    departTimeStart: 0,
    // 出发时间 24
    departTimeEnd: 24,
    // 到达时间 0
    arriveTimeStart: 0,
    // 到达时间 24
    arriveTimeEnd: 24,
    // 综合筛选 显示隐藏
    isFiltersVisible: false,
    // 程序启动立即解析地址栏参数 需要向服务器查询必要参数 判断已经完成
    searchParsed: false
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers(reducers), inital, composeEnhancers(applyMiddleware(thunk))
)
