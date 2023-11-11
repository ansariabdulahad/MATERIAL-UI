import './notes.css';

import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemText, ListSubheader, OutlinedInput } from "@mui/material";
import { useState } from "react";
import JoditEditor from 'jodit-react';

const Notes = () => {

    const [saveInput, setSaveInput] = useState(false);
    const [note, setNote] = useState('');
    const [filename, setFilename] = useState('');

    const saveFile = () => {
        console.log(filename, note);
    }

    const design = (
        <>
            <div
                className="bg-white shadow-sm"
                style={{
                    borderRadius: '10px'
                }}
            >
                <Grid container>
                    <Grid item xs={12} sm={3}
                        className="p-3"
                        style={{
                            borderRight: '1px solid #f5f5f5'
                        }}
                    >
                        <Button
                            sx={{ mr: '52px' }}
                            className="py-2 px-4 mb-4"
                            variant="outlined"
                        >New File</Button>
                        <Button
                            className="py-2 px-4 mb-4"
                            variant="outlined"
                            color="error"
                            onClick={() => setSaveInput(!saveInput)}
                        >Save File</Button>
                        {
                            saveInput ?
                                <FormControl>
                                    <InputLabel>Filename</InputLabel>
                                    <OutlinedInput
                                        name='filename'
                                        label='Filename'
                                        variant='outlined'
                                        value={filename}
                                        onChange={(e) => setFilename(e.target.value)}
                                        endAdornment={
                                            <InputAdornment>
                                                <IconButton
                                                    onClick={saveFile}
                                                >
                                                    <span className="material-icons-outlined">save</span>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl> :
                                false
                        }
                        <List
                            subheader={<ListSubheader>Saved Files</ListSubheader>}
                        >
                            <ListItem sx={{ py: 0, mb: 2 }}>
                                <ListItemButton className="rounded border">
                                    <ListItemText
                                        primary="My demo file"
                                    />
                                    <IconButton color="error">
                                        <span className="material-icons-outlined">delete</span>
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                            <ListItem sx={{ py: 0, mb: 2 }}>
                                <ListItemButton className="rounded border">
                                    <ListItemText
                                        primary="My demo file"
                                    />
                                    <IconButton color="error">
                                        <span className="material-icons-outlined">delete</span>
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                            <ListItem sx={{ py: 0, mb: 2 }}>
                                <ListItemButton className="rounded border">
                                    <ListItemText
                                        primary="My demo file"
                                    />
                                    <IconButton color="error">
                                        <span className="material-icons-outlined">delete</span>
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <JoditEditor
                            config={{
                                height: '850px'
                            }}
                            value={note}
                            onBlur={(data) => setNote(data)}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    );
    return design;
}

export default Notes;