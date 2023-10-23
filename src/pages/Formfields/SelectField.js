// import React from 'react'
// import { ErrorMessage, useField } from 'formik';

// const SelectField = ({ label, options, ...props }) => {
//     const [field, meta] = useField(props);
//     return (
//         <div className={`form-group col-md-${props.col}`}>
//             <label htmlFor={field.name}>{label}</label>
//             <select
//                 className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
//                 {...field} {...props}
//                 autoComplete="off"
//             >
//                 <option>-- Select --</option>
//                 {
//                     options.map((role, index) => (
//                         <option key={index}
//                             value={role}
//                         >{role}</option>
//                     ))
//                 }
//             </select>
//             <ErrorMessage component="div" name={field.name} className="error" />
//         </div>
//     )
// }

// export default SelectField




import React from 'react'
import { ErrorMessage, useField } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const SelectField = ({ label, options, ...props }) => {
    const [field, meta] = useField(props);
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <TextField item
            size="small" id={field.name} select label={label}
            onChange={handleChange} variant="outlined">
            {options.map((role, index) => (
                <MenuItem key={index} value={role}>
                    {role}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectField