import React from 'react'
import MaterialUI from '../Formfields/MaterialUI';

import { makeStyles } from 'tss-react/mui';



const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props) {
    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MaterialUI.Button
            variant={variant || "contained"} size={size || "large"} color={color || "primary"}
            onClick={onClick} {...other} classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MaterialUI.Button>
    )
}