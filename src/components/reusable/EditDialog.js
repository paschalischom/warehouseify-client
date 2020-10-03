import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Button, MenuItem} from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import {Controller, useForm} from "react-hook-form";
import { connect } from "react-redux";
import { editPoi } from "../../store/actions/userDataActions";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: '#2e2e31',
    },
}));

function EditDialog(props) {
    const classes = useStyles();
    const {editDialogOpen, handleEditDialogClose, poiUID, poiList, editPoi} = props;
    const { register, control, handleSubmit } = useForm();

    const onSubmit = data => {
        let d = new Date();
        let newPoi = {
            ...poiList[poiUID],
            ...data,
            lat: parseFloat(data['lat']),
            lng: parseFloat(data['lng']),
            radius: parseInt(data['radius']),
            updated: d.toISOString().split('T')[0]
        }
        editPoi(poiUID, newPoi);
        handleEditDialogClose();
    };

    const statuses = [
        {
            label: 'Active'
        },
        {
            label: 'Disabled'
        }
    ]

    return (
        <React.Fragment>
            <Dialog open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    aria-labelledby={"edit-form-dialog"}
                    PaperProps={{
                        classes: {
                            root: classes.root
                        }
                    }}
            >
                <DialogTitle id={"edit-form-dialog"} disableTypography>
                    <Typography variant={"h4"} color={"primary"} display={'inline'}>
                        Edit
                    </Typography>
                    <Typography variant={"h4"} color={"secondary"} display={'inline'} style={{
                        paddingLeft: '5px',
                    }}>
                        Point of Interest
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText color={"primary"}>
                        Edit the Point of Interest entry. Please note that editing the fields with
                        geographic context is disabled as it may lead to invalid values being entered.
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
                        <CustomTextField
                            id={'address'}
                            name={'address'}
                            label={'Address'}
                            type={'text'}
                            inputRef={register}
                            defaultValue={poiList[poiUID].address}
                        />
                        <CustomTextField
                            id={'state'}
                            name={'state'}
                            label={'State'}
                            type={'text'}
                            inputRef={register}
                            defaultValue={poiList[poiUID].state}
                        />
                        <CustomTextField
                            id={'radius'}
                            name={'radius'}
                            label={'Radius'}
                            type={'number'}
                            inputRef={register}
                            defaultValue={poiList[poiUID].radius}
                        />
                        <CustomTextField
                            id={'lat'}
                            name={'lat'}
                            label={'Latitude'}
                            type={'number'}
                            inputRef={register}
                            defaultValue={poiList[poiUID].lat}
                            disabled
                        />
                        <CustomTextField
                            id={'lng'}
                            name={'lng'}
                            label={'Longitude'}
                            type={'number'}
                            inputRef={register}
                            defaultValue={poiList[poiUID].lng}
                            disabled
                        />
                        <Controller
                            name={'status'}
                            control={control}
                            defaultValue={poiList[poiUID].status}
                            as={<CustomTextField
                                id={'status'}
                                label={'Status'}
                                type={'text'}
                                select
                                helperText={'Select whether you want the PoI to be contributing to the calculations.'}
                            >
                                {statuses.map((status, i) => (
                                    <MenuItem key={i} value={status.label}>
                                        {status.label}
                                    </MenuItem>
                                ))}
                            </CustomTextField>}
                        />

                        <Button
                            type={'submit'}
                            color={'secondary'}
                            style={{
                                margin: "20px 0px 50px 0px",
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            type={'button'}
                            onClick={handleEditDialogClose}
                            color={'secondary'}
                            style={{
                                margin: "20px 0px 50px 0px",
                            }}
                        >
                            Cancel
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        poiList: state.user.poiList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPoi: (poiUID, newPoi) => dispatch(editPoi(poiUID, newPoi)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);
