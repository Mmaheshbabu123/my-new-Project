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
export default function MultiSelect({ handleChange, standards, options, disabled, isMulti = true, name = '' ,placeholder = 'Select', className=''}) {
  const customFilter = (option, searchText) => {
      if (option.label !== undefined && option.label !== null && option.label.toLowerCase().includes(searchText.toLowerCase())){
        return true
      }
        return false;
    }
    return (
        <Select
            placeholder={placeholder}
            value={standards}
            onChange={handleChange}
            isDisabled={disabled}
            options={options}
            filterOption={customFilter}
            className={className}
            isMulti = {isMulti}
            styles={customStyles}
            name = {name}
            noOptionsMessage= {() => 'No option'}
        />
    );
}
