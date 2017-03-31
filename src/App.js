import React from 'react';

import DatePicker from 'antd/lib/date-picker'

function disabledDate(current) {
  // can not select days before today and today
  // console.log(Date.parse('1970-01-02'));
  return (current && current.valueOf() < (Date.now()-86400000))|| (current && current.valueOf() > (Date.parse('2017-08-31')+86400000));
}

class App extends React.Component {
  render(){
    return(
      <div>
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          showDate
        />
      </div>
    )
  }
}

export default App;
