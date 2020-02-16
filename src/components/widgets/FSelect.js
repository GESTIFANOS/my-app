import React, { Component } from 'react'
import { FormControl, InputLabel, FormHelperText, withStyles, Select, Input } from '@material-ui/core';

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { MenuItem } from 'material-ui';

const styles = theme => ({
    formControl: {
        // marginLeft: theme.spacing.unit,
        paddingTop: 1.7 * theme.spacing.unit,
        width: 300,

    }

});

class FSelect extends Component {
   
    onChange = (evt) => {
        const value = evt.target.value
        this.props.notifyParent(this.props.name, { [this.props.name]: value })
    }

    render() {
        const keyRef = this.props.keyRef
        const valueRef = this.props.valueRef
        const { classes } = this.props
        let renderOptions = this.props.data && this.props.data.map((d) => {
            return (<option value={d[keyRef]}> {d[valueRef]} </option>)
        }, this)
        return (
            <div>
                <FormControl className={classes.formControl} error={this.props.hasError}>
                    <InputLabel shrink htmlFor={this.props.name}>{this.props.label}</InputLabel>
                    <Select
                        className={this.props.className}
                        classes={this.props.classes}
                        native
                        required={this.props.required}
                        value={this.props.value}
                        onChange={this.onChange}
                        helperText={
                            this.props.hasError && this.props.helpMessage}
                        disabled={this.props.disabled}
                        inputProps={{
                            name: this.props.name,
                            id: this.props.name,
                        }}>
                        <option value="" />
                        {renderOptions}
                    </Select>
                    <FormHelperText>{this.props.hasError && this.props.helpMessage}</FormHelperText>
                </FormControl>
            </div>
        )
    }
}

FSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    notifyParent: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired
};


export default withStyles(styles)(FSelect);