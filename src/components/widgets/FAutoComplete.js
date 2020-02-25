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

const  response = {"count":4,"next":null,"previous":null,"results":[{"id":20,"created":"2020-02-22T17:45:58.100674Z","updated":"2020-02-22T17:45:58.100786Z","status":"IN_PROGRESS","state":"ACTIVE","attr":null,"isDataMigrated":false,"desc":null,"carrierName":"C1","carrierLocation":"Tucker, GA","carrierPhoneNumber":"5103162285","carrierEmail":"ff@44.com","carrierDOT":"14526111","carrierMC":"4651","carrierType":"LEASED","owner":1,"carrierProfilePicture":null,"prettyName":"C1"},{"id":21,"created":"2020-02-22T17:45:59.982307Z","updated":"2020-02-22T17:45:59.982355Z","status":"IN_PROGRESS","state":"ACTIVE","attr":null,"isDataMigrated":false,"desc":null,"carrierName":"C1","carrierLocation":"Tucker, GA","carrierPhoneNumber":"5103162285","carrierEmail":"ff@44.com","carrierDOT":"14526111","carrierMC":"46511","carrierType":"LEASED","owner":1,"carrierProfilePicture":null,"prettyName":"C1"},{"id":2,"created":"2020-02-20T04:05:47.019154Z","updated":"2020-02-20T04:05:47.019199Z","status":"IN_PROGRESS","state":"ACTIVE","attr":null,"isDataMigrated":false,"desc":null,"carrierName":"Eden","carrierLocation":"Berkeley, ca","carrierPhoneNumber":"5103162285","carrierEmail":"eden@gg.com","carrierDOT":"345345","carrierMC":"3545345","carrierType":"LEASED","owner":1,"carrierProfilePicture":null,"prettyName":"Eden"},{"id":1,"created":"2020-02-07T05:46:45.073828Z","updated":"2020-02-22T18:26:32.668028Z","status":"IN_PROGRESS","state":"ACTIVE","attr":null,"isDataMigrated":false,"desc":"test","carrierName":"Mika","carrierLocation":"Tucker, GA","carrierPhoneNumber":"5103162285","carrierEmail":"gestifanos@gmail.com","carrierDOT":"575765","carrierMC":"7668768","carrierType":"ADMIN","owner":1,"carrierProfilePicture":null,"prettyName":"Mika"}]}

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 300,
  },
  formControl: {
    marginTop: theme.spacing.unit * 1.4,
    marginLeft: theme.spacing.unit * 2,
    paddingTop: 2.5 * theme.spacing.unit,
}
});

const FAutoComplete = (props) => {
  const { classes } = props
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');

  const [options, setOptions] = React.useState([]);
  const [selected, setSelected] = React.useState(props.value);
  const loading = open && options.length === 0;
  
  const fetchOptions = async (filterValue) => {
      let queryParam = ''
      if (!!filterValue) {
        queryParam += `search=${filterValue}`
      }
      if (props.hasCarrier) {
        queryParam += `&carrier=${props.carrier && props.carrier.id}`
      }
      if (props.queryParam) {
        queryParam+= '&' + props.queryParam
      }

      try {
            const response = await GET(props.url + `?${queryParam}`)
            const options = response.data && response.data.results || []
            setOptions(options);
            
      } catch (error) {
            setOptions([]);
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
    let active = true
    if (loading) {
    }
    return () => {
      active = false;
    };
  }, [options]);

  
  React.useEffect(() => {
    fetchOptions(filter)
  }, [filter]);
  
  
  
  const getOptionSelected = (option, value) => {
    if( option.id === value.id) {
      setSelected(option)
      return true;
    }
  }

  const getOptionLabel = (option) => {
    return option.prettyName || ''
  }

  const onSelect = (value) => {
    // console.log(value)
  }

  const onChange = (evt, value) => {
    setSelected(value)

    props.notifyParent(props.name, { [props.name]: value })
    if (props.notifyDependency) {
        props.notifyDependency()
    }
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
            onSelect={onSelect}
            defaultValue={props.value}
            value={props.value}
            onChange={onChange}
            getOptionSelected={getOptionSelected}
            getOptionLabel={getOptionLabel}
            options={options}
            loading={loading}
            // required={props.required}
            disabled={props.disabled}
            renderInput={params => (
              <TextField
                {...params}
                fullWidth
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

export default withStyles( styles )( FAutoComplete );
