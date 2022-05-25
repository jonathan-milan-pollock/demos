import { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import styles from './edit-entity-dialog.module.scss';
import { EntityType } from '@dark-rush-photography/shared/types';
import SwitchIOS from '../switch-ios/switch-ios.component';

interface EditEntityDialogProps {
  entityType: EntityType;
  pathname: string;
  isDialogOpen: boolean;
  setIsDialogOpen(isDialogOpen: boolean): void;
}

function EditEntityDialog(props: EditEntityDialogProps) {
  const [value, setValue] = useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const closeHandler = () => {
    props.setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={props.isDialogOpen}
      onClose={closeHandler}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#000000',
          },
        },
      }}
    >
      <DialogTitle>Edit {props.pathname}</DialogTitle>
      <DialogContent>
        <FormGroup>
          {(props.entityType === EntityType.About ||
            props.entityType === EntityType.Event) && (
            <TextField
              margin="normal"
              label={props.entityType === EntityType.About ? 'Title' : 'Name'}
            />
          )}
          {props.entityType === EntityType.Event && (
            <FormControlLabel
              control={<SwitchIOS sx={{ m: 1 }} />}
              label="Starred Image is Centered?"
            />
          )}
          {props.entityType === EntityType.PhotoOfTheWeek && (
            <FormControlLabel
              control={<SwitchIOS sx={{ m: 1 }} />}
              label="Tile Image is Centered?"
            />
          )}
          {[
            EntityType.About,
            EntityType.Event,
            EntityType.ImageVideo,
            EntityType.PhotoOfTheWeek,
            EntityType.Review,
          ].includes(props.entityType) && (
            <TextField margin="normal" label="Text" multiline rows={10} />
          )}
          {[EntityType.Event, EntityType.PhotoOfTheWeek].includes(
            props.entityType
          ) && (
            <div className={styles['date-picker-container']}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  toolbarTitle={
                    EntityType.Event ? 'Created Date' : 'Published Date'
                  }
                  displayStaticWrapperAs="mobile"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          )}
          {[EntityType.Event, EntityType.PhotoOfTheWeek].includes(
            props.entityType
          ) && (
            <TextField
              margin="normal"
              label={props.entityType === EntityType.About ? 'Title' : 'Name'}
            />
          )}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Dismiss</Button>
        <Button onClick={closeHandler}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditEntityDialog;

/*

    var body: some View {
        List {
            if observableEntityUpdate.type == .event ||
                observableEntityUpdate.type == .photoOfTheWeek ||
                observableEntityUpdate.type == .imageVideo {
                Section("SEO Description") {
                    TextField("SEO Description", text: $observableEntityUpdate.seoDescription)
                        .disabled(isEditingDisabled)
                }
                if observableEntityUpdate.type != .imageVideo {
                    Section("SEO Keywords") {
                      EntitySeoKeywordsView(
                            isEditingDisabled: $isEditingDisabled,
                            observableEntityUpdate: observableEntityUpdate)
                    }
                }
            }
            if observableEntityUpdate.type == .event ||
                observableEntityUpdate.type == .photoOfTheWeek{
                Section(header: Text("Location")){
                    TextField("Place",
                              text: $observableEntityUpdate.location.place)
                        .disabled(isEditingDisabled)
                    TextField("City",
                              text: $observableEntityUpdate.location.city)
                        .disabled(isEditingDisabled)
                    TextField("State or Province",
                              text: $observableEntityUpdate.location.stateOrProvince)
                        .disabled(isEditingDisabled)
                    TextField("Country",
                              text: $observableEntityUpdate.location.country)
                        .disabled(isEditingDisabled)
                }
            }
            if observableEntityUpdate.type == .review {
                Section("Tile Dimension") {
                    TextField("Width", text: $observableEntityUpdate.tileDimension.width)
                        .keyboardType(.numberPad)
                        .disabled(isEditingDisabled)
                    TextField("Height", text: $observableEntityUpdate.tileDimension.height)
                        .keyboardType(.numberPad)
                        .disabled(isEditingDisabled)
                }
            }
            if observableEntityUpdate.isPublic {
                Section(header:
                            HStack {
                    Text("Visibility")
                        .foregroundColor(.red)
                }
                ) {
                    Toggle("Is Public?", isOn: $observableEntityUpdate.isPublic)
                        .disabled(isEditingDisabled)
                        .foregroundColor(.red)
                }
            }
        }
    }
}
*/
