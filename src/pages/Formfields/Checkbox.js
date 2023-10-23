import React from 'react'
import MaterialUI from '../Formfields/MaterialUI';

export default function Checkbox(props) {
    const { name, label, value, onChange } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })
    return (
        <MaterialUI.FormControl>
            <MaterialUI.FormControlLabel
                control={<MaterialUI.Checkbox name={name} color="primary" checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))} />}
                label={label} />
        </MaterialUI.FormControl>
    )
}