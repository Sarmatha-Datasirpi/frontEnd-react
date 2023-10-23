import React from 'react'
import MaterialUI from '../Formfields/MaterialUI';

export default function Input(props) {
    const { name, label, value, error = null, onChange } = props;
    return (
        <MaterialUI.TextField
            variant="outlined" label={label} name={name}
            value={value} onChange={onChange} size="small"
            {...(error && { error: true, helperText: error })}
        />
    )
}