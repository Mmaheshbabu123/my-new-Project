import React from 'react';
import Select from 'react-select';
  const customStyles = {
    control: base => ({
    ...base,
    height: 35,
    minHeight: 35
  }),
  option: (provided, state) => ({
    ...provided,
  backgroundColor: state.isFocused
        ? 'lightgray'
        : null,
    color:'black',
  }),
}
export default function MultiSelect(
  {
    handleChange,
    standards,
    options,
    disabled,
    isMulti = false,
    name = '',
    placeholder = 'Select',
    className="pc-single-select",
    customStyle = { },
    classNamePrefix = '',
    isSearchable = true
  }
) {
  const customFilter = (option, searchText) => {
    if (option.label !== undefined && option.label !== null && option.label.toLowerCase().includes(searchText.toLowerCase())){
        return true
    }
    return false;
  }
    return (
      <div className= {className || "col-md-3 mt-2 mb-3 p-0"} style={customStyle}>
        <Select
            placeholder={placeholder}
            value={standards}
            onChange={handleChange}
            isDisabled={disabled}
            options={options}
            filterOption={customFilter}
            isSearchable={isSearchable}
            isMulti = {isMulti}
            style={customStyles}
            name = {name}
            classNamePrefix={classNamePrefix || 'react-select-prefix'}
            noOptionsMessage= {() => 'No option'}
        />
        </div>
    );
}
