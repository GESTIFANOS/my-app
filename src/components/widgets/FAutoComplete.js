// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import 'isomorphic-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GET } from '../../util/FAPI';
import { FormControl, FormHelperText, withStyles, InputLabel } from '@material-ui/core';


function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 300,
  },
  formControl: {
    marginLeft: theme.spacing.unit * 2,
    paddingTop: 2.5 * theme.spacing.unit,
}
});

const FAutoCompletObj = (props) => {
  const { classes } = props
  const [open, setOpen] = React.useState(false);
  // Default filter is fetch to the server
  const [filter, setFilter] = React.useState('');

  const [options, setOptions] = React.useState([]);
  const [selected, setSelected] = React.useState(props.value);
  const loading = open && options.length === 0;
  
  const fetchOptions = async (filterValue) => {
      filterValue = filterValue || ''
      // const response = await GET(props.url + `?${props.queryName}=${filterValue}`)
      let response;
      if(props.data){
        response = {data:''};
        const options = props.data
             setOptions(options);
      }else{
        response = await GET(props.url)
        const options = response.data || []
        if (!!options) {
          setOptions(Object.keys(options).map(key => options[key].item[0]));
        }
      }

      
  }

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    fetchOptions()
  
    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  

  React.useEffect(() => {
    fetchOptions(filter)
  }, [filter]);
  
  React.useEffect(() => {
   //pass

  }, [selected]);
  
  const getOptionSelected = (option, value) => {
    if( option.id === value.id ) {
      setSelected(option)
      return true;
    }
  }
  
  // This should notify caller with the changed value
  const onChange = (evt, value) => {
    props.notifyParent(props.name, { [props.name]: value })
  }

  return (
    <FormControl   className={classes.formControl} error={props.hasError}>
         <InputLabel shrink htmlFor={props.name}>{props.label}</InputLabel>

          <Autocomplete
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={onChange}
            getOptionSelected={getOptionSelected}
            getOptionLabel={option => option.name}
            options={options}
            loading={loading}
            required={true}
            renderInput={params => (
              <TextField
                {...params}
                fullWidth
                onChange={evt => {
                  setFilter(evt.target.value)
              } }
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <FormHelperText >{props.hasError && props.helpMessage}</FormHelperText>
     </FormControl>

  );
}


export default withStyles( styles )( FAutoCompletObj );
