// reducers.js
import {
    ACTION_SET_FROM,
    ACTION_SET_TO,
    ACTION_SET_DEPART_DATE,
    ACTION_SET_HIGH_SPEED,
    ACTION_SET_TRAIN_LIST,
    ACTION_SET_ORDER_TYPE,
    ACTION_SET_ONLY_TICKETS,
    ACTION_SET_TICKET_TYPES,
    ACTION_SET_CHECKED_TICKET_TYPES,
    ACTION_SET_TRAIN_TYPES,
    ACTION_SET_CHECKED_TRAIN_TYPES,
    ACTION_SET_DEPART_STATIONS,
    ACTION_SET_CHECKED_DEPART_STATIONS,
    ACTION_SET_ARRIVE_STATIONS,
    ACTION_SET_CHECKED_ARRIVE_STATIONS,
    ACTION_SET_DEPART_TIME_START,
    ACTION_SET_DEPART_TIME_END,
    ACTION_SET_ARRIVE_TIME_START,
    ACTION_SET_ARRIVE_TIME_END,
    ACTION_SET_IS_FILTERS_VISIBLE,
    ACTION_SET_SEARCH_PARSED,
} from './actions'

import { ORDER_DEPART } from './constans'

export default {
    // 出发
    from(state = null, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_FROM:
                return payload;
            default:
        }

        return state;
    },
    // 到达
    to(state = null, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_TO:
                return payload;
            default:
        }

        return state;
    },
    // 离开时间
    departDate(state = Date.now(), action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_DEPART_DATE:
                return payload;
            default:
        }

        return state;
    },
    // 是否选择高铁
    highSpeed(state = false, action) {
        const {type, payload} = action;
        let checkedTrainTypes;

        switch (type) {
            case ACTION_SET_HIGH_SPEED:
                return payload;
            case ACTION_SET_CHECKED_TRAIN_TYPES:
                checkedTrainTypes = payload;
                return Boolean(checkedTrainTypes[1] && checkedTrainTypes[5]);
            default:
        }

        return state;
    },
    // 火车列表数据
    trainList(state = [], action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_TRAIN_LIST:
                return payload;
            default:
        }

        return state;
    },
    // 订单排序
    orderType(state = ORDER_DEPART, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_ORDER_TYPE:
                return payload;
            default:
        }

        return state;
    },
    // 只看车票
    onlyTickets(state = false, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_ONLY_TICKETS:
                return payload;
            default:
        }

        return state;
    },
    // 选择票备选项
    ticketTypes(state = [], action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_TICKET_TYPES:
                return payload;
            default:
        }

        return state;
    },
    // 火车票选项
    checkedTicketTypes(state = {}, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_CHECKED_TICKET_TYPES:
                return payload;
            default:
        }

        return state;
    },
    // 火车选项数据
    trainTypes(state = [], action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_TRAIN_TYPES:
                return payload;
            default:
        }

        return state;
    },

    // 火车票选项
    checkedTrainTypes(state = {}, action) {
        const {type, payload} = action;

        let highSpeed;
        let newCheckedTrainTypes;

        switch (type) {
            case ACTION_SET_CHECKED_TRAIN_TYPES:
                return payload;
            case ACTION_SET_HIGH_SPEED:
                highSpeed = payload;
                newCheckedTrainTypes = {...state};

                if (highSpeed) {
                    newCheckedTrainTypes[1] = true;
                    newCheckedTrainTypes[5] = true;
                } else {
                    delete newCheckedTrainTypes[1];
                    delete newCheckedTrainTypes[5];
                }

                return newCheckedTrainTypes;
            default:
        }

        return state;
    },
    // 出发车站
    departStations(state = [], action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_DEPART_STATIONS:
                return payload;
            default:
        }

        return state;
    },

    checkedDepartStations(state = {}, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_CHECKED_DEPART_STATIONS:
                return payload;
            default:
        }

        return state;
    },
    arriveStations(state = [], action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_ARRIVE_STATIONS:
                return payload;
            default:
        }

        return state;
    },
    checkedArriveStations(state = {}, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_CHECKED_ARRIVE_STATIONS:
                return payload;
            default:
        }

        return state;
    },
    departTimeStart(state = 0, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_DEPART_TIME_START:
                return payload;
            default:
        }

        return state;
    },
    departTimeEnd(state = 24, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_DEPART_TIME_END:
                return payload;
            default:
        }

        return state;
    },
    arriveTimeStart(state = 0, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_ARRIVE_TIME_START:
                return payload;
            default:
        }

        return state;
    },
    arriveTimeEnd(state = 24, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_ARRIVE_TIME_END:
                return payload;
            default:
        }

        return state;
    },
    isFiltersVisible(state = false, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_IS_FILTERS_VISIBLE:
                return payload;
            default:
        }

        return state;
    },
    searchParsed(state = false, action) {
        const {type, payload} = action;
        switch (type) {
            case ACTION_SET_SEARCH_PARSED:
                return payload;
            default:
        }

        return state;
    },
};

