import React from 'react'
import MaterialUI from '../Formfields/MaterialUI';

export default function Select(props) {
    const { name, label, value, error = null, onChange, options } = props;
    return (
        <MaterialUI.FormControl variant="outlined" size="small"
            {...(error && { error: true })}>
            <MaterialUI.InputLabel>{label}</MaterialUI.InputLabel>
            <MaterialUI.Select label={label} name={name}
                value={value} onChange={onChange}>
                {/* <MaterialUI.MenuItem value="All">All</MaterialUI.MenuItem> */}
                {
                    options.map(item => (
                        <MaterialUI.MenuItem key={item} value={item}>{item}</MaterialUI.MenuItem>
                    ))
                }
            </MaterialUI.Select>
            {error && <MaterialUI.FormHelperText>{error}</MaterialUI.FormHelperText>}
        </MaterialUI.FormControl>
    )
}