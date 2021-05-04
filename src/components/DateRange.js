import { React, useState } from "react";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { makeStyles} from '@material-ui/core/styles';

const { RangePicker } = DatePicker;
function DateRange(props){
  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        value={props.value}
        onChange={props.DateChange}
        format="YYYY-MM-DD"
      />
    </Space>
  )
}

export default DateRange;