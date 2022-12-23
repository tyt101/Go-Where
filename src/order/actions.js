export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE'
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR'
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR'
export const ACTION_SET_DEPART_STATION_STR = 'SET_DEPART_STATION_STR'
export const ACTION_SET_ARRIVE_STATION_STR = 'SET_ARRIVE_STATION_STR'
export const ACTION_SET_TRAIN_NUMBER_STR = 'SET_TRAIN_NUMBER_STR'
export const ACTION_SET_DURATION_TIME = 'SET_DURATION_TIME'
export const ACTION_SET_PRICE = 'SET_PRICE'
export const ACTION_SET_PASSENGERS = 'SET_PASSENGERS'
export const ACTION_SET_IS_MENU_VISIBLE = 'SET_IS_MENU_VISIBLE'
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED'
export const ACTION_SET_SEAT_TYPE = 'SET_SEAT_TYPE'
export const ACTION_SET_MENU = 'SET_MENU'

export function setDepartDate(departDate) {
  return {
    type:ACTION_SET_DEPART_DATE,
    payload:departDate
  }
}

export function setArriveDate(arriveDate) {
  return {
    type:ACTION_SET_ARRIVE_DATE,
    payload:arriveDate
  }
}

export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload:departTimeStr
  }
}

export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload:arriveTimeStr
  }
}

export function setDepartStationStr(departStationStr) {
  return {
    type:ACTION_SET_DEPART_STATION_STR,
    payload:departStationStr
  }
}

export function setArriveStationStr(arriveStationStr) {
  return {
    type:ACTION_SET_ARRIVE_STATION_STR,
    payload:arriveStationStr
  }
}

export function serTrainNumberStr(trainNumberStr) {
  return {
    type:ACTION_SET_TRAIN_NUMBER_STR,
    payload:trainNumberStr
  }
}

export function setDurationTime(durationTime) {
  return {
    type:ACTION_SET_DURATION_TIME,
    payload:durationTime
  }
}

export function setPrice(price) {
  return {
    type:ACTION_SET_PRICE,
    payload:price
  }
}

export function setPassengers(passengers) {
  return {
    type:ACTION_SET_PASSENGERS,
    payload:passengers
  }
}

export function setIsMenuVisible(isMenuVisible) {
  return (dispatch, getState) => {
    dispatch({
      type:ACTION_SET_IS_MENU_VISIBLE,
      payload:isMenuVisible
    })
  }
}

export function setSearchParsed(searchParsed) {
  return {
    type:ACTION_SET_SEARCH_PARSED,
    payload:searchParsed
  }
}

export function setSeatType(seatType) {
  return {
    type:ACTION_SET_SEAT_TYPE,
    payload:seatType
  }
}

export function setMenu(menu) {
  return {
    type:ACTION_SET_MENU,
    payload:menu
  }
}

export function showMenu(menu) {
  return (dispatch) => {
    dispatch(setMenu(menu))
    dispatch(setIsMenuVisible(true))
  }
}

export function hiddenMenu() {
  return setIsMenuVisible(false)
}
// 显示成人/儿童菜单
export function showPassengersTypeMenu(id) {
  return (dispatch, getState) => {
    const {passengers} = getState()
    const passenger = passengers.find(passenger => passenger.id === id)
    if(!passenger) return ;
    dispatch(showMenu({
      options:[{
        title: '成人票',
        value: 'Adult',
        active: 'adult' === passenger.ticketType,
      },
      {
          title: '儿童票',
          value: 'Child',
          active: 'child' === passenger.ticketType,
      },],
      // 事件
      onClick(ticketType){
        if(ticketType === 'Adult') {
          dispatch(updatePassenger(id,{
            ticketType,
            credit:''
          },['gender','birthday','followAdult']))
        }else {
          const adults = passengers.filter(passenger => passenger.ticketType === 'Adult' && passenger.id !== id)
          if(adults.length){
            dispatch(updatePassenger(id,{
              ticketType,
              gender:'',
              birthday:'',
              followAdult:adults[0].id
            },['credit'])
          )}else{
            alert("请先添加成人")
          }
        }
        dispatch(hiddenMenu())
      }
    }))
  }
}

// 显示性别菜单
export function showGenderTypeMenu(id) {
  return (dispatch,getState) => {
    const {passengers} = getState()
    let passenger;
    for(let p of passengers) {
      if(p.id === id) {
        passenger = p
      }
    }
    dispatch(showMenu({
      options: [
        {
            title: '男',
            value: 'male',
            active: 'male' === passenger.gender,
        },
        {
            title: '女',
            value: 'female',
            active: 'female' === passenger.gender,
        },
      ],
      onClick(gender) {
        dispatch(updatePassenger(id,{
          gender
        }))
        dispatch(hiddenMenu())
      }
    }))
  }
}
// 显示同行成人菜单
export function showFollowAdultMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()
    let passenger;
    for(let p of passengers) {
      if(p.id === id) {
        passenger = p
      }
    }
    dispatch(showMenu({
      options:passengers
      .filter(passenger => passenger.ticketType === 'Adult')
      .map(adult => {
        return {
          title: adult.name,
          value: adult.id,
          active: adult.id === passenger.followAdult
        }
      }),

      onClick(followAdult) {
        dispatch(updatePassenger(id,{
          followAdult,
        }))
        dispatch(hiddenMenu())
      }
    }))
  }
}
let passengerIdx = 0
export function createAdult() {
  return (dispatch, getState) => {
    const {passengers} = getState()
    for(let passenger of passengers) {
      const keys = Object.keys(passenger)
      for(let key of keys) {
        if(!passenger[key]) return
      }
    }
    dispatch(setPassengers([
      ...passengers,
      {
        id: ++passengerIdx,
        name: '',
        credit: '',
        ticketType: 'Adult',
        seat: 'Z'
      }
    ]))
  }
}

export function createChild() {
  return (dispatch, getState) => {
    const {passengers} = getState()
    
    let followAdult = null
    for(let passenger of passengers) {
      const keys = Object.keys(passenger)
      for(let key of keys) {
        if(!passenger[key]) return
      }
      if(passenger.ticketType === 'Adult') {
        followAdult = passenger.id
      }
    }

    if(!followAdult) {
      alert("请至少选择一个大人")
      return
    }

    dispatch(setPassengers([
      ...passengers,
      {
        id: ++passengerIdx,
        name: '',
        gender: '',
        birthday: '',
        ticketType: 'Child',
        followAdult,
        seat: 'Z'
      }
    ]))
  }
}

// 根据id更新乘客
export function updatePassenger(id, data,keysToBeRemoved = []) {
  return (dispatch, getState) => {
    const {passengers} = getState()
    for(let i = 0 ; i < passengers.length; i++ ) {
      if(passengers[i].id === id) {
        // 更新
        const newPassengers = [...passengers]
        newPassengers[i] = Object.assign({},passengers[i],data)
        // 删除
        for(let key of keysToBeRemoved) {
          console.log(key)
          delete newPassengers[i][key]
        }
        console.log(newPassengers)
        // 设置
        dispatch(setPassengers(newPassengers))
        break
      }
    }
  }
}

export function removePassenger(id) {
  return (dispatch, getState) => {
    const {passengers} = getState()
    dispatch(setPassengers(passengers.filter(
      passenger => {
        return passenger.id !== id
      }
    )))
  }
}



