import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from './Sidebar';

function FilterModal({ 
  open, 
  onClose, 
  regionFilter, 
  setRegionFilter, 
  subRegionFilter, 
  setSubRegionFilter,
  populationFilter,
  setPopulationFilter,
  countries 
}) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Filters
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Sidebar
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          subRegionFilter={subRegionFilter}
          setSubRegionFilter={setSubRegionFilter}
          populationFilter={populationFilter}
          setPopulationFilter={setPopulationFilter}
          countries={countries}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default FilterModal;