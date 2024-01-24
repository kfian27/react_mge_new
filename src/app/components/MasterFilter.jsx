import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
// import Form from "react-bootstrap/Form";
// import { NumericFormat } from "react-number-format";
// import Select from "react-select";
// import DatePicker from "react-date-picker";
// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";

const MasterFilter = ({ configFilter }) => {
  let filterConfig = configFilter;
  var valNameArr = [];
  const setVariable = (variableName, value) => {
    valNameArr[variableName] = value;
  };

  filterConfig.forEach((val, index) => {
    if (val.fieldType.toLowerCase() === 'text') {
      let cekVar = val.fieldName + '_' + val.title;
      let cekVal = valNameArr[cekVar] || false;
      if (!cekVal) {
        setVariable(val.fieldName + '_' + val.title, '');
      }
    } else if (val.fieldType.toLowerCase() === 'numeric') {
      let cekVar = val.fieldName + '_' + val.title;
      let cekVal = valNameArr[cekVar] || false;
      if (!cekVal) {
        setVariable(val.fieldName + '_' + val.title, 0);
      }
    } else if (val.fieldType.toLowerCase() === 'select') {
      let cekVar = val.fieldName + '_' + val.title;
      let cekVal = valNameArr[cekVar] || false;
      if (!cekVal) {
        setVariable(val.fieldName + '_' + val.title, '');
      }
    } else if (val.fieldType.toLowerCase() === 'date') {
      let cekVar = val.fieldName + '_' + val.title + '_awal';
      let cekVal = valNameArr[cekVar] || false;
      if (!cekVal) {
        setVariable(val.fieldName + '_' + val.title + '_awal', new Date());
        setVariable(val.fieldName + '_' + val.title + '_akhir', new Date());
      }
    }
  });

  var valNameObj = Object.assign({}, valNameArr);

  const [valName, setValName] = useState(valNameObj);

  const setVariableObj = (variableName, value) => {
    setValName({ ...valName, [variableName]: value });
  };

  const filterDiv = (data) => {
    return data.map((item, index) => {
      let cekVar = item.fieldName + '_' + item.title;
      if (item.fieldType.toLowerCase() === 'text') {
        return (
          <div className="col-md-2" key={item.fieldName + '_' + item.title}>
            {/* <Form.Label htmlFor={item.fieldName + "_" + item.title}>
              {item.title}
            </Form.Label>
            <Form.Control
              type="Text"
              id={item.fieldName + "_" + item.title}
              name={item.fieldName}
              placeholder={"Masukkan " + item.title}
            /> */}
          </div>
        );
      } else if (item.fieldType.toLowerCase() === 'numeric') {
        return (
          <div className="col-md-2" key={item.fieldName + '_' + item.title}>
            {/* <Form.Label htmlFor={item.fieldName + '_' + item.title}>{item.title}</Form.Label>
            <NumericFormat
              displayType="input"
              defaultValue={'inputkan'}
              className="form-control"
              allowLeadingZeros
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              placeholder={'Masukkan ' + item.title}
              onValueChange={(values, sourceInfo) => {
                setVariableObj(cekVar, values.floatValue);
              }}
            /> */}
          </div>
        );
      } else if (item.fieldType.toLowerCase() === 'select') {
        return (
          <div className="col-md-2" key={item.fieldName + '_' + item.title}>
            {/* <Form.Label htmlFor={item.fieldName + '_' + item.title}>{item.title}</Form.Label>
            <Select
              options={item.defaultValue}
              onChange={(val) => {
                setVariableObj(cekVar, val.value);
              }}
            /> */}
          </div>
        );
      } else if (item.fieldType.toLowerCase() === 'date') {
        return (
          <div className="row col-md-5" key={item.fieldName + '_' + item.title}>
            <div className="col-md-6">
              {/* <Form.Label htmlFor={item.fieldName + '_' + item.title}>{item.title} Awal</Form.Label>
              <DatePicker
                value={valName[cekVar + '_awal']}
                onChange={(date) => {
                  setVariableObj(cekVar + '_awal', date);
                }}
                className={'form-control'}
              /> */}
            </div>
            <div className="col-md-6">
              {/* <Form.Label htmlFor={item.fieldName + '_' + item.title}>
                {item.title} Akhir
              </Form.Label>
              <DatePicker
                value={valName[cekVar + '_akhir']}
                onChange={(date) => {
                  setVariableObj(cekVar + '_akhir', date);
                }}
                className={'form-control'}
              /> */}
            </div>
          </div>
        );
      }
    });
  };
  return <div className="row">{filterDiv(filterConfig)}</div>;
};

export default MasterFilter;
