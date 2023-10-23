import React from 'react'
import MaterialUI from '../Formfields/MaterialUI';

export default function RadioGroup(props) {
    const { name, label, value, onChange, items } = props;
    return (
        <MaterialUI.FormControl>
            <MaterialUI.FormLabel>{label}</MaterialUI.FormLabel>
            <MaterialUI.RadioGroup row
                name={name} value={value} onChange={onChange}>
                {
                    items.map(
                        item => (
                            <MaterialUI.FormControlLabel key={item.id} value={item.id} control={<MaterialUI.Radio />} label={item.title} />
                        )
                    )
                }
            </MaterialUI.RadioGroup>
        </MaterialUI.FormControl>
    )
}